---
layout: post
title:  AngularJS深入(7)——scope
date:   2015-08-08 21:00:00 +0800
---

* TOC
{:toc}

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

### 4. `$watch`, `$watchGroup`

(1) $watch

源码如下：

```javascript
function(watchExp, listener, objectEquality, prettyPrintExpression) {
    var get = $parse(watchExp);

    if (get.$$watchDelegate) {
        return get.$$watchDelegate(this, listener, objectEquality, get, watchExp);
    }
    var scope = this,
        array = scope.$$watchers,
        watcher = {
            fn: listener,
            last: initWatchVal,
            get: get,
            exp: prettyPrintExpression || watchExp,
            eq: !!objectEquality
        };

    lastDirtyWatch = null;

    if (!isFunction(listener)) {
        watcher.fn = noop;
    }

    if (!array) {
        array = scope.$$watchers = [];
    }
    // we use unshift since we use a while loop in $digest for speed.
    // the while loop reads in reverse order.
    array.unshift(watcher);
    incrementWatchersCount(this, 1);

    return function deregisterWatch() {
        if (arrayRemove(array, watcher) >= 0) {
            incrementWatchersCount(scope, -1);
        }
        lastDirtyWatch = null;
    };
}
```

这里主要就是使用传进来的参数构建一个`watcher`对象，并将其添加到`scope.$$watchers`数组中，然后调用`incrementWatchersCount(this, 1)`来增加观察者的数量。最后返回的是一个函数，用于取消该观察者。

(2) $watchGroup

源码如下：

```javascript
function(watchExpressions, listener) {
    var oldValues = new Array(watchExpressions.length);
    var newValues = new Array(watchExpressions.length);
    var deregisterFns = [];
    var self = this;
    var changeReactionScheduled = false;
    var firstRun = true;

    // ... ...

    forEach(watchExpressions, function(expr, i) {
        var unwatchFn = self.$watch(expr, function watchGroupSubAction(value, oldValue) {
            newValues[i] = value;
            oldValues[i] = oldValue;
            if (!changeReactionScheduled) {
                changeReactionScheduled = true;
                self.$evalAsync(watchGroupAction);
            }
        });
        deregisterFns.push(unwatchFn);
    });

    function watchGroupAction() {
        changeReactionScheduled = false;

        if (firstRun) {
            firstRun = false;
            listener(newValues, newValues, self);
        } else {
            listener(newValues, oldValues, self);
        }
    }

    return function deregisterWatchGroup() {
        while (deregisterFns.length) {
            deregisterFns.shift()();
        }
    };
}
```

第一个参数`watchExpressions`是一个数组。该函数的主要作用也就是对`watchExpressions`中的每一项进行观察，并注册观察的回调函数`watchGroupSubAction`，一旦值发生变化，则设置`changeReactionScheduled`为`true`，并执行函数`watchGroupAction`。在`watchGroupAction`中，则主要是调用了`listener`。因此，一旦数组`watchExpressions`中任意一项的值发生变化，都会触发`listener`执行。

### 5. $digest

`$digest`用来进行脏值检测，主要代码是两层`do`循环，外层循环如下：

```javascript
do { // "while dirty" loop
    dirty = false;
    current = target;

    while (asyncQueue.length) {
        try {
            asyncTask = asyncQueue.shift();
            asyncTask.scope.$eval(asyncTask.expression, asyncTask.locals);
        } catch (e) {
            $exceptionHandler(e);
        }
        lastDirtyWatch = null;
    }

    traverseScopesLoop:
        do {
            // ... ...
        } while ((current = next));

    // `break traverseScopesLoop;` takes us to here

    if ((dirty || asyncQueue.length) && !(ttl--)) {
        clearPhase();
        throw $rootScopeMinErr('infdig',
            '{0} $digest() iterations reached. Aborting!\n' +
            'Watchers fired in the last 5 iterations: {1}',
            TTL, watchLog);
    }

} while (dirty || asyncQueue.length);
```

每次检测到脏值的话会让`ttl`减去1，默认的`ttl`为10。因此如果遇到振荡问题（例如a的变化引起b的变化，b的变化又引起a的变化），检测到10次脏值变化后就会报错。默认`TTL`的值可以通过`$rootScopeProvider`的`digestTtl`方法来设置。

内层循环代码如下：

```javascript
traverseScopesLoop:
    do { // "traverse the scopes" loop
        if ((watchers = current.$$watchers)) {
            // process our watches
            length = watchers.length;
            while (length--) {
                try {
                    watch = watchers[length];
                    // Most common watches are on primitives, in which case we can short
                    // circuit it with === operator, only when === fails do we use .equals
                    if (watch) {
                        if ((value = watch.get(current)) !== (last = watch.last) &&
                            !(watch.eq ? equals(value, last) : (typeof value === 'number' && typeof last === 'number' && isNaN(value) && isNaN(last)))) {
                            dirty = true;
                            lastDirtyWatch = watch;
                            watch.last = watch.eq ? copy(value, null) : value;
                            watch.fn(value, ((last === initWatchVal) ? value : last), current);
                            if (ttl < 5) {
                                logIdx = 4 - ttl;
                                if (!watchLog[logIdx]) watchLog[logIdx] = [];
                                watchLog[logIdx].push({
                                    msg: isFunction(watch.exp) ? 'fn: ' + (watch.exp.name || watch.exp.toString()) : watch.exp,
                                    newVal: value,
                                    oldVal: last
                                });
                            }
                        } else if (watch === lastDirtyWatch) {
                            // If the most recently dirty watcher is now clean, short circuit since the remaining watchers
                            // have already been tested.
                            dirty = false;
                            break traverseScopesLoop;
                        }
                    }
                } catch (e) {
                    $exceptionHandler(e);
                }
            }
        }

        // Insanity Warning: scope depth-first traversal
        // yes, this code is a bit crazy, but it works and we have tests to prove it!
        // this piece should be kept in sync with the traversal in $broadcast
        if (!(next = ((current.$$watchersCount && current.$$childHead) ||
                (current !== target && current.$$nextSibling)))) {
            while (current !== target && !(next = current.$$nextSibling)) {
                current = current.$parent;
            }
        }
    } while ((current = next));
```

主要就是通过对`$$watchers`中的每一项进行检测，看值是否发生变化。并深度优先遍历整个Scope数对每个Scope进行检测。

### 6. `$on`, `$emit` & `$broadcast`

`Scope`中实现了一套事件机制，其核心方法为`$on`，`$emit`和`$broadcast`。本质上来说，也就是一个EventEmitter类的实现，一般而言，一个最简单的EventEmitter类实现如下：

```javascript
function EventEmitter() {
    this.listeners = {};
}

EventEmitter.prototype.on = function(name, listener) {
    var listeners = this.listeners[name];
    if (!listeners) {
        this.listeners[name] = listeners = [];
    }
    listeners.push(listener);
}

EventEmitter.prototype.emit = function(name) {
    var listeners = this.listeners[name] || [],
        args = [].slice.call(arguments, 1);
    listeners.forEach(function(listener) {
        listener.apply(null, args);
    });
}
```

`Scope`中的实现于此大同小异，主要的区别是：由于scope之间的继承关系构成了一个树状结构，类似DOM树，因此事件可以向上向下传播。在这里，`$emit`发出的事件可以向上传播，`$broadcast`发出的事件可以向下传播。源码比较简单，不再赘述。

### 7. 参考资料

- [Scopes](https://docs.angularjs.org/guide/scope)
- [angularjs1.3.0源码解析之scope](http://www.html-js.com/article/2365)