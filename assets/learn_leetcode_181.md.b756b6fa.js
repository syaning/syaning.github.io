import{_ as e,o as s,c as a,a as n}from"./app.9c5b3fde.js";const A=JSON.parse('{"title":"181. Employees Earning More Than Their Managers","description":"","frontmatter":{},"headers":[{"level":2,"title":"SQL","slug":"sql","link":"#sql","children":[]}],"relativePath":"learn/leetcode/181.md"}'),l={name:"learn/leetcode/181.md"},o=n(`<h1 id="_181-employees-earning-more-than-their-managers" tabindex="-1">181. Employees Earning More Than Their Managers <a class="header-anchor" href="#_181-employees-earning-more-than-their-managers" aria-hidden="true">#</a></h1><p><a href="https://leetcode.com/problems/employees-earning-more-than-their-managers/" target="_blank" rel="noreferrer">https://leetcode.com/problems/employees-earning-more-than-their-managers/</a></p><h2 id="sql" tabindex="-1">SQL <a class="header-anchor" href="#sql" aria-hidden="true">#</a></h2><div class="language-sql"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki"><code><span class="line"><span style="color:#F78C6C;">select</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">Name</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> Employee e</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> e.ManagerId </span><span style="color:#F78C6C;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">not</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">null</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">and</span><span style="color:#A6ACCD;"> e.Salary</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">Select</span><span style="color:#A6ACCD;"> Salary</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#F78C6C;">from</span><span style="color:#A6ACCD;"> Employee </span><span style="color:#F78C6C;">where</span><span style="color:#A6ACCD;"> e.ManagerId</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">Id)</span></span>
<span class="line"></span></code></pre></div>`,4),r=[o];function t(p,c,C,i,y,d){return s(),a("div",null,r)}const m=e(l,[["render",t]]);export{A as __pageData,m as default};
