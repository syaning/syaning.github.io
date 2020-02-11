---
layout: post
title:  Redux中间件
date:   2016-03-25 13:40:00 +0800
---

* TOC
{:toc}

Redux也有Middleware的概念，类似于[Express](http://expressjs.com/)或者[Koa](http://koajs.com/)。事实上，Redux的中间件模型更接近Koa的，都是洋葱模型，而Express的中间件模型则是瀑布流模型。

> 关于Express和Koa的中间件机制，可以参考我之前的文章：
> 
> - [Express深入解读]({{site.baseurl}}/2015/10/22/express-in-depth/)
> - [koa的中间件机制]({{site.baseurl}}/2015/11/02/koa-middleware/)

[官方文档](http://redux.js.org/docs/advanced/Middleware.html)对中间件已经有了比较详细的解释。或者参考这个[非常简单的例子](https://github.com/simplest-demos/simplest-redux-middleware-demo)来初步了解Redux中间件的使用。

下面通过对Redux的部分源码进行分析，来详细了解Redux的中间件机制。

### 1. compose

Redux中间件机制的核心方法是`applyMiddleware`，但是在了解该方法之前，先来分析依赖函数`compose`。源码如下：

```javascript
export default function compose(...funcs) {
  return (...args) => {
    if (funcs.length === 0) {
      return args[0]
    }

    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)

    return rest.reduceRight((composed, f) => f(composed), last(...args))
  }
}
```

该方法接收一系列的函数作为参数，返回值是一个新的函数。其效果相当于函数的嵌套调用。例如：

```javascript
compose(f, g, h)(...args)
```

就相当于：

```javascript
f(g(h(...args)))
```

### 2. applyMiddleware

源码及分析如下：

```javascript
export default function applyMiddleware(...middlewares) {
  /**
   * 返回值是一个函数，因此在使用的时候是如下形式：
   * var store = applyMiddleware(...midlewares)(createStore)(reducer)
   */
  return (createStore) => (reducer, initialState, enhancer) => {
    // 普通方式创建的store
    var store = createStore(reducer, initialState, enhancer)
    var dispatch = store.dispatch
    var chain = []

    /**
     * 将store的一部分接口暴露给中间件
     * 在编写中间件的时候，通常形式为：
     * function middleware(store){
     *     return next => action => { ... }
     * }
     * 参数的store其实就是middlewareAPI
     */
    var middlewareAPI = {
      getState: store.getState,
      /**
       * 这里之所以使用一个匿名函数，而不是`dispatch： dispatch`的形式
       * 是因为在中间件中执行store.dispatch的时候，dispatch的值已经改变
       * 在下面的代码中将会看到dispatch被重新赋值
       */
      dispatch: (action) => dispatch(action)
    }

    /**
     * chain是一个数组，数组中的每一项都是一个具有如下形式的函数：
     * function(next){
     *     return function(action){ ... }
     * }
     */
    chain = middlewares.map(middleware => middleware(middlewareAPI))

    /**
     * 假设chain为[mw1, mw2, mw3]
     * 那么此时dispatch为mw1(mw2(mw3(store.dispatch)))
     * 即store.dispatch作为mw3的next参数
     * mw3(store.dispatch)作为mw2的next参数，以此类推
     * 最终的返回值是一个函数，其形式为：
     * function(action){ ... }
     * 该函数作为新的dispatch（或者说，包装后的dispatch）
     */
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

### 3. 实例

假如有两个中间件，`logger`和`greeting`：

```javascript
function logger(store) {
    return function(next) {
        return function(action) {
            console.log('logger: dispatching:', action)
            var result = next(action)
            console.log('logger: get state:', store.getState())
            return result
        }
    }
}

function greeting(store) {
    return function(next) {
        return function(action) {
            console.log('greeting: Hi~ o(*￣▽￣*)ブ')
            var result = next(action)
            console.log('greeting: ヾ(￣▽￣)Bye~Bye~')
            return result
        }
    }
}
```

那么经过`applyMiddleware`后，新的`dispatch`函数其实是：

```javascript
function dispatch(action) {
    console.log('logger: dispatching:', action)

    var result = (function(action) {
        console.log('greeting: Hi~ o(*￣▽￣*)ブ')
        var result = store.dispatch(action)
        console.log('greeting: ヾ(￣▽￣)Bye~Bye~')
        return result
    })(action)

    console.log('logger: get state:', store.getState())
    return result
}
```

如果有更多的中间件的话，这个过程会一层一层嵌套下去。

通过对这个例子的分析，可以非常直观地看出，中间件的作用，无非是捕获`store.dispatch(action)`这个动作，在它的之前和之后做一些其它事情。

### 4. 异步Action

通过前面的源码分析，我们可以知道，每个中间件所接收到的`store`参数，其实是真正Store的一个子集，只有`dispatch`和`getState`方法。那么，如果在某个中间件中调用了`dispatch(action)`，岂不是就陷入无限循环了？事实上，中间件拿到`dispatch`，主要是用于异步操作。

下面看一个例子（[完整源码](https://github.com/simplest-demos/simplest-redux-async-action-demo)）。

```javascript
// action.js
function increaseCounterAsync() {
    return function(dispatch, getState) {
        setTimeout(() => dispatch({
            type: 'INCREASE'
        }), 3000)
    }
}

// middleware: thunk
function thunk(store) {
    return function(next) {
        return function(action) {
            return typeof action === 'function' ?
                action(store.dispatch, store.getState) :
                next(action)
        }
    }
}

// store
var store = applyMiddleware(thunk, logger)(createStore)(reducer)
store.dispatch(increaseCounterAsync())
```

> 注： 这里的thunk中间件其实就是[redux-thunk](https://github.com/gaearon/redux-thunk)的实现。

在这里，`increaseCounterAsync()`创建的action是一个函数，而thunk中间件会对action进行拦截，如果action是一个函数，则将`dispatch`和`getState`作为参数执行该函数，否则将该action按照普通流程来处理。也就是说，thunk中间件捕获到了异步action之后，进行一些处理，然后dispatch真正的action。

在上面的例子中，使用了thunk和logger两个中间件，此时`dispatch`函数其实是：

```javascript
function dispatch(action) {
    if (typeof action === 'function') {
        // 这里的dispatch和getState其实是middlewareAPI的
        return action(dispatch, getState)
    }

    var result = (function(action) {
        console.log('logger: dispatching:', action)
        // 这里的store指的是applyMiddleware的内部变量store
        var result = store.dispatch(action)
        console.log('logger: get state:', store.getState())
        return result
    })(action)

    return result
}
```

可以看到，如果一个异步action的话，被thunk中间件捕获后，就不会执行到后面的logger部分。然后`action(dispatch, getState)`会重新dispatch一个同步action。

### 5. 参考资料

- [Middleware](http://redux.js.org/docs/advanced/Middleware.html)
- [redux-thunk](https://github.com/gaearon/redux-thunk)