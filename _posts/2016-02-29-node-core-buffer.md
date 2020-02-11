---
layout: post
title:  Node核心模块之buffer
date:   2016-02-29 11:00:00 +0800
---

* TOC
{:toc}

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

### 2. Buffer的实现

Buffer的[API文档](https://nodejs.org/dist/latest/docs/api/buffer.html)里提到：

> Prior to the introduction of `TypedArray` in ECMAScript 2015 (ES6), the JavaScript language had no mechanism for reading or manipulating streams of binary data. The `Buffer` class was introduced as part of the Node.js API to make it possible to interact with octet streams in the context of things like TCP streams and file system operations.
> 
> Now that `TypedArray` has been added in ES6, the `Buffer` class implements the `Uint8Array` API in a manner that is more optimized and suitable for Node.js' use cases.

因此，目前Buffer的实现是基于Uint8Array的，但是对接口和操作进行了优化，使用起来会更加便捷。

### 3. Buffer的内存分配策略

通常，创建新的Buffer的时候，有如下几种方法：

- `new Buffer(array)`
- `new Buffer(buffer)`
- `new Buffer(arrayBuffer)`
- `new Buffer(size)`
- `new Buffer(str[, encoding])`

Buffer源码如下：

```javascript
function Buffer(arg, encoding) {
  // Common case.
  if (typeof arg === 'number') {
    // If less than zero, or NaN.
    if (arg < 0 || arg !== arg)
      arg = 0;
    return allocate(arg);
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(arg, encoding);
  }

  // Unusual.
  return fromObject(arg);
}
```

#### 3.1 `new Buffer(size)`

先来考虑最简单的情形，即`new Buffer(size)`，此时调用了`allocate(size)`。`allocate`及其相关的一些定义的源码如下：

```javascript
Buffer.poolSize = 8 * 1024;
var poolSize, poolOffset, allocPool;

function createBuffer(size) {
  const ui8 = new Uint8Array(size);
  Object.setPrototypeOf(ui8, Buffer.prototype);
  return ui8;
}

function createPool() {
  poolSize = Buffer.poolSize;
  if (poolSize > 0)
    flags[kNoZeroFill] = 1;
  allocPool = createBuffer(poolSize);
  poolOffset = 0;
}
createPool();

function alignPool() {
  // Ensure aligned slices
  if (poolOffset & 0x7) {
    poolOffset |= 0x7;
    poolOffset++;
  }
}

function allocate(size) {
  if (size === 0) {
    return createBuffer(size);
  }
  if (size < (Buffer.poolSize >>> 1)) {
    if (size > (poolSize - poolOffset))
      createPool();
    var b = allocPool.slice(poolOffset, poolOffset + size);
    poolOffset += size;
    alignPool();
    return b;
  } else {
    // Even though this is checked above, the conditional is a safety net and
    // sanity check to prevent any subsequent typed array allocation from not
    // being zero filled.
    if (size > 0)
      flags[kNoZeroFill] = 1;
    return createBuffer(size);
  }
}
```

总的来说，内存的分配策略遵循以下原则：大块内存直接分配，小块内存通过内存池来分配。

内存池的大小定义为`Buffer.poolSize`，即8K。可以看到，在初次加载该模块的时候，就执行了一次`createPool()`，即创建了一个8K大小的内存池。之后每次在创建新的Buffer的时候，如果小于4K（`size < (Buffer.poolSize >>> 1)`），那么通过内存池来分配；否则直接`createBuffer(size)`来分配。

在通过内存池来分配内存的时候，会先检查内存池的可用容量是否满足所需大小，如果不满足，那么会新创建一个内存池。相关代码片段为：

```javascript
// in function allocate
if (size > (poolSize - poolOffset))
  createPool();
```

一个特例是，当size为0的时候，直接`createBuffer(size)`来分配，这样可以避免后面对size以及内存池可用容量的判断，从而提高分配效率。

#### 3.2 `new Buffer(str[, encoding])`

在该情形下，调用的是如下方法：

```javascript
function fromString(string, encoding) {
  if (typeof encoding !== 'string' || encoding === '')
    encoding = 'utf8';

  var length = byteLength(string, encoding);
  if (length >= (Buffer.poolSize >>> 1))
    return binding.createFromString(string, encoding);

  if (length > (poolSize - poolOffset))
    createPool();
  var actual = allocPool.write(string, poolOffset, encoding);
  var b = allocPool.slice(poolOffset, poolOffset + actual);
  poolOffset += actual;
  alignPool();
  return b;
}
```

也就是说，当字符串的字节长度大于4K的时候，通过C++层面来进行分配，否则通过内存池来分配。

#### 3.3 其它方式创建Buffer

- `new Buffer(buffer)`：先通过`allocate(size)`分配内存，然后将内容拷贝过去
- `new Buffer(arrayBuffer)`：通过C++层面的`binding.createFromArrayBuffer(obj)`来分配内存
- `new Buffer(array)`：先通过`allocate(size)`分配内存，然后将数据写入

该部分的源码在函数`fromObject(obj)`中，比较简单，不做赘述。
