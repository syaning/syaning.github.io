---
layout: post
title:  AngularJS深入(4)——模块加载
date:   2015-07-19 15:00:00
---

在AngularJS模块化和依赖注入的基础上，来分析模块加载的详细过程。以如下代码为例：

```html
<div id="app1" ng-app="MyModule">
	<div ng-controller="ctrl"></div>
</div>
<script>
	angular.module('MyModule', [])
		.controller('ctrl', ['$scope', function($scope) {}]);
</script>
```

这里定义了一个叫做`MyModule`的模块。接下来进行分析AngularJS在启动加载的整个过程中各个模块是如何加载的。

### 1. ng模块的注册

通过第一篇的分析，可以知道，AngularJS的加载过程是：

1. `bindJQuery`
2. `publishExternalAPI`
	- 为`angular`对象扩展工具方法
	- 定义`angular.module`方法
	- 注册`ngLocale`和`ng`模块
3. `angularInit`
	- 找到`ng-app`
	- 调用`bootstrap`

其中注册`ng`模块的代码结构如下：

```javascript
angularModule('ng', ['ngLocale'], ['$provide',
    function ngModule($provide) {
    	// ... ...
    }
]);
```

通过`angular.module('ng')`进行查看，可以发现`ng`模块的结构如下：

```javascript
{
    _invokeQueue: [],
    _configBlocks: [
        ['$injector', 'invoke', [
            ['$provide', function ngModule($provide) {}]
        ]]
    ],
    _runBlocks: [],
    requires: ['ngLocale'],
    name: 'ng',
    // ... ...
}
```

### 2. MyModule模块

通过`angular.module('MyModule')`进行查看，可以看到`MyModule`模块的结构如下：

```javascript
{
    _invokeQueue: [
        ['$controllerProvider', 'register', ['ctrl', ['$scope', function($scope) {}]]]
    ],
    _configBlocks: [],
    _runBlocks: [],
    requires: [],
    name: 'MyModule',
    // ... ...
}
```

### 3. bootstrap

在`angularInit`被调用的时候，会找到`ng-app="MyModule"`的元素，然后调用`bootstrap(appElement, ['MyModule'], {})`。在函数`bootstrap`的源码中，有如下代码：

```javascript
modules = modules || [];
modules.unshift(['$provide', function($provide) {
    $provide.value('$rootElement', element);
}]);

if (config.debugInfoEnabled) {
    // Pushing so that this overrides `debugInfoEnabled` setting defined in user's `modules`.
    modules.push(['$compileProvider', function($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
    }]);
}

modules.unshift('ng');
var injector = createInjector(modules, config.strictDi);
injector.invoke(['$rootScope', '$rootElement', '$compile', '$injector',
    function bootstrapApply(scope, element, compile, injector) {
        scope.$apply(function() {
            element.data('$injector', injector);
            compile(element)(scope);
        });
    }
]);
```

因此，在接下来调用`createInjector`的时候，参数中的`modules`为：

```javascript
['ng', ['$provide', function($provide) {
	$provide.value('$rootElement', element);
}], 'MyModule']
```

即是一个数组，表示三个模块。接下来在函数`createInjector`中，会使用内部函数`loadModules`依次加载这三个模块。

### 4. ng模块的加载