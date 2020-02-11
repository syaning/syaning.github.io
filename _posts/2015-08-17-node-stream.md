---
layout: post
title:  Node中的stream
date:   2015-08-17 14:15:00 +0800
---

* TOC
{:toc}

### 1. 什么是stream

stream（流）是Node中一个非常重要的概念，几乎所有的I/O操作都与stream有关。[官方文档](https://nodejs.org/api/stream.html)的解释如下：

> A stream is an abstract interface implemented by various objects in Node. For example a [request to an HTTP server](https://nodejs.org/api/http.html#http_http_incomingmessage) is a stream, as is [stdout](https://nodejs.org/api/process.html#process_process_stdout). Streams are readable, writable, or both. All streams are instances of [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

也就是说，stream是一个抽象的接口，其它的类对它进行了实现。而从最初的本质来说，stream就是一个`EventEmitter`。

流的理念源于Unix中的[Pipeline](https://en.wikipedia.org/wiki/Pipeline_(Unix))，简单地说，就是上一个程序的输出可以作为下一个程序的输入。数据在不同的程序之间流动，就像水流在水管中一样，这是一个十分形象的比喻。通过管道符`|`可以十分方便地将各个程序连接起来，为数据的流动提供管道，例如：

```sh
ls -l | grep key | less
```

在Node中，stream的之间的连接通过`pipe`方法，例如：

```javascript
readStream.pipe(writeStream);
```

在Node中，stream分为多种，包括[Readable](https://nodejs.org/api/stream.html#stream_class_stream_readable)，[Writable](https://nodejs.org/api/stream.html#stream_class_stream_writable)，[Duplex](https://nodejs.org/api/stream.html#stream_class_stream_duplex)和[Transform](https://nodejs.org/api/stream.html#stream_class_stream_transform)。

通常，可以通过如下方式来创建stream：

```javascript
var Readable = require('stream').Readable;
var rs = Readable();
```

通过`stream.js`的源码，也可以对该模块的结构有一个整体上的了解：

```javascript
// https://github.com/joyent/node/blob/master/lib/stream.js

module.exports = Stream;

var EE = require('events').EventEmitter;
var util = require('util');

util.inherits(Stream, EE);
Stream.Readable = require('_stream_readable');
Stream.Writable = require('_stream_writable');
Stream.Duplex = require('_stream_duplex');
Stream.Transform = require('_stream_transform');
Stream.PassThrough = require('_stream_passthrough');

function Stream() {
	EE.call(this);
}
```

可以看到，`Stream`继承自`EventEmitter`，而`Readable`，`Writable`等具体的stream都挂载在`Stream`下面。

### 2. Readable stream

`Readable`是可以流出数据的流，简单来说，它可以作为我们的数据源。常见的Readable stream有如下几种：

- [http response](https://nodejs.org/api/http.html#http_http_incomingmessage)(客户端)
- [http request](https://nodejs.org/api/http.html#http_http_incomingmessage)(服务器端)
- [fs.ReadStream](https://nodejs.org/api/fs.html#fs_class_fs_readstream)
- [zlib](https://nodejs.org/api/zlib.html)
- [crypto](https://nodejs.org/api/crypto.html)
- [net.Socket](https://nodejs.org/api/net.html#net_class_net_socket)
- [child precess的stdout和stderr](https://nodejs.org/api/child_process.html#child_process_child_stdout)
- [process.stdin](https://nodejs.org/api/process.html#process_process_stdin)

Readable stream有两种模式：

- flowing：在该模式下，会尽快获取数据向外输出。因此如果没有事件监听，也没有`pipe()`来引导数据流向，数据可能会丢失。
- paused：默认模式。在该模式下，需要手动调用`stream.read()`来获取数据。

可以通过以下几种方法切换到flowing模式：

- 为`data`事件添加监听器
- 调用`resume()`
- 调用`pipe()`

可以通过以下几种方法切换到paused模式：

- 如果没有`pipe`，则调用`pause()`即可
- 如果有`pipe`，那么需要移除`data`事件的所有监听器，并通过`unpipe()`移除所有的`pipe`

下面，来看一个简单的例子：

```javascript
var Readable = require('stream').Readable;
var rs = new Readable();

rs.on('readable', function() {
	var chunk = rs.read();
	console.log('get data:', chunk ? chunk.toString() : null);
});

rs.on('end', function() {
	console.log('stream end');
});

rs.push('hello stream');
rs.push('hello alex');
rs.push(null);
```

输出为：

```
get data: hello streamhello alex
stream end
```

在这里，我们创建了一个Readable stream，并监听其`readable`和`end`事件，然后通过`push`手动地向其中写入数据。在这里，stream为paused模式，当调用`push(null)`后，才会触发`readable`事件，之前的`push(chunk)`操作会将数据先放在内部的缓存中。当监听到`readable`事件后，需要手动调用`rs.read()`读取数据，同时该操作会触发`end`事件；如果在监听到`readable`事件后不进行`read()`操作，那么数据就会丢失。

如果我们监听`data`事件，那么就会自动切换为flowing模式。代码如下：

```javascript
var Readable = require('stream').Readable;
var rs = new Readable();

rs.on('data', function(chunk) {
	console.log('get data:', chunk.toString());
});

rs.on('end', function() {
	console.log('stream end');
});

rs.push('hello stream');
rs.push('hello alex');
rs.push(null);
```

此时输出为：

```
get data: hello stream
get data: hello alex
stream end
```

因为是flowing模式，因此每次`push(chunk)`操作都会触发`data`事件。当调用`push(null)`时，同样会触发`readable`事件，只不过此时通过`read()`操作读取不到任何数据而已。而在每次触发`data`事件的时候，会在内部调用`read()`方法，因此最终`end`事件依然会触发。

当然，我们也可以不监听`data`事件，而是通过`pipe()`来进入flowing模式。代码如下：

```javascript
var Readable = require('stream').Readable;
var rs = new Readable();

rs.on('end', function() {
	console.log('stream end');
});

rs.push('hello stream\n');
rs.push('hello alex\n');
rs.push(null);

rs.pipe(process.stdout);
```

输出为：

```
hello stream
hello alex
stream end
```

其本质上，是在`pipe()`函数中进行了`data`事件的监听，以及`read()`等一系列操作。

上面的几个例子中，我们都是通过`push()`方法手动地向Readable stream中写入数据。然而在实际情况下，如果要实现一个自定义的Readable stream类，往往是通过定义其`_read`方法来进行数据的处理。看如下例子：

```javascript
var Readable = require('stream').Readable;

function MyReadable(data, options) {
	if (!(this instanceof MyReadable)) {
		return new MyReadable(data, options);
	}
	Readable.call(this, options);
	this.data = data || [];
	this.index = 0;
}

MyReadable.prototype.__proto__ = Readable.prototype;

MyReadable.prototype._read = function() {
	if (this.index >= this.data.length) {
		this.push(null);
	} else {
		setTimeout(function() {
			this.push(this.data[this.index++]);
		}.bind(this), 1000);
	}
};

var data = ['California Dreaming', 'Hotel California', 'Californication'];
var rs = MyReadable(data);

rs.on('data', function(chunk) {
	console.log('get data:', chunk.toString());
});
```

在这里我们实现了一个`MyReadable`的类，并让其继承自`Readable`。`MyReadable`的参数`data`是一个字符串数组。然后定义了其`_read()`方法，每次从数组`data`中取出一项进行`push()`操作，如果遍历完了数组，则执行`push(null)`。

但是可以发现这样一个问题，也就是`push(chunk)`中的参数必须为字符串或者`Buffer`对象，否则就会报错。在上面的例子中，可以看到，`MyReadable`实际上是接受两个参数的，第二个参数为`options`，这个参数实际上被`Readable`所使用。通过在`options`中设置`objectMode: true`，就可以使`push()`操作支持对象、数字等其它类型了。例如：

```javascript
var Readable = require('stream').Readable;

function MyReadable(data, options) {
	if (!(this instanceof MyReadable)) {
		return new MyReadable(data, options);
	}
	Readable.call(this, options);
	this.data = data || [];
	this.index = 0;
}

MyReadable.prototype.__proto__ = Readable.prototype;

MyReadable.prototype._read = function() {
	if (this.index >= this.data.length) {
		this.push(null);
	} else {
		setTimeout(function() {
			this.push(this.data[this.index++]);
		}.bind(this), 1000);
	}
};

var data = [{
	music: 'California Dreaming',
	artist: 'The Mamas & The Papas'
}, {
	music: 'Hotel California',
	artist: 'Eagles'
}, {
	music: 'Californication',
	artist: 'Red Hot Chili Peppers'
}];
var rs = MyReadable(data, {
	objectMode: true
});

rs.on('data', function(chunk) {
	console.log('%s - %s', chunk.artist, chunk.music);
});
```

在上面的例子中，我们是通过在`_read()`函数中使用`setTimeout`来保证数据的产生速率。其实，也可以通过`pause()`和`resume()`来控制数据流，例如：

```javascript
var Readable = require('stream').Readable;

function MyReadable(data, options) {
	if (!(this instanceof MyReadable)) {
		return new MyReadable(data, options);
	}
	Readable.call(this, options);
	this.data = data || [];
	this.index = 0;
}

MyReadable.prototype.__proto__ = Readable.prototype;

MyReadable.prototype._read = function() {
	if (this.index >= this.data.length) {
		this.push(null);
	} else {
		this.push(this.data[this.index++]);
	}
};

var data = ['California Dreaming', 'Hotel California', 'Californication'];
var rs = MyReadable(data);

rs.on('data', function(chunk) {
	console.log('get data:', chunk.toString());
	rs.pause();
	setTimeout(function() {
		rs.resume();
	}, 1000);
});
```

在这里，每次监听到`data`事件后，执行`pause()`，然后过1秒后再执行`resume()`。在该例子中，在此过程中`_read`依然在产生数据，只不过此时的`push()`操作并不会触发`data`事件，数据暂时存放在内部的缓存中。当执行了`resume()`后，才会继续在内部调用`read()`读取数据。

### 3. Writable stream

`Writable`是可以流入数据的流，简单来说，我们可以将数据输入给它。常见的Writable stream有如下几种：

- [http request](https://nodejs.org/api/http.html#http_class_http_clientrequest)(客户端)
- [http response](https://nodejs.org/api/http.html#http_class_http_serverresponse)(服务器端)
- [fs.WriteStream](https://nodejs.org/api/fs.html#fs_class_fs_writestream)
- [zlib](https://nodejs.org/api/zlib.html)
- [crypto](https://nodejs.org/api/crypto.html)
- [net.Socket](https://nodejs.org/api/net.html#net_class_net_socket)
- [child process的stdin](https://nodejs.org/api/child_process.html#child_process_child_stdin)
- [process.stdout](https://nodejs.org/api/process.html#process_process_stdout)
- [process.stderr](https://nodejs.org/api/process.html#process_process_stderr)

当创建一个Writable stream的时候，我们需要实现其`_write()`方法。看下面例子：

```javascript
var Writable = require('stream').Writable;

var ws = Writable();

ws._write = function(chunk, encoding, cb) {
	console.log(chunk.toString());
	cb();
}

ws.on('finish', function() {
	console.log('on finish');
});

ws.write('hello world');
ws.write('hello alex');
ws.end();
```

当然，我们也可以通过继承`Writable`来创建一个新的stream类，例如：

```javascript
var Writable = require('stream').Writable;

function MyWritable(options) {
	if (!(this instanceof MyWritable)) {
		return new MyWritable(options);
	}
	Writable.call(this, options);
}

MyWritable.prototype.__proto__ = Writable.prototype;

MyWritable.prototype._write = function(chunk, encoding, cb) {
	console.log(chunk.toString());
	cb();
};

var ws = MyWritable();

ws.write('hello world');
ws.end('the end');
```

在上面的例子中，`write()`操作依然是只能够写字符串或者`Buffer`对象。同样地，可以通过设置`objectMode: true`来实现其它数据类型的写入。例如;

```javascript
var Writable = require('stream').Writable;

function MyWritable(options) {
	if (!(this instanceof MyWritable)) {
		return new MyWritable(options);
	}
	Writable.call(this, options);
}

MyWritable.prototype.__proto__ = Writable.prototype;

MyWritable.prototype._write = function(chunk, encoding, cb) {
	console.log(chunk);
	cb();
};

var ws = MyWritable({
	objectMode: true
});

ws.write({
	music: 'California Dreaming',
	artist: 'The Mamas & The Papas'
});
ws.end(100);
```

### 4. pipe

下面来了解一下`pipe()`操作的基本原理。首先我们定义`MyReadable`和`MyWritable`两个类：

```javascript
var util = require('util'),
	stream = require('stream'),
	Readable = stream.Readable,
	Writable = stream.Writable;

function MyReadable(options) {
	if (!(this instanceof MyReadable)) {
		return new MyReadable(options);
	}
	Readable.call(this, options);
	this._cur = 1;
	this._max = 200;
}

util.inherits(MyReadable, Readable);

MyReadable.prototype._read = function() {
	if (this._cur > this._max) {
		this.push(null);
	} else {
		this.push('' + this._cur++);
	}
}

function MyWritable(options) {
	if (!(this instanceof MyWritable)) {
		return new MyWritable(options);
	}
	Writable.call(this, options);
}

util.inherits(MyWritable, Writable);

MyWritable.prototype._write = function(chunk, encoding, cb) {
	setTimeout(function() {
		console.log('write data:', chunk.toString());
		cb();
	}.bind(this), 100);
};
```

其中`MyReadable`的`_read()`操作是依次生成1到200的数字；`MyWritable`的`_write()`操作是将收到的数据打印在控制台上，这里通过`setTimeout`来限制`MyWritable`的写入速度。

如果我们希望`MyReadable`的数据流入`MyWritable`，代码可能是这样子：

```javascript
var rs = MyReadable(),
	ws = MyWritable();

rs.on('data', function(chunk) {
	ws.write('chunk');
});
```

此时输出为：

```
read data: 1
read data: 2
... ...
read data: 199
read data: 200
write data: 1
write data: 2
... ...
write data: 199
write data: 200
```

此时监听了`data`事件，`rs`处于flowing模式，因此数据会源源不断地产生。又由于`ws`的写入速度远低于`rs`的读取速度，因此产生的数据会缓存在内存中，然后才会进行写操作。如果例子中`_max`的值不是200，而是一个非常大的数字的话，就会严重耗费内存。因此，我们需要对数据流进行一定的管理。如下：

```javascript
var rs = MyReadable({
		highWaterMark: 10
	}),
	ws = MyWritable({
		highWaterMark: 10
	});

rs.on('data', function(chunk) {
	if (!ws.write(chunk)) {
		rs.pause();
	}
});

ws.on('drain', function() {
	rs.resume();
});
```

> 由于例子中的数据量比较小，我们通过设置`highWaterMark`为一个比较小的值来模拟实现此效果。

因为`write()`操作会返回一个boolean值，用来说明是否可以继续写下去。如果内存中已经缓存了较多的数据，就会返回`false`。当`ws.write(chunk)`返回值是`false`的时候，执行`rs.pause()`暂停读取流；然后当接收到`drain`事件的时候，执行`rs.resume()`重新开启读取流。

此时输出可能为：

```
read data: 1
... ... 
read data: 15
write data: 1
... ...
write data: 10
read data: 16
... ...
read data: 20
write data: 11
... ...
write data: 15
... ...
... ...
read data: 197
... ...
read data: 200
write data: 193
... ...
write data: 200
```

我们也可以这样子写：

```javascript
function pipe(rs, ws) {
	rs.on('data', function(chunk) {
		if (!ws.write(chunk)) {
			rs.pause();
		}
	});

	ws.on('drain', function() {
		rs.resume();
	});
}

pipe(rs, ws);
```

这其实就是`pipe()`的基本逻辑。更简单地，我们可以直接使用`pipe()`来自动管理数据流：

```javascript
rs.pipe(ws);
```

### 5. Duplex

`Duplex`既是Readable stream同时又是Writable Stream，常见的Duplex stream有：

- [zlib](https://nodejs.org/api/zlib.html)
- [crypto](https://nodejs.org/api/crypto.html)
- [net.Socket](https://nodejs.org/api/net.html#net_class_net_socket)

如果要实现一个Duplex stream，需要实现它的`_read()`和`_write()`方法。

如下例子，实现了一个比较简单的双向流：

```javascript
var util = require('util'),
	stream = require('stream'),
	Readable = stream.Readable,
	Duplex = stream.Duplex;

function MyReadable(options) {
	if (!(this instanceof MyReadable)) {
		return new MyReadable(options);
	}
	Readable.call(this, options);
	this._cur = 1;
	this._max = 20;
}

util.inherits(MyReadable, Readable);

MyReadable.prototype._read = function() {
	if (this._cur > this._max) {
		this.push(null);
	} else {
		this.push('' + this._cur++);
	}
}

function MyDuplex(options) {
	if (!(this instanceof MyDuplex)) {
		return new MyDuplex(options);
	}
	Duplex.call(this, options);
	this._data = [];
}

util.inherits(MyDuplex, Duplex);

MyDuplex.prototype._read = function() {
	if (this._data.length) {
		this.push(this._data.shift());
		this.push('\n');
	} else {
		this.push(null);
	}
}

MyDuplex.prototype._write = function(chunk, encoding, cb) {
	console.log('write data:', chunk.toString());
	this._data.push(chunk);
	cb();
};

var rs = MyReadable(),
	ds = MyDuplex();

rs.pipe(ds).pipe(process.stdout);
```

### 6. Transform

`Transform`是一种特殊的Duplex stream，它可以对数据进行转换，也就是说，它的输出是将输入根据某种规则计算而成的。常见的Transform stream有：

- [zlib](https://nodejs.org/api/zlib.html)
- [crypto](https://nodejs.org/api/crypto.html)

如果要实现一个Transform stream，需要实现它的`_transform()`方法。

如下例子，实现了一个比较简单的转换流：

```javascript
var util = require('util'),
	stream = require('stream'),
	Readable = stream.Readable,
	Transform = stream.Transform;

function MyReadable(options) {
	if (!(this instanceof MyReadable)) {
		return new MyReadable(options);
	}
	Readable.call(this, options);
	this._cur = 1;
	this._max = 20;
}

util.inherits(MyReadable, Readable);

MyReadable.prototype._read = function() {
	if (this._cur > this._max) {
		this.push(null);
	} else {
		this.push('' + this._cur++);
	}
}

function MyTransform(options) {
	if (!(this instanceof MyTransform)) {
		return new MyTransform(options);
	}
	Transform.call(this, options);
}

util.inherits(MyTransform, Transform);

MyTransform.prototype._transform = function(chunk, encoding, cb) {
	var val = Number(chunk.toString());
	this.push('' + val * 2 + '\n');
	cb();
};

var rs = MyReadable(),
	ts = MyTransform();

rs.pipe(ts).pipe(process.stdout);
```

### 7. 参考资料

- [Stream Documentation](https://nodejs.org/api/stream.html)
- [stream-handbook](https://github.com/substack/stream-handbook)
- [Readable, Writable, and Transform Streams in Node.js](http://www.sandersdenardi.com/readable-writable-transform-streams-node/)