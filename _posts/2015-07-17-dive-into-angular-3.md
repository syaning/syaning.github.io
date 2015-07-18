---
layout: post
title:  AngularJS深入(3)——依赖注入
date:   2015-07-17 13:35:00
---

AngularJS的一个强大之处就在于依赖注入。在调用`bootstrap`的时候，会调用`createInjector`来创建一个注射器进行注入。该方法的代码简化如下：

```javascript
function createInjector(modulesToLoad, strictDi) {
    strictDi = (strictDi === true);
    var INSTANTIATING = {},
        providerSuffix = 'Provider',
        path = [],
        loadedModules = new HashMap([], true),
        providerCache = {
            // ... ...
        },
        providerInjector = (providerCache.$injector =
            createInternalInjector(providerCache, function(serviceName, caller) {
                // ... ...
            })),
        instanceCache = {},
        instanceInjector = (instanceCache.$injector =
            createInternalInjector(instanceCache, function(serviceName, caller) {
                // ... ...
            }));

    forEach(loadModules(modulesToLoad), function(fn) {
        if (fn) instanceInjector.invoke(fn);
    });

    return instanceInjector;

    function supportObject(delegate) {}
    function provider(name, provider_) {}
    function enforceReturnValue(name, factory) {}
    function factory(name, factoryFn, enforce) {}
    function service(name, constructor) {}
    function value(name, val) {}
    function constant(name, value) {}
    function decorator(serviceName, decorFn) {}
    function loadModules(modulesToLoad) {}
    function createInternalInjector(cache, factory) {
        function getService(serviceName, caller) {}
        function invoke(fn, self, locals, serviceName) {}
        function instantiate(Type, locals, serviceName) {}
        return {
            // ... ...
        };
    }
}
```

由于该函数比较长且逻辑复杂，因此这里分段进行分析。

### 1. createInjector

`createInjector`函数的逻辑主题部分代码如下：

```javascript
strictDi = (strictDi === true);
var INSTANTIATING = {},
    providerSuffix = 'Provider',
    path = [],
    loadedModules = new HashMap([], true),
    providerCache = {
        $provide: {
            provider: supportObject(provider),
            factory: supportObject(factory),
            service: supportObject(service),
            value: supportObject(value),
            constant: supportObject(constant),
            decorator: decorator
        }
    },
    providerInjector = (providerCache.$injector =
        createInternalInjector(providerCache, function(serviceName, caller) {
            if (angular.isString(caller)) {
                path.push(caller);
            }
            throw $injectorMinErr('unpr', "Unknown provider: {0}", path.join(' <- '));
        })),
    instanceCache = {},
    instanceInjector = (instanceCache.$injector =
        createInternalInjector(instanceCache, function(serviceName, caller) {
            var provider = providerInjector.get(serviceName + providerSuffix, caller);
            return instanceInjector.invoke(provider.$get, provider, undefined, serviceName);
        }));

forEach(loadModules(modulesToLoad), function(fn) {
    if (fn) instanceInjector.invoke(fn);
});

return instanceInjector;
```

可以看到，主要是一些变量的定义，然后在`forEach`中执行`loadModules`依次加载模块，最后返回`instanceInjector`。

下面是对定义的一些变量的介绍：

- `loadedModules`：是一个哈希表，与对象字面量作为哈希表不同，它不仅支持字符串作为键值，还支持对象作为键值
- `providerCache`：其中的`supportObject`是一个修饰函数，从而支持函数的对象调用，例如：`function f(key, val){}`经过处理后可以`supportObject(f)({key1: val1, key2: val2})`

### 2. createInternalInjector

该方法创建一个注射器，接收`cache`（对象）和`factory`（函数）两个参数，最终的返回值为：

```javascript
{
    invoke: invoke,
    instantiate: instantiate,
    get: getService,
    annotate: createInjector.$$annotate,
    has: function(name) {
        return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
    }
}
```

（1）getService

源码如下：

```javascript
function getService(serviceName, caller) {
    if (cache.hasOwnProperty(serviceName)) {
        if (cache[serviceName] === INSTANTIATING) {
            throw $injectorMinErr('cdep', 'Circular dependency found: {0}',
                serviceName + ' <- ' + path.join(' <- '));
        }
        return cache[serviceName];
    } else {
        try {
            path.unshift(serviceName);
            cache[serviceName] = INSTANTIATING;
            return cache[serviceName] = factory(serviceName, caller);
        } catch (err) {
            if (cache[serviceName] === INSTANTIATING) {
                delete cache[serviceName];
            }
            throw err;
        } finally {
            path.shift();
        }
    }
}
```

该方法主要思路是：先在`cache`中检查是否有`serviceName`对应的服务，如果有就直接返回，否则调用`factory`来创建一个，并将其缓存在`cache`中。

（2）annotate

该方法主要用于推断注入。例如下面的代码：

```javascript
angular.module('MyModule', [])
    .factory('service', function() {
        return {
            greeting: 'hello world'
        };
    })
    .controller('ctrl', ['$scope', '$injector', function($scope, $injector) {
        $injector.invoke(function(service) {
            console.log(service.greeting);
        });
    }]);
```

在调用`$injector.invoke`的时候，将`service`注入了。AngularJS主要通过函数的`toString()`方法来实现这一功能。相关的源码如下：

```javascript
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var $injectorMinErr = minErr('$injector');

function anonFn(fn) {
    // For anonymous functions, showing at the very least the function signature can help in
    // debugging.
    var fnText = fn.toString().replace(STRIP_COMMENTS, ''),
        args = fnText.match(FN_ARGS);
    if (args) {
        return 'function(' + (args[1] || '').replace(/[\s\r\n]+/, ' ') + ')';
    }
    return 'fn';
}

function annotate(fn, strictDi, name) {
    var $inject,
        fnText,
        argDecl,
        last;

    if (typeof fn === 'function') {
        if (!($inject = fn.$inject)) {
            $inject = [];
            if (fn.length) {
                if (strictDi) {
                    if (!isString(name) || !name) {
                        name = fn.name || anonFn(fn);
                    }
                    throw $injectorMinErr('strictdi',
                        '{0} is not using explicit annotation and cannot be invoked in strict mode', name);
                }
                fnText = fn.toString().replace(STRIP_COMMENTS, '');
                argDecl = fnText.match(FN_ARGS);
                forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
                    arg.replace(FN_ARG, function(all, underscore, name) {
                        $inject.push(name);
                    });
                });
            }
            fn.$inject = $inject;
        }
    } else if (isArray(fn)) {
        last = fn.length - 1;
        assertArgFn(fn[last], 'fn');
        $inject = fn.slice(0, last);
    } else {
        assertArgFn(fn, 'fn', true);
    }
    return $inject;
}
```
