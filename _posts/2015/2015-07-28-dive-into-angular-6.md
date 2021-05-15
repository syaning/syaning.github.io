---
layout: post
title:  AngularJS深入(6)——指令
date:   2015-07-28 20:55:00 +0800
---

* TOC
{:toc}

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

### 3. compileNodes

该函数代源码简化如下：

```javascript
function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority, ignoreDirective, previousCompileContext) {
    var linkFns = [],
        attrs, directives, nodeLinkFn, childNodes, childLinkFn, linkFnFound, nodeLinkFnFound;

    for (var i = 0; i < nodeList.length; i++) {
        attrs = new Attributes();

        // we must always refer to nodeList[i] since the nodes can be replaced underneath us.
        directives = collectDirectives(nodeList[i], [], attrs, i === 0 ? maxPriority : undefined,
            ignoreDirective);

        nodeLinkFn = (directives.length) ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement,
            null, [], [], previousCompileContext) : null;

        // ... ...

        childLinkFn = (nodeLinkFn && nodeLinkFn.terminal ||
            !(childNodes = nodeList[i].childNodes) ||
            !childNodes.length) ? null : compileNodes(childNodes,
            nodeLinkFn ? (
                (nodeLinkFn.transcludeOnThisElement || !nodeLinkFn.templateOnThisElement) && nodeLinkFn.transclude) : transcludeFn);

        if (nodeLinkFn || childLinkFn) {
            linkFns.push(i, nodeLinkFn, childLinkFn);
            linkFnFound = true;
            nodeLinkFnFound = nodeLinkFnFound || nodeLinkFn;
        }

        //use the previous context only for the first element in the virtual group
        previousCompileContext = null;
    }

    return linkFnFound ? compositeLinkFn : null;

    function compositeLinkFn(scope, nodeList, $rootElement, parentBoundTranscludeFn) {
        // ... ...
    }
}
```

其主要逻辑是：

- 对参数`nodeList`进行遍历，对其中的每一项执行如下操作：
    - 调用`collectDirectives`搜集该节点上所应用的所有指令
    - 如果没有指令，则为`nodeLinkFn`赋值`null`；否则调用`applyDirectivesToNode`来对节点应用指令，并将返回值赋给`nodeLinkFn`
    - 如果需要，对子节点调用`compileNodes`，并将返回值赋给`childLinkFn`。这是一个递归的过程
    - 如果`nodeLinkFn`或者`childLinkFn`有效，则将`(i, nodeLinkFn, childLinkFn)`这样的一组值加入到`linkFns`数组中；并设置标志`linkFnFound`为`true`，表示找到有link函数
- 如果`linkFnFound`为`true`，则返回函数`compositeLinkFn`，否则返回`null`

接下来看`compositeLinkFn`的逻辑。返回的`compositeLinkFn`使用了闭包，主要涉及到`nodeLinkFnFound`和`linkFns`这两个变量。源码简化如下：

```javascript
function compositeLinkFn(scope, nodeList, $rootElement, parentBoundTranscludeFn) {
    var nodeLinkFn, childLinkFn, node, childScope, i, ii, idx, childBoundTranscludeFn;
    var stableNodeList;

    // ... ...

    for (i = 0, ii = linkFns.length; i < ii;) {
        node = stableNodeList[linkFns[i++]];
        nodeLinkFn = linkFns[i++];
        childLinkFn = linkFns[i++];

        if (nodeLinkFn) {
            // ... ..

            nodeLinkFn(childLinkFn, childScope, node, $rootElement, childBoundTranscludeFn,
                nodeLinkFn);

        } else if (childLinkFn) {
            childLinkFn(scope, node.childNodes, undefined, parentBoundTranscludeFn);
        }
    }
}
```

在对`compileNodes`的分析中，可以知道数组`linkFns`中，每三个元素为一组值。因此在该函数的for循环中，每次取出三个值。如果`nodeLinkFn`不为`null`，则执行`nodeLinkFn`；如果`nodeLinkFn`为`null`但`childLinkFn`不为`null`，则执行`childLinkFn`。

需要注意的是，`nodeLinkFn`为`applyDirectivesToNode`的返回值；而`childLinkFn`则为`compileNodes`的返回值，也就是函数`compositeLinkFn`。因此调用`childLinkFn`，其实也就是`compositeLinkFn`的递归调用，只不过每次传入的参数以及通过闭包所引用到的`nodeLinkFnFound`和`linkFns`这两个值不同而已。

关于此过程，在[第四篇参考资料](http://www.html-js.com/article/Front-end-source-code-analysis-directive-angularjs130-source-code-analysis-of-the-original)中，作者给了一个很好的例子，并画了一幅[非常详细的图](http://gtms01.alicdn.com/tps/i1/TB1fTSPGXXXXXcgapXXCv8sVVXX-1727-1606.jpg)，对于理解整个过程非常有帮助。

### 4. applyDirectivesToNode

该函数源码比较长，而且其中细节逻辑较为复杂，因此并没有完全搞清楚，仅做一个大概的分析。源码结构简化如下：

```javascript
function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn,
    jqCollection, originalReplaceDirective, preLinkFns, postLinkFns,
    previousCompileContext) {

    // ... ...

    // executes all directives on the current element
    for (var i = 0, ii = directives.length; i < ii; i++) {
        // ... ...
    }

    // ... ...

    // might be normal or delayed nodeLinkFn depending on if templateUrl is present
    return nodeLinkFn;

    // ... ...

    function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn, thisLinkFn) {
        // ... ...
    }
}
```

可以看到，该函数主要就是某个节点的所有指令，依次应用到该节点上，最后返回函数`nodeLinkFn`。应用指令的过程比较繁琐，相关代码主要都在for循环中。这里主要看下指令的compile和link相关逻辑。

通过[API文档](https://docs.angularjs.org/api/ng/service/$compile#-compile-)，可以知道：

- 如果定义了`compile`，则`link`无效
- 如果`compile`返回的是一个函数，则作为`postLink`函数；如果返回的是一个对象，则其`pre`属性作为`preLink`，`post`属性作为`postLink`

首先，在注册指令的时候，即`registerDirective`函数中，有如下代码段：

```javascript
if (isFunction(directive)) {
    directive = {
        compile: valueFn(directive)
    };
} else if (!directive.compile && directive.link) {
    directive.compile = valueFn(directive.link);
}
```

即：

- 如果定义的指令是一个函数，则将其作为`compile`的返回值
- 如果没有定义`compile`函数但是定义了`link`，则将`link`作为`compile`函数的返回值

然后，在`applyDirectivesToNode`的循环体中，有如下代码段：

```javascript
if (directive.templateUrl) {
    // ... ...
} else if (directive.compile) {
    try {
        linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
        if (isFunction(linkFn)) {
            addLinkFns(null, linkFn, attrStart, attrEnd);
        } else if (linkFn) {
            addLinkFns(linkFn.pre, linkFn.post, attrStart, attrEnd);
        }
    } catch (e) {
        $exceptionHandler(e, startingTag($compileNode));
    }
}
```

其中函数`addLinkFns`为：

```javascript
function addLinkFns(pre, post, attrStart, attrEnd) {
    if (pre) {
        // ... ...
        preLinkFns.push(pre);
    }
    if (post) {
        // ... ...
        postLinkFns.push(post);
    }
}
```

因此：

- 首先执行`directive.compile`，并将值赋给`linkFn`
- 如果`linkFn`是一个函数，则将其添加到`postLinkFns`数组中；否则将其`pre`属性添加到`preLinkFns`数组中，将其`post`属性添加到`postLinkFns`数组中

### 5. nodeLinkFn

`nodeLinkFn`是函数`applyDirectivesTiNode`的返回值，是一个闭包函数，其源码简化如下：

```javascript
function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn, thisLinkFn) {
    // ... ...

    // PRELINKING
    for (i = 0, ii = preLinkFns.length; i < ii; i++) {
        linkFn = preLinkFns[i];
        invokeLinkFn(linkFn,
            linkFn.isolateScope ? isolateScope : scope,
            $element,
            attrs,
            linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers),
            transcludeFn
        );
    }

    // RECURSION
    // We only pass the isolate scope, if the isolate directive has a template,
    // otherwise the child elements do not belong to the isolate directive.
    var scopeToChild = scope;
    if (newIsolateScopeDirective && (newIsolateScopeDirective.template || newIsolateScopeDirective.templateUrl === null)) {
        scopeToChild = isolateScope;
    }
    childLinkFn && childLinkFn(scopeToChild, linkNode.childNodes, undefined, boundTranscludeFn);

    // POSTLINKING
    for (i = postLinkFns.length - 1; i >= 0; i--) {
        linkFn = postLinkFns[i];
        invokeLinkFn(linkFn,
            linkFn.isolateScope ? isolateScope : scope,
            $element,
            attrs,
            linkFn.require && getControllers(linkFn.directiveName, linkFn.require, $element, elementControllers),
            transcludeFn
        );
    }

    // ... ...
}
```

其主要逻辑为：

- 依次执行`preLinkFns`
- 执行`childLinkFn`
- 逆序依次执行`postLinkFns`

### 6. 案例分析

以[第四篇参考资料](http://www.html-js.com/article/Front-end-source-code-analysis-directive-angularjs130-source-code-analysis-of-the-original)中的例子为例，假设DOM结构如下：

```html
<A><!--has directives-->
    <B></B><!--has directives-->
    <C><!--no directives-->
        <E></E><!--has directives-->
        <F><!--no directives-->
            <G></G><!--no directives-->
        </F>
    </C>
    <D></D><!--has directives-->
</A>
```

其中节点A，B，E，D有指令，节点C，F，G无指令，则`compile(A)`的整体调用过程如下：

```javascript
compile(A)
    compileNodes([A])
        collectiveDirectives(A) // A.directives = [...]
        applyDirectivesToNode(A.directives, A) // A.nodeLinkFn; A.childLinkFn = BCD.compostiteLinkFn
        compileNodes([B, C, D])
            collectiveDirectives(B) // B.directives = [...]
            applyDirectivesToNode(B.directives, B) // B.nodeLinkFn; B.childLinkFn = null
            collectiveDirectives(C) // C.directives = []
            applyDirectivesToNode(C.directives, C) // C.nodeLinkFn = null; C.childLinkFn = EF.compositeLinkFn
            compileNodes([E, F])
                collectiveDirectives(E) // E.directives = [...]
                applyDirectivesToNode(E.directives, E) // E.nodeLinkFn; E.childLinkFn = null
                collectiveDirectives(F) // F.directives = []
                applyDirectivesToNode(F.directives, F) // F.nodeLinkFn = null; F.childLinkFn = null
                compileNodes([G])
                    collectiveDirectives(G) // G.directives = []
                    applyDirectivesToNode(G.directives, G) // G.nodeLinkFn = null; G.childLinkFn = null
                    return null // G.linkFns = []
                return EF.compositeLinkFn //EF.linkFns = [0, E.nodeLinkFn, null]
            collectiveDirectives(D) // D.directives = [...]
            applyDirectivesToNode(D.directives, D) // D.nodeLinkFn; D.childLinkFn = null
            return BCD.compositeLinkFn // BCD.linkFns = [0, B.nodeLinkFn, null, 1, null, EF.compositeLinkFn, 2, D.nodeLinkFn, null]
        return A.compositeLinkFn // A.linkFns = [0, A.nodeLinkFn, BCD.compositeLinkFn]
    return publicLinkFn
```

在`compile(A)`结束后，最终返回的是函数`publicLinkFn`，该函数有一句非常重要的代码，即：

```javascript
if (compositeLinkFn) compositeLinkFn(scope, $linkNode, $linkNode, parentBoundTranscludeFn);
```

而在这里，`compositeLinkFn`也就是`compileNodes([A])`的结果，即`A.compositeLinkFn`。在上面已经对函数`compositeLinkFn`的执行逻辑进行了分析，因此此时调用过程为：

```javascript
A.compositeLinkFn()
    A.nodeLinkFn(BCD.compositeLinkFn)
        A.preLinkFns()
        BCD.compositeLinkFn()
            B.nodeLinkFn(null)
                B.preLinkFns()
                B.postLinkFns()
            EF.compositeLinkFn()
                E.nodeLinkFn(null)
                    E.preLinkFns()
                    E.postLinkFns()
            D.nodeLinkFn(null)
                D.preLinkFns()
                D.postLinkFns()
        A.postLinkFns()
```

这里可以看出link过程中`preLinkFns`和`postLinkFns`的执行顺序。

### 7. 参考资料

- [Creating Custom Directives](https://docs.angularjs.org/guide/directive)
- [HTML Compiler](https://docs.angularjs.org/guide/compiler)
- [$compile](https://docs.angularjs.org/api/ng/service/$compile)
- [angularjs1.3.0源码解析之directive](http://www.html-js.com/article/Front-end-source-code-analysis-directive-angularjs130-source-code-analysis-of-the-original)