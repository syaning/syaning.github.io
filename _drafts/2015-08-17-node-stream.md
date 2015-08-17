---
layout: post
title:  Node中的stream
date:   2015-08-17 14:15:00
---

参考资料：

- [Stream Documentation](https://nodejs.org/api/stream.html)
- [stream-handbook](https://github.com/substack/stream-handbook)

### 1. 什么是stream

stream（流）是Node中一个非常重要的概念，几乎所有的I/O操作都与stream有关。[官方文档](https://nodejs.org/api/stream.html)的解释如下：

> A stream is an abstract interface implemented by various objects in Node. For example a [request to an HTTP server](https://nodejs.org/api/http.html#http_http_incomingmessage) is a stream, as is [stdout](https://nodejs.org/api/process.html#process_process_stdout). Streams are readable, writable, or both. All streams are instances of [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

也就是说，stream是一个抽象的接口，其它的类对它进行了实现。而从最初的本质来说，stream就是一个`EventEmitter`。

流的理念源于Unix中的[Pipeline](https://en.wikipedia.org/wiki/Pipeline_(Unix))，简单地说，就是上一个程序的输出可以作为下一个程序的输入。数据在不同的程序之间流动，就像水流在水管中一样，这是一个十分形象的比喻。通过管道符`|`可以十分方便地将各个程序连接起来，为数据的流动提供管道，例如：

```shell
ls -l | grep key | less
```

在Node中，stream的之间的连接通过`pipe`方法，例如：

```javascript
readStream.pipe(writeStream);
```

在Node中，stream分为多种，包括[Readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable)，[Writable stream](https://nodejs.org/api/stream.html#stream_class_stream_writable)，[Duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex)和[Transform stream](https://nodejs.org/api/stream.html#stream_class_stream_transform)。

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