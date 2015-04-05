# React学习笔记1——入门

### 使用JSX

JSX类似于XML的语法，是对JavaScript的扩展，从而可以在JS中使用HTML类似的标签。具体介绍在[JSX in Depth](http://facebook.github.io/react/docs/jsx-in-depth.html)。

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="bower_components/react/react.min.js"></script>
	<script src="bower_components/react/JSXTransformer.js"></script>
</head>
<body>
	<div id="example"></div>
	<script type="text/jsx">
		React.render(
			<h1>Hello world!</h1>,
			document.getElementById('example')
		);
	</script>
</body>
</html>
```

如果使用了JSX，需要注意：

- 要引入`JSXTransformer.js`来解析JSX
- 相应的`script`标签的`type`应该为`text/jsx`

这样的话所有的JSX解析任务都放在了客户端，会降低渲染速度，因此好的做法是在服务器端解析好JSX，可以通过官方的`react-tools`来实现：

```
npm install -g react-tools
jsx --watch src/ build/
```

这样所有src目录下的脚本都会实时解析，在页面中直接引用build目录下解析好的脚本即可，此时不再需要引入JSXTransformer.js，而且相应的script标签type也不用设置为text/jsx。

解析后的脚本为如下形式：

```javascript
React.render(
	React.createElement("h1", null, "Hello world!"),
	document.getElementById('example')
);
```

可以发现，主要是将标签式的声明方式转化为了函数调用，相比之下，还是前者更加直观。

### 基于组件的开发

React的UI理念是基于组件（Component）进行开发，可以通过`createClass`来创建一种组件，例如：

```javascript
var Hello = React.createClass({
	render: function(){
		return <h1>Hello world!</h1>;
	}
})

React.render(
	<Hello />,
	document.getElementById('example')
);
```

在进行复杂的组件开发的时候，常常是将一个复杂的组件拆分为多个简单的组件，然后将这些复杂的组件组合在一起。这样做有以下好处：

- 组件可以重复利用，同样的一个组件可以用在不同的场景中，与不同的其它组件进行组合
- 多个简单的组件容易进行管理，也容易进行维护和测试
