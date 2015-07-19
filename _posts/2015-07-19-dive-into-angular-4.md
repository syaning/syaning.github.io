---
layout: post
title:  AngularJS深入(4)——模块加载
date:   2015-07-19 15:00:00
---

在AngularJS模块化和依赖注入的基础上，来分析模块加载的详细过程。以如下代码为例：

```html
<div id="app1" ng-app="MyModule">
	<div ng-controller="ctrl"></div>
</div>
<script>
	angular.module('MyModule', [])
		.controller('ctrl', ['$scope', function($scope) {}]);
</script>
```

这里定义了一个叫做`MyModule`的模块。接下来进行分析AngularJS在启动加载的整个过程中各个模块是如何加载的。

通过第一篇的分析，可以知道，AngularJS的加载过程是：

1. `bindJQuery`
2. `publishExternalAPI`
	- 为`angular`对象扩展工具方法
	- 定义`angular.module`方法
	- 注册`ngLocale`和`ng`模块
3. `angularInit`
	- 找到`ng-app`
	- 调用`bootstrap`

其中注册`ng`模块的相关代码如下：

```javascript
angularModule('ng', ['ngLocale'], ['$provide',
    function ngModule($provide) {
        // $$sanitizeUriProvider needs to be before $compileProvider as it is used by it.
        $provide.provider({
            $$sanitizeUri: $$SanitizeUriProvider
        });
        $provide.provider('$compile', $CompileProvider).
        directive({
            a: htmlAnchorDirective,
            input: inputDirective,
            textarea: inputDirective,
            form: formDirective,
            script: scriptDirective,
            select: selectDirective,
            style: styleDirective,
            option: optionDirective,
            ngBind: ngBindDirective,
            ngBindHtml: ngBindHtmlDirective,
            ngBindTemplate: ngBindTemplateDirective,
            ngClass: ngClassDirective,
            ngClassEven: ngClassEvenDirective,
            ngClassOdd: ngClassOddDirective,
            ngCloak: ngCloakDirective,
            ngController: ngControllerDirective,
            ngForm: ngFormDirective,
            ngHide: ngHideDirective,
            ngIf: ngIfDirective,
            ngInclude: ngIncludeDirective,
            ngInit: ngInitDirective,
            ngNonBindable: ngNonBindableDirective,
            ngPluralize: ngPluralizeDirective,
            ngRepeat: ngRepeatDirective,
            ngShow: ngShowDirective,
            ngStyle: ngStyleDirective,
            ngSwitch: ngSwitchDirective,
            ngSwitchWhen: ngSwitchWhenDirective,
            ngSwitchDefault: ngSwitchDefaultDirective,
            ngOptions: ngOptionsDirective,
            ngTransclude: ngTranscludeDirective,
            ngModel: ngModelDirective,
            ngList: ngListDirective,
            ngChange: ngChangeDirective,
            pattern: patternDirective,
            ngPattern: patternDirective,
            required: requiredDirective,
            ngRequired: requiredDirective,
            minlength: minlengthDirective,
            ngMinlength: minlengthDirective,
            maxlength: maxlengthDirective,
            ngMaxlength: maxlengthDirective,
            ngValue: ngValueDirective,
            ngModelOptions: ngModelOptionsDirective
        }).
        directive({
            ngInclude: ngIncludeFillContentDirective
        }).
        directive(ngAttributeAliasDirectives).
        directive(ngEventDirectives);
        $provide.provider({
            $anchorScroll: $AnchorScrollProvider,
            $animate: $AnimateProvider,
            $$animateQueue: $$CoreAnimateQueueProvider,
            $$AnimateRunner: $$CoreAnimateRunnerProvider,
            $browser: $BrowserProvider,
            $cacheFactory: $CacheFactoryProvider,
            $controller: $ControllerProvider,
            $document: $DocumentProvider,
            $exceptionHandler: $ExceptionHandlerProvider,
            $filter: $FilterProvider,
            $interpolate: $InterpolateProvider,
            $interval: $IntervalProvider,
            $http: $HttpProvider,
            $httpParamSerializer: $HttpParamSerializerProvider,
            $httpParamSerializerJQLike: $HttpParamSerializerJQLikeProvider,
            $httpBackend: $HttpBackendProvider,
            $location: $LocationProvider,
            $log: $LogProvider,
            $parse: $ParseProvider,
            $rootScope: $RootScopeProvider,
            $q: $QProvider,
            $$q: $$QProvider,
            $sce: $SceProvider,
            $sceDelegate: $SceDelegateProvider,
            $sniffer: $SnifferProvider,
            $templateCache: $TemplateCacheProvider,
            $templateRequest: $TemplateRequestProvider,
            $$testability: $$TestabilityProvider,
            $timeout: $TimeoutProvider,
            $window: $WindowProvider,
            $$rAF: $$RAFProvider,
            $$asyncCallback: $$AsyncCallbackProvider,
            $$jqLite: $$jqLiteProvider,
            $$HashMap: $$HashMapProvider,
            $$cookieReader: $$CookieReaderProvider
        });
    }
]);
```