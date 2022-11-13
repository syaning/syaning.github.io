import{_ as s,o as n,c as a,a as l}from"./app.9c5b3fde.js";const A=JSON.parse('{"title":"876. Middle of the Linked List","description":"","frontmatter":{},"headers":[{"level":2,"title":"JavaScript","slug":"javascript","link":"#javascript","children":[]},{"level":2,"title":"Python","slug":"python","link":"#python","children":[]}],"relativePath":"learn/leetcode/876.md"}'),p={name:"learn/leetcode/876.md"},o=l(`<h1 id="_876-middle-of-the-linked-list" tabindex="-1">876. Middle of the Linked List <a class="header-anchor" href="#_876-middle-of-the-linked-list" aria-hidden="true">#</a></h1><p><a href="https://leetcode.com/problems/middle-of-the-linked-list/" target="_blank" rel="noreferrer">https://leetcode.com/problems/middle-of-the-linked-list/</a></p><h2 id="javascript" tabindex="-1">JavaScript <a class="header-anchor" href="#javascript" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#676E95;"> * function ListNode(val) {</span></span>
<span class="line"><span style="color:#676E95;"> *     this.val = val;</span></span>
<span class="line"><span style="color:#676E95;"> *     this.next = null;</span></span>
<span class="line"><span style="color:#676E95;"> * }</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">ListNode</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">head</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">return</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">ListNode</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> middleNode </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">head</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fast</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">head</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">slow</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">head</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">while</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">fast</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fast</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">fast</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">fast</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">slow</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">slow</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">next</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">slow</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="python" tabindex="-1">Python <a class="header-anchor" href="#python" aria-hidden="true">#</a></h2><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#676E95;"># class ListNode:</span></span>
<span class="line"><span style="color:#676E95;">#     def __init__(self, x):</span></span>
<span class="line"><span style="color:#676E95;">#         self.val = x</span></span>
<span class="line"><span style="color:#676E95;">#         self.next = None</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Solution</span><span style="color:#89DDFF;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">middleNode</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;">self</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">head</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#676E95;">        :type head: ListNode</span></span>
<span class="line"><span style="color:#676E95;">        :rtype: ListNode</span></span>
<span class="line"><span style="color:#676E95;">        </span><span style="color:#89DDFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        fast </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> slow </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> head</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">while</span><span style="color:#A6ACCD;"> fast </span><span style="color:#89DDFF;">and</span><span style="color:#A6ACCD;"> fast</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">next</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            fast </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> fast</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">next</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">next</span></span>
<span class="line"><span style="color:#A6ACCD;">            slow </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> slow</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">next</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> slow</span></span>
<span class="line"></span></code></pre></div>`,6),e=[o];function t(c,r,y,i,D,F){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
