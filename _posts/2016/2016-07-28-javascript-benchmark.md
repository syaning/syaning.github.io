---
layout: post
title:  JavaScript Benchmark
date:   2016-07-28 15:00:00 +0800
---

* TOC
{:toc}

benchmark意为基准测试，常用来比较程序的性能。例如，比较不同方式拼接字符串的效率：

```js
var a = 'hello' + 'world'
var b = ['hello', 'world'].join('')
```

常用方法有：

1. 运行相同的次数，用时少的效率高
2. 运行相同的时间，运行次数多的效率高

### 1. 运行相同的次数

例如：

```js
function f1() {
  return 'hello' + 'world'
}

function f2() {
  return ['hello', 'world'].join('')
}

function benchmark(name, fn) {
  var times = 100000
  var start = Date.now()

  for (let i = 0; i < times; i++) {
    fn()
  }

  console.log(`${name}: ${Date.now() - start}ms`)
}

benchmark('str concat', f1)
benchmark('array join', f2)
```

### 2. 运行相同的时间

例如：

```js
function f1() {
  return 'hello' + 'world'
}

function f2() {
  return ['hello', 'world'].join('')
}

function benchmark(name, fn) {
  var times = 0
  var start = Date.now()

  while (Date.now() - start < 1000) {
    fn()
    times++
  }

  console.log(`${name}: ${times} times`)
}

benchmark('str concat', f1)
benchmark('array join', f2)
```

### 3. 使用benchmark.js

以上两种方法各有优缺点，[Bulletproof JavaScript benchmarks](https://mathiasbynens.be/notes/javascript-benchmarking)一文中有更加详细的论述。

通常在实际使用中，我们会选择一个基准测试库来使用。目前常用的是[benchmark.js](https://github.com/bestiejs/benchmark.js)。

一个简单例子：

```js
const suite = require('benchmark').Suite()

suite
  .add('str concat', function() {
    return 'hello' + 'world'
  })
  .add('array join', function() {
    return ['hello', 'world'].join('')
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({
    'async': true
  })

// => str concat x 84,777,774 ops/sec ±3.53% (83 runs sampled)
// => array join x 1,771,781 ops/sec ±4.05% (79 runs sampled)
// => Fastest is str concat
```
