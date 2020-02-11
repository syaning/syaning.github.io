---
layout: post
title:  AngularJS深入(4)——模块加载
date:   2015-07-19 15:00:00 +0800
---

* TOC
{:toc}

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

在加载`ng`模块的时候，会进入到`loadModules`方法的如下选择语句中：

```javascript
if (isString(module)) {
    moduleFn = angularModule(module);
    runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
    runInvokeQueue(moduleFn._invokeQueue);
    runInvokeQueue(moduleFn._configBlocks);
}
```

由于`ng`模块依赖于`ngLocale`模块，因此会先调用`loadModules(['ngLocale'])`加载`ngLocale`模块。

（1）加载ngLocale模块

`ngLocale`模块的定义在`publishExternalAPI`方法中，源码如下：

```javascript
angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
```

因此，该模块的结构为：

```javascript
{
    _invokeQueue: [
        ['$provide', 'provider', ['$locale', function $LocaleProvider() {}]]
    ],
    _configBlocks: [],
    _runBlocks: [],
    requires: [],
    name: 'ngLocale',
    // ... ...
}
```

在加载`ngLocale`模块的时候，会执行`runInvokeQueue(moduleFn._invokeQueue)`，从而调用：

```javascript
providerInjector.get('$provide')
    .provider('$locale', function $LocaleProvider() {});

// 也就是

providerCache.$provide
    .provider('$locale', function $LocaleProvider() {});
```

其作用也就是创建了一个`$LocaleProvider`的实例，并将其缓存在`providerCache.$localeProvider`上。

（2）加载ng模块

接下来加载`ng`模块，注册`ng`模块的源码为：

```javascript
angularModule('ng', ['ngLocale'], ['$provide',
    function ngModule($provide) {
        // $$sanitizeUriProvider needs to be before $compileProvider as it is used by it.
        $provide.provider({
            $$sanitizeUri: $$SanitizeUriProvider
        });
        $provide.provider('$compile', $CompileProvider).
        directive({
            a: htmlAnchorDirective,
            input: inputDirective,
            textarea: inputDirective,
            form: formDirective,
            // other directives ...
        }).
        directive({
            ngInclude: ngIncludeFillContentDirective
        }).
        directive(ngAttributeAliasDirectives).
        directive(ngEventDirectives);
        $provide.provider({
            $anchorScroll: $AnchorScrollProvider,
            $animate: $AnimateProvider,
            $$animateQueue: $$CoreAnimateQueueProvider,
            $$AnimateRunner: $$CoreAnimateRunnerProvider,
            // other providers ...
        });
    }
]);
```

`ng`模块的结构在之前已经说明，因此会调用：

```javascript
providerInjector.get('$injector')
    .invoke(['$provide', function ngModule($provide) {}]);

// 也就是

providerInjector.invoke(['$provide', function ngModule($provide) {}]);

// 即执行

ngModule(providerCache.$provide);
```

因此，加载`ng`模块的过程，实际上也就是初始化一系列Provider的过程。到此为止，已经将一系列的Provider缓存在`providerCache`中。

### 5. MyModule模块的加载

加载`MyModule`模块的时候，实际上就是执行：

```javascript
providerInjector.get('$controllerProvider')
    .register('ctrl', ['$scope', function($scope) {}]);
```

由于在加载`ng`模块的时候已经将`$controllerProvider`挂载到`providerCache`上了，因此这里就是直接调用其`register`方法来注册控制器。