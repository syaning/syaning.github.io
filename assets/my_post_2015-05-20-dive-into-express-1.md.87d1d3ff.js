import{_ as s,o,c as e,V as a}from"./chunks/framework.16eef3c0.js";const l="/assets/handle.a5677b30.png",n="/assets/handle-layer.a4e3f7ef.png",u=JSON.parse('{"title":"深入理解Express(1)","description":"","frontmatter":{"layout":"post","title":"深入理解Express(1)","date":"2015-05-20 22:00:00 +0800"},"headers":[],"relativePath":"my/post/2015-05-20-dive-into-express-1.md"}'),p={name:"my/post/2015-05-20-dive-into-express-1.md"},c=a(`<p>本文主要通过是对<a href="http://expressjs.com/" target="_blank" rel="noreferrer">Express</a>的一个较为深入的分析，至于对Express的源码分析，在我的<a href="https://github.com/syaning/understanding-express" target="_blank" rel="noreferrer">Github</a>上。本文的分析基于Express 4.12.3.</p><h2 id="_1-理解app" tabindex="-1">1. 理解app <a class="header-anchor" href="#_1-理解app" aria-label="Permalink to &quot;1. 理解app&quot;">​</a></h2><p>在使用Express的时候，我们通过如下方式创建一个应用：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> express </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">express</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">express</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">3000</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>而在不使用框架的时候，通常的做法是：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> http </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">http</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createServer</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">req</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">write</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello world</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">end</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">8000</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>通过查看源码，可以发现，<code>express</code>实际上就是一个工厂函数，用来创建<code>app</code>，而<code>app</code>则就是<code>createServer</code>的回调函数。相关源码如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// in express.js</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createApplication</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">app</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">req</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">next</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">handle</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">req</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">next</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ... ...</span></span>
<span class="line"><span style="color:#F07178;">  </span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// in application.js</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">server</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">http</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createServer</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">server</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">listen</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">server</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">arguments</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><p>因此，在使用Express的时候，事实上，所有的请求都是交给<code>app</code>，通过<code>app.handle</code>来处理了。</p><p>通过分析application.js的源码，可以归纳出，<code>app</code>主要有如下属性和方法：</p><ul><li><code>settings</code>，{}，主要是一些设置信息，相关方法有： <ul><li><code>set(setting, value)</code>，有<code>value</code>的时候进行设置，无<code>value</code>的时候进行获取</li><li><code>get(setting)</code></li><li><code>enabled(setting)</code></li><li><code>disabled(setting)</code></li><li><code>enable(setting)</code></li><li><code>disable(setting)</code></li></ul></li><li><code>cache</code>，{}</li><li><code>engines</code>，{}，设置模版引擎，相关方法有： <ul><li><code>engine(ext, fn)</code></li></ul></li><li><code>locals</code>，{}</li><li><code>mountpath</code>，字符串，相关方法有： <ul><li><code>use(path, app)</code>，会设置<code>app</code>的<code>mountpath</code>的值</li><li><code>path()</code>，获取应用的绝对路径值</li></ul></li><li><code>_router</code>，<code>Router</code>对象，相关方法有（由于参数可以有多种形式，因此并未列出参数）： <ul><li><code>route()</code>，创建一条路由，会调用<code>Router.route</code></li><li><code>METHOD()</code>，创建一条路由，并调用VERB方法，会调用<code>Router.route</code></li><li><code>all()</code>，创建一条路由，并调用所有的VERB方法，会调用<code>Router.route</code></li><li><code>param()</code>，会调用<code>Router.param</code></li><li><code>use()</code>，会调用<code>Router.use</code></li></ul></li></ul><h2 id="_2-router" tabindex="-1">2. Router <a class="header-anchor" href="#_2-router" aria-label="Permalink to &quot;2. Router&quot;">​</a></h2><p><code>app</code>有一个<code>_router</code>属性，事实上就是一个<code>Router</code>。<code>Router</code>相当于是一个中间件容器，存放着各种各样的中间件，大体上，可以分为路由中间件和其它中间件。<code>Router</code>的主要属性和方法有：</p><ul><li><code>params</code>，{} <ul><li><code>param()</code></li></ul></li><li><code>_params</code>，[]</li><li><code>caseSensitive</code>，boolean</li><li><code>mergeParam</code>，boolean</li><li><code>strcit</code>，boolean</li><li><code>stack</code>，[]，存放着所有的中间件，相关方法有： <ul><li><code>use()</code>，使用中间件，本质上是向<code>stack</code>中添加一个<code>Layer</code>对象</li><li><code>route()</code>，创建路由中间件，本质上是创建一个<code>Route</code>对象，并使用该<code>Route</code>对象创建一个<code>Layer</code>对象，将此<code>layer</code>对象添加到<code>stack</code>中</li><li><code>METHOD()</code>，创建路由中间件，并添加处理函数，实际上是调用了<code>route()</code>方法</li></ul></li></ul><p>每个中间件都是一个<code>Layer</code>对象，<code>Layer</code>对象的基本属性有：</p><ul><li><code>handle</code>，function，表示中间件函数</li><li><code>name</code>，string，中间件函数的名字，如果为匿名函数则为<code>&lt;anonymous&gt;</code></li><li><code>params</code>，undefined，在执行<code>match</code>的时候赋值</li><li><code>path</code>，undefiend，在执行<code>match</code>的时候赋值</li><li><code>regexp</code>，RegExp，路径的正则表达形式</li><li><code>keys</code>，[]，保存的是路径中的参数及其相关的一些其它信息</li><li><code>route</code>，如果是路由中间件，则该属性为一个<code>Route</code>对象，否则为<code>undefined</code>。该属性不在<code>Layer</code>模块中定义，而是在<code>Router</code>模块中生成实例后定义</li></ul><h2 id="_3-路由机制" tabindex="-1">3. 路由机制 <a class="header-anchor" href="#_3-路由机制" aria-label="Permalink to &quot;3. 路由机制&quot;">​</a></h2><p>在<code>Router</code>的<code>stack</code>中，存放着多个中间件，每一个中间件都是一个<code>Layer</code>对象，如果该中间件是一个路由中间件，则相应的<code>Layer</code>对象的<code>route</code>属性会指向一个<code>Route</code>对象，表示一条路由。<code>Route</code>的主要属性和方法有：</p><ul><li><code>path</code>，string，表示路径</li><li><code>stack</code>，[]，存放的是<code>Layer</code>对象，表示路由处理函数</li><li><code>methods</code>，{}，表明支持哪些HTTP方法，例如<code>{ get: true }</code>，如果使用了<code>all()</code>，则该属性值为<code>{ _all: true }</code></li></ul><p>需要注意的是，<code>Route</code>的<code>stack</code>与<code>Router</code>的<code>stack</code>存放的都是<code>Layer</code>对象，但是这两种<code>Layer</code>之间有少许差别，主要如下：</p><ul><li>都具有<code>handle</code>，<code>name</code>，<code>params</code>，<code>path</code>，<code>regexp</code>，<code>keys</code>属性，这几个属性都是在<code>Layer</code>模块的构造函数中定义的</li><li><code>Router</code>中的<code>Layer</code>对象具有<code>route</code>属性，如果该属性不为<code>undefined</code>，则表明为一个路由中间件；而<code>Route</code>中的<code>Layer</code>对象没有<code>route</code>属性</li><li><code>Route</code>中的<code>Layer</code>对象具有<code>method</code>属性，表明该路由函数的HTTP方法；而<code>Router</code>中的<code>Layer</code>对象没有<code>method</code>属性</li><li><code>Route</code>中的<code>Layer</code>对象的<code>keys</code>属性值均为<code>[]</code>，<code>regexp</code>属性值均为<code>/^\\/?$/i</code>，因为在<code>Route</code>模块中创建<code>Layer</code>对象时使用的是<code>Layer(&#39;/&#39;, {}, fn)</code></li></ul><p>创建路由的主要方法及其调用过程如下：</p><ul><li><code>app.METHOD()</code> → <code>router.route</code> → <code>route.METHOD()</code></li><li><code>app.all()</code> → <code>router.route</code> → <code>route.METHOD()</code></li><li><code>app.route()</code> → <code>router.route</code></li></ul><p>例如：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">all</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/users</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/users/:username</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">route</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>对于同一路径的多次路由添加会创建多条路由，例如：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/users</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">test</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/users</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">foo</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{},</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">bar</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>该例子会创建两条路由，其中第一条路有一个处理函数，而第二条路由有两个处理函数。</p><h2 id="_4-请求处理" tabindex="-1">4. 请求处理 <a class="header-anchor" href="#_4-请求处理" aria-label="Permalink to &quot;4. 请求处理&quot;">​</a></h2><p>当请求到来时，处理过程是<code>app.handle</code> → <code>router.handle</code>，事实上，<code>app.handle</code>调用了<code>router.handle</code>，而<code>router.handle</code>的过程，则是依次对<code>router.stack</code>中存放的中间件进行调用。示例图如下：</p><p><img src="`+l+'" alt="handle request"></p><p><code>router.stack</code>中存的是一个个的<code>Layer</code>对象，用来管理中间件。如果<code>Layer</code>对象表示的是一个路由中间件，则其<code>route</code>属性会指向一个<code>Route</code>对象，而<code>route.stack</code>中存放的也是一个个的<code>Layer</code>对象，用来管理路由处理函数。</p><p>因此，当一个请求到来的时候，会依次通过<code>router.stack</code>中的<code>Layer</code>对象，如果遇到路由中间件，则会依次通过<code>route.stack</code>中的<code>Layer</code>对象。</p><p>对于<code>router.stack</code>中的每个<code>Layer</code>对象，会先判断是否匹配请求路径，如果不匹配，则跳过，继续下一个。在路径匹配的情况下，如果是非路由中间件，则执行该中间件函数；如果是路由中间件，则继续判断该中间件的路由对象能够处理请求的HTTP方法，如果不能够处理，则跳过继续下一个，如果能够处理则对<code>route.stack</code>中的<code>Layer</code>对象（与请求的HTTP方法匹配的）依次执行。示例图如下：</p><p><img src="'+n+'" alt="handle layer"></p><p>在中间件函数执行之前，会先对参数进行预处理，即<code>router.process_params</code>。对于每个参数的预处理只会进行一次，但是由于每个layer执行之前都会有参数预处理的过程，因此有一个缓存系统，来记录哪些参数已经处理过了。</p>',36),t=[c];function r(d,y,D,i,F,A){return o(),e("div",null,t)}const h=s(p,[["render",r]]);export{u as __pageData,h as default};
