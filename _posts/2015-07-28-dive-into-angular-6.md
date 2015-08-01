---
layout: post
title:  AngularJS深入(6)——指令
date:   2015-07-28 20:55:00
---

参考资料：

- [Creating Custom Directives](https://docs.angularjs.org/guide/directive)
- [HTML Compiler](https://docs.angularjs.org/guide/compiler)
- [angularjs1.3.0源码解析之directive](http://www.html-js.com/article/Front-end-source-code-analysis-directive-angularjs130-source-code-analysis-of-the-original)

> 注：本部分源码比较多且逻辑复杂，我也没有完全通读并理解，因此分析过程中难免有不当或错误之处，还请指出。

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

### 2. compile

首先在函数`bootstrap`中，有如下代码：

```javascript
injector.invoke(['$rootScope', '$rootElement', '$compile', '$injector',
    function bootstrapApply(scope, element, compile, injector) {
        scope.$apply(function() {
            element.data('$injector', injector);
            compile(element)(scope);
        });
    }
]);
```

其中最核心的一句是`compile(element)(scope)`，`compile`便是`$CompileProvider`的一个实例，在`$CompileProvider`源码中，`this.$get`最终执行返回的便是`compile`函数。其源码结构如下：

```javascript
function compile($compileNodes, transcludeFn, maxPriority, ignoreDirective,
    previousCompileContext) {

    // ... ...
    var compositeLinkFn = compileNodes($compileNodes, transcludeFn,
        $compileNodes, maxPriority, ignoreDirective, previousCompileContext);
    // ... ...

    return function publicLinkFn(scope, cloneConnectFn, options) {
        // ... ...
        var $linkNode;
        // ... ...

        compile.$$addScopeInfo($linkNode, scope);

        if (cloneConnectFn) cloneConnectFn($linkNode, scope);
        if (compositeLinkFn) compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn);
        return $linkNode;
    };
}
```

其主要逻辑是：

- compile阶段：调用`compileNodes`来对节点进行编译，从而得到`compositeLinkFn`
- link阶段：返回函数`publicLinkFn`，在该函数中主要进行了scope的绑定等操作

接下来分析`compileNodes`函数。

### compileNodes

