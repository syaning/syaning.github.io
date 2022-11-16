import{_ as s,o as n,c as a,a as l}from"./app.ab6fc094.js";const u=JSON.parse('{"title":"ServiceAccount","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u7B80\u4ECB","slug":"\u7B80\u4ECB","link":"#\u7B80\u4ECB","children":[]},{"level":2,"title":"\u521B\u5EFA ServiceAccount","slug":"\u521B\u5EFA-serviceaccount","link":"#\u521B\u5EFA-serviceaccount","children":[]},{"level":2,"title":"\u4F7F\u7528 ServiceAccount","slug":"\u4F7F\u7528-serviceaccount","link":"#\u4F7F\u7528-serviceaccount","children":[]},{"level":2,"title":"\u6DFB\u52A0 imagePullSecret","slug":"\u6DFB\u52A0-imagepullsecret","link":"#\u6DFB\u52A0-imagepullsecret","children":[]},{"level":2,"title":"\u53C2\u8003","slug":"\u53C2\u8003","link":"#\u53C2\u8003","children":[]}],"relativePath":"notes/kubernetes/resources/service-account.md"}'),e={name:"notes/kubernetes/resources/service-account.md"},p=l(`<h1 id="serviceaccount" tabindex="-1">ServiceAccount <a class="header-anchor" href="#serviceaccount" aria-hidden="true">#</a></h1><h2 id="\u7B80\u4ECB" tabindex="-1">\u7B80\u4ECB <a class="header-anchor" href="#\u7B80\u4ECB" aria-hidden="true">#</a></h2><p>ServiceAccount \u662F\u4E3A Pod \u5185\u7684\u8FDB\u7A0B\u8C03\u7528\u96C6\u7FA4\u7684 API \u6240\u4F7F\u7528\u7684\uFF0C\u662F\u4E0E namespace \u7ED1\u5B9A\u7684\u3002</p><p>\u6BCF\u4E2A namespace \u521B\u5EFA\u7684\u65F6\u5019\uFF0C\u4F1A\u9ED8\u8BA4\u521B\u5EFA\u4E00\u4E2A default \u7684 ServiceAccount\uFF0C\u6BCF\u4E2A ServiceAccount \u521B\u5EFA\u7684\u65F6\u5019\uFF0C\u4F1A\u9ED8\u8BA4\u521B\u5EFA\u4E00\u4E2A\u7C7B\u578B\u4E3A <code>kubernetes.io/service-account-token</code> \u7684 Secret\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl create ns </span><span style="color:#82AAFF;">test</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl get sa -n </span><span style="color:#82AAFF;">test</span></span>
<span class="line"><span style="color:#A6ACCD;">NAME      SECRETS   AGE</span></span>
<span class="line"><span style="color:#A6ACCD;">default   1         48s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl get sa -n </span><span style="color:#82AAFF;">test</span><span style="color:#A6ACCD;"> default -oyaml</span></span>
<span class="line"><span style="color:#A6ACCD;">apiVersion: v1</span></span>
<span class="line"><span style="color:#A6ACCD;">kind: ServiceAccount</span></span>
<span class="line"><span style="color:#A6ACCD;">metadata:</span></span>
<span class="line"><span style="color:#A6ACCD;">  creationTimestamp: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">2019-08-25T14:26:16Z</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: default</span></span>
<span class="line"><span style="color:#A6ACCD;">  namespace: </span><span style="color:#82AAFF;">test</span></span>
<span class="line"><span style="color:#A6ACCD;">  resourceVersion: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">116679</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  selfLink: /api/v1/namespaces/test/serviceaccounts/default</span></span>
<span class="line"><span style="color:#A6ACCD;">  uid: 4c51e386-c744-11e9-b46c-025000000001</span></span>
<span class="line"><span style="color:#A6ACCD;">secrets:</span></span>
<span class="line"><span style="color:#A6ACCD;">- name: default-token-6wgrh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl get secret -n </span><span style="color:#82AAFF;">test</span></span>
<span class="line"><span style="color:#A6ACCD;">NAME                  TYPE                                  DATA   AGE</span></span>
<span class="line"><span style="color:#A6ACCD;">default-token-6wgrh   kubernetes.io/service-account-token   3      83s</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl get secret -n </span><span style="color:#82AAFF;">test</span><span style="color:#A6ACCD;"> default-token-6wgrh -oyaml</span></span>
<span class="line"><span style="color:#A6ACCD;">apiVersion: v1</span></span>
<span class="line"><span style="color:#A6ACCD;">data:</span></span>
<span class="line"><span style="color:#A6ACCD;">  ca.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  namespace: dGVzdA==</span></span>
<span class="line"><span style="color:#A6ACCD;">  token: ZXlKaGJHY2lPaUpTVXpJMU5pSX...</span></span>
<span class="line"><span style="color:#A6ACCD;">kind: Secret</span></span>
<span class="line"><span style="color:#A6ACCD;">metadata:</span></span>
<span class="line"><span style="color:#A6ACCD;">  annotations:</span></span>
<span class="line"><span style="color:#A6ACCD;">    kubernetes.io/service-account.name: default</span></span>
<span class="line"><span style="color:#A6ACCD;">    kubernetes.io/service-account.uid: 4c51e386-c744-11e9-b46c-025000000001</span></span>
<span class="line"><span style="color:#A6ACCD;">  creationTimestamp: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">2019-08-25T14:26:16Z</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: default-token-6wgrh</span></span>
<span class="line"><span style="color:#A6ACCD;">  namespace: </span><span style="color:#82AAFF;">test</span></span>
<span class="line"><span style="color:#A6ACCD;">  resourceVersion: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">116678</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  selfLink: /api/v1/namespaces/test/secrets/default-token-6wgrh</span></span>
<span class="line"><span style="color:#A6ACCD;">  uid: 4c586a91-c744-11e9-b46c-025000000001</span></span>
<span class="line"><span style="color:#A6ACCD;">type: kubernetes.io/service-account-token</span></span>
<span class="line"></span></code></pre></div><p>Pod \u521B\u5EFA\u7684\u65F6\u5019\uFF0C\u4F1A\u9ED8\u8BA4\u4F7F\u7528\u5F53\u524D namespace \u4E0B default \u7684 ServiceAccount\uFF0C\u5E76\u4E14\u5C06\u5176\u5BF9\u5E94\u7684 Secret \u6302\u8F7D\u5230\u5BB9\u5668\u7684 <code>/var/run/secrets/kubernetes.io/serviceaccount</code> \u4E0B\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl describe po nginx-66f9f9cfd5-64ht8 -n </span><span style="color:#82AAFF;">test</span></span>
<span class="line"><span style="color:#A6ACCD;">Name:               nginx-66f9f9cfd5-64ht8</span></span>
<span class="line"><span style="color:#A6ACCD;">Namespace:          </span><span style="color:#82AAFF;">test</span></span>
<span class="line"><span style="color:#A6ACCD;">Containers:</span></span>
<span class="line"><span style="color:#A6ACCD;">  nginx:</span></span>
<span class="line"><span style="color:#A6ACCD;">    Container ID:   docker://5d84cb88a19db3390a924f85da507b24c449f9c18bf8ba49e7899eb00b87fc72</span></span>
<span class="line"><span style="color:#A6ACCD;">    Image:          nginx:1.16</span></span>
<span class="line"><span style="color:#A6ACCD;">    Port:           80/TCP</span></span>
<span class="line"><span style="color:#A6ACCD;">    Mounts:</span></span>
<span class="line"><span style="color:#A6ACCD;">      /var/run/secrets/kubernetes.io/serviceaccount from default-token-6wgrh </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">ro</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">Volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">  default-token-6wgrh:</span></span>
<span class="line"><span style="color:#A6ACCD;">    Type:        Secret </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">a volume populated by a Secret</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    SecretName:  default-token-6wgrh</span></span>
<span class="line"><span style="color:#A6ACCD;">    Optional:    </span><span style="color:#82AAFF;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl get po nginx-66f9f9cfd5-64ht8 -n </span><span style="color:#82AAFF;">test</span><span style="color:#A6ACCD;"> -oyaml</span></span>
<span class="line"><span style="color:#A6ACCD;">apiVersion: v1</span></span>
<span class="line"><span style="color:#A6ACCD;">kind: Pod</span></span>
<span class="line"><span style="color:#A6ACCD;">metadata:</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: nginx-66f9f9cfd5-64ht8</span></span>
<span class="line"><span style="color:#A6ACCD;">  namespace: </span><span style="color:#82AAFF;">test</span></span>
<span class="line"><span style="color:#A6ACCD;">spec:</span></span>
<span class="line"><span style="color:#A6ACCD;">  containers:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - image: nginx:1.16</span></span>
<span class="line"><span style="color:#A6ACCD;">    name: nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">    ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - containerPort: 80</span></span>
<span class="line"><span style="color:#A6ACCD;">      protocol: TCP</span></span>
<span class="line"><span style="color:#A6ACCD;">    volumeMounts:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount</span></span>
<span class="line"><span style="color:#A6ACCD;">      name: default-token-6wgrh</span></span>
<span class="line"><span style="color:#A6ACCD;">      readOnly: </span><span style="color:#82AAFF;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">  serviceAccount: default</span></span>
<span class="line"><span style="color:#A6ACCD;">  serviceAccountName: default</span></span>
<span class="line"><span style="color:#A6ACCD;">  volumes:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - name: default-token-6wgrh</span></span>
<span class="line"><span style="color:#A6ACCD;">    secret:</span></span>
<span class="line"><span style="color:#A6ACCD;">      defaultMode: 420</span></span>
<span class="line"><span style="color:#A6ACCD;">      secretName: default-token-6wgrh</span></span>
<span class="line"></span></code></pre></div><h2 id="\u521B\u5EFA-serviceaccount" tabindex="-1">\u521B\u5EFA ServiceAccount <a class="header-anchor" href="#\u521B\u5EFA-serviceaccount" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl create sa test-sa</span></span>
<span class="line"></span></code></pre></div><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ServiceAccount</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test-sa</span></span>
<span class="line"></span></code></pre></div><h2 id="\u4F7F\u7528-serviceaccount" tabindex="-1">\u4F7F\u7528 ServiceAccount <a class="header-anchor" href="#\u4F7F\u7528-serviceaccount" aria-hidden="true">#</a></h2><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apps/v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Deployment</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">matchLabels</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">labels</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">serviceAccountName</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">test-sa</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">containers</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx:1.16</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">containerPort</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"></span></code></pre></div><p>ServiceAccount \u901A\u5E38\u4F1A\u548C Role \u6216\u8005 ClusterRole \u8FDB\u884C\u7ED1\u5B9A\uFF0C\u4ECE\u800C\u88AB\u8D4B\u4E88\u4E00\u5B9A\u7684\u6743\u9650\uFF0C\u4F8B\u5982\u8BFB\u53D6 Pod \u4FE1\u606F\u7B49\u3002\u8BE6\u60C5\u67E5\u770B <a href="./../guides/rbac.html">RBAC</a>\u3002</p><h2 id="\u6DFB\u52A0-imagepullsecret" tabindex="-1">\u6DFB\u52A0 imagePullSecret <a class="header-anchor" href="#\u6DFB\u52A0-imagepullsecret" aria-hidden="true">#</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl create secret docker-registry private-registry \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    --docker-username=admin \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    --docker-password=admin \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    --docker-email=admin@example.com \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    --docker-server=https://127.0.0.1:5000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl create sa test-sa</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl patch sa test-sa -p </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{&quot;imagePullSecrets&quot;: [{&quot;name&quot;: &quot;private-registry&quot;}]}</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl get sa test-sa -oyaml</span></span>
<span class="line"><span style="color:#A6ACCD;">apiVersion: v1</span></span>
<span class="line"><span style="color:#A6ACCD;">kind: ServiceAccount</span></span>
<span class="line"><span style="color:#A6ACCD;">metadata:</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: test-sa</span></span>
<span class="line"><span style="color:#A6ACCD;">  namespace: default</span></span>
<span class="line"><span style="color:#A6ACCD;">secrets:</span></span>
<span class="line"><span style="color:#A6ACCD;">- name: test-sa-token-pmk8t</span></span>
<span class="line"><span style="color:#A6ACCD;">imagePullSecrets:</span></span>
<span class="line"><span style="color:#A6ACCD;">- name: private-registry</span></span>
<span class="line"></span></code></pre></div><p>\u7136\u540E\u4E4B\u540E\u521B\u5EFA\u7684 Pod \u5C31\u4F1A\u81EA\u52A8\u5E26\u4E0A\u6307\u5B9A\u7684 <code>imagePullSecrets</code>\uFF1A</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#C3E88D;">$ kubectl get po nginx-7988dffbf-svfvh -oyaml</span></span>
<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Pod</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx-7988dffbf-svfvh</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">namespace</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">default</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">containers</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx:1.16</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">imagePullSecrets</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">private-registry</span></span>
<span class="line"></span></code></pre></div><h2 id="\u53C2\u8003" tabindex="-1">\u53C2\u8003 <a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a></h2><ul><li><a href="https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/" target="_blank" rel="noreferrer">Configure Service Accounts for Pods</a></li><li><a href="https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/" target="_blank" rel="noreferrer">Managing Service Accounts</a></li></ul>`,19),o=[p];function c(t,r,i,A,C,y){return n(),a("div",null,o)}const d=s(e,[["render",c]]);export{u as __pageData,d as default};
