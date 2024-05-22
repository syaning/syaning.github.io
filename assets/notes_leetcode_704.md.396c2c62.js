import{_ as s,o as n,c as a,V as l}from"./chunks/framework.16eef3c0.js";const C=JSON.parse('{"title":"704. Binary Search","description":"","frontmatter":{},"headers":[],"relativePath":"notes/leetcode/704.md"}'),o={name:"notes/leetcode/704.md"},p=l(`<h1 id="_704-binary-search" tabindex="-1">704. Binary Search <a class="header-anchor" href="#_704-binary-search" aria-label="Permalink to &quot;704. Binary Search&quot;">​</a></h1><p><a href="https://leetcode.com/problems/binary-search/" target="_blank" rel="noreferrer">https://leetcode.com/problems/binary-search/</a></p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-GV2qz" id="tab-AIgqbx3" checked="checked"><label for="tab-AIgqbx3">JavaScript</label><input type="radio" name="group-GV2qz" id="tab-ZpJuFJg"><label for="tab-ZpJuFJg">Python</label></div><div class="blocks"><div class="language-js active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">number[]</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">nums</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">param</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">number</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#A6ACCD;font-style:italic;">target</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">return</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">number</span><span style="color:#89DDFF;font-style:italic;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> search </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">target</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">searchInRange</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">searchInRange</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">start</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">end</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">target</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">start</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">end</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">start</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">start</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">mid</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">start</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">end</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">/</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&gt;&gt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">mid</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">mid</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">mid</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">searchInRange</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">mid</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">end</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">searchInRange</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">start</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">mid</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">target</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Solution</span><span style="color:#89DDFF;">:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">search</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;font-style:italic;">self</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">target</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        :type nums: List[int]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        :type target: int</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        :rtype: int</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">        </span><span style="color:#89DDFF;font-style:italic;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">search_in_range</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> len</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">nums</span><span style="color:#89DDFF;">)</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">-</span><span style="color:#82AAFF;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> target</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">search_in_range</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;font-style:italic;">self</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">start</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">end</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">target</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> start </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> end</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> start </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> nums</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">start</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> target </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        mid </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">start </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> end</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">//</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> nums</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">mid</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> target</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> mid</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">elif</span><span style="color:#A6ACCD;"> nums</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">mid</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> target</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">search_in_range</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> mid </span><span style="color:#89DDFF;">+</span><span style="color:#82AAFF;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> end</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> target</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">search_in_range</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">nums</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> start</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> mid</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> target</span><span style="color:#89DDFF;">)</span></span></code></pre></div></div></div>`,3),t=[p];function e(c,r,y,F,D,i){return n(),a("div",null,t)}const f=s(o,[["render",e]]);export{C as __pageData,f as default};