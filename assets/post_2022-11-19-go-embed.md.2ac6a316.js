import{_ as s,o as n,c as a,V as l}from"./chunks/framework.16eef3c0.js";const C=JSON.parse('{"title":"将静态资源打包进go binary","description":"","frontmatter":{"layout":"post","title":"将静态资源打包进go binary","date":"2022-11-19 11:00:00 +0800"},"headers":[],"relativePath":"post/2022-11-19-go-embed.md"}'),p={name:"post/2022-11-19-go-embed.md"},o=l(`<p>在使用 Go 进行开发的时候，经常会遇到一些需要以来静态资源的情况，例如：</p><ul><li>配置文件</li><li>管理后台的静态资源（各种 HTML、CSS、JS、图片等）</li></ul><p>在这种情况下，如果最终的发布包是一个二进制文件和一堆所依赖的静态资源，使用起来就会非常不方便，例如：</p><ul><li>由于资源路径等问题导致的资源无法解析</li><li>误删资源文件导致程序崩溃</li></ul><p>在这种情况下，我们可以通过 <code>embed</code> 包将静态资源打包进二进制文件中，这样最终只需要发布一个二进制文件即可。</p><p>通过引入 <code>embed</code> 包以及 <code>//go: embed</code> 指令就可以将静态资源打包进发布包，支持将文件打包为如下三种格式：</p><ul><li><code>string</code></li><li><code>[]byte</code></li><li><code>embed.FS</code></li></ul><p>例如：</p><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">package</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">embed</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">fmt</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//go:embed hello.txt</span></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> s </span><span style="color:#C792EA;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//go:embed hello.txt</span></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> b </span><span style="color:#89DDFF;">[]</span><span style="color:#C792EA;">byte</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//go:embed hello.txt greeting.txt</span></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> f embed</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">FS</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">b</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  data</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> _ </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> f</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ReadFile</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">greeting.txt</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">string</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>基于这样的能力，我们还可以将整个静态网站打包进二进制包，例如管理后台、文档、博客等。参考如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">├── blog</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── 404.html</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── assets</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── favicon.ico</span></span>
<span class="line"><span style="color:#A6ACCD;">│   └── index.html</span></span>
<span class="line"><span style="color:#A6ACCD;">├── go.mod</span></span>
<span class="line"><span style="color:#A6ACCD;">└── main.go</span></span></code></pre></div><div class="language-go"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">package</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">main</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">embed</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">fmt</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">io/fs</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">net/http</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">//go:embed blog</span></span>
<span class="line"><span style="color:#89DDFF;">var</span><span style="color:#A6ACCD;"> f embed</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">FS</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  blog</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> _ </span><span style="color:#89DDFF;">:=</span><span style="color:#A6ACCD;"> fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Sub</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">f</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">blog</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  fmt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Go to http://localhost:8080</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  http</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">Handle</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> http</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FileServer</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">http</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FS</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">blog</span><span style="color:#89DDFF;">)))</span></span>
<span class="line"><span style="color:#A6ACCD;">  http</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ListenAndServe</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">:8080</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">nil)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div>`,12),e=[o];function t(c,D,r,F,y,i){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{C as __pageData,d as default};
