---
layout: post
title:  AngularJS深入(1)——加载启动
date:   2015-07-16 10:00:00 +0800
---

* TOC
{:toc}

本系列文章的分析基于[AngularJS](http://angularjs.org/) v1.4.2.

参考资料有：

- [AngularJS API Docs](https://docs.angularjs.org/api)
- [AngularJS Developer Guide](https://docs.angularjs.org/guide)
- [AngularJS实战](http://www.imooc.com/learn/156)
- [Service vs provider vs factory](http://stackoverflow.com/questions/15666048/service-vs-provider-vs-factory)

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

整体思路为：

- 首先是一些全局变量和方法的定义，以及一些其它操作；
- 通过`window.angular.bootstrap`判断是否已经加载angular，如果已经加载，则直接退出；
- 执行`bindJQuery()`，如果已经加载了jQuery，则AngularJS会使用已经加载的jQuery，否则使用内部实现的JQLite，其相当于是一个简化版的jQuery；
- 执行`publishExternalAPI(angular)`来为全局变量`angular`增加属性和方法，并建立起模块机制，注册核心模块；
- 在文档加载完成后执行`angularInit()`。

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

### 3. publishExternalAPI

该方法的代码简化如下：

```javascript
function publishExternalAPI(angular) {
    extend(angular, {
        // ... ...
    });

    angularModule = setupModuleLoader(window);
    try {
        angularModule('ngLocale');
    } catch (e) {
        angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
    }

    angularModule('ng', ['ngLocale'], ['$provide',
        function ngModule($provide) {
            // ... ...
        }
    ]);
}
```

主要功能为：

- 对`angular`对象进行扩展；
- 执行`setupModuleLoader(window)`，该方法主要是定义了`angular.module`方法，用于注册及获取模块；`angular.module`只有一个参数的时候为获取模块，否则为注册模块；
- 如果没有注册`ngLocal`模块，则对其进行注册；
- 注册`ng`模块，也就是AngularJS的核心模块。

### 4. angularInit

该方法的主要作用是启动Angular应用。相关代码为：

```javascript
var ngAttrPrefixes = ['ng-', 'data-ng-', 'ng:', 'x-ng-'];

function getNgAttribute(element, ngAttr) {
    var attr, i, ii = ngAttrPrefixes.length;
    for (i = 0; i < ii; ++i) {
        attr = ngAttrPrefixes[i] + ngAttr;
        if (isString(attr = element.getAttribute(attr))) {
            return attr;
        }
    }
    return null;
}

function angularInit(element, bootstrap) {
    var appElement,
        module,
        config = {};

    // The element `element` has priority over any other element
    forEach(ngAttrPrefixes, function(prefix) {
        var name = prefix + 'app';

        if (!appElement && element.hasAttribute && element.hasAttribute(name)) {
            appElement = element;
            module = element.getAttribute(name);
        }
    });
    forEach(ngAttrPrefixes, function(prefix) {
        var name = prefix + 'app';
        var candidate;

        if (!appElement && (candidate = element.querySelector('[' + name.replace(':', '\\:') + ']'))) {
            appElement = candidate;
            module = candidate.getAttribute(name);
        }
    });
    if (appElement) {
        config.strictDi = getNgAttribute(appElement, "strict-di") !== null;
        bootstrap(appElement, module ? [module] : [], config);
    }
}
```

需要说明的是，AngularJS支持的属性前缀有多种，包括`ng-`、`data-ng`、`ng:`和`x-ng-`。

- 首先对`element`进行检测，看它是否有`ng-app`等属性，如果有则设定`appElement`和`module`；
- 如果`element`元素没有`ng-app`等属性，则对其后继元素进行查找，找到第一个有`ng-app`等属性的元素，从而设定`appElement`和`module`;
- 如果`appElement`不为空，即找到了应用的入口元素，则执行`bootstrap`。

需要注意的是，如果有多个元素都有`ng-app`属性，则只会找到第一个并启动它，而后面的应用则不会自动启动。

### 5. 应用启动

应用的启动方式主要包括自动启动和手动启动。

（1）自动启动

例如：

```html
<div ng-app="MyModule">
    <div ng-controller="ctrl">
        {{ name }}
    </div>
</div>
<script>
    var myModule = angular.module('MyModule', []);
    myModule.controller('ctrl', ['$scope', function($scope) {
        $scope.name = 'alex';
    }]);
</script>
```

在这个例子中，对于最外层的`div`设置了`ng-app`属性，因此会自动启动应用。

（2）手动启动

例如：

```html
<div>
    <div ng-controller="ctrl">
        {{ name }}
    </div>
</div>
<script>
    var myModule = angular.module('MyModule', []);
    myModule.controller('ctrl', ['$scope', function($scope) {
        $scope.name = 'alex';
    }]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['MyModule']);
    });
</script>
```

由于没有设置`ng-app`，因此需要通过`angular.bootstrap`来手动启动应用。

（3）多个应用的启动

一般情况下，一个页面中只有一个应用，但是一个页面上多个应用也是可以共存的。通过上面对源码的分析，可以知道，只有第一个应用会自动启动，因此其余的应用需要手动来启动，例如：

```html
<div id="app1" ng-app="MyModule1">
    <div ng-controller="ctrl1">
        {{ name }}
    </div>
</div>
<div id="app2" ng-app="MyModule2">
    <div ng-controller="ctrl2">
        {{ greeting }}
    </div>
</div>
<script>
    var myModule1 = angular.module('MyModule1', []);
    myModule1.controller('ctrl1', ['$scope', function($scope) {
        $scope.name = 'alex';
    }]);

    var myModule2 = angular.module('MyModule2', []);
    myModule2.controller('ctrl2', ['$scope', function($scope) {
        $scope.greeting = 'hello';
    }]);

    angular.element(document).ready(function() {
        angular.bootstrap(document.getElementById('app2'), ['MyModule2']);
    });
</script>
```