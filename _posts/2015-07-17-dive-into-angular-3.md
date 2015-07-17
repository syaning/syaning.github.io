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