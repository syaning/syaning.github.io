import{_ as s,o as a,c as n,a as l}from"./app.c83dc632.js";const d=JSON.parse('{"title":"k8s学习笔记(2)——基础示例","description":"","frontmatter":{"layout":"post","title":"k8s学习笔记(2)——基础示例","date":"2019-01-10 00:30:00 +0800"},"headers":[{"level":2,"title":"一、Hello World","slug":"一、hello-world","link":"#一、hello-world","children":[{"level":3,"title":"1. 创建Deployment","slug":"_1-创建deployment","link":"#_1-创建deployment","children":[]},{"level":3,"title":"2. 创建Service","slug":"_2-创建service","link":"#_2-创建service","children":[]},{"level":3,"title":"3. 扩容","slug":"_3-扩容","link":"#_3-扩容","children":[]},{"level":3,"title":"4. 更新","slug":"_4-更新","link":"#_4-更新","children":[]},{"level":3,"title":"5. 删除","slug":"_5-删除","link":"#_5-删除","children":[]}]},{"level":2,"title":"二、使用YAML","slug":"二、使用yaml","link":"#二、使用yaml","children":[{"level":3,"title":"1. 创建Deployment","slug":"_1-创建deployment-1","link":"#_1-创建deployment-1","children":[]},{"level":3,"title":"2. 创建Service","slug":"_2-创建service-1","link":"#_2-创建service-1","children":[]},{"level":3,"title":"3. 扩容","slug":"_3-扩容-1","link":"#_3-扩容-1","children":[]},{"level":3,"title":"4. 更新","slug":"_4-更新-1","link":"#_4-更新-1","children":[]},{"level":3,"title":"5. 删除","slug":"_5-删除-1","link":"#_5-删除-1","children":[]}]}],"relativePath":"my/post/2019-01-10-k8s-2.md"}'),p={name:"my/post/2019-01-10-k8s-2.md"},o=l(`<h2 id="一、hello-world" tabindex="-1">一、Hello World <a class="header-anchor" href="#一、hello-world" aria-hidden="true">#</a></h2><p>使用镜像的代码为：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> http </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> os </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">os</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> hostname </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> os</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hostname</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> server </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> http</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createServer</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">req</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">writeHead</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">200</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">Content-Type</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">text/plain</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">end</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">Hello world from </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">hostname</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">server</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">9000</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>Dockerfile为：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">FROM node:10-slim</span></span>
<span class="line"><span style="color:#A6ACCD;">EXPOSE 9000</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY server.js .</span></span>
<span class="line"><span style="color:#A6ACCD;">CMD node server.js</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="_1-创建deployment" tabindex="-1">1. 创建Deployment <a class="header-anchor" href="#_1-创建deployment" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployment</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--image=syaning/hello-node:v1</span></span>
<span class="line"></span></code></pre></div><p>然后查看Deployment：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployments</span></span>
<span class="line"><span style="color:#FFCB6B;">NAME</span><span style="color:#A6ACCD;">         </span><span style="color:#C3E88D;">DESIRED</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">CURRENT</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">UP-TO-DATE</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">AVAILABLE</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">AGE</span></span>
<span class="line"><span style="color:#FFCB6B;">hello-node</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">           </span><span style="color:#C3E88D;">17s</span></span>
<span class="line"></span></code></pre></div><p>查看Pod：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pods</span></span>
<span class="line"><span style="color:#FFCB6B;">NAME</span><span style="color:#A6ACCD;">                          </span><span style="color:#C3E88D;">READY</span><span style="color:#A6ACCD;">     </span><span style="color:#C3E88D;">STATUS</span><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">RESTARTS</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">AGE</span></span>
<span class="line"><span style="color:#FFCB6B;">hello-node-7c675c487d-cswr4</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">/</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">       </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">20s</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-创建service" tabindex="-1">2. 创建Service <a class="header-anchor" href="#_2-创建service" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">expose</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployment</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--type=LoadBalancer</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--port=9000</span></span>
<span class="line"></span></code></pre></div><p>然后查看Service：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">services</span></span>
<span class="line"><span style="color:#FFCB6B;">NAME</span><span style="color:#A6ACCD;">         </span><span style="color:#C3E88D;">TYPE</span><span style="color:#A6ACCD;">           </span><span style="color:#C3E88D;">CLUSTER-IP</span><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">EXTERNAL-IP</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">PORT</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">S</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">AGE</span></span>
<span class="line"><span style="color:#FFCB6B;">hello-node</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">LoadBalancer</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">10.96.78.62</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">localhost</span><span style="color:#A6ACCD;">     </span><span style="color:#F78C6C;">9000</span><span style="color:#C3E88D;">:</span><span style="color:#F78C6C;">32523</span><span style="color:#C3E88D;">/TCP</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">6s</span></span>
<span class="line"></span></code></pre></div><p>此时访问 <code>localhost:9000</code> 即可看到结果。</p><h3 id="_3-扩容" tabindex="-1">3. 扩容 <a class="header-anchor" href="#_3-扩容" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">scale</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--replicas=3</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployment.apps/hello-node</span></span>
<span class="line"></span></code></pre></div><p>查看Pod：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pods</span></span>
<span class="line"><span style="color:#FFCB6B;">NAME</span><span style="color:#A6ACCD;">                          </span><span style="color:#C3E88D;">READY</span><span style="color:#A6ACCD;">     </span><span style="color:#C3E88D;">STATUS</span><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">RESTARTS</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">AGE</span></span>
<span class="line"><span style="color:#FFCB6B;">hello-node-7c675c487d-cswr4</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">/</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">       </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">5m</span></span>
<span class="line"><span style="color:#FFCB6B;">hello-node-7c675c487d-jrc8b</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">/</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">       </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">13s</span></span>
<span class="line"><span style="color:#FFCB6B;">hello-node-7c675c487d-sqhx8</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">/</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">       </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">13s</span></span>
<span class="line"></span></code></pre></div><p>查看Deployment：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployments</span></span>
<span class="line"><span style="color:#FFCB6B;">NAME</span><span style="color:#A6ACCD;">         </span><span style="color:#C3E88D;">DESIRED</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">CURRENT</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">UP-TO-DATE</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">AVAILABLE</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">AGE</span></span>
<span class="line"><span style="color:#FFCB6B;">hello-node</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">         </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">            </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;">           </span><span style="color:#C3E88D;">5m</span></span>
<span class="line"></span></code></pre></div><p>此时多次访问 <code>localhost:9000</code>，结果会发生改变，即响应是来自不同的Pod。</p><h3 id="_4-更新" tabindex="-1">4. 更新 <a class="header-anchor" href="#_4-更新" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">set</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">image</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployment.apps/hello-node</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-node=syaning/hello-node:v2</span></span>
<span class="line"></span></code></pre></div><p>再次访问 <code>localhost:9000</code>，可以发现内容已经是新的了。</p><h3 id="_5-删除" tabindex="-1">5. 删除 <a class="header-anchor" href="#_5-删除" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">delete</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">service/hello-node</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">delete</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployment.apps/hello-node</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div><h2 id="二、使用yaml" tabindex="-1">二、使用YAML <a class="header-anchor" href="#二、使用yaml" aria-hidden="true">#</a></h2><p>上面的例子是使用命令行来进行资源的管理，事实上更好的方式是使用YAML文件来描述资源。使用YAML文件可以描述更为复杂的对象和逻辑，更加容易操作和维护，并且使得变更可以进行版本管理。</p><h3 id="_1-创建deployment-1" tabindex="-1">1. 创建Deployment <a class="header-anchor" href="#_1-创建deployment-1" aria-hidden="true">#</a></h3><p>定义<code>deployment.yml</code>，内容如下：</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apps/v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Deployment</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-node-deployment</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">labels</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-node</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">replicas</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">matchLabels</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-node</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">labels</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-node</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">containers</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-node</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">syaning/hello-node:v1</span></span>
<span class="line"></span></code></pre></div><p>其中：</p><ul><li><code>metadata</code> 定义了Deployment本身的信息</li><li><code>spec.replicas</code> 定义了Pod的副本数</li><li><code>spec.selector</code> 指明了如何选择Pod</li><li><code>spec.template</code> 定义了Pod的信息，如果当前运行的副本数不够，则会按照这个模板来进行创建</li></ul><p>执行：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployment.yml</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-创建service-1" tabindex="-1">2. 创建Service <a class="header-anchor" href="#_2-创建service-1" aria-hidden="true">#</a></h3><p>定义<code>service.yml</code>，内容如下：</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Service</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-node-servcie</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hello-node</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">protocol</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TCP</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">9000</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">targetPort</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">9000</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">LoadBalancer</span></span>
<span class="line"></span></code></pre></div><p>然后执行：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">service.yml</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-扩容-1" tabindex="-1">3. 扩容 <a class="header-anchor" href="#_3-扩容-1" aria-hidden="true">#</a></h3><p>将 <code>deployment.yml</code> 中 <code>spec.replicas</code> 调整为5，然后执行：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apply</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployment.yml</span></span>
<span class="line"></span></code></pre></div><h3 id="_4-更新-1" tabindex="-1">4. 更新 <a class="header-anchor" href="#_4-更新-1" aria-hidden="true">#</a></h3><p>将 <code>deployment.yml</code> 最后一行改为 <code>image: syaning/hello-node:v2</code>，然后执行：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apply</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployment.yml</span></span>
<span class="line"></span></code></pre></div><h3 id="_5-删除-1" tabindex="-1">5. 删除 <a class="header-anchor" href="#_5-删除-1" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">delete</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">service.yml</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">delete</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-f</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">deployment.yml</span></span>
<span class="line"></span></code></pre></div>`,50),e=[o];function c(t,r,C,y,D,A){return a(),n("div",null,e)}const F=s(p,[["render",c]]);export{d as __pageData,F as default};
