---
layout: post
title:  Node核心模块之buffer
date:   2016-02-29 11:00:00 +0800
---

> 本文所使用的Node版本为5.7.0

### 1. ArrayBuffer，TypedArray，DataView

在了解Buffer之前，需要对ArrayBuffer，TypedArray和DataView等概念有所了解，可以参考以下资料：

- [MDN ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [MDN TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- [MDN DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
- [Typed Arrays in ECMAScript 6](http://www.2ality.com/2015/09/typed-arrays.html)
- [Typed Arrays: Binary Data in the Browser](http://www.html5rocks.com/en/tutorials/webgl/typed_arrays/)

简而言之，ArrayBuffer是一片内存区域，用来真正存储数据；而TypedArray和DataView是相应的ArrayBuffer的视图，用来对这片内存区域进行操作。

TypedArray和DataView的区别是：TypedArray只能是同一种类型的数据，而DataView可以是不同类型的数据。

### 2. Buffer

TODO
