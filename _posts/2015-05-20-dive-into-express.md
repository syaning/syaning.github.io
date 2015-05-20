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

TBD