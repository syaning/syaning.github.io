import{_ as s,c as a,o as i,a4 as e}from"./chunks/framework.C0rDbzzf.js";const E=JSON.parse('{"title":"181. Employees Earning More Than Their Managers","description":"","frontmatter":{},"headers":[],"relativePath":"notes/leetcode/181.md","filePath":"notes/leetcode/181.md"}'),t={name:"notes/leetcode/181.md"},n=e(`<h1 id="_181-employees-earning-more-than-their-managers" tabindex="-1">181. Employees Earning More Than Their Managers <a class="header-anchor" href="#_181-employees-earning-more-than-their-managers" aria-label="Permalink to &quot;181. Employees Earning More Than Their Managers&quot;">​</a></h1><p><a href="https://leetcode.com/problems/employees-earning-more-than-their-managers/" target="_blank" rel="noreferrer">https://leetcode.com/problems/employees-earning-more-than-their-managers/</a></p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-jEFH9" id="tab-GhFF460" checked><label for="tab-GhFF460">SQL</label></div><div class="blocks"><div class="language-sql vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> Name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Employee e</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	where</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ManagerId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> is not null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> and</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Salary</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Salary</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">			from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Employee </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> e</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ManagerId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Id)</span></span></code></pre></div></div></div>`,3),h=[n];function l(r,p,k,o,d,g){return i(),a("div",null,h)}const y=s(t,[["render",l]]);export{E as __pageData,y as default};