---
layout: post
title:  使用gulp进行React任务的构建
date:   2015-11-09 12:00:00 +0800
---

> 例子中的React版本为[v0.14.2](https://github.com/facebook/react/tree/v0.14.2).

示例目录结构如下：

```
- libs/
    - react/
- node_modules/
- src/
    - main.js
- gulpfile.js
- index.html
- bundle.js
- package.json
```

其中，`index.html`代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="example"></div>
	<script src="bundle.js"></script>
</body>
</html>
```

`src/main.js`代码如下：

```javascript
let React = require('react');
let ReactDOM = require('react-dom');

ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.getElementById('example')
);
```

在这里，选择使用[browserify](http://browserify.org/)进行打包，[gulp](http://gulpjs.com/)进行任务构建。由于使用了[ES2015](http://www.ecma-international.org/ecma-262/6.0/)和[JSX](https://facebook.github.io/jsx/)语法，因此使用[Babel](https://babeljs.io/)进行转换。

首先安装依赖：

```
npm install --save react react-dom
npm install --save-dev gulp browserify babelify vinyl-source-stream
```

然后`gulpfile.js`代码为：

```javascript
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('script:build', function() {
	browserify('src/main.js')
		.transform(babelify, {
			presets: ['es2015', 'react']
		})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['script:build']);
```

但此时执行会报错，因为`babelify`需要安装相应的[preset](http://babeljs.io/docs/plugins/)，因此在这里需要：

```
npm install --save-dev babel-preset-es2015 babel-preset-react
```

然后执行`gulp`即可。

此时会将`react`和`react-dom`一起打包到`bundle.js`中。

如果不希望将外部依赖打包进来，即此时`index.html`中加入如下代码：

```html
<script src="libs/react/react.min.js"></script>
<script src="libs/react/react-dom.min.js"></script>
```

此时需要安装`browserify-shim`，即

```
npm install --save-dev browserify-shim
```

然后在`package.json`中配置：

```
"browserify-shim": {
    "react": "global:React",
    "react-dom": "global:ReactDOM"
}
```

此时`gulpfile.js`代码为：

```javascript
var gulp = require('gulp');
var browserify = require('browserify');
var shim = require('browserify-shim');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('script:build', function() {
	browserify('src/main.js')
		.transform(babelify, {
			presets: ['es2015', 'react']
		})
		.transform(shim)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['script:build']);
```

与之前相比，多了一句`.transform(shim)`。