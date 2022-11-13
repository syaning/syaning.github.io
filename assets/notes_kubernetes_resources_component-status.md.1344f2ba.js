import{_ as s,o as n,c as a,a as l}from"./app.aede3185.js";const u=JSON.parse('{"title":"ComponentStatus","description":"","frontmatter":{},"headers":[],"relativePath":"notes/kubernetes/resources/component-status.md"}'),p={name:"notes/kubernetes/resources/component-status.md"},e=l(`<h1 id="componentstatus" tabindex="-1">ComponentStatus <a class="header-anchor" href="#componentstatus" aria-hidden="true">#</a></h1><p>\u901A\u8FC7 <code>kubectl get componentstatus</code> \u53EF\u4EE5\u67E5\u770B\u96C6\u7FA4\u7684\u72B6\u6001\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl get componentstatus</span></span>
<span class="line"><span style="color:#A6ACCD;">NAME                 STATUS    MESSAGE             ERROR</span></span>
<span class="line"><span style="color:#A6ACCD;">controller-manager   Healthy   ok</span></span>
<span class="line"><span style="color:#A6ACCD;">scheduler            Healthy   ok</span></span>
<span class="line"><span style="color:#A6ACCD;">etcd-0               Healthy   {</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">health</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">:</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">true</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl get cs controller-manager -oyaml</span></span>
<span class="line"><span style="color:#A6ACCD;">apiVersion: v1</span></span>
<span class="line"><span style="color:#A6ACCD;">conditions:</span></span>
<span class="line"><span style="color:#A6ACCD;">- message: ok</span></span>
<span class="line"><span style="color:#A6ACCD;">  status: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">True</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  type: Healthy</span></span>
<span class="line"><span style="color:#A6ACCD;">kind: ComponentStatus</span></span>
<span class="line"><span style="color:#A6ACCD;">metadata:</span></span>
<span class="line"><span style="color:#A6ACCD;">  creationTimestamp: null</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: controller-manager</span></span>
<span class="line"><span style="color:#A6ACCD;">  selfLink: /api/v1/componentstatuses/controller-manager</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl get cs scheduler -oyaml</span></span>
<span class="line"><span style="color:#A6ACCD;">apiVersion: v1</span></span>
<span class="line"><span style="color:#A6ACCD;">conditions:</span></span>
<span class="line"><span style="color:#A6ACCD;">- message: ok</span></span>
<span class="line"><span style="color:#A6ACCD;">  status: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">True</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  type: Healthy</span></span>
<span class="line"><span style="color:#A6ACCD;">kind: ComponentStatus</span></span>
<span class="line"><span style="color:#A6ACCD;">metadata:</span></span>
<span class="line"><span style="color:#A6ACCD;">  creationTimestamp: null</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: scheduler</span></span>
<span class="line"><span style="color:#A6ACCD;">  selfLink: /api/v1/componentstatuses/scheduler</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl get cs etcd-0 -oyaml</span></span>
<span class="line"><span style="color:#A6ACCD;">apiVersion: v1</span></span>
<span class="line"><span style="color:#A6ACCD;">conditions:</span></span>
<span class="line"><span style="color:#A6ACCD;">- message: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{&quot;health&quot;:&quot;true&quot;}</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  status: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">True</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  type: Healthy</span></span>
<span class="line"><span style="color:#A6ACCD;">kind: ComponentStatus</span></span>
<span class="line"><span style="color:#A6ACCD;">metadata:</span></span>
<span class="line"><span style="color:#A6ACCD;">  creationTimestamp: null</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: etcd-0</span></span>
<span class="line"><span style="color:#A6ACCD;">  selfLink: /api/v1/componentstatuses/etcd-0</span></span>
<span class="line"></span></code></pre></div>`,3),o=[e];function t(c,r,C,i,A,y){return n(),a("div",null,o)}const m=s(p,[["render",t]]);export{u as __pageData,m as default};
