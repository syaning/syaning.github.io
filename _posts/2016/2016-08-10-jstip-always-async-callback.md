---
layout: post
title:  JS Tip——强制异步回调
date:   2016-08-10 13:30:00 +0800
---

在涉及到有回调函数的情况下，回调函数可能是同步执行的，也可能是异步执行的。

例如：

```js
function callback() {
  console.log('callback')
}

function syncFn(fn) {
  fn()
}

function asyncFn(fn) {
  setImmediate(fn)
}
```

当执行：

```js
syncFn(callback)
console.log('hello world')
```

输出为：

```js
// => callback
// => hello world
```

当执行：

```js
asyncFn(callback)
console.log('hello world')
```

输出为：

```js
// => hello world
// => callback
```

然而有些场景下，可能希望回调函数总是异步执行的，此时可以使用如下方法：

```js
var sync = true

syncFn(function() {
  if (!sync) {
    return callback()
  }
  process.nextTick(callback)
})

sync = false

console.log('hello world')

// => hello world
// => callback
```

这里使用了一个`sync`标志，如果回调是同步执行的，那么就会进入`process.nextTick(callback)`，从而变成异步执行；如果回调本身就是异步执行的，那么`if (!sync)`会为真值，此时就直接执行回调函数就行了。

相关场景参考[Express view.render](https://github.com/expressjs/express/blob/5.0.0-alpha.2/lib/view.js#L124)