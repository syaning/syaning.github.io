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

### 2. bindJQuery

该方法主要是绑定jQuery，简化后的代码如下：

```javascript
var bindJQueryFired = false;

function bindJQuery() {
    if (bindJQueryFired) {
        return;
    }

    var jqName = jq();
    jQuery = window.jQuery;
    if (isDefined(jqName)) {
        jQuery = jqName === null ? undefined : window[jqName];
    }

    if (jQuery && jQuery.fn.on) {
        jqLite = jQuery;
        // ... ...
    } else {
        jqLite = JQLite;
    }

    angular.element = jqLite;
    bindJQueryFired = true;
}
```

- `bindJQueryFired`相当于是一个标志符，初始值为`false`。在执行`bindJQuery`的时候，先判断`bindJQueryFired`的值，如果其为`true`，则说明已经执行过jQuery绑定，直接返回；否则执行绑定过程，并将`bindJQueryFired`的值设置为`true`;
- `jqName`是调用`jq()`的返回值，`jq()`的主要作用是遍历文档，找出第一个包含属性`ng-jq`的节点，然后取其属性值；
- 变量`jQuery`取值为`window.jQuery`，如果加载了jQuery函数库，则其值非空；
- 在应用了`ng-jq`指令的情况下，如果`jQName`的值不为`null`，则设置变量`jQuery`的值为`window[jqName]`，否则设置为`undefined`
- 如果`jQuery`变量有效，则使用`jQuery`变量指定的库；否则使用内置实现的`JQLite`。

总结起来，绑定的jQuery可以的来源有三个：`ng-jq`指定、引入的jQuery库、内置实现的JQLite，其使用流程为：

- 如果有`ng-jq`
    - 如果`ng-jq`的值不为空，则使用它指定的库
    - 如果`ng-jq`指定的值为空，则变量`jQuery`的值为`undefined`，此时强制使用JQLite，无论是否引入了jQuery库
- 如果没有`ng-jq`
    - 如果引入了jQuery库，则使用它
    - 如果没有引入jQuery库，则使用JQLite

