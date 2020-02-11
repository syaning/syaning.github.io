---
layout: post
title:  AngularJS深入(3)——依赖注入
date:   2015-07-17 13:35:00 +0800
---

* TOC
{:toc}

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

`createInjector`函数的逻辑主体部分代码如下：

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

通过源码可以发现：

- 如果`fn`是一个函数，则通过`toString()`得到其字符串形式，然后取出其中参数放在数组`$inject`中
- 如果`fn`是一个数组，即`['service', function(service){}]`形式，则将该数组的最后一项剔除，其余部分放在`$inject`数组中

例如：

```javascript
angular.module('MyModule', [])
    .factory('service', function() {
        return {
            greeting: 'hello world'
        };
    })
    .controller('ctrl', ['$scope', '$injector', function($scope, $injector) {
        console.log($injector.annotate(function(arg1, arg2, arg3) {}));
        // ["arg1", "arg2", "arg3"]
        
        console.log($injector.annotate(['service', function(arg1) {}]));
        // ["service"]
    }]);
```

（3）invoke

源码如下：

```javascript
function invoke(fn, self, locals, serviceName) {
    if (typeof locals === 'string') {
        serviceName = locals;
        locals = null;
    }

    var args = [],
        $inject = createInjector.$$annotate(fn, strictDi, serviceName),
        length, i,
        key;

    for (i = 0, length = $inject.length; i < length; i++) {
        key = $inject[i];
        if (typeof key !== 'string') {
            throw $injectorMinErr('itkn',
                'Incorrect injection token! Expected service name as string, got {0}', key);
        }
        args.push(
            locals && locals.hasOwnProperty(key) ? locals[key] : getService(key, serviceName)
        );
    }
    if (isArray(fn)) {
        fn = fn[length];
    }

    // http://jsperf.com/angularjs-invoke-apply-vs-switch
    // #5388
    return fn.apply(self, args);
}
```

思路如下：

- 通过`annotate`方法得到需要注入的参数；
- 通过`locals`或`getService`依次得到需要注入的参数的实例，放在`args`数组中；
- 如果`fn`是一个数组，即`['service', function(service){}]`形式，则取数组中最后一项作为执行函数`fn`；
- 用参数`args`来执行`fn`。

### 3. loadModules

该方法主要是用来加载模块，源码如下：

```javascript
function loadModules(modulesToLoad) {
    var runBlocks = [],
        moduleFn;
    forEach(modulesToLoad, function(module) {
        if (loadedModules.get(module)) return;
        loadedModules.put(module, true);

        function runInvokeQueue(queue) {
            var i, ii;
            for (i = 0, ii = queue.length; i < ii; i++) {
                var invokeArgs = queue[i],
                    provider = providerInjector.get(invokeArgs[0]);

                provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
            }
        }

        try {
            if (isString(module)) {
                moduleFn = angularModule(module);
                runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
                runInvokeQueue(moduleFn._invokeQueue);
                runInvokeQueue(moduleFn._configBlocks);
            } else if (isFunction(module)) {
                runBlocks.push(providerInjector.invoke(module));
            } else if (isArray(module)) {
                runBlocks.push(providerInjector.invoke(module));
            } else {
                assertArgFn(module, 'module');
            }
        } catch (e) {
            if (isArray(module)) {
                module = module[module.length - 1];
            }
            if (e.message && e.stack && e.stack.indexOf(e.message) == -1) {
                // Safari & FF's stack traces don't contain error.message content
                // unlike those of Chrome and IE
                // So if stack doesn't contain message, we create a new string that contains both.
                // Since error.stack is read-only in Safari, I'm overriding e and not e.stack here.
                /* jshint -W022 */
                e = e.message + '\n' + e.stack;
            }
            throw $injectorMinErr('modulerr', "Failed to instantiate module {0} due to:\n{1}",
                module, e.stack || e.message || e);
        }
    });
    return runBlocks;
}
```

接收的参数`modulesToLoad`是一个数组，表示需要加载的模块。假设定义了一个`MyModule`模块，那么在加载的时候，`modulesToLoad`的值为（相关代码可以参考`bootstrap`函数）：

```javascript
['ng', ['$provide', function($provide) {
    $provide.value('$rootElement', element);
}], 'MyModule']
```

函数`loadModules`的作用就是针对数组`modulesToLoad`中的每一项，分别进行加载：

- 如果模块是一个字符串，则首先通过`angular.module(moduleName)`取出模块对象，然后加载其依赖模块，并将所有以来模块及其自身的`_runBlocks`放在`runBlocks`数组中，然后依次调用`_invokeQueue`和`_configBlocks`
- 如果模块是一个函数或者数组，则运行`providerInjector.invoke(module)`，并将结果放在`runBlocks`数组中

`runInvokeQueue`是一个内部方法，参数为一个模块的`_invokeQueue`或`_configBlocks`数组，其结构形式在上一篇中已经有所说明，大致如下：

```javascript
[
    ['$controllerProvider', 'register',
        ['TestCtrl', ['$scope', function test($scope) {}]]
    ]
]
```

用`args`表示数组中的每一项，那么`runInvokeQueue`的作用其实就是调用`providerInjector.get(args[0])[args[1]](args[2])`，例如`provicerInjector.get('$controllerProvider').register(/* ... */)`。