---
layout: post
title:  AngularJS深入(6)——指令
date:   2015-07-28 20:55:00
---

参考资料：

- [Creating Custom Directives](https://docs.angularjs.org/guide/directive)
- [HTML Compiler](https://docs.angularjs.org/guide/compiler)

### 1. 注册指令

指令的注册在`$CompileProvider`中，源码结构如下：

```javascript
this.directive = function registerDirective(name, directiveFactory) {
    assertNotHasOwnProperty(name, 'directive');
    if (isString(name)) {
        assertValidDirectiveName(name);
        assertArg(directiveFactory, 'directiveFactory');
        if (!hasDirectives.hasOwnProperty(name)) {
            hasDirectives[name] = [];
            $provide.factory(name + Suffix, ['$injector', '$exceptionHandler',
                function($injector, $exceptionHandler) {
                    // ... ...
                }
            ]);
        }
        hasDirectives[name].push(directiveFactory);
    } else {
        forEach(name, reverseParams(registerDirective));
    }
    console.log(hasDirectives);
    return this;
};
```

其中，`hasDirectives`的结构为如下形式，即每个指令对应一个指令函数集合：

```javascript
{
    directive_1: [directive_1_factory],
    directive_2: [directive_2_factory_1, directive_2_factory_2],
    // ... ...
}
```

整体的逻辑比较清晰，如果`hasDirectives`中已有相关指令的函数集合，则直接将新的指令函数加进去即可；否则的话，新建指令函数集合（`hasDirectives[name] = []`），并调用`$provider.factory`创建相关的指令Provider，然后将参数中的指令函数加到新创建的指令函数集合中。

对`name`对类型判断，是为了支持如下两种调用方式：

```javascript
app.directive('myDirective', function() { /* ... */ });

app.directive({
    myDirective1: function() { /* ... */ },
    myDirective2: function() { /* ... */ },
    // ... ...
})
```

TBD