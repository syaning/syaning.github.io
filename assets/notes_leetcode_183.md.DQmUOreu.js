import{_ as s,c as e,o as t,a4 as i}from"./chunks/framework.C7_4Vmd4.js";const m=JSON.parse('{"title":"183. Customers Who Never Order","description":"","frontmatter":{},"headers":[],"relativePath":"notes/leetcode/183.md","filePath":"notes/leetcode/183.md"}'),a={name:"notes/leetcode/183.md"},r=i('<h1 id="_183-customers-who-never-order" tabindex="-1">183. Customers Who Never Order <a class="header-anchor" href="#_183-customers-who-never-order" aria-label="Permalink to &quot;183. Customers Who Never Order&quot;">​</a></h1><p><a href="https://leetcode.com/problems/customers-who-never-order/" target="_blank" rel="noreferrer">https://leetcode.com/problems/customers-who-never-order/</a></p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-vZkY_" id="tab-K3pFq_j" checked><label for="tab-K3pFq_j">SQL</label></div><div class="blocks"><div class="language-sql vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> Name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Customers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">not</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select distinct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CustomerId </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Orders)</span></span></code></pre></div></div></div>',3),o=[r];function n(h,l,d,p,c,k){return t(),e("div",null,o)}const v=s(a,[["render",n]]);export{m as __pageData,v as default};
