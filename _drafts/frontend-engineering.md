---
layout: post
title:  前端工程化的一些思考
date:   2015-10-15
---

参考文章：
- [Web 研发模式演变](https://github.com/lifesinger/lifesinger.github.io/issues/184)
- [前端MV*框架的意义](http://www.ituring.com.cn/article/59237)
- [2015前端组件化框架之路](http://div.io/topic/908)

### 1. 前端开发模式的变迁

近几年来，前端开发迅速发展，也越来越向着工程化的方向迈进。在了解前端工程化之前，有必要先回顾一下前端开发模式的变迁。

**（1）纯静态阶段**

这是最简单的开发模式，即只有静态内容的展示，没有数据库，也不需要与后台有任何交互。这种情况下通常有着如下的项目结构：

```
/--css
   /--a.css
   /--b.css
/--js
   /--c.js
   /--d.js
/--index.html
```

页面内容也通常如下，即一次性加载所有的脚本和样式：

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="css/a.css">
	<link rel="stylesheet" href="css/b.css">
	<script src="js/c.js"></script>
	<script src="js/d.js"></script>
</head>
<body>
	<!-- content -->
</body>
</html>
```

这种模式是最简单粗暴的，复杂度最低。但是其适用场景非常有限，通常来说，只适合做一些Demo展示，或者非常简单的项目。

**（2）混乱的前后端**

通常来说，大部分的Web项目都会需要数据库，涉及到与后台的交互。在这种情况下，静态页面已经无法胜任，于是通过JSP等方式来完成后台数据的获取。在该阶段，项目的目录结构通常为如下形式：

```
/--css
   /--...
/--js
   /--...
/--index.jsp
/--somePage.jsp
```

JSP允许在HTML代码中嵌入Java代码，非常强大，但是使用起来也很混乱。在大多数情况下，不可避免地，JSP页面中会涉及到一部分的业务逻辑。因此在该阶段，前后端的界限就比较模糊，前端开发也处于一个非常尴尬的地位。

**（3）后端MVC**

随着技术的不断发展，后端进入了MVC阶段，从而实现数据模型、视图和控制器的分离。比较知名的框架例如[Struts](https://struts.apache.org/)，[SpringMVC](http://docs.spring.io/spring-framework/docs/current/spring-framework-reference/html/mvc.html)等。可以注意到，在之前的两个阶段，用户访问的URL地址是比较依赖于物理文件的。而在这一阶段，用户可以比较方便灵活地定义路由了。

较上一阶段，前后端的界限相对明确了许多。在该阶段，前端通常是通过[Velocity](http://velocity.apache.org/)、[Freemaker](http://freemarker.org/)等各种模板技术来实现MVC中的V部分。相对而言，此时前端开发可能涉及到的业务逻辑大大减少。但是对于前端开发而言，依然存在着很多不便。一是路由定义由后端来实现，而事实上前端才是路由敏感的；二是前端开发严重依赖于后端环境，不太容易进行独立开发。

**（4）Ajax与SPA**

随着Ajax的兴起，JavaScript在前端中的地位逐步提高，JS也不再仅仅是做页面特效了。同时，前端开发也逐渐开始摆脱“页面仔”的时代。可以注意到，在之前的两个阶段，使用的都是后端模板，页面还属于“后端渲染”，即DOM的拼接是由后端来完成的。而在这一阶段，可以通过一些前端模板技术来实现“前端渲染”。也就是说，前端写好模板，然后通过Ajax调接口拿数据（通常为JSON格式），然后在客户端将模板和数据结合起来进行渲染就可以了。

在这一阶段，前后端的职责更加分明，双方只需要定义好接口，然后就可以分离开来进行独立开发了。这种开发模式也带来了SPA（Single-Page Application）的兴起，前端可以通过hash来进行前端路由控制。至此，前端开发的地位终于开始提高。

在这种开发模式下，前端的代码量急剧增长，尤其是JavaScript。大量的JS脚本，就会产生以下问题：

- 容易出现命名冲突
- 由于脚本的同步加载，导致性能问题

为了解决第一个问题，出现了模块化解决方案；至于第二个问题，通过按需异步加载来解决，例如[RequireJS](http://requirejs.org/)。

**（5）前端MV*及Node时代**

随着项目规模的不断扩大，前端的代码复杂度越来越高。既然后端有MVC，前端也出现了一批的MV*解决方案，例如[Ember](http://emberjs.com/)，[knockout](http://knockoutjs.com/)，[AngularJS](https://angularjs.org/)等。至此，前端终于也可以谈架构了。

而随着[Node.js](https://nodejs.org/en/)的发展，前端开发再次得到迅速发展。通过使用Node来做中间层，前端可以做更多的事情，包括自有的路由定义，数据处理，模板，会话，cookie等。在这一阶段，前端实际上已经接手了部分服务器端的工作，对前端开发的要求也有显著提高。

同时在该阶段，前端开发也更加细粒度，更加规范。模块化，组件化，自动化。基于Node的各种各样的工具带来了很多便利，极大地提高了前端开发的效率。

### 2. 前端工程化涉及范畴

现在的前端开发，远非当年随便写写样式，脚本和页面的时代了。其涉及的范围非常广泛，从设计、交互，到编码、测试，以及网络通信，都会有所触及。在这里，仅仅讨论前端工程化所涉及的一些方面。大致列举如下：

- 库/框架选择
	- [bootstrap](http://getbootstrap.com/)
	- [jQuery](https://jquery.com/)
	- [AngularJS](https://angularjs.org/)
	- [React](https://facebook.github.io/react/)
- 依赖管理
	- [npm](https://www.npmjs.com/)
	- [bower](http://bower.io/)
- CSS处理（预处理，后处理）
	- [sass](http://sass-lang.com/)
	- [less](http://lesscss.org/)
	- [stylus](https://learnboost.github.io/stylus/)
	- [postcss](https://github.com/postcss/postcss)
- 代码质量检测
	- [jslint](http://www.jslint.com/)
	- [jshint](http://jshint.com/)
	- [eslint](http://eslint.org/)
- JavaScript模块化
	- [AMD](https://github.com/amdjs/amdjs-api)
	- [CommonJS Moudles](http://wiki.commonjs.org/wiki/Modules/1.1)
	- [ES6 Module](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-modules)
- 组件化
	- [Web Components](https://github.com/WebComponents/webcomponentsjs)
- 文件打包（合并、压缩等）
	- [clean-css](https://github.com/jakubpawlowicz/clean-css)
	- [UglifyJS](https://github.com/mishoo/UglifyJS)
	- [RequireJS](http://requirejs.org/)
	- [Browserify](http://browserify.org/)
	- [Webpack](https://webpack.github.io/)
- 测试
	- [karma](http://karma-runner.github.io/)
	- [mocha](https://mochajs.org/)
	- [jasmine](http://jasmine.github.io/)
	- [Protractor](https://angular.github.io/protractor/)
- 性能优化
	- [Best Practices for Speeding Up Your Web Site](https://developer.yahoo.com/performance/rules.html)
	- [Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=en)
- 任务管理
	- [grunt](http://gruntjs.com/)
	- [gulp](http://gulpjs.com/)