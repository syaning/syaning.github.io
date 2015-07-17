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

该方法创建一个注射器，最终的返回值为：

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