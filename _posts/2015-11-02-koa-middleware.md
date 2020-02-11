---
layout: post
title:  koa的中间件机制
date:   2015-11-02 12:00:00 +0800
---

* TOC
{:toc}

> 本文基于[koa v1.1.1](https://github.com/koajs/koa/tree/1.1.1)。

### 一、简单示例

与[Express](http://expressjs.com/)的中间件顺序执行不同，在koa中，中间件是所谓的“洋葱模型”。看例子：

```javascript
var koa = require('koa');
var app = koa();

app.use(function* f1(next) {
	console.log('f1: pre next');
	yield next;
	console.log('f1: post next');
});

app.use(function* f2(next) {
	console.log('  f2: pre next');
	yield next;
	console.log('  f2: post next');
});

app.use(function* f3(next) {
	console.log('    f3: pre next');
	this.body = 'hello world';
	console.log('    f3: post next');
});

app.listen(4000);
```

输出结果为：

```
f1: pre next
  f2: pre next
    f3: pre next
    f3: post next
  f2: post next
f1: post next
```

这主要借助于[generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)。

### 二、模拟分析

下面通过一个例子来模拟上面的行为。

```javascript
function* f1() {
	console.log('f1: pre next');
	yield f2;
	console.log('f1: post next');
}

function* f2() {
	console.log('  f2: pre next');
	yield f3;
	console.log('  f2: post next');
}

function* f3() {
	console.log('    f3: pre next');
	console.log('    f3: post next');
}

var g = f1();
g.next();
g.next();
```

输出为：

```
f1: pre next
f1: post next
```

会发现，只执行了两次`next()`就结束了，而且`f2`和`f3`中的`console.log`语句根本就没有执行到。为了解决问题，需要弄清楚以下四种情况的区别：

```javascript
function* outer() {
	console.log('outer: pre yield');
	// 1. yield* inner();
	// 2. yield* inner;
	// 3. yield inner();
	// 4. yield inner;
	console.log('outer: after yield');
}

function* inner() {
	console.log('inner');
}
```

- `yield* inner()`：相当于用`inner`的内容来替换该位置，不会消耗一次`next()`调用，`inner`内的代码会被执行
- `yield* inner`：报错。因为`inner`是一个generator function，而`yield*`后面应该是一个igenerator
- `yield inner()`：`yield`的结果是一个generator，消耗一次`outer`的`next()`调用，且`inner`内的代码不会被执行
- `yield inner`：`yield`的结果是一个generator function，消耗一次`outer`的`next()`调用，且`inner`内的代码不会被执行

于是，将上面的模拟代码进行改动，如下：

```javascript
function* f1() {
	console.log('f1: pre next');
	yield* f2();
	console.log('f1: post next');
}

function* f2() {
	console.log('  f2: pre next');
	yield* f3();
	console.log('  f2: post next');
}

function* f3() {
	console.log('    f3: pre next');
	console.log('    f3: post next');
}

var g = f1();
g.next();
```

输出为：

```
f1: pre next
  f2: pre next
    f3: pre next
    f3: post next
  f2: post next
f1: post next
```

这种情况下输出是正确了。然而我们会奇怪，为什么在koa中，明明是`yield next`，结果依然是正确的呢？看来需要对koa的源码进行分析。

### 三、源码分析

在koa的源码中，相关的代码为（在`application.js`中）：

```javascript
app.listen = function() {
	debug('listen');
	var server = http.createServer(this.callback());
	return server.listen.apply(server, arguments);
};

app.callback = function() {
	var fn = this.experimental ? compose_es7(this.middleware) : co.wrap(compose(this.middleware));
	var self = this;

	if (!this.listeners('error').length) this.on('error', this.onerror);

	return function(req, res) {
		res.statusCode = 404;
		var ctx = self.createContext(req, res);
		onFinished(res, ctx.onerror);
		fn.call(ctx).then(function() {
			respond.call(ctx);
		}).catch(ctx.onerror);
	}
};
```

`app.callback()`的返回值是一个函数，该函数作为`http.createServer()`的参数，用来处理所有请求。而与中间件相关的关键一句则是：

```javascript
var fn = this.experimental ? compose_es7(this.middleware) : co.wrap(compose(this.middleware));
```

不考虑`this.experimental`，那么重点就在`co.wrap(compose(this.middleware))`了。其中`compose`是[`koa-compose`](https://github.com/koajs/compose)模块，源码（[v2.3.0](https://github.com/koajs/compose/tree/2.3.0)）如下：

```javascript
module.exports = compose;

function compose(middleware) {
	return function*(next) {
		var i = middleware.length;
		var prev = next || noop();
		var curr;

		while (i--) {
			curr = middleware[i];
			prev = curr.call(this, prev);
		}

		yield* prev;
	}
}

function* noop() {}
```

源码比较简单，其实就是`compose([f1, f2, ..., fn])`转化为`fn(...f2(f1(noop())))`，最终的返回值是一个generator function。同时也可以看出，在koa的`yield next`中，`next`是一个generator。

下面用`compose`来对上面的例子进行改写：

```javascript
function* f1(next) {
	console.log('f1: pre next');
	yield next;
	console.log('f1: post next');
}

function* f2(next) {
	console.log('  f2: pre next');
	yield next;
	console.log('  f2: post next');
}

function* f3(next) {
	console.log('    f3: pre next');
	yield next;
	console.log('    f3: post next');
}

var compose = require('koa-compose');

var g = compose([f1, f2, f3])();
g.next();
g.next();
```

输出为：

```
f1: pre next
f1: post next
```

会发现，与上面的输出结果并无区别。看来重点是在`co.wrap()`中。

### 四、co

[co](https://github.com/tj/co)的介绍及部分源码分析在阮一峰老师的[《co 函数库的含义和用法》](http://www.ruanyifeng.com/blog/2015/05/co.html)已经有比较详细的介绍。

关键的一个函数是：

```javascript
function toPromise(obj) {
	if (!obj) return obj;
	if (isPromise(obj)) return obj;
	if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
	if ('function' == typeof obj) return thunkToPromise.call(this, obj);
	if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
	if (isObject(obj)) return objectToPromise.call(this, obj);
	return obj;
}
```

其中：

```javascript
if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
```

因此，当`yield`的返回值是一个generator function或者generator的时候，会调用`co()`来执行它。因此对于上面的例子改写如下：

```javascript
function* f1(next) {
	console.log('f1: pre next');
	yield next;
	console.log('f1: post next');
}

function* f2(next) {
	console.log('  f2: pre next');
	yield next;
	console.log('  f2: post next');
}

function* f3(next) {
	console.log('    f3: pre next');
	yield next;
	console.log('    f3: post next');
}

function* noop() {}

var compose = require('koa-compose');
var co = require('co');

co(compose([f1, f2, f3]));
```

此时即为正确输出。