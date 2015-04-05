# React学习笔记2——JSX

### JSX和HTML

在JSX中，可以像通常使用HTML标签那样使用它们，也可以自定义标签，例如：

```javascript
React.render(
	<div><Hello /><span>welcome to react world</span></div>,
	document.getElementById('example')
);
```

需要注意的是，原生的HTML标签通常使用小写，而自定义的标签通常是单词首字母大写，例如`MyComponent`，`NavBar`等。

### 在标签中使用变量

在标签中可以使用变量，例如：

```javascript
var Hello = React.createClass({
	render: function(){
		var str = "Hello world!";
		return <h1>{str}</h1>;
	}
});

var List = React.createClass({
	render: function(){
		var lis=[
			<li>item1</li>,
			<li>item2</li>,
			<li>item3</li>
		];
		return <ul>{lis}</ul>;
	}
});
```

变量放在一对花括号中，实际上，花括号中可以是任何有效的JS表达式，甚至是注释，例如：

```javascript
var Hello = React.createClass({
	render: function(){
		var selected = true;
		return (
			<h1 className={selected ? "selected" : "hello"}>
				Hello world!{/* comment */}
			</h1>
		);
	}
});
```

### 标签属性

在JSX的标签中，可以像HTML那样为标签添加属性，例如：

```javascript
var Hello = React.createClass({
	render: function(){
		return <h1 className="hello">Hello world!</h1>;
	}
});

React.render(
	<Hello name="hello" />,
	document.getElementById("example")
);
```

由于`class`和`for`为JS的关键字，因此这两个属性用`className`和`htmlFor`来代替。

属性值也可以使用变量，例如：

```javascript
var Hello = React.createClass({
	render: function(){
		var cls = "hello";
		return <h1 className={cls}>Hello world!</h1>;
	}
});
```

需要注意的是，在上面例子中，`Hello`标签的属性`name`并不会被渲染出来，因为实际执行的是`Hello`的`render`方法，
因此实际渲染的是`h1`元素。可以通过`props`来解决这个问题：

```javascript
var Hello = React.createClass({
	render: function(){
		var cls = "hello";
		return <h1 className={cls} name={this.props.name}>Hello world!</h1>;
	}
});

React.render(
	<Hello name="hello" />,
	document.getElementById("example")
);
```

### JSX的解析

JSX的解析实际上就是将标签代码转化为函数调用的代码，看如下使用了JSX的例子：

```javascript
var Hello = React.createClass({
	render: function(){
		return <h1 className="hello">Hello world!</h1>;
	}
});

var Title = React.createClass({
	render: function(){
		return (
			<div id="title" role={this.props.role}>
				<Hello />
				<span>welcome to react world</span>
			</div>
		);
	}
})

React.render(
	<Title role="title" />,
	document.getElementById("example")
);
```

解析后的代码为：

```javascript
var Hello = React.createClass({displayName: "Hello",
	render: function(){
		return React.createElement("h1", {className: "hello"}, "Hello world!");
	}
});

var Title = React.createClass({displayName: "Title",
	render: function(){
		return (
			React.createElement("div", {id: "title", role: this.props.role},
				React.createElement(Hello, null),
				React.createElement("span", null, "welcome to react world")
			)
		);
	}
})

React.render(
	React.createElement(Title, {role: "title"}),
	document.getElementById("example")
);
```

可以发现，主要使用的方法是`React.createElement`，该方法的第一个参数为标签名，第二个参数为一个对象，
是该标签的属性的集合，后面的参数为该标签的内容。

### 参考
- [http://facebook.github.io/react/docs/jsx-in-depth.html](http://facebook.github.io/react/docs/jsx-in-depth.html)
