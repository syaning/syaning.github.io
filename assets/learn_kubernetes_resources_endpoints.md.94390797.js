import{_ as s,o as n,c as a,a as p}from"./app.9c5b3fde.js";const F=JSON.parse('{"title":"Endpoints","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u9ED8\u8BA4 Endpoints","slug":"\u9ED8\u8BA4-endpoints","link":"#\u9ED8\u8BA4-endpoints","children":[]},{"level":2,"title":"\u81EA\u5B9A\u4E49 Endpoints","slug":"\u81EA\u5B9A\u4E49-endpoints","link":"#\u81EA\u5B9A\u4E49-endpoints","children":[]}],"relativePath":"learn/kubernetes/resources/endpoints.md"}'),l={name:"learn/kubernetes/resources/endpoints.md"},o=p(`<h1 id="endpoints" tabindex="-1">Endpoints <a class="header-anchor" href="#endpoints" aria-hidden="true">#</a></h1><h2 id="\u9ED8\u8BA4-endpoints" tabindex="-1">\u9ED8\u8BA4 Endpoints <a class="header-anchor" href="#\u9ED8\u8BA4-endpoints" aria-hidden="true">#</a></h2><p>\u901A\u5E38\u60C5\u51B5\u4E0B\uFF0C\u5728\u521B\u5EFA Service \u7684\u65F6\u5019\uFF0C\u4F1A\u9ED8\u8BA4\u521B\u5EFA Endpoints\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apps/v1</span></span>
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
<span class="line"></span></code></pre></div><p>\u67E5\u770B Service\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl get svc</span></span>
<span class="line"><span style="color:#A6ACCD;">NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">S</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">   AGE</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx        ClusterIP   10.107.227.24   </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">none</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">        80/TCP    2m</span></span>
<span class="line"></span></code></pre></div><p>\u67E5\u770B Pod\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl get po -owide</span></span>
<span class="line"><span style="color:#A6ACCD;">NAME                     READY     STATUS    RESTARTS   AGE       IP          NODE</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx-56b7d6bcf7-8pf6f   1/1       Running   0          1m        10.1.0.43   docker-for-desktop</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx-56b7d6bcf7-bl9vh   1/1       Running   0          1m        10.1.0.45   docker-for-desktop</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx-56b7d6bcf7-wl4qb   1/1       Running   0          1m        10.1.0.44   docker-for-desktop</span></span>
<span class="line"></span></code></pre></div><p>\u67E5\u770B Service\uFF1A</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl get endpoints</span></span>
<span class="line"><span style="color:#A6ACCD;">NAME         ENDPOINTS                                AGE</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx        10.1.0.43:80,10.1.0.44:80,10.1.0.45:80   3m</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl get endpoints nginx -oyaml</span></span>
<span class="line"><span style="color:#A6ACCD;">apiVersion: v1</span></span>
<span class="line"><span style="color:#A6ACCD;">kind: Endpoints</span></span>
<span class="line"><span style="color:#A6ACCD;">metadata:</span></span>
<span class="line"><span style="color:#A6ACCD;">  creationTimestamp: 2019-08-14T15:09:13Z</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">  namespace: default</span></span>
<span class="line"><span style="color:#A6ACCD;">  resourceVersion: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">670768</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  selfLink: /api/v1/namespaces/default/endpoints/nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">  uid: 7a0d276e-bea5-11e9-98fc-025000000001</span></span>
<span class="line"><span style="color:#A6ACCD;">subsets:</span></span>
<span class="line"><span style="color:#A6ACCD;">- addresses:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - ip: 10.1.0.43</span></span>
<span class="line"><span style="color:#A6ACCD;">    nodeName: docker-for-desktop</span></span>
<span class="line"><span style="color:#A6ACCD;">    targetRef:</span></span>
<span class="line"><span style="color:#A6ACCD;">      kind: Pod</span></span>
<span class="line"><span style="color:#A6ACCD;">      name: nginx-56b7d6bcf7-8pf6f</span></span>
<span class="line"><span style="color:#A6ACCD;">      namespace: default</span></span>
<span class="line"><span style="color:#A6ACCD;">      resourceVersion: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">670758</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      uid: 7a11eab2-bea5-11e9-98fc-025000000001</span></span>
<span class="line"><span style="color:#A6ACCD;">  - ip: 10.1.0.44</span></span>
<span class="line"><span style="color:#A6ACCD;">    nodeName: docker-for-desktop</span></span>
<span class="line"><span style="color:#A6ACCD;">    targetRef:</span></span>
<span class="line"><span style="color:#A6ACCD;">      kind: Pod</span></span>
<span class="line"><span style="color:#A6ACCD;">      name: nginx-56b7d6bcf7-wl4qb</span></span>
<span class="line"><span style="color:#A6ACCD;">      namespace: default</span></span>
<span class="line"><span style="color:#A6ACCD;">      resourceVersion: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">670761</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      uid: 7a10580e-bea5-11e9-98fc-025000000001</span></span>
<span class="line"><span style="color:#A6ACCD;">  - ip: 10.1.0.45</span></span>
<span class="line"><span style="color:#A6ACCD;">    nodeName: docker-for-desktop</span></span>
<span class="line"><span style="color:#A6ACCD;">    targetRef:</span></span>
<span class="line"><span style="color:#A6ACCD;">      kind: Pod</span></span>
<span class="line"><span style="color:#A6ACCD;">      name: nginx-56b7d6bcf7-bl9vh</span></span>
<span class="line"><span style="color:#A6ACCD;">      namespace: default</span></span>
<span class="line"><span style="color:#A6ACCD;">      resourceVersion: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">670766</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      uid: 7a124e66-bea5-11e9-98fc-025000000001</span></span>
<span class="line"><span style="color:#A6ACCD;">  ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - port: 80</span></span>
<span class="line"><span style="color:#A6ACCD;">    protocol: TCP</span></span>
<span class="line"></span></code></pre></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u9ED8\u8BA4\u7684 Endpoints \u5373\u4E3A\u6240\u9009\u4E2D\u7684 Pod \u7684\u96C6\u5408\u3002</p><h2 id="\u81EA\u5B9A\u4E49-endpoints" tabindex="-1">\u81EA\u5B9A\u4E49 Endpoints <a class="header-anchor" href="#\u81EA\u5B9A\u4E49-endpoints" aria-hidden="true">#</a></h2><p>\u5982\u679C Service \u6CA1\u6709\u5B9A\u4E49 Selector\uFF0C\u90A3\u4E48\u5B83\u9ED8\u8BA4\u4E0D\u4F1A\u9009\u4E2D\u4EFB\u4F55 Pod\uFF0C\u4E5F\u5C31\u4E0D\u4F1A\u81EA\u52A8\u521B\u5EFA Endpoints\u3002\u53EF\u4EE5\u81EA\u5B9A\u4E49 Endpoints \u6765\u4F7F\u5F97 Service \u4F7F\u7528\u96C6\u7FA4\u5916\u90E8\u7684\u670D\u52A1\u3002\u4F8B\u5982\uFF1A</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
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
<span class="line"></span></code></pre></div><p>\u751A\u81F3\u53EF\u4EE5\u6307\u5B9A\u591A\u7EC4 <code>subsets</code>\uFF1A</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
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
<span class="line"></span></code></pre></div><p>\u9700\u8981\u7279\u522B\u6CE8\u610F\u7684\u662F\uFF0CEndpoints \u7684 <code>name</code> \u548C Service \u7684 <code>name</code> \u5FC5\u987B\u4FDD\u6301\u4E00\u81F4\u3002</p>`,17),e=[o];function c(t,r,y,C,D,A){return n(),a("div",null,e)}const d=s(l,[["render",c]]);export{F as __pageData,d as default};
