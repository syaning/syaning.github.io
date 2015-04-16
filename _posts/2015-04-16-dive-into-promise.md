---
layout: post
title:  深入理解promise
date:   2015-04-16 14:50:00
---

一直以来，对promise也只是有所耳闻，但是并未有过深入的学习和理解。昨天看到了[这篇文章](http://blog.csdn.net/aimingoo/article/details/45014325)，又想到ES6中都提供原生Promise了，因此很有必要深入理解下。

### Q中的promise设计

*本部分内容主要编译自[https://github.com/kriskowal/q/tree/v1/design](https://github.com/kriskowal/q/tree/v1/design)。*

假设你写了一个无法立即返回的函数，那么显而易见的做法是将最终的返回值作为回调函数的参数传入。例如：

```javascript
var oneOneSecondLater = function (callback) {
    setTimeout(function () {
        callback(1);
    }, 1000);
};
```

通常情况下，该函数可能执行成功，也可能失败，因此需要对这两种情况进行分别处理，此时可以使用两个回调函数：`callback`和`errback`。例如：

```javascript
var maybeOneOneSecondLater = function (callback, errback) {
    setTimeout(function () {
        if (Math.random() < .5) {
            callback(1);
        } else {
            errback(new Error("Can't provide one."));
        }
    }, 1000);
};
```

我们可以采取更加普遍的做法，我们让这个函数返回一个对象，该对象用来表示函数的执行结果，那么这个对象可能表示函数执行成功，也可能表示函数执行失败。在这种情况下，返回的对象就是一个promise，我们通过调用该对象上的方法来对实际的结果进行观察。例如：

```javascript
var maybeOneOneSecondLater = function () {
    var callback;
    setTimeout(function () {
        callback(1);
    }, 1000);
    return {
        then: function (_callback) {
            callback = _callback;
        }
    };
};

maybeOneOneSecondLater().then(callback);
```

在这个例子中，存在两个问题：

- 在调用`then`的时候，就确定了回调函数。因此假如我们希望有多个回调函数，就无能为力了。
- 假如`then`的执行在一秒钟之后，那么就会出错。因为此时当异步函数结果返回的时候，回调函数还没有注册，例如：

```javascript
var maybeOneOneSecondLater = function () {
    var callback;
    setTimeout(function () {
        callback(1);
    }, 1000);
    return {
        then: function (_callback) {
            callback = _callback;
        }
    };
};

var task = maybeOneOneSecondLater();
setTimeout(function(){
    task.then(callback);
}, 3000);
```

因此，更加通用的解决方案是：可以注册任意数量的回调函数，并且回调函数的注册可以在异步任务结果返回前或者返回后。例如：

```javascript
var maybeOneOneSecondLater = function () {
    var pending = [], value;
    setTimeout(function () {
        value = 1;
        for (var i = 0, ii = pending.length; i < ii; i++) {
            var callback = pending[i];
            callback(value);
        }
        pending = undefined;
    }, 1000);
    return {
        then: function (callback) {
            if (pending) {
                pending.push(callback);
            } else {
                callback(value);
            }
        }
    };
};
```

在这个例子中，promise有了两个状态，完成（`resolved`）和未完成（`pending`）。通过`pending`这个变量来表示promise的状态，如果为完成，那么就将新的回调函数加入到回调函数列表（即`pending`）中，一旦状态为完成，也就是回调函数结果返回，那么依次执行回调函数，并且将`pending`设置为`undefined`，如果在这之后还有新的回调函数，由于已经完成，因此新的回调函数将会立即执行。

基于上面的理念，可以抽象出一个`defer`对象。一个`defer`对象由两部分组成：注册回调（`then`）和通知回调（`resolve`）。例如：

```javascript
var defer = function () {
    var pending = [], value;
    return {
        resolve: function (_value) {
            value = _value;
            for (var i = 0, ii = pending.length; i < ii; i++) {
                var callback = pending[i];
                callback(value);
            }
            pending = undefined;
        },
        then: function (callback) {
            if (pending) {
                pending.push(callback);
            } else {
                callback(value);
            }
        }
    }
};

var oneOneSecondLater = function () {
    var result = defer();
    setTimeout(function () {
        result.resolve(1);
    }, 1000);
    return result;
};

oneOneSecondLater().then(callback);
```

但是这样子还有一个小小的问题，即`resolve`方法可以被多次调用，而这并不是我们所希望的。为了解决这个问题，代码修改如下：

```javascript
var defer = function () {
    var pending = [], value;
    return {
        resolve: function (_value) {
            if (pending) {
                value = _value;
                for (var i = 0, ii = pending.length; i < ii; i++) {
                    var callback = pending[i];
                    callback(value);
                }
                pending = undefined;
            } else {
                throw new Error("A promise can only be resolved once.");
            }
        },
        then: function (callback) {
            if (pending) {
                pending.push(callback);
            } else {
                callback(value);
            }
        }
    }
};
```

这里采用的是报错的方式，其实也可以不做任何处理，即忽略后面的多次`resolve`。到此为止，promise的功能以及基本完成，然而还存在着一些小问题，例如：

```javascript
var oneOneSecondLater = function () {
    var result = defer();
    setTimeout(function () {
        result.resolve(1);
    }, 1000);
    return result;
};

var task = oneOneSecondLater();
task.resolve(3);
task.then(callback);
```

在这个例子中，由于用户在外面执行了`resolve`，因此真正的返回结果（即`result.resolve(1);`）将会被忽略，这显然不是我们所期望的。也就是说，在上面的设计中，promise的权限还是太大，理想的情况下，promise只能执行`then`，而不能够执行`resolve`。为了达到这个目的，代码修改如下：

```javascript
var Promise = function () {
};

var isPromise = function (value) {
    return value instanceof Promise;
};

var defer = function () {
    var pending = [], value;
    var promise = new Promise();
    promise.then = function (callback) {
        if (pending) {
            pending.push(callback);
        } else {
            callback(value);
        }
    };
    return {
        resolve: function (_value) {
            if (pending) {
                value = _value;
                for (var i = 0, ii = pending.length; i < ii; i++) {
                    var callback = pending[i];
                    callback(value);
                }
                pending = undefined;
            }
        },
        promise: promise
    };
};
```

然而这样子依然有着小问题。即在判断一个值是不是promise的时候（`isPromise`），假如有多个promise类，就会导致判断错误。因此，更好的做法是使用[duck-typing](http://en.wikipedia.org/wiki/Duck_typing)，即在判断一个值是不是promise的时候，我们通过检测它有没有特定的方法（依惯例，这里使用的是`then`）。虽然可能一个非promise对象恰巧也有`then`方法，但是这种情况在实际中并不常见且不会有什么影响。修改后代码如下：

```javascript
var isPromise = function (value) {
    return value && typeof value.then === "function";
};

var defer = function () {
    var pending = [], value;
    return {
        resolve: function (_value) {
            if (pending) {
                value = _value;
                for (var i = 0, ii = pending.length; i < ii; i++) {
                    var callback = pending[i];
                    callback(value);
                }
                pending = undefined;
            }
        },
        promise: {
            then: function (callback) {
                if (pending) {
                    pending.push(callback);
                } else {
                    callback(value);
                }
            }
        }
    };
};
```

上面都是针对一个promise的情况，下面考虑有多个异步任务的情况。假如现在需要执行两个异步任务得到两个数字，然后计算它们的和，通过回调函数的方式代码如下：

```javascript
var oneOneSecondLater = function(callback) {
	setTimeout(function() {
		callback(1);
	}, 1000);
};

var twoOneSecondLater = function(callback) {
	var a, b;
	var consider = function() {
		if (a === undefined || b === undefined)
			return;
		callback(a + b);
	};
	oneOneSecondLater(function(_a) {
		a = _a;
		consider();
	});
	oneOneSecondLater(function(_b) {
		b = _b;
		consider();
	});
};

twoOneSecondLater(function(c) {
	// c === 2
	console.log(c);
});
```

但是这种做法并不十分友好，我们所期望的可能是如下这样的：

```javascript
var a = oneOneSecondLater();
var b = oneOneSecondLater();
var c = a.then(function (a) {
    return b.then(function (b) {
        return a + b;
    });
});
```
