---
layout: post
title:  深入理解Express
date:   2015-05-20 22:00:00
---

本文主要通过是对[Express](http://expressjs.com/)的一个较为深入的分析，至于对Express的源码分析，在我的[Github](https://github.com/syaning/understanding-express)上。本文的分析基于Express 4.12.3.

### 1. 理解app

在使用Express的时候，我们通过如下方式创建一个应用：

```javascript
var express = require('express');
var app = express();

app.listen(3000);
```

而在不使用框架的时候，通常的做法是：

```javascript
var http = require('http');

http.createServer(function(req, res) {
        res.write('hello world');
        res.end();
    })
    .listen(8000);
```

通过查看源码，可以发现，`express`实际上就是一个工厂函数，用来创建`app`，而`app`则就是`createServer`的回调函数。相关源码如下：

```javascript
// in express.js
function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  // ... ...
  
  return app;
}

// in application.js
app.listen = function(){
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

因此，在使用Express的时候，事实上，所有的请求都是交给`app`，通过app.handle`来处理了。

通过分析application.js的源码，可以归纳出，`app`主要有如下属性和方法：

- `settings`，{}，主要是一些设置信息，相关方法有：
    - `set(setting, value)`，有`value`的时候进行设置，无`value`的时候进行获取
    - `get(setting)`
    - `enabled(setting)`
    - `disabled(setting)`
    - `enable(setting)`
    - `disable(setting)`
- `cache`，{}
- `engines`，{}，设置模版引擎，相关方法有：
    - `engine(ext, fn)`
- `locals`，{}
- `mountpath`，字符串，相关方法有：
    - `use(path, app)`，会设置`app`的`mountpath`的值
    - `path()`，获取应用的绝对路径值
- `_router`，Router对象，相关方法有（由于参数可以有多种形式，因此并未列出参数）：
    - `route()`，创建一条路由，会调用`Router.route`
    - `METHOD()`，创建一条路由，并调用VERB方法，会调用`Router.route`
    - `all()`，创建一条路由，并调用所有的VERB方法，会调用`Router.route`
    - `param()`，会调用`Router.param`
    - `use()`，会调用`Router.use`