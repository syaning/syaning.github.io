---
layout: post
title:  JS异步控制流及async实现细节分析(3)
date:   2015-11-30 13:45:00 +0800
---

* TOC
{:toc}

### 8. series/parallel/parallelLimit

`async.eachOfSeries(arr, iterator, callback)`是对`arr`中的每一项，调用`iterator`函数，最终调用`callback`。也就是说，所有的异步任务都是同一种类型，只是传入的参数不同。例如对于一个目录下的所有文件，统计每个文件的size。

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

当然，这只是一个非常简陋的实现，仅仅用来描述`waterfall`的实现逻辑。在async的源码中，`async.waterfall`的实现如下：

```javascript
async.waterfall = function(tasks, callback) {
    callback = _once(callback || noop);
    // 由于任务之间存在严格的依赖关系，因此tasks必须是一个数组，而不能是对象
    // 这里判断比较严格，即使是类数组对象也不可以
    if (!_isArray(tasks)) {
        var err = new Error('First argument to waterfall must be an array of functions');
        return callback(err);
    }
    // 如果任务列表为空，就直接执行回调
    if (!tasks.length) {
        return callback();
    }

    // 该部分代码会在下面详细分析
    function wrapIterator(iterator) {
        return _restParam(function(err, args) {
            if (err) {
                callback.apply(null, [err].concat(args));
            } else {
                var next = iterator.next();
                if (next) {
                    args.push(wrapIterator(next));
                } else {
                    args.push(callback);
                }
                ensureAsync(iterator).apply(null, args);
            }
        });
    }
    wrapIterator(async.iterator(tasks))();
};
```

首先来看`async.iterator`，它的作用是将一个任务列表转换成一个迭代器结构，例如：

```javascript
var iterator = async.iterator([
	function(){console.log('1');},
	function(){console.log('2');},
	function(){console.log('3');},
	function(){console.log('4');}
]);

iterator()()()(); // 1, 2, 3, 4
iterator.next().next()(); // 3
iterator().next().next()(); // 1, 4
```

该函数源码不难看懂，在此不做赘述。

接下来看`wrapIterator`，其中有一个`_restParam`比较影响阅读，我们把该函数改写为如下形式：

```javascript
// example
async.waterfall([function f1(callback) {callback(null, 'data1');},
		function f2(data1, callback) {callback(null, 'data21', 'data22');},
		function f3(data21, data22, callback) {callback(null, 'data3');}
	],
	function cb(err, data3) {});

/////////////////////

// 这里iterator表示task，即例子中的f1，f2，f3（事实上是async.iterator封装后的task）
function wrapIterator(iterator) {
	return function(err, args) {
		// args表示传给当前task的参数，也就是上一个任务传过来的结果
		args = [].slice.call(arguments, 1);
		if (err) {
			// 如果执行过程中出错，则直接到最终的callback
			callback.apply(null, [err].concat(args));
		} else {
			var next = iterator.next();
			if (next) {
				// 如果接下来还有任务，则将下一个任务通过wrapIterator包装后push到args中
				// 即wrapIterator包装后的下一个任务，作为当前任务的最后一个参数
				// 也就是作为当前任务的callback
				// 因此下一个任务收集到的args就是当前任务传过去的结果
				// 例如上面例子中当执行callback(null, 'data1')的时候，其实是在递归执行该函数
				// 因此args就能收集到'data1'传递给f2了
				args.push(wrapIterator(next));
			} else {
				// 如果接下来没有任务了，就将最后的callback作为当前任务的回调
				args.push(callback);
			}
			// 执行当前任务
			// 使用ensureAsync来确保任务异步执行
			ensureAsync(iterator).apply(null, args);
		}
	}
}
```

总的来说，`wrapIterator`返回了一个可以递归调用的函数，从而可以依次执行任务。这段代码比较不容易理解，但是实现的非常巧妙。

接下来看`ensureAsync`的实现（已经改写为去掉`_restParam`的形式从而方便阅读）：

```javascript
function ensureAsync(fn) {
	return function() {
		var args = [].slice.call(arguments);
		var callback = args.pop();
		args.push(function() {
			var innerArgs = arguments;
			if (sync) {
				// 如果用户同步调用了callback，则会进入该分支
				// 例如：
				// async.waterfall([function(callback){
				//     callback();
				// }], function(){})
				async.setImmediate(function() {
					callback.apply(null, innerArgs);
				});
			} else {
				// 如果用户异步调用了callback，则会进入该分支
				// 例如:
				// async.waterfall([function(callback){
				//     fs.readFile('index.txt',callback);
				// }],function(){})
				callback.apply(null, innerArgs);
			}
		});
		var sync = true;
		fn.apply(this, args);
		sync = false;
	}
}
```

这与`async.eachOfSeries`中的实现是基本一致的。那么为什么要确保任务的执行是异步呢？这是因为：在一个任务中调用`callback`会去执行下一个任务，假如所有的任务都是同步调用，而且任务非常多，那么就会导致栈溢出。

> 关于该情况下栈溢出问题，可以通过如下例子来模拟：
> 
> ```javascript
> function simulateOverflow(n) {
>     var fns = [];
>     fns.push(function() {});
>     for (var i = 1; i < n; i++) {
>         var fn = (function(k) {
>             return function() {
>                 fns[k - 1]();
>             };
>         })(i);
>         fns.push(fn);
>     }
>     fns[n - 1]();
> }
> ```
> 
> 如果`n`非常大，例如`simulateOverflow(100000)`，就会导致如下错误：
> 
> ```
> RangeError: Maximum call stack size exceeded
> ```
> 
> 如果将`fns[k - 1]()`改成`setImmediate(fns[k - 1])`，就不会有问题了。