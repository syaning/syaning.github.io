---
layout: post
title:  JS异步控制流及async实现细节分析(1)
date:   2015-11-29 11:30:00 +0800
---

* TOC
{:toc}

> 本系列文章使用的async版本为[v1.5.0](https://github.com/caolan/async/tree/v1.5.0).

JS的异步函数执行，大致上可以分为以下几种：

- 所有异步任务并行执行
	- 无最大并行数限制
	- 有最大并行数限制
- 所有异步任务串行执行
- 串行执行与并行执行相结合

### 1. 并行执行（无最大并行数限制）

这是最简单的一种异步执行流程。只需要一个简单的`arr.forEach`就可以完成。

考虑如下的一种情形：给定一系列的文件名，分别读取文件内容并输出，当读取完所有的文件后，提示任务完成。

为了得知是否所有任务都已经执行完，我们引入一个初始值为0的计数器，每当一个任务完成的时候，就给计数器加1，然后检测计数器的值是否等于输入的文件个数，如果相等，则说明所有任务执行完毕。

简单的代码实现如下：

```javascript
var files = ['1.txt', '2.txt', '3.txt', '4.txt', '5.txt'];
var i = 0;

files.forEach(function(file) {
	fs.readFile(file, function(err, data) {
		if (err) {
			return callback(err);
		}
		console.log(data.toString());
		callback();
	});
});

function callback(err) {
	i++;
	if (err) {
		throw err;
	}
	if (i === files.length) {
		console.log('all done!');
	}
}
```

但是每次遇到这种情况，都需要手动维护计数器比较麻烦，因此需要将这个过程封装为一个函数，从而方便调用。我们期望的函数调用是如下形式：

```javascript
// eachOf(arr, fn, callback)
eachOf(files, function(val, key, callback) {
	fs.readFile(val, function(err, data) {
		if (err) {
			return callback(err);
		}
		console.log(data.toString());
		callback();
	})
}, function(err) {
	if (err) {
		throw err;
	}
	console.log('add done!');
});
```

> **注意：** `eachOf`的第三个参数`callback`和`fn`的第三个参数`callback`是不同的函数。
>
> `fn`的`callback`是由用户手动调用的，而`eachOf`的`callback`是在所有任务完成后由`eachOf`函数内部自动调用的。

即对于`arr`中的每一项，调用`fn`，当所有任务执行完后，调用`callback`。`eachOf`的初步实现如下：

```javascript
function eachOf(arr, fn, callback) {
	callback = callback || function() {};
	arr = arr || [];

	if (!arr.length) {
		callback();
	}

	var i = 0;
	arr.forEach(function(val, i) {
		fn(val, i, done);
	});

	function done(err) {
		i++;
		if (err) {
			return callback(err);
		}
		if (i === arr.length) {
			callback();
		}
	}
}
```

在这里也看以看出，`fn`的`callback`其实是内部提供的`done`函数。但是这样还存在着一个潜在的问题，如果在`fn`中多次调用了`callback`，那么当一个任务完成后，就会多次调用`done`，此时计数器就无法正确计数。因此，需要确保每个任务完成后，无论用户调用多少次`callback`，`done`都只能执行一次。

为此，实现一个`once`函数，如下：

```javascript
function once(fn) {
	return function() {
		if (!fn) {
			return;
		}
		fn.apply(this, arguments);
		fn = null;
	};
}
```

然后将`fn(val, i, done);`替换为`fn(val, i, once(done));`即可。

在async中，提供了如下方法：

```javascript
async.forEachOf =
    async.eachOf = function(object, iterator, callback) {
        // ... ...
    };
// iterator(val, key, callback)

async.forEach =
    async.each = function(arr, iterator, callback) {
        // ... ...
    };
// iterator(val, callback)
```

它们的第一个参数不仅可以是一个数组，还可以是类数组或者对象。它们的区别只是在于`iterator`的函数签名不同。

### 2. 并行执行（有最大并行数限制）

相当于有一个池子（类比于线程池），当池子不饱和的时候，就向里面加入任务。当所有任务都加入到了池子后，等待所有任务完成，然后执行最后的回调函数。如果在执行过程中出错，那么不再继续执行后面的任务。

因此，需要三个变量：

- `i`表示当前任务的序号
- `running`表示当前正在执行的任务的个数
- `errored`表示是否出错

简单实现如下：

```javascript
function eachOfLimit(limit, arr, fn, callback) {
	callback = once(callback || function() {});
	arr = arr || [];

	if (limit <= 0) {
		return callback();
	}

	var i = -1;
	var running = 0;
	var errored = false;

	replenish();

	function replenish() {
		// 当所有任务都已经加入到池子，且当前没有正在执行的任务
		// 说明所有任务都执行完毕，执行callback
		if (i === arr.length && running <= 0) {
			return callback();
		}

		// 只要当前正在执行的任务个数小于限制数，且没有出错
		// 就继续向池子中添加任务
		while (running < limit && !errored) {
			// 如果没有任务可以添加，且没有任务正在运行
			// 说明所有任务都执行完毕，执行callback
			// 这里不需要对running>0的情况进行处理
			// 因为在done中会replenish，最终会进入上面的if判断
			if (++i === arr.length) {
				if (running <= 0) {
					callback();
				}
				return;
			}

			running++;
			fn(arr[i], i, once(done));
		}
	}

	function done(err) {
		running--;
		if (err) {
			callback(err);
			errored = true;
		} else {
			replenish();
		}
	}
}
```

例子如下：

```javascript
eachOfLimit(2, files, function(val, key, callback) {
	fs.readFile(val, function(err, data) {
		if (err) {
			return callback(err);
		}
		console.log(data.toString());
		callback();
	})
}, function(err) {
	if (err) {
		throw err;
	}
	console.log('all done!');
});
```

在async中，提供了如下方法：

```javascript
async.forEachOfLimit =
	async.eachOfLimit = function(obj, limit, iterator, callback) {
		// ... ...
	};
// iterator(val, key, callback)

async.forEachLimit =
	async.eachLimit = function(arr, limit, iterator, callback) {
		// ... ...
	};
// iterator(val, callback)
```

### 3. 串行执行

串行执行也就是说只有当一个任务完成后，才会继续执行下一个任务。比较典型的就是[Express](http://expressjs.com/)中间件的执行。

这种情况下通常依赖于一个`next`函数，该函数用来取出一个任务并执行，当任务完成后，递归调用`next`从而继续下一个任务的执行。

简单实现如下：

```javascript
function eachOfSeries(arr, fn, callback) {
	callback = once(callback || function() {});
	arr = arr || [];

	var i = -1;

	next();

	function next() {
		if (++i === arr.length) {
			return callback();
		}

		fn(arr[i], i, once(done));
	}

	function done(err) {
		if (err) {
			return callback(err);
		}
		next();
	}
}
```

调用如下：

```javascript
eachOfSeries(files, function(val, key, callback) {
	fs.readFile(val, function(err, data) {
		if (err) {
			return callback(err);
		}
		console.log(data.toString());
		callback();
	});
}, function(err) {
	if (err) {
		throw err;
	}
	console.log('all done!');
});
```

但是这样的实现还有一个小问题，当`fn`内部都是同步操作时，例如：

```javascript
eachOfSeries(files, function(val, key, callback) {
	console.log(val, ': pre callback');
	callback();
	console.log(val, ': post callback');
}, function(err) {
	if (err) {
		throw err;
	}
	console.log('all done!');
});
```

此时输出为：

```javascript
1.txt : pre callback
2.txt : pre callback
3.txt : pre callback
4.txt : pre callback
5.txt : pre callback
all done!
5.txt : post callback
4.txt : post callback
3.txt : post callback
2.txt : post callback
1.txt : post callback
```

为了解决这个问题，引入一个`sync`变量，用来表示当前处于同步执行还是异步执行。修改后的代码如下：

```javascript
function eachOfSeries(arr, fn, callback) {
	callback = once(callback || function() {});
	arr = arr || [];

	var i = -1;
	var sync = true;

	next();

	function next() {
		sync = true;

		if (++i === arr.length) {
			return callback();
		}

		fn(arr[i], i, once(done));

		sync = false;
	}

	function done(err) {
		if (err) {
			return callback(err);
		}
		if (sync) {
			setImmediate(next);
		} else {
			next();
		}
	}
}
```

在`done`中对`sync`进行判断，如果`sync`为`true`，则说明`fn`是一个同步操作，此时需要`setImmediate(next)`，将下一次调用变为异步操作。

当然，这样做更重要的一个原因是为了避免过多的同步调用导致栈溢出（`RangeError: Maximum call stack size exceeded`）,后面在提到`async.ensureAsync`的时候会详细讲解。

在async中，提供了如下方法：

```javascript
async.forEachOfSeries =
	async.eachOfSeries = function(obj, iterator, callback) {
		// ... ...
	};
// iterator(val, key, callback)

async.forEachSeries =
	async.eachSeries = function(arr, iterator, callback) {
		// ... ...
	};
// iterator(val, callback)
```