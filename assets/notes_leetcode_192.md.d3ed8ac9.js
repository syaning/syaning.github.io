import{_ as s,o as a,c as o,V as e}from"./chunks/framework.16eef3c0.js";const A=JSON.parse('{"title":"192. Word Frequency","description":"","frontmatter":{},"headers":[],"relativePath":"notes/leetcode/192.md"}'),n={name:"notes/leetcode/192.md"},l=e(`<h1 id="_192-word-frequency" tabindex="-1">192. Word Frequency <a class="header-anchor" href="#_192-word-frequency" aria-label="Permalink to &quot;192. Word Frequency&quot;">​</a></h1><p><a href="https://leetcode.com/problems/word-frequency/" target="_blank" rel="noreferrer">https://leetcode.com/problems/word-frequency/</a></p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-x9w8M" id="tab-WAmDPxz" checked="checked"><label for="tab-WAmDPxz">shell</label></div><div class="blocks"><div class="language-shell active"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Read from the file words.txt and output the word frequency list to stdout.</span></span>
<span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">words.txt</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">tr</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">\\n</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">sort</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">uniq</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-c</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">sort</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-rn</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">awk</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{print $2, $1}</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div></div></div>`,3),t=[l];function p(r,c,y,C,D,d){return a(),o("div",null,t)}const F=s(n,[["render",p]]);export{A as __pageData,F as default};