import{_ as s,o as a,c as n,a as l}from"./app.b58a8acc.js";const g=JSON.parse('{"title":"Go\u4EA4\u53C9\u7F16\u8BD1","description":"","frontmatter":{"layout":"post","title":"Go\u4EA4\u53C9\u7F16\u8BD1","date":"2021-05-10 23:30:00 +0800"},"headers":[],"relativePath":"my/post/2021-05-10-go-cross-compiling.md"}'),o={name:"my/post/2021-05-10-go-cross-compiling.md"},e=l(`<p>\u901A\u8FC7 <code>go tool dist list</code> \u53EF\u4EE5\u83B7\u53D6\u5230 <code>\${GOOS}/\${GOARCH}</code> \u5217\u8868\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ go tool dist list</span></span>
<span class="line"><span style="color:#A6ACCD;">aix/ppc64</span></span>
<span class="line"><span style="color:#A6ACCD;">android/386</span></span>
<span class="line"><span style="color:#A6ACCD;">android/amd64</span></span>
<span class="line"><span style="color:#A6ACCD;">android/arm</span></span>
<span class="line"><span style="color:#A6ACCD;">android/arm64</span></span>
<span class="line"><span style="color:#A6ACCD;">darwin/amd64</span></span>
<span class="line"><span style="color:#A6ACCD;">darwin/arm64</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"></span></code></pre></div><p>\u901A\u8FC7 <code>go env</code> \u53EF\u4EE5\u67E5\u770B GOOS \u548C GOARCH \u73AF\u5883\u53D8\u91CF\u914D\u7F6E\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ go env GOOS GOARCH</span></span>
<span class="line"><span style="color:#A6ACCD;">darwin</span></span>
<span class="line"><span style="color:#A6ACCD;">amd64</span></span>
<span class="line"></span></code></pre></div><p>\u901A\u8FC7\u8BBE\u7F6E GOOS \u548C GOARCH \u53EF\u4EE5\u8FDB\u884C\u4EA4\u53C9\u7F16\u8BD1\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ GOOS=linux GOARCH=arm64 go build -o main main.go</span></span>
<span class="line"></span></code></pre></div><p>\u53C2\u8003\u6587\u6863\uFF1A</p><ul><li><a href="https://www.digitalocean.com/community/tutorials/building-go-applications-for-different-operating-systems-and-architectures" target="_blank" rel="noreferrer">Building Go Applications for Different Operating Systems and Architectures</a></li></ul>`,8),p=[e];function t(c,i,r,d,C,A){return a(),n("div",null,p)}const m=s(o,[["render",t]]);export{g as __pageData,m as default};
