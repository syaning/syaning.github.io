import{_ as s,c as e,o as i,a4 as a}from"./chunks/framework.C0rDbzzf.js";const b=JSON.parse('{"title":"175. Combine Two Tables","description":"","frontmatter":{},"headers":[],"relativePath":"notes/leetcode/175.md","filePath":"notes/leetcode/175.md"}'),t={name:"notes/leetcode/175.md"},l=a('<h1 id="_175-combine-two-tables" tabindex="-1">175. Combine Two Tables <a class="header-anchor" href="#_175-combine-two-tables" aria-label="Permalink to &quot;175. Combine Two Tables&quot;">​</a></h1><p><a href="https://leetcode.com/problems/combine-two-tables/" target="_blank" rel="noreferrer">https://leetcode.com/problems/combine-two-tables/</a></p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-GfREq" id="tab-05xJw7g" checked><label for="tab-05xJw7g">SQL</label></div><div class="blocks"><div class="language-sql vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> FirstName, LastName, City, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">State</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Person </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">left join</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> Address</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> on</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Person</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PersonId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Address</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PersonId</span></span></code></pre></div></div></div>',3),n=[l];function o(h,p,r,d,k,c){return i(),e("div",null,n)}const m=s(t,[["render",o]]);export{b as __pageData,m as default};