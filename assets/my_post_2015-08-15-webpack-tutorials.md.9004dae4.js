import{_ as s,o as a,c as n,V as l}from"./chunks/framework.16eef3c0.js";const C=JSON.parse('{"title":"webpack入门教程","description":"","frontmatter":{"layout":"post","title":"webpack入门教程","date":"2015-08-15 21:00:00 +0800"},"headers":[],"relativePath":"my/post/2015-08-15-webpack-tutorials.md"}'),p={name:"my/post/2015-08-15-webpack-tutorials.md"},o=l(`<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>本文内容比较基础，供初学者快速入门参考。</p><p>更多详细信息请参考<a href="http://webpack.github.io/docs/" target="_blank" rel="noreferrer">官方文档</a>。</p></div><h2 id="_1-安装" tabindex="-1">1. 安装 <a class="header-anchor" href="#_1-安装" aria-label="Permalink to &quot;1. 安装&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install -g webpack</span></span></code></pre></div><h2 id="_2-基本使用" tabindex="-1">2. 基本使用 <a class="header-anchor" href="#_2-基本使用" aria-label="Permalink to &quot;2. 基本使用&quot;">​</a></h2><p>假设项目文件结构如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/app</span></span>
<span class="line"><span style="color:#A6ACCD;">  |--index.html</span></span>
<span class="line"><span style="color:#A6ACCD;">  |--main.js</span></span>
<span class="line"><span style="color:#A6ACCD;">  |--mymodule.js</span></span></code></pre></div><p><code>index.html</code>代码如下：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;!</span><span style="color:#F07178;">DOCTYPE</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">en</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">charset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">UTF-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Document</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">title</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">	&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./app.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p><code>main.js</code>和<code>mymodule.js</code>代码如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// main.js</span></span>
<span class="line"><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./mymodule.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// mymodule.js</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">write</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello webpack</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><p>然后执行命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">webpack main.js app.js</span></span></code></pre></div><p>会打包生成<code>app.js</code>文件。</p><h2 id="_3-配置文件" tabindex="-1">3. 配置文件 <a class="header-anchor" href="#_3-配置文件" aria-label="Permalink to &quot;3. 配置文件&quot;">​</a></h2><p>每次手动输入源文件名和输出文件名比较麻烦，可以使用配置文件来进行管理。在<code>app</code>目录下新建<code>webpack.config.js</code>文件，内容如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">entry</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./main.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#F07178;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">app.js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><p>然后执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">webpack</span></span></code></pre></div><p>就会自动生成打包好的文件了。</p><p>但是这样每次改了源文件之后都需要手动执行命令，可以通过添加<code>watch</code>来自动检测文件变化并重新打包。配置文件修改如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">entry</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./main.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#F07178;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">app.js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">watch</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><p>配置文件中可以进行其它各种功能的相关配置，详情可以参看<a href="http://webpack.github.io/docs/configuration.html" target="_blank" rel="noreferrer">官方文档</a>。</p><h2 id="_4-使用loader" tabindex="-1">4. 使用loader <a class="header-anchor" href="#_4-使用loader" aria-label="Permalink to &quot;4. 使用loader&quot;">​</a></h2><p>很多模块打包工具只是针对js文件，而webpack的强大之处在于将模块的概念进行了扩展，认为一切静态文件都是模块，包括css、html模板、字体、CoffeeScript等等。虽然webpack本身依然是只能够处理js文件，但是通过一系列的loader，就可以处理其它文件了。</p><p>下面以<code>css-loader</code>和<code>style-loader</code>为例，演示如何打包样式文件。首先执行如下命令安装依赖模块：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install css-loader style-loader --save-dev</span></span></code></pre></div><p>然后在<code>app</code>目录下新建<code>style.css</code>文件，内容如下：</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">body</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#B2CCD6;">background</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> red</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>然后修改<code>main.js</code>如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./mymodule.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">style!css!./style.css</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>因为webpack不能够直接处理css文件，因此在<code>require</code>语句中需要指明需要的loader，一个文件可以经由多个loader依次处理，loader与loader之间，以及loader与文件名之间用<code>!</code>分隔。在这个例子中，也可以看出，如果使用了多个loader的话，数据流向是从右向左的，也就是从<code>style.css</code>开始，依次经过<code>css-loader</code>和<code>style-loader</code>。</p><p>但是假如有多个css文件的话，每个<code>require</code>语句都需要加上loader说明，很不方便，因此可以在<code>webpack.config.js</code>文件中进行配置，配置如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">module</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#FFCB6B;">loaders</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		test</span><span style="color:#89DDFF;">:</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\.</span><span style="color:#C3E88D;">css</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">		loader</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">style!css</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// or</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">module</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#FFCB6B;">loaders</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		test</span><span style="color:#89DDFF;">:</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\.</span><span style="color:#C3E88D;">css</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">		loaders</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">style</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">css</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>关于loader的更多信息，可以参考：</p><ul><li><a href="http://webpack.github.io/docs/using-loaders.html" target="_blank" rel="noreferrer">Using Loaders</a></li><li><a href="http://webpack.github.io/docs/loaders.html" target="_blank" rel="noreferrer">Loaders</a></li><li><a href="http://webpack.github.io/docs/how-to-write-a-loader.html" target="_blank" rel="noreferrer">How to write a loader</a></li></ul><h2 id="_5-外部依赖" tabindex="-1">5. 外部依赖 <a class="header-anchor" href="#_5-外部依赖" aria-label="Permalink to &quot;5. 外部依赖&quot;">​</a></h2><p>现在假如该例子中需要用到angular，首先在<code>index.html</code>中通过<code>&lt;script&gt;</code>标签引入angular库，然后修改<code>mymodule.js</code>如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> angular </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">angular</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">angular</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">module</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">MyModule</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [])</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>此时如果执行<code>webpack</code>命令会报如下错误：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ERROR in ./mymodule.js</span></span>
<span class="line"><span style="color:#A6ACCD;">Module not found: Error: Cannot resolve module &#39;angular&#39; in /xxx/xxx/app</span></span>
<span class="line"><span style="color:#A6ACCD;"> @ ./mymodule.js 1:14-32</span></span></code></pre></div><p>这是因为webpack无法解析angular依赖模块，此时需要在配置文件中对外部依赖进行配置：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">externals</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">angular</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">: </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>更多信息参考<a href="http://webpack.github.io/docs/configuration.html#externals" target="_blank" rel="noreferrer">configuration#externals</a>。</p><h2 id="_6-输出类型" tabindex="-1">6. 输出类型 <a class="header-anchor" href="#_6-输出类型" aria-label="Permalink to &quot;6. 输出类型&quot;">​</a></h2><p>现在假如我们希望打包后的文件作为一个单独的库，并且遵循AMD规范可以被被requirejs来使用，可以修改配置文件如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#FFCB6B;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">app.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#FFCB6B;">library</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#FFCB6B;">libraryTarget</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">amd</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>此时输出的<code>app.js</code>结构如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">define</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">app</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">angular</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">/* ... */</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#676E95;font-style:italic;">/* ... */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>通过配置<code>output.libraryTarget</code>，可以自定义输出的模块类型，包括AMD，CommonJS，变量等多种输出类型。具体可以参考<a href="http://webpack.github.io/docs/configuration.html#output" target="_blank" rel="noreferrer">configuration#output</a>。</p><h2 id="_7-多文件" tabindex="-1">7. 多文件 <a class="header-anchor" href="#_7-多文件" aria-label="Permalink to &quot;7. 多文件&quot;">​</a></h2><p>现在假如项目目录结构如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">/app</span></span>
<span class="line"><span style="color:#A6ACCD;">  |--components.js</span></span>
<span class="line"><span style="color:#A6ACCD;">  |--index.html</span></span>
<span class="line"><span style="color:#A6ACCD;">  |--main.js</span></span>
<span class="line"><span style="color:#A6ACCD;">  |--mymodule.js</span></span></code></pre></div><p>其中<code>mymodule.js</code>被<code>main.js</code>和<code>components.js</code>所使用。假如我们希望<code>main.js</code>输出为<code>app.js</code>，而<code>components</code>输出为<code>app.components.js</code>，则可以修改配置文件如下：</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">entry</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#FFCB6B;">app</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./main.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">app.coomponents</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./components.js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#FFCB6B;">output</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#FFCB6B;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">[name].js</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>更多信息参考：</p><ul><li><a href="http://webpack.github.io/docs/multiple-entry-points.html" target="_blank" rel="noreferrer">Multiple entry points</a></li><li><a href="http://webpack.github.io/docs/configuration.html#entry" target="_blank" rel="noreferrer">configuration#entry</a></li><li><a href="http://webpack.github.io/docs/code-splitting.html#multiple-entry-chunks" target="_blank" rel="noreferrer">Code Splitting</a></li></ul>`,56),e=[o];function t(c,r,D,y,F,i){return a(),n("div",null,e)}const A=s(p,[["render",t]]);export{C as __pageData,A as default};
