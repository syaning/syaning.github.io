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

`Scope`类源码如下：

```javascript
function Scope() {
    this.$id = nextUid();
    this.$$phase = this.$parent = this.$$watchers =
        this.$$nextSibling = this.$$prevSibling =
        this.$$childHead = this.$$childTail = null;
    this.$root = this;
    this.$$destroyed = false;
    this.$$listeners = {};
    this.$$listenerCount = {};
    this.$$watchersCount = 0;
    this.$$isolateBindings = null;
}
```

每个`Scope`实例都有指向父Scope，前一个以及后一个Scope，第一个以及最后一个子Scope的指针。其实，各个Scope本来也就是一个树状结构，通过这些指针，可以比较方便地遍历Scope以及对Scope进行操作。

### 3. $new

源码如下：

```javascript
function(isolate, parent) {
    var child;

    parent = parent || this;

    if (isolate) {
        child = new Scope();
        child.$root = this.$root;
    } else {
        // Only create a child scope class if somebody asks for one,
        // but cache it to allow the VM to optimize lookups.
        if (!this.$$ChildScope) {
            this.$$ChildScope = createChildScopeClass(this);
        }
        child = new this.$$ChildScope();
    }
    child.$parent = parent;
    child.$$prevSibling = parent.$$childTail;
    if (parent.$$childHead) {
        parent.$$childTail.$$nextSibling = child;
        parent.$$childTail = child;
    } else {
        parent.$$childHead = parent.$$childTail = child;
    }

    // When the new scope is not isolated or we inherit from `this`, and
    // the parent scope is destroyed, the property `$$destroyed` is inherited
    // prototypically. In all other cases, this property needs to be set
    // when the parent scope is destroyed.
    // The listener needs to be added after the parent is set
    if (isolate || parent != this) child.$on('$destroy', destroyChildScope);

    return child;
}
```

第一个参数表示是否要创建独立Scope，第二个参数表示父Scope。一般来说，在定义可复用的指令的时候会创建独立Scope。如果要创建独立Scope的话，直接用`new Scope()`来进行创建，然后为其`$root`赋值即可。否则的话用`createChildScopeClass(this)`来创建子Scope类，然后用子类来创建实例，并完善父Scope以及子Scope之间的家谱关系指针。

`createChildScopeClass`源码如下：

```javascript
function createChildScopeClass(parent) {
    function ChildScope() {
        this.$$watchers = this.$$nextSibling =
            this.$$childHead = this.$$childTail = null;
        this.$$listeners = {};
        this.$$listenerCount = {};
        this.$$watchersCount = 0;
        this.$id = nextUid();
        this.$$ChildScope = null;
    }
    ChildScope.prototype = parent;
    return ChildScope;
}
```

这里主要就是让`ChildScope`的原型指向`parent`，从而达到Scope继承的效果。