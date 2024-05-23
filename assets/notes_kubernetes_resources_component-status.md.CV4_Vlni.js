import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.C7_4Vmd4.js";const c=JSON.parse('{"title":"ComponentStatus","description":"","frontmatter":{},"headers":[],"relativePath":"notes/kubernetes/resources/component-status.md","filePath":"notes/kubernetes/resources/component-status.md"}'),t={name:"notes/kubernetes/resources/component-status.md"},l=n(`<h1 id="componentstatus" tabindex="-1">ComponentStatus <a class="header-anchor" href="#componentstatus" aria-label="Permalink to &quot;ComponentStatus&quot;">​</a></h1><p>通过 <code>kubectl get componentstatus</code> 可以查看集群的状态：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> componentstatus</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NAME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                 STATUS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    MESSAGE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">             ERROR</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">controller-manager</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   Healthy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   ok</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">scheduler</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            Healthy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   ok</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">etcd-0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">               Healthy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   {&quot;health&quot;:&quot;true&quot;}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> controller-manager</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -oyaml</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apiVersion:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> v1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">conditions:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> message:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ok</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  status:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;True&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  type</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Healthy</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kind:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ComponentStatus</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">metadata:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  creationTimestamp:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> null</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> controller-manager</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  selfLink:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /api/v1/componentstatuses/controller-manager</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> scheduler</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -oyaml</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apiVersion:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> v1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">conditions:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> message:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ok</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  status:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;True&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  type</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Healthy</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kind:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ComponentStatus</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">metadata:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  creationTimestamp:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> null</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> scheduler</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  selfLink:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /api/v1/componentstatuses/scheduler</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> etcd-0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -oyaml</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apiVersion:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> v1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">conditions:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">-</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> message:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{&quot;health&quot;:&quot;true&quot;}&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  status:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;True&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  type</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Healthy</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kind:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ComponentStatus</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">metadata:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  creationTimestamp:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> null</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  name:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> etcd-0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  selfLink:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /api/v1/componentstatuses/etcd-0</span></span></code></pre></div>`,3),p=[l];function h(k,e,F,r,d,o){return a(),i("div",null,p)}const C=s(t,[["render",h]]);export{c as __pageData,C as default};
