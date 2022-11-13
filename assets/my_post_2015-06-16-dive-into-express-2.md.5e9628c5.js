import{_ as s,o as a,c as n,a as p}from"./app.9c5b3fde.js";const C=JSON.parse('{"title":"\u6DF1\u5165\u7406\u89E3Express(2)","description":"","frontmatter":{"layout":"post","title":"\u6DF1\u5165\u7406\u89E3Express(2)","date":"2015-06-16 14:40:00 +0800"},"headers":[{"level":2,"title":"5. \u4E2D\u95F4\u4EF6","slug":"_5-\u4E2D\u95F4\u4EF6","link":"#_5-\u4E2D\u95F4\u4EF6","children":[{"level":3,"title":"\uFF081\uFF09\u666E\u901A\u4E2D\u95F4\u4EF6","slug":"_1-\u666E\u901A\u4E2D\u95F4\u4EF6","link":"#_1-\u666E\u901A\u4E2D\u95F4\u4EF6","children":[]},{"level":3,"title":"\uFF082\uFF09\u4E8C\u7EA7\u8DEF\u7531","slug":"_2-\u4E8C\u7EA7\u8DEF\u7531","link":"#_2-\u4E8C\u7EA7\u8DEF\u7531","children":[]},{"level":3,"title":"\uFF083\uFF09\u5B50\u5E94\u7528","slug":"_3-\u5B50\u5E94\u7528","link":"#_3-\u5B50\u5E94\u7528","children":[]}]}],"relativePath":"my/post/2015-06-16-dive-into-express-2.md"}'),l={name:"my/post/2015-06-16-dive-into-express-2.md"},o=p(`<h2 id="_5-\u4E2D\u95F4\u4EF6" tabindex="-1">5. \u4E2D\u95F4\u4EF6 <a class="header-anchor" href="#_5-\u4E2D\u95F4\u4EF6" aria-hidden="true">#</a></h2><p>\u5728Express\u4E2D\uFF0C\u4E2D\u95F4\u4EF6\uFF08Middleware\uFF09\u662F\u4E00\u4E2A\u975E\u5E38\u91CD\u8981\u7684\u6982\u5FF5\u3002\u603B\u7684\u6765\u8BF4\uFF0C\u4E2D\u95F4\u4EF6\u5C31\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u7528\u6765\u5904\u7406\u8BF7\u6C42\u548C\u54CD\u5E94\u3002Express\u5E94\u7528\u4E8B\u5B9E\u4E0A\u5C31\u662F\u4E00\u4E2A\u4E2A\u7684\u4E2D\u95F4\u4EF6\u7684\u7EC4\u5408\u3002\u5927\u4F53\u4E0A\uFF0C\u4E2D\u95F4\u4EF6\u53EF\u4EE5\u5206\u4E3A\u8DEF\u7531\u4E2D\u95F4\u4EF6\u548C\u975E\u8DEF\u7531\u4E2D\u95F4\u4EF6\uFF0C\u4E24\u8005\u4E3B\u8981\u533A\u522B\u5982\u4E0B\uFF1A</p><ul><li>\u975E\u8DEF\u7531\u4E2D\u95F4\u4EF6\u4E3B\u8981\u901A\u8FC7<code>app.use(path, fn)</code>\u65B9\u5F0F\u6DFB\u52A0\uFF0C\u800C\u8DEF\u7531\u4E2D\u95F4\u4EF6\u4E3B\u8981\u901A\u8FC7<code>app.VERB(path, fn)</code>\u6216<code>app.route(path)</code>\u65B9\u5F0F\u6DFB\u52A0</li><li>\u975E\u8DEF\u7531\u4E2D\u95F4\u4EF6\u662F\u5339\u914D\u6240\u6709\u4EE5<code>path</code>\u5F00\u59CB\u7684\u8BF7\u6C42\uFF0C\u800C\u8DEF\u7531\u4E2D\u95F4\u4EF6\u662F\u7CBE\u786E\u5339\u914D<code>path</code>\u3002\u4F8B\u5982<code>app.use(&#39;/user&#39;, foo)</code>\u5C06\u4F1A\u5339\u914D\u6240\u6709\u8DEF\u5F84\u4EE5<code>/user</code>\u5F00\u59CB\u7684\u8BF7\u6C42\uFF0C\u800C<code>app.get(&#39;/user&#39;, bar)</code>\u5219\u4EC5\u4EC5\u5339\u914D\u8DEF\u5F84\u662F<code>/user</code>\u7684\u8BF7\u6C42\u3002\u9020\u6210\u8FD9\u4E00\u533A\u522B\u7684\u4E3B\u8981\u662F\u5728\u6784\u9020<code>Layer</code>\u5BF9\u8C61\u7684\u65F6\u5019\uFF0C<code>options.end</code>\u53D6\u503C\u4E0D\u540C\uFF0C\u5BF9\u4E8E\u975E\u8DEF\u7531\u4E2D\u95F4\u4EF6\uFF0C\u5176\u503C\u4E3A<code>false</code>\uFF0C\u5BF9\u4E8E\u8DEF\u7531\u4E2D\u95F4\u4EF6\uFF0C\u5176\u503C\u4E3A<code>true</code></li></ul><p>\u5BF9\u4E8E\u975E\u8DEF\u7531\u4E2D\u95F4\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u518D\u6B21\u8FDB\u884C\u5206\u7C7B\uFF0C\u4E3B\u8981\u6709\u5982\u4E0B\u51E0\u79CD\uFF1A</p><ul><li>\u666E\u901A\u4E2D\u95F4\u4EF6</li><li>\u4E8C\u7EA7\u8DEF\u7531</li><li>\u5B50\u5E94\u7528</li></ul><h3 id="_1-\u666E\u901A\u4E2D\u95F4\u4EF6" tabindex="-1">\uFF081\uFF09\u666E\u901A\u4E2D\u95F4\u4EF6 <a class="header-anchor" href="#_1-\u666E\u901A\u4E2D\u95F4\u4EF6" aria-hidden="true">#</a></h3><p>\u666E\u901A\u4E2D\u95F4\u4EF6\u5C31\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/user</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">req</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello user</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#82AAFF;">next</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-\u4E8C\u7EA7\u8DEF\u7531" tabindex="-1">\uFF082\uFF09\u4E8C\u7EA7\u8DEF\u7531 <a class="header-anchor" href="#_2-\u4E8C\u7EA7\u8DEF\u7531" aria-hidden="true">#</a></h3><p>\u4E8C\u7EA7\u8DEF\u7531\u4E5F\u5C31\u662F\u5C06\u4E00\u4E2A<code>Router</code>\u5BF9\u8C61\u4F5C\u4E3A\u4E2D\u95F4\u4EF6\u3002\u968F\u7740\u5E94\u7528\u89C4\u6A21\u7684\u589E\u957F\uFF0C\u53EF\u80FD\u9700\u8981\u914D\u7F6E\u591A\u6761\u8DEF\u7531\uFF0C\u90A3\u4E48\u5C31\u4F1A\u6709\u5F88\u591A\u6761<code>app.VERB</code>\u8BED\u53E5\uFF0C\u6B64\u65F6\u5C06\u8DEF\u7531\u914D\u7F6E\u76F8\u5173\u4EE3\u7801\u5206\u79BB\u51FA\u6765\u4F5C\u4E3A\u4E00\u4E2A\u5355\u72EC\u7684\u6A21\u5757\u5219\u4F1A\u66F4\u597D\u4E00\u4E9B\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">var routes = require(&#39;./routes/index&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">var users = require(&#39;./routes/users&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">app.use(&#39;/&#39;, routes);</span></span>
<span class="line"><span style="color:#A6ACCD;">app.use(&#39;/users&#39;, users);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u800C\u5728users\u6A21\u5757\u4E2D\uFF0C\u4EE3\u7801\u4E3A\uFF1A</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> express </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">express</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> router </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> express</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Router</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">req</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">send</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">respond with a resource</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> router</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u4E2A\u4F8B\u5B50\u4E5F\u5C31\u662F\u4F7F\u7528\u4E86\u4E8C\u7EA7\u8DEF\u7531\u3002\u6211\u4EEC\u77E5\u9053\uFF0C\u4E2D\u95F4\u4EF6\u9700\u8981\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u800C\u4E14\u8BE5\u51FD\u6570\u7684\u53C2\u6570\u5F62\u5F0F\u4E3A<code>(req, res, next)</code>\u5F62\u5F0F\u3002Express\u5728\u8BBE\u8BA1\u4E0A\u5F88\u5DE7\u5999\u7684\u4E00\u70B9\u5C31\u662F\uFF0C<code>Router</code>\u672C\u8EAB\u5C31\u662F\u4E00\u4E2A\u51FD\u6570\uFF0C\u5176\u5F62\u5F0F\u4E3A\uFF1A</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">// \u6E90\u7801\u5728router/index.js\u4E2D</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">router</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">req</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">router</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">handle</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">req</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">next</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>\u4E00\u4E2A<code>Router</code>\u5BF9\u8C61\uFF0C\u5728\u4F5C\u4E3A\u4E2D\u95F4\u4EF6\u5BB9\u5668\u548C\u4F5C\u4E3A\u4E8C\u7EA7\u8DEF\u7531\u7684\u65F6\u5019\uFF0C\u5176\u8C03\u7528\u65B9\u5F0F\u4E5F\u662F\u5B58\u5728\u7740\u4E00\u5B9A\u7684\u5DEE\u5F02\u7684\uFF1A</p><ul><li>\u5982\u679C\u662F\u4F5C\u4E3A\u4E2D\u95F4\u4EF6\u5BB9\u5668\uFF0C\u90A3\u4E48\u5728\u8C03\u7528<code>app.handle()</code>\u7684\u65F6\u5019\uFF0C\u4F1A\u663E\u5F0F\u5730\u8C03\u7528<code>router.handle()</code></li><li>\u5982\u679C\u662F\u4F5C\u4E3A\u4E8C\u7EA7\u8DEF\u7531\uFF0C\u5219\u5B83\u672C\u8EAB\u5C31\u662F\u4F5C\u4E3A\u4E2D\u95F4\u4EF6\u800C\u5B58\u5728\u7684\uFF0C\u4F1A\u5728<code>layer.handle_request()</code>\u7684\u65F6\u5019\uFF0C\u8C03\u7528<code>router()</code>\uFF0C\u4ECE\u800C\u8C03\u7528<code>router.handle()</code></li></ul><h3 id="_3-\u5B50\u5E94\u7528" tabindex="-1">\uFF083\uFF09\u5B50\u5E94\u7528 <a class="header-anchor" href="#_3-\u5B50\u5E94\u7528" aria-hidden="true">#</a></h3><p>\u4E00\u4E2AExpress\u5E94\u7528\u4E5F\u53EF\u4EE5\u4F5C\u4E3A\u4E00\u4E2A\u4E2D\u95F4\u4EF6\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> subApp </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">express</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(subApp)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div>`,20),e=[o];function c(r,t,D,y,F,A){return a(),n("div",null,e)}const d=s(l,[["render",c]]);export{C as __pageData,d as default};
