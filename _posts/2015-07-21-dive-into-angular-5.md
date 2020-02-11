---
layout: post
title:  AngularJS深入(5)——provider
date:   2015-07-21 22:15:00 +0800
---

* TOC
{:toc}

在使用AngularJS的时候，可能需要创建各种各样的服务，这个时候，需要告诉AngularJS如何创建这些服务，这便是Provider。在实际使用的时候，会有`provider`，`factory`，`service`，`value`，`constant`，事实上，它们都是Provider，从`factory`到`constant`，只不过是对`provider`的一步步封装。相关源码都在函数`createInjector`中。

### 1. provider

源码如下：

```javascript
function provider(name, provider_) {
	assertNotHasOwnProperty(name, 'service');
	if (isFunction(provider_) || isArray(provider_)) {
		provider_ = providerInjector.instantiate(provider_);
	}
	if (!provider_.$get) {
		throw $injectorMinErr('pget', "Provider '{0}' must define $get factory method.", name);
	}
	return providerCache[name + providerSuffix] = provider_;
}
```

首先，一个Provider的名字不可以是`hasOwnProperty`，然后，如果`provider_`是函数或者数组的话，调用`providerInjector.instantiate`将其实例化。之后进行判断，如果`provider_`没有`$get`属性，则报错。然后将`provider_`缓存在`providerCache`中。

下面来分析对参数`provider_`的约束。

（1） 如果`provider_`是函数，那么会调用`provider_ = providerInjector.instantiate(provider_)`对其再次赋值，相当于以`provider_`作为构造函数来创建实例。因此在构造函数中，必须要有对`$get`的操作，因此如下形式都是可以的：

```javascript
app.provider('greeting', function() {
	this.$get = function() {
		return {
			sayHello: function() {
				console.log('hello world');
			}
		};
	};
});

// or

app.provider('greeting', function() {
	return {
		$get: function() {
			return {
				sayHello: function() {
					console.log('hello world');
				}
			};
		}
	};
});
```

(2) 如果`provider_`是数组，同样的接下来会调用`provider_ = providerInjector.instantiate(provider_)`，所以数组必须是`[deps, fn]`的形式，其中`deps`为依赖，`fn`与（1）中函数的限制相同。例如：

```javascript
app.provider('greeting', ['$injector', function($injector) {
	this.$get = function() {
		return {
			sayHello: function() {
				console.log('hello world', $injector);
			}
		};
	};
}]);
```

（3）如果`provider_`是一个对象字面量，则它必须要有`$get`属性，例如：

```javascript
app.provider('greeting', {
	$get: function() {
		return {
			sayHello: function() {
				console.log('hello world');
			}
		};
	}
});
```

接下来讨论对`$get`的约束。在定义`instanceInjector`的时候，代码如下：

```javascript
instanceInjector = (instanceCache.$injector =
	createInternalInjector(instanceCache, function(serviceName, caller) {
		var provider = providerInjector.get(serviceName + providerSuffix, caller);
		return instanceInjector.invoke(provider.$get, provider, undefined, serviceName);
	}));
```

由于会被`invoke`调用，因此`$get`的值必须为一个函数或者`[deps, fn]`形式的数组。而函数的返回值，则可以为原始数据类型、对象、函数等等，并无限制。

总之，在调用`provider(name, provider_)`的时候，会将`(name + 'Provider', {$get:function(){/* ... */}})`键值对缓存在`providerCache`中，在注入的时候，则会调用`$get`函数，将其返回值进行注入，并缓存在`instanceCache`中。

### 2. factory

源码如下：

```javascript
function factory(name, factoryFn, enforce) {
	return provider(name, {
		$get: enforce !== false ? enforceReturnValue(name, factoryFn) : factoryFn
	});
}
```

可以看到，`factory`事实上是调用了`provider`方法，而第二个参数`factoryFn`，事实上也就是上面的`$get`的值，因此应当符合对`$get`的约束。

因此上面的例子可以这样写：

```javascript
app.factory('greeting', function() {
	return {
		sayHello: function() {
			console.log('hello world');
		}
	};
});
```

注意到`factory`的源码中函数有第三个参数`enforce`，也就是说是否强制返回值，如果函数没有返回值（包括显式返回值为`undefined`）且第三个参数不为`false`的时候，就回报错，相关源码如下：

```javascript
function enforceReturnValue(name, factory) {
	return function enforcedReturnValue() {
		var result = instanceInjector.invoke(factory, this);
		if (isUndefined(result)) {
			throw $injectorMinErr('undef', "Provider '{0}' must return a value from $get factory method.", name);
		}
		return result;
	};
}
```

然而在使用的过程中，会发现，即使显示声明了`enforce`为`false`，还是会报错，例如：

```javascript
app.factory('greeting', function() {
	console.log('hello world');
}, false);

// Error: [$injector:undef] Provider 'greeting' must return a value from $get factory method.
```

这主要是由`supportObject`引起的，因为`providerCache.$provide.factory`的值实际上是`supportObject(factory)`，而`supportObject`源码如下：

```javascript
function supportObject(delegate) {
	return function(key, value) {
		if (isObject(key)) {
			forEach(key, reverseParams(delegate));
		} else {
			return delegate(key, value);
		}
	};
}
```

可以发现，经过`supportObject`处理后，函数的有效参数值最多只有两个了，因此第三个参数`false`也就被忽略掉了。

### 3. service

源码如下：

```javascript
function service(name, constructor) {
	return factory(name, ['$injector', function($injector) {
		return $injector.instantiate(constructor);
	}]);
}
```

可以看到，实质上是调用了`factory`，第二个参数`constructor`是作为构造函数，最终返回的是该构造函数表示的类的一个实例。由于会调用`$injector.instantiate(constructor)`，因此`constructor`必须是一个函数或者`[deps, fn]`的形式。

因此上面的例子可以写成：

```javascript
app.service('greeting', function() {
	this.sayHello = function() {
		console.log('hello world');
	};
});

// or

app.service('greeting', function() {
	return {
		sayHello: function() {
			console.log('hello world');
		}
	};
});
```

### 4. value

源码如下：

```javascript
function value(name, val) {
	return factory(name, valueFn(val), false);
}
```

可以看到，也是调用了`factory`。其中`valueFn`的作用是将一个值包装为函数，源码如下：

```javascript
function valueFn(value) {
	return function() {
		return value;
	};
}
```

### 5. constant

源码如下：

```javascript
function constant(name, value) {
	assertNotHasOwnProperty(name, 'constant');
	providerCache[name] = value;
	instanceCache[name] = value;
}
```

可以看到，该方法只是对`providerCache`和`instanceCache`进行了属性设定。

### 6. value & constant

（1）`value`设定的值是可以改变的，而`constant`设定的值是不可变的，例如：

```javascript
app.value('greeting', 'hello value')
	.value('greeting', 'hello world ')
	.controller('ctrl', ['greeting', function(greeting) {
		console.log(greeting); // hello world
	}]);

////////////////////

app.constant('greeting', 'hello constant')
	.constant('greeting', 'hello world ')
	.controller('ctrl', ['greeting', function(greeting) {
		console.log(greeting); // hello constant
	}]);
```

实现机制在函数`setUpModuleLoader`中。部分相关源码如下：

```javascript
var moduleInstance = {
    _invokeQueue: invokeQueue,
    value: invokeLater('$provide', 'value'),
    constant: invokeLater('$provide', 'constant', 'unshift'),
    // ... ...
};

function invokeLater(provider, method, insertMethod, queue) {
    if (!queue) queue = invokeQueue;
    return function() {
        queue[insertMethod || 'push']([provider, method, arguments]);
        return moduleInstance;
    };
}
```

在调用`value`的时候，用的是数组的`push`方法；而调用`constant`的时候，用的是数组的`unshift`方法。在加载模块的时候，会依次执行`_invokeQueue`中的内容。对于通过`value`添加的值，会按照声明的顺序进行设定，因此后面的值会覆盖掉前面的值；而对于通过`constant`添加的值，会按照声明的逆序进行设定，因此最后得到的值为第一次设定的值，从而就实现了常量的效果。

（2）在`config`中，`value`不可以被注入，而`constant`可以被注入，例如：

```javascript
app.constant('greeting', 'hello world')
	.config(function(greeting) {
		console.log(greeting); // hello world
	});

////////////////////

app.value('greeting', 'hello world')
	.config(function(greeting) {
		console.log(greeting); // Error: [$injector:unpr] Unknown provider: greeting
	});
```

这是因为在使用`value`的时候，实际上是将`greetingProvider`换存在了`providerCache`中；而使用`constant`的时候，则是将`greeting`换存在了`providerCache`中。然后在执行模块的`_configBlocks`的时候，会在`providerCache`中查找注入的依赖`greeting`，因此对于`value`来说，自然是找不到了。

### 7. provider, factory & service

这三者的关系非常密切，看如下例子：

```javascript
function Greeting() {
	this.sayHello = function() {
		console.log('hello world');
	};
}

app.provider('greetingFromProvider', function() {
		this.$get = function() {
			return new Greeting();
		}
	})
	.factory('greetingFromFactory', function() {
		return new Greeting();
	})
	.service('greetingFromService', Greeting)
	.controller('ctrl', ['greetingFromProvider', 'greetingFromFactory', 'greetingFromService',
		function(gp, gf, gs) {
			gp.sayHello();
			gf.sayHello();
			gs.sayHello();
		}
	]);
```

可以简单理解为`service`接收的参数是构造函数，`factory`接收的参数是工厂函数，而该工厂函数是作为`provider`中的`$get`属性而存在的。但是`provider`比`factory`更加灵活可配置，因此可以理解为可配置的工厂函数。例如：

```javascript
app.provider('greeting', function() {
		var name = 'world';

		this.$get = function() {
			return {
				sayHello: function() {
					console.log('hello ' + name);
				}
			};
		};

		this.setName = function(newName) {
			name = newName;
		};
	})
	.config(function(greetingProvider) {
		greetingProvider.setName('alex');
	})
	.controller('ctrl', function(greeting) {
		greeting.sayHello(); // hello alex
	});
```