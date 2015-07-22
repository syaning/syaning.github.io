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