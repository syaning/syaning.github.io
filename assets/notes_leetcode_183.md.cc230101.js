import{_ as e,o as s,c as o,V as a}from"./chunks/framework.16eef3c0.js";const h=JSON.parse('{"title":"183. Customers Who Never Order","description":"","frontmatter":{},"headers":[],"relativePath":"notes/leetcode/183.md"}'),t={name:"notes/leetcode/183.md"},r=a('<h1 id="_183-customers-who-never-order" tabindex="-1">183. Customers Who Never Order <a class="header-anchor" href="#_183-customers-who-never-order" aria-label="Permalink to &quot;183. Customers Who Never Order&quot;">​</a></h1><p><a href="https://leetcode.com/problems/customers-who-never-order/" target="_blank" rel="noreferrer">https://leetcode.com/problems/customers-who-never-order/</a></p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-Vsty1" id="tab-uI7kLKH" checked="checked"><label for="tab-uI7kLKH">SQL</label></div><div class="blocks"><div class="language-sql active"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">Name</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> Customers </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> Id </span><span style="color:#F78C6C;">not</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">in</span><span style="color:#A6ACCD;"> (</span><span style="color:#F78C6C;">select distinct</span><span style="color:#A6ACCD;"> CustomerId </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> Orders)</span></span></code></pre></div></div></div>',3),n=[r];function l(c,p,d,C,i,_){return s(),o("div",null,n)}const u=e(t,[["render",l]]);export{h as __pageData,u as default};
