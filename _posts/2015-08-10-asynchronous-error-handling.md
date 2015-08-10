---
layout: post
title:  异步编程中的异常处理
date:   2015-08-10 14:15
---

一般情况下，我们会使用`try..catch..`来进行异常处理，例如：

```javascript
function sync() {
	throw new Error('sync error');
}

try {
	sync();
} catch (err) {
	console.log('error caught:', err.message);
}

// error caught: sync error
```

然而对于异步函数，`try..catch..`就无法得到想要的效果了，例如：

```javascript
function async() {
	setTimeout(function() {
		throw new Error('async error');
	}, 1000);
}

try {
	async();
} catch (err) {
	console.log('error caught:', err.message);
}

// Uncaught Error: async error
```

这是因为异步调用是立即返回的，因此当发成异常的时候，已经脱离了`try..catch..`的上下文了，所以异常无法被捕获。

下面来介绍异步编程下几种常用的异常处理方法。

### 1. callback

通过回调函数可以比较方便地进行异常处理，例如：

```javascript
function async(callback, errback) {
	setTimeout(function() {
		try {
			var rand = Math.random();
			if (rand < 0.5) {
				throw new Error('async error');
			} else {
				callback(rand);
			}
		} catch (err) {
			errback(err);
		}
	}, 1000);
}

async(function(result) {
	console.log('scucess:', result);
}, function(err) {
	console.log('fail:', err.message);
});
```

这里通过`setTimeout`来模拟实现了一个异步函数`async`，该函数可能调用成功，也可能调用失败抛出异常。`async`接收两个参数，当调用成功时`callback`会被执行，当抛出异常时`errback`会被执行。

有时候为了方便，也会将`callback`和`errback`合并为一个回调函数，这也是Node风格回调处理。代码如下：

```javascript
function async(callback) {
	setTimeout(function() {
		try {
			var rand = Math.random();
			if (rand < 0.5) {
				throw new Error('async error');
			} else {
				callback(null, rand);
			}
		} catch (err) {
			callback(err);
		}
	}, 1000);
}

async(function(err, result) {
	if (err) {
		console.log('fail:', err.message);
		return;
	}
	console.log('success:', result);
});
```

这里`err`作为回调函数的第一个参数，如果`async`调用成功，则`err`为一个falsy值（可以是`null`或`undefined`等，在该例子中使用`null`）；如果`async`调用失败，则`err`为抛出的异常。

当调用回调函数的时候，先判断`err`是否为falsy。如果为falsy，则进行异常处理；否则执行成功的回调。