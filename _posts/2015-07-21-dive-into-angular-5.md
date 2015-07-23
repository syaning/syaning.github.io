---
layout: post
title:  AngularJS深入(5)——provider
date:   2015-07-21 22:15:00
---

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

(2) 如果`provider_`是数组，同样的接下来会调用`provider_ = providerInjector.instantiate(provider_)`，所以数组必须是`[desp, fn]`的形式，其中`deps`为依赖，`fn`与（1）中函数的限制相同。例如：

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

由于会被`invoke`调用，因此`$get`的值必须为一个函数，而该函数的返回值，则可以为原始数据类型、对象、函数等等，并无限制。

总值，在调用`provider(name, provider_)`的时候，会将`(name + 'Provider', {$get:function(){/* ... */}})`键值对缓存在`providerCache`中，在注入的时候，则会调用`$get`函数，将其返回值进行诸如，并缓存在`instanceCache`中。

### 2. factory

TBD