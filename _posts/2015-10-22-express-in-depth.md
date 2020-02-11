---
layout: post
title:  Express深入解读
date:   2015-10-22 12:00:00 +0800
---

* TOC
{:toc}

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
app.get('/user', function(req, res) {});

// app.all --> router.route --> route.METHOD
app.all('/user', function(req, res) {});

// app.route --> router.route --> route.METHOD
app.route('/user')
	.get(function(req, res) {})
	.post(function(req, res) {});

// router.METHOD/all --> router.route --> route.METHOD/all
router.get('/user', function(req, res) {});
```

可以看到，无论是哪一种方法添加路由中间件，都需要通过`router.route()`来创建一条新的路由，然后调用`route.METHOD()/all()`来注册相关的处理函数。因此，首先需要了解Route（源码在`router/route.js`）对象。

Route可以简单理解为存放路由处理函数的容器，它也有一个`stack`属性，为一个数组，其中的每一项也是一个Layer对象，是对路由处理函数的包装。下面来看当执行`router.route()`的时候发生了什么：

```javascript
// in router/index.j
proto.route = function route(path) {
	var route = new Route(path);

	var layer = new Layer(path, {
		sensitive: this.caseSensitive,
		strict: this.strict,
		end: true
	}, route.dispatch.bind(route));

	layer.route = route;

	this.stack.push(layer);
	return route;
};
```

也就是说，当调用`router.route()`的时候，实际上是新建了一个`layer`放在`router.stack`中；并设置`layer.route`为新建的Route对象。

下面来看`route.METHOD`的时候发生了什么：

```javascript
// in router/route.js
var layer = Layer('/', {}, handle);
layer.method = method;

this.methods[method] = true;
this.stack.push(layer);
```

即，当调用`route.METHOD()`的时候，新建一个`layer`放在`route.stack`中。

通过上面的分析可以发现，Router其实是一个二维的结构。例如，一个可能的`router.stack`结构如下所示：

```
----------------
|    layer1    |
----------------
        ↓
---------------- layer2.route.stack  ------------   ------------   ------------
|    layer2    | ------------------> | layer2-1 |-->| layer2-2 |-->| layer2-3 |
----------------                     ------------   ------------   ------------
        ↓
---------------- layer3.route.stack  ------------   ------------
|    layer3    | ------------------> | layer3-1 |-->| layer3-2 |
----------------                     ------------   ------------
        ↓
----------------
|    ......    |
----------------
        ↓
----------------
|    layerN    |
----------------
```

### 四、参数处理

在很多时候，路由中是带有参数的，尤其是Restful风格的API。例如`/user/name`，可能`name`是个动态的值，从而去数据库中查询出相关的用户。因此，在Router中，通常会涉及到参数的处理。

先看如下例子：

```javascript
app.get('/user/:name', function(req, res, next) {
	res.send(req.user);
});

app.param('name', function(req, res, next, val) {
	queryUser(val, function(err, user) {
		if (err) {
			return next(err);
		}
		req.user = user;
		next();
	});
});
```

通过`app.param()`可以注册参数处理函数，事实上，`app.param()`调用了`router.param()`。Router有一个`params`属性，其值是一个对象，用来存储参数的处理函数。例如，一个可能的`router.params`如下：

```javascript
{
	name: [processName, queryName],
	id: [queryId]
}
```

其中`processName`，`queryName`，`queryId`表示的都是函数，即通过`app.param()`或`router.param()`所注册的参数处理函数。

然后在处理客户端请求的时候，会使用相应的与处理函数对请求URL中的参数进行处理。

### 五、请求处理

前面所提到的，无论是添加中间件，还是参数处理函数，都是应用的构建过程。当应用构建好了之后，客户端发起请求，这个时候，应用就开始使用前面的中间件和参数处理函数，来处理客户端的请求。

前面提到，所有的请求，都是由`app.handle()`来处理的，通过看源码，可以发现，其实`app.handle()`是调用了`router.handle()`。`router.handle`的源码比较复杂，在[这里](https://github.com/syaning/understanding-express/blob/master/express/router/index.md#7-protohandle)有一个简单的分析。

当请求到来时，经过中间件的顺序大致如下所示：

```
        ↓
----------------
|    layer1    |
----------------
        ↓
----------------
|    layer2    |
----------------
        ↓
---------------- layer3.route.stack  ------------   ------------   ------------
|    layer3    | ------------------> | layer3-1 |-->| layer3-2 |-->| layer3-3 | ---
----------------                     ------------   ------------   ------------   |
                                                                                  |
        ---------------------------------------------------------------------------
        ↓
---------------- layer4.route.stack  ------------   ------------
|    layer4    | ------------------> | layer4-1 |-->| layer4-2 | ---
----------------                     ------------   ------------   |
                                                                   |
        ------------------------------------------------------------
        ↓
----------------
|    ......    |
----------------
        ↓
----------------
|    layerN    |
----------------
        ↓
```

即，请求会依次经过各个中间件，如果是路由中间件，则会依次经过其中的各个路由函数。当请求到达一个中间件的时候，会进行如下判断：

```
                ↓
  No  --------------------
------|    path match    |
|     --------------------
|               ↓ Yes
|     --------------------  Yes  ---------------------  No
|     |     has route    |-------| http method match |------
|     --------------------       ---------------------     |
|               ↓ No                       | Yes           |
|     --------------------                 |               |
|     |  process params  |<-----------------               |    
|     --------------------                                 |
|               ↓                                          |
|     --------------------                                 |
|     | execute function |                                 |
|     --------------------                                 |
|               ↓                                          |
|     --------------------                                 |
----->|    next layer    |<---------------------------------
      --------------------
                ↓
```

- 首先判断路径是否匹配，如果路径不匹配，则直接跳过该中间件
- 然后判断是否为路由中间件，如果不是，即如果是普通的中间件，则进行参数处理，并执行中间件函数
- 如果是路由中间件，则判断HTTP请求方法是否匹配，如果匹配，则进行参数处理，并执行中间件函数（该中间件函数实际上是`route.dispatch()`）；否则跳过该中间件

会发现，如果有多个中间件匹配的话，在每个中间件函数执行之前，都有一个参数处理的过程，那么，参数与处理函数会不会被多次执行呢？事实上，在`router.handle()`的时候，针对参数的处理，引入了缓存机制，因此，每个参数的处理函数只会执行一次，并将结果保存在缓存中。在处理同一个请求的过程中，如果需要处理某个参数，会首先检查缓存，如果缓存中不存在，才会执行其处理函数。

### 六、内置中间件

在初始化`app._router`的时候，就加载了`middleware/query.js`和`middleware/init.js`这两个中间件：

```javascript
// in application.js
app.lazyrouter = function lazyrouter() {
	if (!this._router) {
		this._router = new Router({
			caseSensitive: this.enabled('case sensitive routing'),
			strict: this.enabled('strict routing')
		});

		this._router.use(query(this.get('query parser fn')));
		this._router.use(middleware.init(this));
	}
};
```

第一个中间件的作用主要是解析URL query。`query(this.get('query parser fn'))`的作用是设置URL query的解析器，并返回相应的中间件函数。该部分代码比较简单，不做赘述。

第二个中间件的作用主要是将`req`和`res`分别暴露给对方，并且让它们分别继承自`app.request`和`app.response`。涉及到的相关源码为：

```javascript
// in middleware/init.js
exports.init = function(app) {
	return function expressInit(req, res, next) {
		// ... ...
		req.res = res;
		res.req = req;
		req.next = next;

		req.__proto__ = app.request;
		res.__proto__ = app.response;

		// ... ...
	};
};

// in express.js
function createApplication() {
	// ... ...

	app.request = { __proto__: req, app: app };
	app.response = { __proto__: res, app: app };

	// ... ...
}
```

因此，其实是让`req`和`res`分别继承自了`request.js`和`response.js`的导出对象，简单来说，就是对`req`和`res`进行了属性和方法的扩展。

另外，Express中还有一个内置的中间件，即`express.static`，它依赖的是[serve-static](https://github.com/expressjs/serve-static)模块，主要用于创建静态资源服务。

### 七、视图渲染

渲染模板使用的是`res.render()`，例如：

```javascript
app.get('/user', function(req, res) {
	res.render('user', { name: 'alex' });
});
```

其实，`res.render()`调用了`app.render()`。在`app.render()`中，先创建一个`view`对象（相关源码为`view.js`），然后调用`view.render()`。如果允许缓存，即`app.enabled('view cache')`的话，则会优先检查缓存，如果缓存中已有相关视图，则直接取出；否则才会新创建一个视图对象。

该部分比较简单，不做赘述。