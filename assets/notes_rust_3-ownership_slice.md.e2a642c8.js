import{_ as s,o as n,c as a,a as l}from"./app.291da3e0.js";const A=JSON.parse('{"title":"Slice","description":"","frontmatter":{},"headers":[],"relativePath":"notes/rust/3-ownership/slice.md"}'),o={name:"notes/rust/3-ownership/slice.md"},p=l(`<h1 id="slice" tabindex="-1">Slice <a class="header-anchor" href="#slice" aria-hidden="true">#</a></h1><ul><li><code>[start_index..end_index]</code> \u6765\u83B7\u53D6slice\uFF0C\u5176\u4E2D <code>start_index</code> \u548C <code>end_index</code> \u53EF\u7701\u7565</li><li>\u5B57\u7B26\u4E32\u5B57\u9762\u91CF\u662F\u4E00\u4E2A slice <code>&amp;str</code>\uFF0C\u662F\u4E00\u4E2A\u4E0D\u53EF\u53D8\u5F15\u7528</li></ul><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki"><code><span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> s </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">::</span><span style="color:#82AAFF;">from</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hello world</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> s1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">..</span><span style="color:#F78C6C;">5</span><span style="color:#89DDFF;">];</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> s2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">6</span><span style="color:#89DDFF;">..];</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">println!</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;{}</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">{}&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> s1</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> s2</span><span style="color:#89DDFF;">);</span><span style="color:#676E95;"> // hello world</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div>`,3),e=[p];function t(c,r,D,F,y,i){return n(),a("div",null,e)}const d=s(o,[["render",t]]);export{A as __pageData,d as default};
