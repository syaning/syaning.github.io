---
layout: post
title:  异步编程中的异常处理
date:   2015-08-10 14:15:00 +0800
---

* TOC
{:toc}

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

这是因为异步调用是立即返回的，因此当发生异常的时候，已经脱离了`try..catch..`的上下文了，所以异常无法被捕获。

下面来介绍异步编程下几种常用的异常处理方法。

### 1. callback

通过回调函数可以比较方便地进行异常处理，例如：

```javascript
function async(callback, errback) {
	setTimeout(function() {
		var rand = Math.random();
		if (rand < 0.5) {
			errback('async error');
		} else {
			callback(rand);
		}
	}, 1000);
}

async(function(result) {
	console.log('scucess:', result);
}, function(err) {
	console.log('fail:', err);
});
```

这里通过`setTimeout`来模拟实现了一个异步函数`async`，该函数可能调用成功，也可能调用失败抛出异常。`async`接收两个参数，当调用成功时`callback`会被执行，当抛出异常时`errback`会被执行。

有时候为了方便，也会将`callback`和`errback`合并为一个回调函数，这也是Node风格回调处理。代码如下：

```javascript
function async(callback) {
	setTimeout(function() {
		var rand = Math.random();
		if (rand < 0.5) {
			callback('async error');
		} else {
			callback(null, rand);
		}
	}, 1000);
}

async(function(err, result) {
	if (err) {
		console.log('fail:', err);
	} else {
		console.log('success:', result);
	}
});
```

这里`err`作为回调函数的第一个参数，如果`async`调用成功，则`err`为一个falsy值（可以是`null`或`undefined`等，在该例子中使用`null`）；如果`async`调用失败，则`err`为抛出的异常。当调用回调函数的时候，先判断`err`是否为falsy。如果为falsy，则进行异常处理；否则执行成功的回调。

然而在多异步串行的情况下，使用回调函数的方式，就会出现所谓的回调金字塔问题，代码可读性也会大打折扣。例如：

```javascript
function async(callback) {
	setTimeout(function() {
		var rand = Math.random();
		if (rand < 0.2) {
			callback('async error');
		} else {
			callback(null, rand);
		}
	}, 1000);
}

async(function(err, result) {
	if (err) {
		console.log('fail:', err);
	} else {
		console.log('success:', result);
		async(function(err, result) {
			if (err) {
				console.log('fail:', err);
			} else {
				console.log('success:', result);
				async(function(err, result) {
					if (err) {
						console.log('fail:', err);
					} else {
						console.log('success:', result);
					}
				});
			}
		});
	}
});
```

在这里，回调函数一层嵌一层，而且每一层都要判读是否出错。不仅代码可读性差，维护起来也非常不方便。

### 2. promise

上面的例子，使用promise的话，代码如下：

```javascript
function async() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			var rand = Math.random();
			if (rand < 0.5) {
				reject('async error');
			} else {
				resolve(rand);
			}
		}, 1000);
	});
}

async().then(function(result) {
	console.log('success:', result);
}, function(err) {
	console.log('fail:', err);
});
```

或者使用`catch`的方式，代码如下：

```javascript
function async() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			var rand = Math.random();
			if (rand < 0.5) {
				reject('async error');
			} else {
				resolve(rand);
			}
		}, 1000);
	});
}

async().then(function(result) {
		console.log('success:', result);
	})
	.catch(function(err) {
		console.log('fail:', err);
	});
```

使用promise的好处是执行流程直观，但是理解起来比回调函数要麻烦一些。

对于多异步操作串行的问题，使用promise的方式会使得代码简洁优雅，可读性也很强。代码如下：

```javascript
function async() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			var rand = Math.random();
			if (rand < 0.2) {
				reject('async error');
			} else {
				resolve(rand);
			}
		}, 1000);
	});
}

function onResolved(result) {
	console.log('success:', result);
}

function onRejected(err) {
	console.log('fail:', err);
}

async().then(onResolved)
	.then(async)
	.then(onResolved)
	.then(async)
	.then(onResolved)
	.catch(onRejected);
```

### 3. domain

在Node中，有一个[`domain`](https://nodejs.org/api/domain.html)模块（在io.js中该模块已经标记为deprecated），可以用来处理异步操作异常。示例代码如下：

```javascript
var domain = require('domain');

function async(callback) {
	setTimeout(function() {
		var rand = Math.random();
		if (rand < 0.5) {
			throw 'async error';
		} else {
			callback(rand);
		}
	}, 1000);
}

var d = domain.create();
d.on('error', function(err) {
	console.log('fail:', err);
});
d.run(function() {
	async(function(result) {
		console.log('success:', result);
	});
});
```

`Domain`类继承自`EventEmitter`，所以它本质上就是一个事件发生器。