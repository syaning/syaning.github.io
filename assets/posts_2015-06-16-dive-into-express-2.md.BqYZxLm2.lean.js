import{_ as i,c as a,a3 as e,o as n}from"./chunks/framework.BjmIUQRb.js";const o=JSON.parse('{"title":"深入理解Express(2)","description":"","frontmatter":{"doctype":"post","title":"深入理解Express(2)","date":"2015-06-16 14:40:00 +0800"},"headers":[],"relativePath":"posts/2015-06-16-dive-into-express-2.md","filePath":"posts/2015-06-16-dive-into-express-2.md"}'),p={name:"posts/2015-06-16-dive-into-express-2.md"};function t(h,s,l,k,r,d){return n(),a("div",null,s[0]||(s[0]=[e(`<h2 id="_5-中间件" tabindex="-1">5. 中间件 <a class="header-anchor" href="#_5-中间件" aria-label="Permalink to &quot;5. 中间件&quot;">​</a></h2><p>在Express中，中间件（Middleware）是一个非常重要的概念。总的来说，中间件就是一个函数，用来处理请求和响应。Express应用事实上就是一个个的中间件的组合。大体上，中间件可以分为路由中间件和非路由中间件，两者主要区别如下：</p><ul><li>非路由中间件主要通过<code>app.use(path, fn)</code>方式添加，而路由中间件主要通过<code>app.VERB(path, fn)</code>或<code>app.route(path)</code>方式添加</li><li>非路由中间件是匹配所有以<code>path</code>开始的请求，而路由中间件是精确匹配<code>path</code>。例如<code>app.use(&#39;/user&#39;, foo)</code>将会匹配所有路径以<code>/user</code>开始的请求，而<code>app.get(&#39;/user&#39;, bar)</code>则仅仅匹配路径是<code>/user</code>的请求。造成这一区别的主要是在构造<code>Layer</code>对象的时候，<code>options.end</code>取值不同，对于非路由中间件，其值为<code>false</code>，对于路由中间件，其值为<code>true</code></li></ul><p>对于非路由中间件，也可以再次进行分类，主要有如下几种：</p><ul><li>普通中间件</li><li>二级路由</li><li>子应用</li></ul><h3 id="_1-普通中间件" tabindex="-1">（1）普通中间件 <a class="header-anchor" href="#_1-普通中间件" aria-label="Permalink to &quot;（1）普通中间件&quot;">​</a></h3><p>普通中间件就是一个普通的函数，例如：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/user&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">req</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;hello user&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><h3 id="_2-二级路由" tabindex="-1">（2）二级路由 <a class="header-anchor" href="#_2-二级路由" aria-label="Permalink to &quot;（2）二级路由&quot;">​</a></h3><p>二级路由也就是将一个<code>Router</code>对象作为中间件。随着应用规模的增长，可能需要配置多条路由，那么就会有很多条<code>app.VERB</code>语句，此时将路由配置相关代码分离出来作为一个单独的模块则会更好一些，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var routes = require(&#39;./routes/index&#39;);</span></span>
<span class="line"><span>var users = require(&#39;./routes/users&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>app.use(&#39;/&#39;, routes);</span></span>
<span class="line"><span>app.use(&#39;/users&#39;, users);</span></span></code></pre></div><p>而在users模块中，代码为：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> express </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;express&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> router </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> express.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Router</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">router.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">req</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;respond with a resource&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> router;</span></span></code></pre></div><p>这个例子也就是使用了二级路由。我们知道，中间件需要是一个函数，而且该函数的参数形式为<code>(req, res, next)</code>形式。Express在设计上很巧妙的一点就是，<code>Router</code>本身就是一个函数，其形式为：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 源码在router/index.js中</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> router</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">req</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	router.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">handle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(req, res, next);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>一个<code>Router</code>对象，在作为中间件容器和作为二级路由的时候，其调用方式也是存在着一定的差异的：</p><ul><li>如果是作为中间件容器，那么在调用<code>app.handle()</code>的时候，会显式地调用<code>router.handle()</code></li><li>如果是作为二级路由，则它本身就是作为中间件而存在的，会在<code>layer.handle_request()</code>的时候，调用<code>router()</code>，从而调用<code>router.handle()</code></li></ul><h3 id="_3-子应用" tabindex="-1">（3）子应用 <a class="header-anchor" href="#_3-子应用" aria-label="Permalink to &quot;（3）子应用&quot;">​</a></h3><p>一个Express应用也可以作为一个中间件，例如：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> subApp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> express</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(subApp);</span></span></code></pre></div>`,20)]))}const c=i(p,[["render",t]]);export{o as __pageData,c as default};
