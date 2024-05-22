import{_ as s,o as a,c as n,V as l}from"./chunks/framework.16eef3c0.js";const D=JSON.parse('{"title":"Go交叉编译","description":"","frontmatter":{"layout":"post","title":"Go交叉编译","date":"2021-05-10 23:30:00 +0800"},"headers":[],"relativePath":"posts/2021-05-10-go-cross-compiling.md"}'),o={name:"posts/2021-05-10-go-cross-compiling.md"},p=l(`<p>通过 <code>go tool dist list</code> 可以获取到 <code>\${GOOS}/\${GOARCH}</code> 列表，例如：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">go</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tool</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dist</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">list</span></span>
<span class="line"><span style="color:#FFCB6B;">aix/ppc64</span></span>
<span class="line"><span style="color:#FFCB6B;">android/386</span></span>
<span class="line"><span style="color:#FFCB6B;">android/amd64</span></span>
<span class="line"><span style="color:#FFCB6B;">android/arm</span></span>
<span class="line"><span style="color:#FFCB6B;">android/arm64</span></span>
<span class="line"><span style="color:#FFCB6B;">darwin/amd64</span></span>
<span class="line"><span style="color:#FFCB6B;">darwin/arm64</span></span>
<span class="line"><span style="color:#82AAFF;">...</span></span></code></pre></div><p>通过 <code>go env</code> 可以查看 GOOS 和 GOARCH 环境变量配置，例如：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">go</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">env</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">GOOS</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">GOARCH</span></span>
<span class="line"><span style="color:#FFCB6B;">darwin</span></span>
<span class="line"><span style="color:#FFCB6B;">amd64</span></span></code></pre></div><p>通过设置 GOOS 和 GOARCH 可以进行交叉编译，例如：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">GOOS=linux</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">GOARCH=arm64</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">go</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">build</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-o</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">main.go</span></span></code></pre></div><p>参考文档：</p><ul><li><a href="https://www.digitalocean.com/community/tutorials/building-go-applications-for-different-operating-systems-and-architectures" target="_blank" rel="noreferrer">Building Go Applications for Different Operating Systems and Architectures</a></li></ul>`,8),e=[p];function t(c,r,i,C,d,y){return a(),n("div",null,e)}const g=s(o,[["render",t]]);export{D as __pageData,g as default};