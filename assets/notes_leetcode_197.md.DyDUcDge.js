import{_ as s,c as i,o as a,a4 as e}from"./chunks/framework.C7_4Vmd4.js";const E=JSON.parse('{"title":"197. Rising Temperature","description":"","frontmatter":{},"headers":[],"relativePath":"notes/leetcode/197.md","filePath":"notes/leetcode/197.md"}'),t={name:"notes/leetcode/197.md"},h=e(`<h1 id="_197-rising-temperature" tabindex="-1">197. Rising Temperature <a class="header-anchor" href="#_197-rising-temperature" aria-label="Permalink to &quot;197. Rising Temperature&quot;">​</a></h1><p><a href="https://leetcode.com/problems/rising-temperature/" target="_blank" rel="noreferrer">https://leetcode.com/problems/rising-temperature/</a></p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-klZ7n" id="tab-pEC_qd0" checked><label for="tab-pEC_qd0">SQL</label></div><div class="blocks"><div class="language-sql vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> w1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Weather w1, Weather w2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	where</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> w1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Temperature</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">w2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Temperature</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> and</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> to_days(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">w1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">to_days(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">w2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span></code></pre></div></div></div>`,3),n=[h];function p(l,k,r,d,o,c){return a(),i("div",null,n)}const _=s(t,[["render",p]]);export{E as __pageData,_ as default};
