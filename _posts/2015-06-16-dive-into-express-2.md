---
layout: post
title:  深入理解Express(2)
date:   2015-06-16 14:40:00 +0800
---

* TOC
{:toc}

### 5. 中间件

在Express中，中间件（Middleware）是一个非常重要的概念。总的来说，中间件就是一个函数，用来处理请求和响应。Express应用事实上就是一个个的中间件的组合。大体上，中间件可以分为路由中间件和非路由中间件，两者主要区别如下：

- 非路由中间件主要通过`app.use(path, fn)`方式添加，而路由中间件主要通过`app.VERB(path, fn)`或`app.route(path)`方式添加
- 非路由中间件是匹配所有以`path`开始的请求，而路由中间件是精确匹配`path`。例如`app.use('/user', foo)`将会匹配所有路径以`/user`开始的请求，而`app.get('/user', bar)`则仅仅匹配路径是`/user`的请求。造成这一区别的主要是在构造`Layer`对象的时候，`options.end`取值不同，对于非路由中间件，其值为`false`，对于路由中间件，其值为`true`

对于非路由中间件，也可以再次进行分类，主要有如下几种：

- 普通中间件
- 二级路由
- 子应用

#### （1）普通中间件

普通中间件就是一个普通的函数，例如：

```javascript
app.use('/user', function(req, res, next) {
	console.log('hello user');
	next();
});
```

#### （2）二级路由

二级路由也就是将一个`Router`对象作为中间件。随着应用规模的增长，可能需要配置多条路由，那么就会有很多条`app.VERB`语句，此时将路由配置相关代码分离出来作为一个单独的模块则会更好一些，例如：

```
var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);
```

而在users模块中，代码为：

```javascript
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
```

这个例子也就是使用了二级路由。我们知道，中间件需要是一个函数，而且该函数的参数形式为`(req, res, next)`形式。Express在设计上很巧妙的一点就是，`Router`本身就是一个函数，其形式为：

```javascript
// 源码在router/index.js中
function router(req, res, next) {
	router.handle(req, res, next);
}
```

一个`Router`对象，在作为中间件容器和作为二级路由的时候，其调用方式也是存在着一定的差异的：

- 如果是作为中间件容器，那么在调用`app.handle()`的时候，会显式地调用`router.handle()`
- 如果是作为二级路由，则它本身就是作为中间件而存在的，会在`layer.handle_request()`的时候，调用`router()`，从而调用`router.handle()`

#### （3）子应用

一个Express应用也可以作为一个中间件，例如：

```javascript
var subApp = express();
app.use(subApp);
```