---
layout: post
title:  AngularJS深入(1)——加载启动
date:   2015-07-16 10:00:00
---

本系列文章的分析基于[AngularJS](http://angularjs.org/) v1.4.2.

参考资料有：

- [AngularJS实战](http://www.imooc.com/learn/156)

### 1. 整体结构

AngularJS的源码在整体上，与其它很多库和框架一样，是一个自执行函数，其整体结构简化如下：

```javascript
(function(window, document, undefined) {
	// define variables and functions
	// and do some operations

	if (window.angular.bootstrap) {
		console.log('WARNING: Tried to load angular more than once.');
		return;
	}

	bindJQuery();

	publishExternalAPI(angular);

	jqLite(document).ready(function() {
		angularInit(document, bootstrap);
	});
})(window, document);
```

1. 首先是一些全局变量和方法的定义，以及一些其它操作；
2. 通过`window.angular.bootstrap`判断是否已经加载angular，如果已经加载，则直接退出；
3. 执行`bindJQuery()`，如果已经加载了jQuery，则AngularJS会使用已经加载的jQuery，否则使用内部实现的JQLite，其相当于是一个简化版的jQuery；
4. 在文档加载完成后执行`angularInit()`。
