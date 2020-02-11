---
layout: post
title:  JS异步控制流及async实现细节分析(2)
date:   2015-11-29 19:15:00 +0800
---

* TOC
{:toc}

### 4. map/filter/reject

在async中，each系列的方法一共有12个：

- `each/forEach`
- `eachOf/forEachOf`
- `eachLimit/forEachLimit`
- `eachOfLimit/forEachOfLimit`
- `eachSeries/forEachSeries`
- `eachOfSeries/forEachOfSeries`

这些方法的回调函数签名为`callback(err)`，只有一个参数表示是否出错，因此无法收集到每个异步任务的结果。如果我们希望如下调用：

```javascript
map(files, fs.readFile, function(err, result) {
	if (err) {
		throw err;
	}
	result.forEach(data => console.log(data.toString()));
});
```

考虑到对于数组而言，可以通过`forEach`来实现map功能，例如：

```javascript
function arrayMap(arr, fn) {
	var result = [];
	arr.forEach((val, key) => result.push(fn(val, key, arr)));
	return result;
}
```

因此，在这里，可以通过`async.eachOf`来实现`map`，代码逻辑如下：

```javascript
function map(arr, fn, callback) {
	calback = once(callback || function() {});
	arr = arr || [];
	var result = Array.isArray(arr) ? [] : {};
	
	async.eachOf(arr, function(val, key, callback) {
		fn(val, function(err, data) {
			result[key] = data;
			callback(err);
		});
	}, function(err) {
		callback(err, result);
	});
}
```

同样，`mapLimit`和`mapSeries`也可以通过类似的方式实现。

filter功能的实现也是类似的方式，例如我们希望过滤出所有存在的文件，期望的调用方式如下：

```javascript
// 由于fs.exists已经废弃，否则可以直接filter(files, fs.exists, callback)
filter(files, function(file, callback) {
	fs.access(file, function(err) {
		callback(err ? false : true);
	});
}, function(err, result) {
	if (err) {
		throw err;
	}
	console.log(result);
});
```

`filter`的实现如下：

```javascript
function filter(arr, fn, callback) {
	calback = once(callback || function() {});
	arr = arr || [];
	var result = [];

	async.eachOf(arr, function(val, key, callback) {
		fn(val, function(v) {
			if (v) {
				result.push(val);
			}
			callback();
		});
	}, function(err) {
		callback(err, result);
	});
}
```

同样，`filterLimit`和`filterSeries`也可以通过类似的方式实现。

而`reject`的实现与`filter`几乎一样，除了判断条件不同之外，在async中的源码如下：

```javascript
function _reject(eachfn, arr, iterator, callback) {
    _filter(eachfn, arr, function(value, cb) {
        iterator(value, function(v) {
            cb(!v);
        });
    }, callback);
}
async.reject = doParallel(_reject);
async.rejectLimit = doParallelLimit(_reject)
```

### 5. some/every/detect

`some`实现逻辑如下：

```javascript
function some(arr, fn, cb) {
	async.eachOf(arr, function(val, key, callback) {
		// 如果cb为null，说明之前已经有某个任务的结果为truthy
		// 因此直接执行callback，相当于跳过该任务
		if (!cb) {
			return callback();
		}
		fn(val, function(v) {
			// 如果该任务返回truthy，则调用最终的回调cb(true)
			// 然后将cb置为null，表示已经有了truthy值，从而阻止后续任务的继续执行
			if (cb && !!v) {
				cb(true);
				cb = null;
			}
			callback();
		});
	}, function(err) {
		// 此时所有任务已经执行完毕，如果cb仍然不为null
		// 说明所有的任务都返回了falsy，因此最终为cb(false)
		if (cb) {
			cb(false);
		}
	});
}

// example
some(files, function(file, callback) {
	fs.access(file, function(err) {
		callback(err ? false : true);
	});
}, function(val) {
	console.log(val);
});
```

`every`与此类似，实现逻辑如下：

```javascript
function every(arr, fn, cb) {
	async.eachOf(arr, function(val, key, callback) {
		// 如果cb为null，说明之前已经有某个任务的结果为falsy
		// 因此直接执行callback，相当于跳过该任务
		if (!cb) {
			return callback();
		}
		fn(val, function(v) {
			// 如果该任务返回falsy，则调用最终的回调cb(false)
			// 然后将cb置为null，表示已经有了falsy值，从而阻止后续任务的继续执行
			if (cb && !v) {
				cb(false);
				cb = null;
			}
			callback();
		});
	}, function(err) {
		// 此时所有任务已经执行完毕，如果cb仍然不为null
		// 说明所有的任务都返回了truthy，因此最终为cb(true)
		if (cb) {
			cb(true);
		}
	});
}

// example
every(files, function(file, callback) {
	fs.access(file, function(err) {
		callback(err ? false : true);
	});
}, function(val) {
	console.log(val);
});
```

`detect`返回的是第一个执行为truthy的值，与`some`非常类似，只需要将`cb(true)`和`cb(false)`分别替换为`cb(val)`和`cb(undefined)`即可。

### 6. reduce/reduceRight

`reduce`和`reduceRight`主要通过`async.eachOfSeries`来实现，注意reduce相关的只有一个series版本，即只有串行执行的版本，因为涉及到reduce的操作往往是要依赖于上一次操作的返回值，因此不能够并行执行。

这部分源码比较简单，不做赘述。

### 7. sortBy

`sortBy`的思路是：

- 首先通过`async.map`将数组映射为一个新的数组，新数组中得每一项结构为`{value: x, criteria: criteria}`
	- `x`为原数组中的元素
	- `criteria`为需要比较的标准
- 新的数组会作为第二个参数传给`async.map`的回调函数，在该回调函数中，以`criteria`对新数组进行排序
- 从排好序的数组中收集所有的`value`作为最终的结果集传递给`sortBy`的回调函数