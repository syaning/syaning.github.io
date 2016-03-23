---
layout: post
title:  Redux入门
date:   2016-03-23 11:40:00 +0800
---

### 参考资料

- [Redux](http://redux.js.org/)

### 1. Redux的核心组成

- Action
- Reducer
- Store

（1） Action

一个Action就是一个普通的对象，所有将会引起状态改变的行为（例如异步请求、用户操作）都会被解释为一个Action，从而传递给Store。一个Action通常具有如下形式：

```javascript
{
    type: ADD_ITEM,
    text: 'hello world'
}
```

其中`type`属性为约定俗称，其它属性可根据需要自行设定。

Action通过Action Creator来创建，Action Creator是一个函数，最终返回一个Action。例如：

```javascript
function addItem(text) {
    return {
        type: ADD_ITEM,
        text
    }
}
```

> 注意：Action只是对行为的一种描述，并不涉及改变状态的具体逻辑

（2） Reducer

Reducer是一个函数，通常为如下形式：

```javascript
function reducer(state = [], action) {
    switch (action.type) {
        case ADD_ITEM:
            return [...state, action.text]
        // other cases
        default:
            return state
    }
}
```

第一个参数表示上一个状态，第二个参数是一个Action对象。因此，Reducer的作用就是，根据之前的`state`以及当前的`action`，计算出当前的`state`。Reducer只负责单纯的状态计算操作。

由于Reducer执行这样的职能，因此Reducer应当具有幂等性，也就是说，给定`state`和`action`，返回的结果应当是唯一确定的。

> 注意：通常情况下，我们会给state一个默认值，作为初始化的值。

（3） Store

Store用来存储应用的状态，是state的事实维护者。Store的常用方法有：

- getState()
- dispatch(action)
- subscribe(listener)

例如：

```javascript
const createStore = require('redux').createStore

var store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))

console.log(store.getState())
// []

store.dispatch(addItem('hello'))
// [ 'hello' ]

store.dispatch(addItem('world'))
// [ 'hello', 'world' ]
```

> 注意：一个应用只有一个Store。

### 2. React+Redux

例子源码在[这里](https://github.com/simplest-demos/simplest-redux-demo)。

React结合Redux使用需要用到`react-redux`模块。

```javascript
const React = require('react')
const ReactDOM = require('react-dom')
const Provider = require('react-redux').Provider
const App = require('./app.jsx')
const store = require('./store')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
```

其中`Provider`是由`react-redux`提供的一个容器，将Store作为属性传递给该容器。

app.jsx源码如下：

```javascript
const React = require('react')
const ReactDOM = require('react-dom')
const actions = require('./action')
const connect = require('react-redux').connect

class App extends React.Component {
    render() {
        return (
            <div>
                <input type="text" ref="input" />
                <button onClick={this.addItem.bind(this)}>
                    Add item
                </button>
                <ul>
                    {this.props.items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        )
    }

    addItem() {
        var input = ReactDOM.findDOMNode(this.refs.input)
        var action = actions.addItem(input.value.trim())
        this.props.dispatch(action)
        input.value = ''
    }
}

function selectItems(state) {
    return {
        items: state.items
    }
}

module.exports = connect(selectItems)(App)
```

其中`connect(selectItems)(App)`的作用是：

- 将所需要的state属性挂载到组建的`props`上
- 为组建的`props`添加`dispatch`方法

于是，在`addItem()`中，才有：

```javascript
var action = actions.addItem(input.value.trim())
this.props.dispatch(action)
```

### 3. 需要强调

- Action仅仅是对将要发生的事情的描述，不涉及改变state的具体逻辑
- Reducer是一个纯函数，给定`state`和`action`，返回值是唯一确定的
- Store只有一个，如果应用复杂的话，可以使用多个Reducer