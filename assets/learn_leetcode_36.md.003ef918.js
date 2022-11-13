import{_ as s,o as n,c as a,a as l}from"./app.9c5b3fde.js";const i=JSON.parse('{"title":"36. Valid Sudoku","description":"","frontmatter":{},"headers":[{"level":2,"title":"JavaScript","slug":"javascript","link":"#javascript","children":[]},{"level":2,"title":"Python","slug":"python","link":"#python","children":[]}],"relativePath":"learn/leetcode/36.md"}'),p={name:"learn/leetcode/36.md"},o=l(`<h1 id="_36-valid-sudoku" tabindex="-1">36. Valid Sudoku <a class="header-anchor" href="#_36-valid-sudoku" aria-hidden="true">#</a></h1><p><a href="https://leetcode.com/problems/valid-sudoku/" target="_blank" rel="noreferrer">https://leetcode.com/problems/valid-sudoku/</a></p><h2 id="javascript" tabindex="-1">JavaScript <a class="header-anchor" href="#javascript" aria-hidden="true">#</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;">/**</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">param</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">character[][]</span><span style="color:#89DDFF;">}</span><span style="color:#676E95;"> </span><span style="color:#A6ACCD;">board</span></span>
<span class="line"><span style="color:#676E95;"> * </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">return</span><span style="color:#676E95;"> </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;"> */</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> isValidSudoku </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">board</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">valid</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">)</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">filter</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">!==</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Set</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">size</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">9</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#82AAFF;">valid</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">board</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">])) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">9</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">9</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">board</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;">][</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;">])</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#82AAFF;">valid</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">for</span><span style="color:#F07178;"> (</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">board</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">concat</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">board</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">concat</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">board</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">slice</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">3</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#82AAFF;">valid</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">nums</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="python" tabindex="-1">Python <a class="header-anchor" href="#python" aria-hidden="true">#</a></h2><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Solution</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">object</span><span style="color:#89DDFF;">):</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">isValidSudoku</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;">self</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">board</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#676E95;">        :type board: List[List[str]]</span></span>
<span class="line"><span style="color:#676E95;">        :rtype: bool</span></span>
<span class="line"><span style="color:#676E95;">        </span><span style="color:#89DDFF;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">9</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">not</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">valid</span><span style="color:#89DDFF;">([</span><span style="color:#82AAFF;">board</span><span style="color:#89DDFF;">[</span><span style="color:#82AAFF;">i</span><span style="color:#89DDFF;">][</span><span style="color:#82AAFF;">j</span><span style="color:#89DDFF;">]</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">for</span><span style="color:#82AAFF;"> j </span><span style="color:#89DDFF;">in</span><span style="color:#82AAFF;"> range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">9</span><span style="color:#89DDFF;">)])</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">or</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">not</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">valid</span><span style="color:#89DDFF;">([</span><span style="color:#82AAFF;">board</span><span style="color:#89DDFF;">[</span><span style="color:#82AAFF;">j</span><span style="color:#89DDFF;">][</span><span style="color:#82AAFF;">i</span><span style="color:#89DDFF;">]</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">for</span><span style="color:#82AAFF;"> j </span><span style="color:#89DDFF;">in</span><span style="color:#82AAFF;"> range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">9</span><span style="color:#89DDFF;">)]):</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> i </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">for</span><span style="color:#A6ACCD;"> j </span><span style="color:#89DDFF;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">                </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">not</span><span style="color:#A6ACCD;"> self</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">valid</span><span style="color:#89DDFF;">([</span><span style="color:#82AAFF;">board</span><span style="color:#89DDFF;">[</span><span style="color:#82AAFF;">m</span><span style="color:#89DDFF;">][</span><span style="color:#82AAFF;">n</span><span style="color:#89DDFF;">]</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">for</span><span style="color:#82AAFF;"> n </span><span style="color:#89DDFF;">in</span><span style="color:#82AAFF;"> range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">3</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">*</span><span style="color:#82AAFF;"> j</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#F78C6C;">3</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">*</span><span style="color:#82AAFF;"> j </span><span style="color:#89DDFF;">+</span><span style="color:#82AAFF;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">)</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">for</span><span style="color:#82AAFF;"> m </span><span style="color:#89DDFF;">in</span><span style="color:#82AAFF;"> range</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">3</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">*</span><span style="color:#82AAFF;"> i</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#F78C6C;">3</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">*</span><span style="color:#82AAFF;"> i </span><span style="color:#89DDFF;">+</span><span style="color:#82AAFF;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">)]):</span></span>
<span class="line"><span style="color:#A6ACCD;">                    </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">False</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">True</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">valid</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;">self</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">nums</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        nums </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">filter</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">lambda</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">:</span><span style="color:#82AAFF;"> x </span><span style="color:#89DDFF;">!=</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> nums</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">len</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">set</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">nums</span><span style="color:#89DDFF;">))</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">len</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">nums</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div>`,6),e=[o];function F(c,t,r,y,D,A){return n(),a("div",null,e)}const d=s(p,[["render",F]]);export{i as __pageData,d as default};
