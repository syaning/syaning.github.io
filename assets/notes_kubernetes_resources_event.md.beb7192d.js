import{_ as s,o as n,c as a,a as e}from"./app.c83dc632.js";const D=JSON.parse('{"title":"Event","description":"","frontmatter":{},"headers":[],"relativePath":"notes/kubernetes/resources/event.md"}'),l={name:"notes/kubernetes/resources/event.md"},o=e(`<h1 id="event" tabindex="-1">Event <a class="header-anchor" href="#event" aria-hidden="true">#</a></h1><p>通过 <code>kubectl get event</code> 可以查看事件信息：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">event</span></span>
<span class="line"><span style="color:#FFCB6B;">LAST</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">SEEN</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">TYPE</span><span style="color:#A6ACCD;">      </span><span style="color:#C3E88D;">REASON</span><span style="color:#A6ACCD;">             </span><span style="color:#C3E88D;">OBJECT</span><span style="color:#A6ACCD;">                       </span><span style="color:#C3E88D;">MESSAGE</span></span>
<span class="line"><span style="color:#A6ACCD;">3m33s       Warning   FailedScheduling   pod/nginx-66f9f9cfd5-2w97n   </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">/</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> nodes are available: </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> Insufficient cpu.</span></span>
<span class="line"><span style="color:#A6ACCD;">3m33s       Warning   FailedScheduling   pod/nginx-66f9f9cfd5-7dzb8   </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">/</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> nodes are available: </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> Insufficient cpu.</span></span>
<span class="line"><span style="color:#A6ACCD;">3m33s       Warning   FailedScheduling   pod/nginx-66f9f9cfd5-wn9ph   </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">/</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> nodes are available: </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> Insufficient cpu.</span></span>
<span class="line"></span></code></pre></div><p>也可以通过 <code>-n, --namespace</code> 参数来查看指定 Namespace 下的事件。</p>`,4),p=[o];function t(c,r,C,i,A,d){return n(),a("div",null,p)}const _=s(l,[["render",t]]);export{D as __pageData,_ as default};
