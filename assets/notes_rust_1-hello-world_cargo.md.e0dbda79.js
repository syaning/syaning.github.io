import{_ as s,o as a,c as n,a as l}from"./app.0f54526d.js";const y=JSON.parse('{"title":"Cargo","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u521B\u5EFA\u9879\u76EE","slug":"\u521B\u5EFA\u9879\u76EE","link":"#\u521B\u5EFA\u9879\u76EE","children":[]},{"level":2,"title":"\u6253\u5305","slug":"\u6253\u5305","link":"#\u6253\u5305","children":[]},{"level":2,"title":"\u53C2\u8003\u8D44\u6599","slug":"\u53C2\u8003\u8D44\u6599","link":"#\u53C2\u8003\u8D44\u6599","children":[]}],"relativePath":"notes/rust/1-hello-world/cargo.md"}'),p={name:"notes/rust/1-hello-world/cargo.md"},e=l(`<h1 id="cargo" tabindex="-1">Cargo <a class="header-anchor" href="#cargo" aria-hidden="true">#</a></h1><p>cargo \u662F Rust \u7684\u5305\u7BA1\u7406\u5668\u3002</p><h2 id="\u521B\u5EFA\u9879\u76EE" tabindex="-1">\u521B\u5EFA\u9879\u76EE <a class="header-anchor" href="#\u521B\u5EFA\u9879\u76EE" aria-hidden="true">#</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ cargo new hello</span></span>
<span class="line"></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> hello</span></span>
<span class="line"><span style="color:#A6ACCD;">$ tree </span><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 Cargo.toml</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2514\u2500\u2500 src</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u2514\u2500\u2500 main.rs</span></span>
<span class="line"></span></code></pre></div><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C<code>cargo new</code> \u4F7F\u7528\u7684\u662F <code>--bin</code> \u9009\u9879\uFF0C\u521B\u5EFA\u7684\u662F\u4E00\u4E2A Binary \u9879\u76EE\u3002\u56E0\u6B64\u4F1A\u9ED8\u8BA4\u521B\u5EFA <code>src/main.rs</code> \u6587\u4EF6\u3002</p><p>\u4E5F\u53EF\u4EE5\u6307\u5B9A <code>--lib</code> \u9009\u9879\uFF0C\u8FD9\u6837\u521B\u5EFA\u51FA\u6765\u7684\u662F\u4E00\u4E2A Library \u9879\u76EE\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ cargo new --lib hello</span></span>
<span class="line"></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> hello</span></span>
<span class="line"><span style="color:#A6ACCD;">$ tree </span><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 Cargo.toml</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2514\u2500\u2500 src</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u2514\u2500\u2500 lib.rs</span></span>
<span class="line"></span></code></pre></div><h2 id="\u6253\u5305" tabindex="-1">\u6253\u5305 <a class="header-anchor" href="#\u6253\u5305" aria-hidden="true">#</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ cargo build</span></span>
<span class="line"><span style="color:#A6ACCD;">$ tree </span><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#82AAFF;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 Cargo.lock</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 Cargo.toml</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 src</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2502   \u2514\u2500\u2500 main.rs</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2514\u2500\u2500 target</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u251C\u2500\u2500 CACHEDIR.TAG</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u2514\u2500\u2500 debug</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u251C\u2500\u2500 build</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u251C\u2500\u2500 deps</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2502   \u251C\u2500\u2500 hello</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2502   \u251C\u2500\u2500 hello.1ebkhbrkkl10rdtu.rcgu.o</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2502   \u251C\u2500\u2500 hello.1jy8mz98r3kdq0to.rcgu.o</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2502   \u251C\u2500\u2500 hello.1oima6mhrulpch5p.rcgu.o</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2502   \u251C\u2500\u2500 hello.3rdu62eo0fatktx3.rcgu.o</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2502   \u251C\u2500\u2500 hello.451mle0s7hicqm36.rcgu.o</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2502   \u251C\u2500\u2500 hello.54ffmkp5b1h92q8k.rcgu.o</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2502   \u251C\u2500\u2500 hello.6w9ya07t0jedxws.rcgu.o</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2502   \u251C\u2500\u2500 hello.d</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2502   \u2514\u2500\u2500 hello.doq7gq3zhpnwt9n.rcgu.o</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u251C\u2500\u2500 examples</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u251C\u2500\u2500 hello</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u251C\u2500\u2500 hello.d</span></span>
<span class="line"><span style="color:#A6ACCD;">        \u2514\u2500\u2500 incremental</span></span>
<span class="line"><span style="color:#A6ACCD;">            \u2514\u2500\u2500 hello-1qyma14vq257f</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u251C\u2500\u2500 s-g1xsrkk6wz-1ivscap-26ktiub8rmwye</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u251C\u2500\u2500 1ebkhbrkkl10rdtu.o</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u251C\u2500\u2500 1jy8mz98r3kdq0to.o</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u251C\u2500\u2500 1oima6mhrulpch5p.o</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u251C\u2500\u2500 3rdu62eo0fatktx3.o</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u251C\u2500\u2500 451mle0s7hicqm36.o</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u251C\u2500\u2500 54ffmkp5b1h92q8k.o</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u251C\u2500\u2500 6w9ya07t0jedxws.o</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u251C\u2500\u2500 dep-graph.bin</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u251C\u2500\u2500 doq7gq3zhpnwt9n.o</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u251C\u2500\u2500 query-cache.bin</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2502   \u2514\u2500\u2500 work-products.bin</span></span>
<span class="line"><span style="color:#A6ACCD;">                \u2514\u2500\u2500 s-g1xsrkk6wz-1ivscap.lock</span></span>
<span class="line"></span></code></pre></div><p>\u7136\u540E\u6267\u884C</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ ./target/debug/hello</span></span>
<span class="line"></span></code></pre></div><p>\u6216\u8005</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ cargo run</span></span>
<span class="line"></span></code></pre></div><h2 id="\u53C2\u8003\u8D44\u6599" tabindex="-1">\u53C2\u8003\u8D44\u6599 <a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a></h2><ul><li><a href="https://doc.rust-lang.org/cargo/index.html" target="_blank" rel="noreferrer">The Cargo Book</a></li></ul>`,17),o=[e];function c(r,t,i,C,A,d){return a(),n("div",null,o)}const g=s(p,[["render",c]]);export{y as __pageData,g as default};
