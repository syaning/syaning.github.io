---
layout: post
title:  d3力场图中事件冲突解决方法
date:   2016-02-01 11:30:00 +0800
---

* TOC
{:toc}

通过使用[d3.js](http://d3js.org/)，可以非常方便地创建[力场图(force layout graph)](https://github.com/mbostock/d3/wiki/Force-Layout)。在力场图的交互中，常会涉及到多种事件，例如：缩放，拖动，点击（单击、双击、右键）等。在有些情况下，事件之间会产生冲突。

> 注：文中所提的`node`指的是力场图中的节点。

### 1. zoom和drag

为图表添加缩放功能的代码如下：

```javascript
var zoom = d3.behavior.zoom()
	.scaleExtent([0.5, 2])
	.on('zoom', function() {
		// ...
	});
svg.call(zoom);
```

允许力场图的node可拖动的代码如下：

```javascript
nodes.call(force.drag);
```

在zoom和drag共存的情况下，拖动node时候，会触发zoom的拖动事件，从而导致node无法被拖动。此时的解决方法是：

```javascript
force.drag()
	.on('dragstart', function(d) {
		d3.event.sourceEvent.stopPropagation();
		// ...
	});
```

### 2. zoom和dblclick

在添加了zoom的情况下，默认双击图像会方法。此时如果想要为node添加双击事件，需要禁止zoom的双击。代码如下：

```javascript
svg.on('dblclick.zoom', null);
```

### 3. drag和click

如果对node同时监听了drag事件和click事件。那么当拖动的时候，会同时触发click事件。此时的解决方法是：

```javascript
nodes.on('click', function(d) {
	if (d3.event.defaultPrevented) {
		return;
	}
	// ...
});
```

### 4. click与dblclick

如果对node同时添加了click与dblclick事件，那么在双击的时候会触发两次click事件。

可以在click事件的处理函数中，判断两次点击的时间差。如果小于某个值，则认为是双击事件，不做处理；否则是单击事件，正常处理。代码如下：

```javascript
nodes.on('dblclick', function(d) {
		// process double click
		// ...
	})
	.on('click', function(d) {
		if (d._clickid) {
			clearTimeout(d._clickid);
			d._clickid = null;
		} else {
			d._clickid = setTimeout(function() {
				// process simple click
				// ...
				d._clickid = null;
			}.bind(this), 350);
		}
	});
```

也可以只监听click事件，在click事件的处理函数中，如果判断是双击，则执行双击的处理；否则执行单击的处理。例如：

```javascript
nodes.on('click', function(d) {
	if (d._clickid) {
		clearTimeout(d._clickid);
		d._clickid = null;
		// process double click
		// ...
	} else {
		d._clickid = setTimeout(function() {
			// process simple click
			// ...
			d._clickid = null;
		}.bind(this), 350);
	}
});
```

这种情形便是典型的[throttle function](https://www.nczonline.net/blog/2007/11/30/the-throttle-function/)。