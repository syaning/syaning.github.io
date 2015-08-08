---
layout: post
title:  AngularJS深入(7)——scope
date:   2015-08-08 21:00
---

参考资料：

- [Scopes](https://docs.angularjs.org/guide/scope)

### 1. $RootScopeProvider

scope相关的代码在`$RootScopeProvider`中，代码结构如下：

```javascript
function $RootScopeProvider() {
    // ... ...

    this.digestTtl = function(value) {};

    function createChildScopeClass(parent) {}

    this.$get = ['$injector', '$exceptionHandler', '$parse', '$browser',
        function($injector, $exceptionHandler, $parse, $browser) {
            // ... ...

            function Scope() {
                // ... ...
            }

            Scope.prototype = {
                constructor: Scope,
                $new: function(isolate, parent) {},
                $watch: function(watchExp, listener, objectEquality, prettyPrintExpression) {},
                $watchGroup: function(watchExpressions, listener) {},
                $watchCollection: function(obj, listener) {},
                $digest: function() {},
                $destroy: function() {},
                $eval: function(expr, locals) {},
                $evalAsync: function(expr, locals) {},
                $$postDigest: function(fn) {},
                $apply: function(expr) {},
                $applyAsync: function(expr) {},
                $on: function(name, listener) {},
                $emit: function(name, args) {},
                $broadcast: function(name, args) {}
            };

            var $rootScope = new Scope();

            //The internal queues. Expose them on the $rootScope for debugging/testing purposes.
            var asyncQueue = $rootScope.$$asyncQueue = [];
            var postDigestQueue = $rootScope.$$postDigestQueue = [];
            var applyAsyncQueue = $rootScope.$$applyAsyncQueue = [];

            return $rootScope;

            // ... ...
        }
    ];
}
```

可以看到，`$get`中定义了一个`Scope`类，最终返回的`$rootScope`就是`Scope`的一个实例。

### 2. Scope