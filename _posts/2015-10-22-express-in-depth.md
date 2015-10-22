---
layout: post
title:  Express深入解读
date:   2015-10-22
---

> 本文基于[Express 4.13.3](https://github.com/strongloop/express/tree/4.13.3)。

### 一、使用Express

通常情况下，创建一个简单的服务器，代码如下：

```javascript
var http = require('http');

http.createServer(function(req, res) {
		res.write('hello world');
		res.end();
	})
	.listen(4000);
```

如果使用Express，代码如下：

```javascript
var express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.write('hello world');
	res.end();
});

app.listen(4000);
```

为了对Express的运行机制有所深入了解，不可避免地需要研究部分源码。Express的主要源码结构如下：

```
- lib/
    - middleware/
        - init.js
        - query.js
    - router/
        - index.js
        - layer.js
        - route.js
    - application.js
    - express.js
    - request.js
    - response.js
    - utils.js
    - view.js
- index.js
```

首先，需要理解上面例子中的`express`和`app`是什么。部分相关源码如下：

```javascript
// in express.js
exports = module.exports = createApplication;

function createApplication() {
	var app = function(req, res, next) {
		app.handle(req, res, next);
	};

	// ... ...

	return app;
}

// in application.js
app.listen = function listen() {
	var server = http.createServer(this);
	return server.listen.apply(server, arguments);
};
```

可以看出，调用`express()`返回的`app`其实是一个函数，调用`app.listen()`其实执行的是`http.createServer(app).listen()`。因此，`app`其实就是一个请求处理函数，作为`http.createServer`的参数。而`express`其实是一个工厂函数，用来生成请求处理函数。

### 二、中间件

Express中一个非常核心的概念就是中间件（middleware）。在[官方文档](http://expressjs.com/guide/using-middleware.html)中，有这样一句话：

> An Express application is essentially a series of middleware calls.

也就是说，一个Express应用，从本质上来说，就是一系列中间件的调用。那么，中间件到底是什么呢？其实，一个中间件，就是一个函数。通常情况下，一个中间件函数的形式如下：

```javascript
function middlewareName(req, res, next) {
	// do something
}
```

如果是错误处理的中间件，形式如下：

```javascript
function middlewareName(err, req, res, next) {
	// do something
}
```

参数中，`req`和`res`分别表示请求的request和response，`next`本身也是一个函数，调用`next()`就会继续执行下一个中间件。其实，请求的处理过程大致如下，就是依次经过各个中间件。

```
       ↓
---------------
| middleware1 |
---------------
       ↓
---------------
| ... ... ... |
---------------
       ↓
---------------
| middlewareN |
---------------
       ↓
```

中间件大体上可以分为两种：普通中间件和路由中间件。注册普通中间件，通常是通过`app.use()`方法；而注册路由中间件，通常是通过`app.METHOD()`方法。例如：

```javascript
app.use('/user', function(req, res, next) {
	// do something
});

app.get('/user', function(req, res, next) {
	// do something
});
```

例子中的两者有以下区别：

- 前者匹配所有以`/user`开始的路径，而后者会精确匹配`/user`路径；
- 前者对于请求的方法没有限制，而后者只能处理方法为GET的请求。

在上面提到了如下源码：

```javascript
// in express.js
exports = module.exports = createApplication;

function createApplication() {
	var app = function(req, res, next) {
		app.handle(req, res, next);
	};

	// ... ...

	return app;
}
```

可以看到，所有的请求，其实都是由`app.handle()`来处理的。在了解请求处理的详细过程之前，需要先来了解Router。

### 三、Router

简单来说，Router（源码在`router/index.js`）就是一个中间件的容器。事实上，Router是Express中一个非常核心的东西，基本上就是一个简化版的Express框架。app的很多API，例如：`app.use()`，`app.param()`，`app.handle()`等，事实上都是对Router的API的一个简单包装。可以通过`app._router`来访问默认的Router对象。

Router对象有一个`stack`属性，为一个数组，存放着所有的中间件。当调用`app.use()`的时候，实际上是执行了`router.use()`，从而向`router.stack`数组中添加中间件。`router.stack`中的每一项是一个`Layer`（源码在`router/layer.js`）对象，它是对中间件函数的一个封装。添加中间件的部分相关源码如下：

```javascript
// in router/index.js, proto.use()
var layer = new Layer(path, {
	sensitive: this.caseSensitive,
	strict: false,
	end: false
}, fn);

layer.route = undefined;

this.stack.push(layer);
```

对于普通的中间件，添加过程就大致如此。不过，对于路由中间件，就稍微复杂了一些。在此之前，先来看一下添加路由中间件的几种方法：

```javascript
// app.METHOD --> router.route --> route.METHOD
app.get('/user', function(req, res) {
	// do something
});

// app.all --> router.route --> route.METHOD
app.all('/user', function(req, res) {
	// do something
});

// app.route --> router.route --> route.METHOD
app.route('/user')
	.get(function(req, res) {
		// do something
	})
	.post(function(req, res) {
		// do something
	});

// router.METHOD/all --> router.route --> route.METHOD/all
router.get('/user', function(req, res) {
	// do something
});
```

可以看到，无论是哪一种方法添加路由中间件，都需要通过`router.route()`来创建一条新的路由，然后调用`route.METHOD()/all()`来注册相关的处理函数。

TBD