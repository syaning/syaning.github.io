### 1. combineReducers

通常来说，一个应用会涉及到多个状态，此时使用一个Reudcer会变得非常不直观。例如：

```javascript
initialState = {
    todos: [],
    counter: 0
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                todos: [...state.todos, action.text],
                counter: state.counter
            }
        case 'INCREASE_COUNTER':
            return {
                todos: state.todos,
                counter: state.counter + 1
            }
        default:
            return state
    }
}
```

在这种情况下，可以将Reducer进行拆分，然后通过`combineReducers`方法来组合。例如：

```javascript
function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.text]
        default:
            return state
    }
}

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREASE_COUNTER':
            return state + 1
        default:
            return state
    }
}

var reducer = combineReducers({
    todos,
    counter
})
```

其实，`combineReducers`的原理非常简单，就是把state进行拆分，交给子Reducer进行计算处理。上面的代码等同于：

```javascript
function reducer(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        counter: counter(state.counter, action)
    }
}
```

> 该部分内容可参考[这里](https://github.com/reactjs/redux/issues/428#issuecomment-129223274)。

### createStore

`createStore`的原理也非常简单，下面是一个简单的实现，描述了该方法的主要逻辑：

```javascript
function myCreateStore(reducer, initialState) {
    var listeners = []
    var state = initialState

    function getState() {
        return state
    }

    function subscribe(listener) {
        listeners.push(listener)
    }

    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    function replaceReducer(nextReducer) {
        reducer = nextReducer
        dispatch({ type: 'INIT' })
    }

    dispatch({ type: 'INIT' })

    return {
        getState,
        subscribe,
        dispatch,
        replaceReducer
    }
}
```

- 内部保存了`state`和`listeners`两个变量
- `subscribe(listener)`操作就是向`listeners`中添加监听函数
- `dispatch(action)`操作会计算新的`state`，并以此执行监听函数
- `replaceReducer(nextReducer)`可以更换Reducer，同时触发初始化Action

在Redux的源码中，`subscribe(listener)`的实现如下：

```javascript
function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
    }
}

function subscribe(listener) {
    // ...

    var isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
        if (!isSubscribed) {
            return
        }

        isSubscribed = false

        ensureCanMutateNextListeners()
        var index = nextListeners.indexOf(listener)
        nextListeners.splice(index, 1)
    }
}
```

首先，`subscribe(listener)`方法返回的是一个`unsubscribe()`函数，因此可以非常容易地取消某个监听器。同时有一个辅助方法`ensureCanMutateNextListeners()`。这是考虑到，在执行某个监听函数的时候，可能会添加新的监听函数，或者取消某个监听函数。为了让这些改变不影响当前的监听函数列表的执行，因此在改变之前，先拷贝一份副本（即`nextListeners`），然后对该副本进行操作，从而所有的改变会在下一次`dispatch(action)`的时候生效。

例如：

```javascript
var store = createStore(reducer)

var cancelHello = store.subscribe(function() {
    console.log('hello')
    cancelWorld()
})
var cancelWorld = store.subscribe(function() {
    console.log('world')
})

store.dispatch({ type: 'INCREASE_COUNTER' })
// hello
// world

store.dispatch({ type: 'INCREASE_COUNTER' })
// hello
```