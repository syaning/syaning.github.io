---
layout: post
title:  [未完成]JS异步控制流及async实现细节分析(3)
date:   2015-11-30 13:45:00 +0800
---

### 8. series/parallel/parallelLimit

`async.eachOfSeries(arr, iterator, callback)`是对`arr`中的每一项，调用`iterator`函数，最终调用`callback`。也就是所，所有的异步任务都是同一种类型，只是传入的参数不同。例如对于一个目录下的所有文件，统计每个文件的size。

因此`async.eachOfSeries`无法处理多个不同类型的异步任务的情况，例如多个异步任务，一个是请求远程数据，一个是判断文件是否存在，还有一些其它类型的任务。这种情况下需要一个新的函数`series`。

`series`是基于`async.eachOfSeries`来实现，基本逻辑如下：

```javascript
function series(tasks, callback) {
	callback = callback || function() {};
	var results = Array.isArray(tasks) ? [] : {};

	async.eachOfSeries(tasks, function(task, key, callback) {
		task(function(err, data) { // [2]
			results[key] = data; // [3]
			callback(err); // [4]
		});
	}, function(err) { // [5]
		callback(err, results); // [6]
	});
}

// example
series([function(callback) {
	fs.access('index.js', function(err) {
		callback(null, err ? false : true); // [1]
	});
}, function(callback) {
	fs.readFile('package.json', function(err, data) {
		callback(err, data); // [1]
	});
}], function(err, results) {
	if (err) {
		throw err;
	}
	console.log(results);
});
```

这里有很多callback，比较迷惑人。现在将它们分类如下：

- 每个task的回调，记作`taskCallback`
- `async.eachOfSeries`第二个参数中的回调，记作`iteratorCallback`
- `async.eachOfSeries`的第三个参数也是一个回调（相关代码参看`eachOfSeries`的实现），记作`eachOfSeriesCallback`
- `series`的第二个参数，记作`seriesCallback`

现在来分析`series`的执行流程：

- 依次执行每个task，在这个过程中，会由用户调用`taskCallback`（[1]）
- `taskCallback`其实是在`series`的实现中定义（[2]）
- 在执行`taskCallback`的时候，会先将task的结果储存在结果集合中（[3]），然后调用`iteratorCallback`（[4]）
- `iteratorCallback`的作用是判断任务是否执行完毕，如果没有执行完毕，则继续执行下一个任务；如果任务执行完毕，则执行`eachOfSeriesCallback`（该部分的逻辑在`async.eachOfSeries`中实现）
- 当所有task执行完毕后，或者任务执行过程中出错时，会执行`eachOfSeriesCallback`（[5]）
- 在`eachOfSeriesCallback`中，执行`seriesCallback`（[6]），至此，`series`的执行过程结束

`parallel/parallelLimit`与`series`的实现类似，只不过是将`async.eachOfSeries`换成了`async.eachOf/async.eachOfLimit`来实现。

### 9. waterfall

series模型的多个任务之间是没有依赖关系的。但是如果一个任务的执行依赖于上一个任务的结果，`series`就无法处理了，此时需要使用`waterfall`，即每个任务的执行结果会传递给下一个任务。

一个简单的实现思路是：将每一步任务的结果储存在一个变量中，然后将该变量传入下一个任务作为参数。基本逻辑如下：

```javascript
function waterfall(tasks, callback) {
	callback = callback || function() {};
	tasks = tasks || [];

	// 由于传入下一个任务的参数可能不止一个，因此使用一个数组来保存中间值
	var result = [];
	var slice = result.slice;

	async.eachOfSeries(tasks, function(task, key, callback) {
		result.push(function(err) {
			result = slice.call(arguments, 1);
			callback(err);
		});
		task.apply(this, result);
	}, function(err) {
		result.unshift(err);
		callback.apply(this, result);
	});
}

// example
waterfall([function(callback) {
	fs.readFile('package.json', function(err, data) {
		callback(err, data);
	});
}, function(data, callback) {
	try {
		var pkgInfo = JSON.parse(data.toString());
		fs.readFile(pkgInfo.main, function(err, data) {
			callback(err, data);
		});
	} catch (err) {
		callback(err);
	}
}], function(err, result) {
	if (err) {
		throw err;
	}
	console.log(result.toString());
});
```

未完待续