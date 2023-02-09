import{_ as s,o as n,c as a,a as p}from"./app.c83dc632.js";const i=JSON.parse('{"title":"Endpoints","description":"","frontmatter":{},"headers":[{"level":2,"title":"默认 Endpoints","slug":"默认-endpoints","link":"#默认-endpoints","children":[]},{"level":2,"title":"自定义 Endpoints","slug":"自定义-endpoints","link":"#自定义-endpoints","children":[]}],"relativePath":"notes/kubernetes/resources/endpoints.md"}'),l={name:"notes/kubernetes/resources/endpoints.md"},o=p(`<h1 id="endpoints" tabindex="-1">Endpoints <a class="header-anchor" href="#endpoints" aria-hidden="true">#</a></h1><h2 id="默认-endpoints" tabindex="-1">默认 Endpoints <a class="header-anchor" href="#默认-endpoints" aria-hidden="true">#</a></h2><p>通常情况下，在创建 Service 的时候，会默认创建 Endpoints，例如：</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apps/v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Deployment</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">replicas</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">matchLabels</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">labels</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">containers</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx:1.17.2</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">containerPort</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Service</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ClusterIP</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">protocol</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TCP</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">targetPort</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"></span></code></pre></div><p>查看 Service：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">svc</span></span>
<span class="line"><span style="color:#FFCB6B;">NAME</span><span style="color:#A6ACCD;">         </span><span style="color:#C3E88D;">TYPE</span><span style="color:#A6ACCD;">        </span><span style="color:#C3E88D;">CLUSTER-IP</span><span style="color:#A6ACCD;">      </span><span style="color:#C3E88D;">EXTERNAL-IP</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">PORT</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">S</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">AGE</span></span>
<span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;">        </span><span style="color:#C3E88D;">ClusterIP</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">10.107.227.24</span><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">non</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">        </span><span style="color:#F78C6C;">80</span><span style="color:#C3E88D;">/TCP</span><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">2m</span></span>
<span class="line"></span></code></pre></div><p>查看 Pod：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">po</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-owide</span></span>
<span class="line"><span style="color:#FFCB6B;">NAME</span><span style="color:#A6ACCD;">                     </span><span style="color:#C3E88D;">READY</span><span style="color:#A6ACCD;">     </span><span style="color:#C3E88D;">STATUS</span><span style="color:#A6ACCD;">    </span><span style="color:#C3E88D;">RESTARTS</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">AGE</span><span style="color:#A6ACCD;">       </span><span style="color:#C3E88D;">IP</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">NODE</span></span>
<span class="line"><span style="color:#FFCB6B;">nginx-56b7d6bcf7-8pf6f</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">/</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">       </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">1m</span><span style="color:#A6ACCD;">        </span><span style="color:#C3E88D;">10.1.0.43</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">docker-for-desktop</span></span>
<span class="line"><span style="color:#FFCB6B;">nginx-56b7d6bcf7-bl9vh</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">/</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">       </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">1m</span><span style="color:#A6ACCD;">        </span><span style="color:#C3E88D;">10.1.0.45</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">docker-for-desktop</span></span>
<span class="line"><span style="color:#FFCB6B;">nginx-56b7d6bcf7-wl4qb</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">/</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">       </span><span style="color:#C3E88D;">Running</span><span style="color:#A6ACCD;">   </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">          </span><span style="color:#C3E88D;">1m</span><span style="color:#A6ACCD;">        </span><span style="color:#C3E88D;">10.1.0.44</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">docker-for-desktop</span></span>
<span class="line"></span></code></pre></div><p>查看 Service：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">endpoints</span></span>
<span class="line"><span style="color:#FFCB6B;">NAME</span><span style="color:#A6ACCD;">         </span><span style="color:#C3E88D;">ENDPOINTS</span><span style="color:#A6ACCD;">                                </span><span style="color:#C3E88D;">AGE</span></span>
<span class="line"><span style="color:#FFCB6B;">nginx</span><span style="color:#A6ACCD;">        </span><span style="color:#C3E88D;">10.1.0.43:</span><span style="color:#F78C6C;">80</span><span style="color:#C3E88D;">,10.1.0.44:</span><span style="color:#F78C6C;">80</span><span style="color:#C3E88D;">,10.1.0.45:</span><span style="color:#F78C6C;">80</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">3m</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubectl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">get</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">endpoints</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-oyaml</span></span>
<span class="line"><span style="color:#FFCB6B;">apiVersion:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#FFCB6B;">kind:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Endpoints</span></span>
<span class="line"><span style="color:#FFCB6B;">metadata:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">creationTimestamp:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2019</span><span style="color:#C3E88D;">-</span><span style="color:#F78C6C;">08</span><span style="color:#C3E88D;">-14T15:</span><span style="color:#F78C6C;">09</span><span style="color:#C3E88D;">:13Z</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">name:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">namespace:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">default</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">resourceVersion:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">670768</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">selfLink:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/api/v1/namespaces/default/endpoints/nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">uid:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">7a0d276e-bea5-</span><span style="color:#F78C6C;">11e9</span><span style="color:#C3E88D;">-98fc-</span><span style="color:#F78C6C;">025000000001</span></span>
<span class="line"><span style="color:#FFCB6B;">subsets:</span></span>
<span class="line"><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addresses:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ip:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">10.1.0.43</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">nodeName:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker-for-desktop</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">targetRef:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">kind:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Pod</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">name:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx-56b7d6bcf7-8pf6f</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">namespace:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">default</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">resourceVersion:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">670758</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">uid:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">7a11eab2-bea5-</span><span style="color:#F78C6C;">11e9</span><span style="color:#C3E88D;">-98fc-</span><span style="color:#F78C6C;">025000000001</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ip:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">10.1.0.44</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">nodeName:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker-for-desktop</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">targetRef:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">kind:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Pod</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">name:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx-56b7d6bcf7-wl4qb</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">namespace:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">default</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">resourceVersion:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">670761</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">uid:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">7a10580e-bea5-</span><span style="color:#F78C6C;">11e9</span><span style="color:#C3E88D;">-98fc-</span><span style="color:#F78C6C;">025000000001</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ip:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">10.1.0.45</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">nodeName:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker-for-desktop</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">targetRef:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">kind:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Pod</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">name:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx-56b7d6bcf7-bl9vh</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">namespace:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">default</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">resourceVersion:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">670766</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#FFCB6B;">uid:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">7a124e66-bea5-</span><span style="color:#F78C6C;">11e9</span><span style="color:#C3E88D;">-98fc-</span><span style="color:#F78C6C;">025000000001</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">port:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">protocol:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TCP</span></span>
<span class="line"></span></code></pre></div><p>可以看到，默认的 Endpoints 即为所选中的 Pod 的集合。</p><h2 id="自定义-endpoints" tabindex="-1">自定义 Endpoints <a class="header-anchor" href="#自定义-endpoints" aria-hidden="true">#</a></h2><p>如果 Service 没有定义 Selector，那么它默认不会选中任何 Pod，也就不会自动创建 Endpoints。可以自定义 Endpoints 来使得 Service 使用集群外部的服务。例如：</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Service</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my-service</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">protocol</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TCP</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Endpoints</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">my-service</span></span>
<span class="line"><span style="color:#F07178;">subsets</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">addresses</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">ip</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">192.168.1.3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">9000</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">protocol</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TCP</span></span>
<span class="line"></span></code></pre></div><p>甚至可以指定多组 <code>subsets</code>：</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Service</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my-service</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">protocol</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TCP</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Endpoints</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">my-service</span></span>
<span class="line"><span style="color:#F07178;">subsets</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">addresses</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">ip</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">192.168.1.3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">9000</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">protocol</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TCP</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">addresses</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">ip</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">192.168.1.3</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">9001</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">protocol</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TCP</span></span>
<span class="line"></span></code></pre></div><p>需要特别注意的是，Endpoints 的 <code>name</code> 和 Service 的 <code>name</code> 必须保持一致。</p>`,17),e=[o];function c(t,r,C,y,D,A){return n(),a("div",null,e)}const d=s(l,[["render",c]]);export{i as __pageData,d as default};
