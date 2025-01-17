import{_ as i,c as a,a3 as n,o as e}from"./chunks/framework.BjmIUQRb.js";const E=JSON.parse('{"title":"理解Web路由","description":"","frontmatter":{"doctype":"post","title":"理解Web路由","date":"2017-01-10 15:00:00 +0800"},"headers":[],"relativePath":"posts/2017-01-10-web-route.md","filePath":"posts/2017-01-10-web-route.md"}'),p={name:"posts/2017-01-10-web-route.md"};function t(h,s,l,k,r,d){return e(),a("div",null,s[0]||(s[0]=[n(`<h2 id="_1-什么是路由" tabindex="-1">1. 什么是路由 <a class="header-anchor" href="#_1-什么是路由" aria-label="Permalink to &quot;1. 什么是路由&quot;">​</a></h2><p>在Web开发过程中，经常会遇到『路由』的概念。那么，到底什么是路由？简单来说，路由就是URL到函数的映射。</p><h2 id="_2-router和route的区别" tabindex="-1">2. router和route的区别 <a class="header-anchor" href="#_2-router和route的区别" aria-label="Permalink to &quot;2. router和route的区别&quot;">​</a></h2><p><code>route</code>就是一条路由，它将一个URL路径和一个函数进行映射，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/users        -&gt;  getAllUsers()</span></span>
<span class="line"><span>/users/count  -&gt;  getUsersCount()</span></span></code></pre></div><p>这就是两条路由，当访问<code>/users</code>的时候，会执行<code>getAllUsers()</code>函数；当访问<code>/users/count</code>的时候，会执行<code>getUsersCount()</code>函数。</p><p>而<code>router</code>可以理解为一个容器，或者说一种机制，它管理了一组<code>route</code>。简单来说，<code>route</code>只是进行了URL和函数的映射，而在当接收到一个URL之后，去路由映射表中查找相应的函数，这个过程是由<code>router</code>来处理的。一句话概括就是 &quot;<a href="http://english.stackexchange.com/questions/182441/what-is-the-difference-between-router-and-route#answer-182443" target="_blank" rel="noreferrer">The router routes you to a route</a>&quot;。</p><h2 id="_3-服务器端路由" tabindex="-1">3. 服务器端路由 <a class="header-anchor" href="#_3-服务器端路由" aria-label="Permalink to &quot;3. 服务器端路由&quot;">​</a></h2><p>对于服务器来说，当接收到客户端发来的HTTP请求，会根据请求的URL，来找到相应的映射函数，然后执行该函数，并将函数的返回值发送给客户端。对于最简单的静态资源服务器，可以认为，所有URL的映射函数就是一个文件读取操作。对于动态资源，映射函数可能是一个数据库读取操作，也可能是进行一些数据的处理，等等。</p><p>以<a href="http://expressjs.com/" target="_blank" rel="noreferrer">Express</a>为例，</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">req</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sendFile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;index&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/users&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">req</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  db.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">queryAllUsers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> res.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(data))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>这里定义了两条路由：</p><ul><li>当访问<code>/</code>的时候，会返回<code>index</code>页面</li><li>当访问<code>/users</code>的时候，会从数据库中取出所有用户数据并返回</li></ul><blockquote><p><strong>不仅仅是URL</strong></p><p>在<code>router</code>匹配<code>route</code>的过程中，不仅会根据URL来匹配，还会根据请求的方法来看是否匹配。例如上面的例子，如果通过<code>POST</code>方法来访问<code>/users</code>，就会找不到正确的路由。</p></blockquote><h2 id="_4-客户端路由" tabindex="-1">4. 客户端路由 <a class="header-anchor" href="#_4-客户端路由" aria-label="Permalink to &quot;4. 客户端路由&quot;">​</a></h2><p>对于客户端（通常为浏览器）来说，路由的映射函数通常是进行一些DOM的显示和隐藏操作。这样，当访问不同的路径的时候，会显示不同的页面组件。客户端路由最常见的有以下两种实现方案：</p><ul><li>基于Hash</li><li>基于History API</li></ul><p>(1) 基于Hash</p><p>我们知道，URL中<code>#</code>及其后面的部分为<code>hash</code>。例如：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;url&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> url.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;http://example.com/a/b/#/foo/bar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a.hash)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; #/foo/bar</span></span></code></pre></div><p>hash仅仅是客户端的一个状态，也就是说，当向服务器发请求的时候，hash部分并不会发过去。</p><p>通过监听<code>window</code>对象的<code>hashChange</code>事件，可以实现简单的路由。例如：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onhashchange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hash </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> window.location.hash</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hash.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">substring</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  switch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (path) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    case</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      showHome</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      break</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    case</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/users&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      showUsersList</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      break</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      show404NotFound</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>(2) 基于History API</p><p>通过HTML5 History API可以在不刷新页面的情况下，直接改变当前URL。详细用法可以参考：</p><ul><li><a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API" target="_blank" rel="noreferrer">Manipulating the browser history</a></li><li><a href="https://css-tricks.com/using-the-html5-history-api/" target="_blank" rel="noreferrer">Using the HTML5 History API</a></li></ul><p>我们可以通过监听<code>window</code>对象的<code>popstate</code>事件，来实现简单的路由：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onpopstate</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> window.location.pathname</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  switch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (path) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    case</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      showHome</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      break</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    case</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/users&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      showUsersList</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      break</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      show404NotFound</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>但是这种方法只能捕获前进或后退事件，无法捕获<code>pushState</code>和<code>replaceState</code>，一种最简单的解决方法是替换<code>pushState</code>方法，例如：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pushState </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> history.pushState</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">history.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pushState</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  pushState.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apply</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(history, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">arguments</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // emit a event or just run a callback</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  emitEventOrRunCallback</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>不过，最好的方法还是使用实现好的<a href="https://github.com/mjackson/history" target="_blank" rel="noreferrer">history</a>库。</p><p>(3) 两种实现的比较</p><p>总的来说，基于Hash的路由，兼容性更好；基于History API的路由，更加直观和正式。</p><p>但是，有一点很大的区别是，基于Hash的路由不需要对服务器做改动，基于History API的路由需要对服务器做一些改造。下面来详细分析。</p><p>假设服务器只有如下文件（script.js被index.html所引用）：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/-</span></span>
<span class="line"><span> |- index.html</span></span>
<span class="line"><span> |- script.js</span></span></code></pre></div><p>基于Hash的路径有：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http://example.com/</span></span>
<span class="line"><span>http://example.com/#/foobar</span></span></code></pre></div><p>基于History API的路径有：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>http://example.com/</span></span>
<span class="line"><span>http://example.com/foobar</span></span></code></pre></div><p>当直接访问<code>http://example.com/</code>的时候，两者的行为是一致的，都是返回了<code>index.html</code>文件。</p><p>当从<code>http://example.com/</code>跳转到<code>http://example.com/#/foobar</code>或者<code>http://example.com/foobar</code>的时候，也都是正常的，因为此时已经加载了页面以及脚本文件，所以路由跳转正常。</p><p>当直接访问<code>http://example.com/#/foobar</code>的时候，实际上向服务器发起的请求是<code>http://example.com/</code>，因此会首先加载页面及脚本文件，接下来脚本执行路由跳转，一切正常。</p><p>当直接访问<code>http://example.com/foobar</code>的时候，实际上向服务器发起的请求也是<code>http://example.com/foobar</code>，然而服务器端只能匹配<code>/</code>而无法匹配<code>/foobar</code>，因此会出现404错误。</p><p>因此如果使用了基于History API的路由，需要改造服务器端，使得访问<code>/foobar</code>的时候也能返回<code>index.html</code>文件，这样当浏览器加载了页面及脚本之后，就能进行路由跳转了。</p><h2 id="_5-动态路由" tabindex="-1">5. 动态路由 <a class="header-anchor" href="#_5-动态路由" aria-label="Permalink to &quot;5. 动态路由&quot;">​</a></h2><p>上面提到的例子都是静态路由，也就是说，路径都是固定的。但是有时候我们需要在路径中传入参数，例如获取某个用户的信息，我们不可能为每个用户创建一条路由，而是在通过捕获路径中的参数（例如用户id）来实现。</p><p>例如在<a href="http://expressjs.com/" target="_blank" rel="noreferrer">Express</a>中：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/user/:id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">req</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // ... ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>在<a href="http://flask.pocoo.org/" target="_blank" rel="noreferrer">Flask</a>中：</p><div class="language-py vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">@app.route</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/user/&lt;user_id&gt;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get_user_info</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(user_id):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    pass</span></span></code></pre></div><h2 id="_6-严格路由" tabindex="-1">6. 严格路由 <a class="header-anchor" href="#_6-严格路由" aria-label="Permalink to &quot;6. 严格路由&quot;">​</a></h2><p>在很多情况下，会遇到<code>/foobar</code>和<code>/foobar/</code>的情况，它们看起来非常类似，然而实际上有所区别，具体的行为也是视服务器设置而定。</p><p>在<a href="http://flask.pocoo.org/docs/0.10/quickstart/#variable-rules" target="_blank" rel="noreferrer">Flask的文档</a>中，提到，末尾有斜线的路径，类比于文件系统的一个目录；末尾没有斜线的路径，类比于一个文件。因此访问<code>/foobar</code>的时候，可能会重定向到<code>/foobar/</code>，而反过来则不会。</p><p>如果使用的是<a href="http://expressjs.com/" target="_blank" rel="noreferrer">Express</a>，默认这两者是一样的，也可以通过<code>app.set</code>来设置<code>strict routing</code>，来区别对待这两种情况。</p>`,55)]))}const c=i(p,[["render",t]]);export{E as __pageData,c as default};
