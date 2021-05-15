---
layout: post
title:  AngularJS深入(2)——模块化
date:   2015-07-16 22:50:00 +0800
---

* TOC
{:toc}

### 1. setupModuleLoader

该方法主要用于设置模块加载器，源码比较长，并且使用了多层闭包。首先在该方法中，定义了一个非常有用的方法`ensure`，代码如下：

```javascript
function ensure(obj, name, factory) {
	return obj[name] || (obj[name] = factory());
}
```

很容易理解，当`obj`有`name`属性的时候，作为getter来使用，否则作为setter来使用。

然后可以将`setupModuleLoader`简化如下：

```javascript
function setupModuleLoader(window) {
	// ... ...
	return angular.module = (function() {
		var modules = {};
		return function module(name, requires, configFn) {
			return ensure(modules, name, function() {
				// ... ...
				var moduleInstance = {
					// ... ...
				};
				return moduleInstance;
			});
		}
	})();
}
```

但是这样依然不够直观清晰，接下来打破闭包，将代码继续简化调整如下：

```javascript
function setupModuleLoader(window) {
	var modules = {};

	angular.module = function module(name, requires, configFn) {
		if (modules[name]) {
			return modules[name];
		}

		var moduleInstance = {
			// ... ...
		};
		modules.name = moduleInstance;
		return moduleInstance;
	};

	return module;
}
```

到这里可以发现，该方法主要是为`angular`对象定义了`module`方法。接下来主要对`angular.module`方法进行分析。源码结构如下：

```javascript
function module(name, requires, configFn) {
	var assertNotHasOwnProperty = function(name, context) {
		if (name === 'hasOwnProperty') {
			throw ngMinErr('badname', 'hasOwnProperty is not a valid {0} name', context);
		}
	};

	assertNotHasOwnProperty(name, 'module');
	if (requires && modules.hasOwnProperty(name)) {
		modules[name] = null;
	}
	
	return ensure(modules, name, function() {
		// ... ...
	});
｝
```

首先是确保模块名不为`hasOwnProperty`，这是因为在接下来的判断语句中会调用`modules.hasOwnProperty`，如果模块名也为`hasOwnProperty`，就会出问题。接下来是一个判断，如果`requires`存在且`modules`已经有相应的模块，则重置其为`null`，这里也就是对同名模块的重新注册。

这里可以看到，如果通过`angular.module(name)`来调用，则会直接跳过判断语句，进入`ensure`，此时如果存在该模块，则直接返回`modules[name]`，在这种情况下，`angular.module`的作用相当于是一个getter。如果通过`angular.module(name, requires[, configFn])`来调用，则用作setter，来注册一个模块。

模块注册的代码如下：

```javascript
function() {
    var invokeQueue = [];
    var configBlocks = [];
    var runBlocks = [];
    var config = invokeLater('$injector', 'invoke', 'push', configBlocks);

    var moduleInstance = {
        _invokeQueue: invokeQueue,
        _configBlocks: configBlocks,
        _runBlocks: runBlocks,
        requires: requires,
        name: name,
        provider: invokeLaterAndSetModuleName('$provide', 'provider'),
        factory: invokeLaterAndSetModuleName('$provide', 'factory'),
        service: invokeLaterAndSetModuleName('$provide', 'service'),
        value: invokeLater('$provide', 'value'),
        constant: invokeLater('$provide', 'constant', 'unshift'),
        decorator: invokeLaterAndSetModuleName('$provide', 'decorator'),
        animation: invokeLaterAndSetModuleName('$animateProvider', 'register'),
        filter: invokeLaterAndSetModuleName('$filterProvider', 'register'),
        controller: invokeLaterAndSetModuleName('$controllerProvider', 'register'),
        directive: invokeLaterAndSetModuleName('$compileProvider', 'directive'),
        config: config,
        run: function(block) {
            runBlocks.push(block);
            return this;
        }
    };

    if (configFn) {
        config(configFn);
    }

    return moduleInstance;

    function invokeLater(provider, method, insertMethod, queue) {
        if (!queue) queue = invokeQueue;
        return function() {
            queue[insertMethod || 'push']([provider, method, arguments]);
            return moduleInstance;
        };
    }

    function invokeLaterAndSetModuleName(provider, method) {
        return function(recipeName, factoryFunction) {
            if (factoryFunction && isFunction(factoryFunction)) factoryFunction.$$moduleName = name;
            invokeQueue.push([provider, method, arguments]);
            return moduleInstance;
        };
    }

}
```

这里主要看下`invokeLater`和`invokeLaterAndSetModuleName`这两个内部方法。`invokeLater`接收四个参数，第四个参数默认为`invokeQueue`这个数组，它返回一个函数，该函数的作用就是将数组`[provider, method, arguments]`添加到第四个参数指明的数组中。`invokeLaterAndSetModuleName`方法与此类似，只不过多了一个设置函数的`$$moduleName`的操作。

看一个简单的例子：

```javascript
var moduleA = angular.module('ModuleA', []),
    moduleB = angular.module('ModuleB', []),
    moduleC = angular.module('ModuleC', ['ModuleA', 'ModuleB']);
moduleC.config(function myConfig() {})
    .controller('TestCtrl', ['$scope', function($scope) {}]);
console.dir(moduleC);
```

下面是截取的部分查看结果：

```javascript
// moduleC._configBlocks
[
    ['$injector', 'invoke', [function myConfig(){}]]
]

// moduleC._invokeQueue
[
    ['$controllerProvider', 'register',
        ['TestCtrl', ['$scope', function test($scope){}]]
    ]
]

// moduleC.requires
['ModuleA', 'ModuleB']
```

实际上，在通过`angular.module`注册了一个模块后，得到一个模块实例，之后调用该模块的`controller`、`factory`等方法的时候，参数中的函数并不会立即执行，而是暂时放在了模块的内部数组中了。