---
layout: post
title:  webpack入门教程
date:   2015-08-15 21:00:00 +0800
---

* TOC
{:toc}

> 注：本文内容比较基础，供初学者快速入门参考。
>
> 更多详细信息请参考[官方文档](http://webpack.github.io/docs/)。 

### 1. 安装

```
npm install -g webpack
```

### 2. 基本使用

假设项目文件结构如下：

```
/app
  |--index.html
  |--main.js
  |--mymodule.js
```

`index.html`代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<script src="./app.js"></script>
</body>
</html>
```

`main.js`和`mymodule.js`代码如下：

```javascript
// main.js
require('./mymodule.js')();

// mymodule.js
module.exports = function() {
	document.write('hello webpack');
};
```

然后执行命令：

```
webpack main.js app.js
```

会打包生成`app.js`文件。

### 3. 配置文件

每次手动输入源文件名和输出文件名比较麻烦，可以使用配置文件来进行管理。在`app`目录下新建`webpack.config.js`文件，内容如下：

```javascript
module.exports = {
	entry: './main.js',
	output: {
		filename: 'app.js'
	}
};
```

然后执行

```
webpack
```

就会自动生成打包好的文件了。

但是这样每次改了源文件之后都需要手动执行命令，可以通过添加`watch`来自动检测文件变化并重新打包。配置文件修改如下：

```javascript
module.exports = {
	entry: './main.js',
	output: {
		filename: 'app.js'
	},
	watch: true
};
```

配置文件中可以进行其它各种功能的相关配置，详情可以参看[官方文档](http://webpack.github.io/docs/configuration.html)。

### 4. 使用loader

很多模块打包工具只是针对js文件，而webpack的强大之处在于将模块的概念进行了扩展，认为一切静态文件都是模块，包括css、html模板、字体、CoffeeScript等等。虽然webpack本身依然是只能够处理js文件，但是通过一系列的loader，就可以处理其它文件了。

下面以`css-loader`和`style-loader`为例，演示如何打包样式文件。首先执行如下命令安装依赖模块：

```
npm install css-loader style-loader --save-dev
```

然后在`app`目录下新建`style.css`文件，内容如下：

```css
body {
	background: red;
}
```

然后修改`main.js`如下：

```javascript
require('./mymodule.js')();
require('style!css!./style.css');
```

因为webpack不能够直接处理css文件，因此在`require`语句中需要指明需要的loader，一个文件可以经由多个loader依次处理，loader与loader之间，以及loader与文件名之间用`!`分隔。在这个例子中，也可以看出，如果使用了多个loader的话，数据流向是从右向左的，也就是从`style.css`开始，依次经过`css-loader`和`style-loader`。

但是假如有多个css文件的话，每个`require`语句都需要加上loader说明，很不方便，因此可以在`webpack.config.js`文件中进行配置，配置如下：

```javascript
module: {
	loaders: [{
		test: /\.css$/,
		loader: 'style!css'
	}]
}

// or

module: {
	loaders: [{
		test: /\.css$/,
		loaders: ['style', 'css']
	}]
}
```

关于loader的更多信息，可以参考：

- [Using Loaders](http://webpack.github.io/docs/using-loaders.html)
- [Loaders](http://webpack.github.io/docs/loaders.html)
- [How to write a loader](http://webpack.github.io/docs/how-to-write-a-loader.html)

### 5. 外部依赖

现在假如该例子中需要用到angular，首先在`index.html`中通过`<script>`标签引入angular库，然后修改`mymodule.js`如下：

```javascript
var angular = require('angular');
angular.module('MyModule', []);
```

此时如果执行`webpack`命令会报如下错误：

```
ERROR in ./mymodule.js
Module not found: Error: Cannot resolve module 'angular' in /xxx/xxx/app
 @ ./mymodule.js 1:14-32
```

这是因为webpack无法解析angular依赖模块，此时需要在配置文件中对外部依赖进行配置：

```javascript
externals: {
	'angular': true
}
```

更多信息参考[configuration#externals](http://webpack.github.io/docs/configuration.html#externals)。

### 6. 输出类型

现在假如我们希望打包后的文件作为一个单独的库，并且遵循AMD规范可以被被requirejs来使用，可以修改配置文件如下：

```javascript
output: {
	filename: 'app.js',
	library: 'app',
	libraryTarget: 'amd'
}
```

此时输出的`app.js`结构如下：

```javascript
define("app", ["angular"], function( /* ... */ ) {
	/* ... */
});
```

通过配置`output.libraryTarget`，可以自定义输出的模块类型，包括AMD，CommonJS，变量等多种输出类型。具体可以参考[configuration#output](http://webpack.github.io/docs/configuration.html#output)。

### 7. 多文件

现在假如项目目录结构如下：

```
/app
  |--components.js
  |--index.html
  |--main.js
  |--mymodule.js
```

其中`mymodule.js`被`main.js`和`components.js`所使用。假如我们希望`main.js`输出为`app.js`，而`components`输出为`app.components.js`，则可以修改配置文件如下：

```javascript
entry: {
	app: './main.js',
	'app.coomponents': './components.js'
},
output: {
	filename: '[name].js'
}
```

更多信息参考：

- [Multiple entry points](http://webpack.github.io/docs/multiple-entry-points.html)
- [configuration#entry](http://webpack.github.io/docs/configuration.html#entry)
- [Code Splitting](http://webpack.github.io/docs/code-splitting.html#multiple-entry-chunks)