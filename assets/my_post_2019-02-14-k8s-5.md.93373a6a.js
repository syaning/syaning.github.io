import{_ as s,o as a,c as n,a as l}from"./app.9c5b3fde.js";const i=JSON.parse('{"title":"k8s\u5B66\u4E60\u7B14\u8BB0(5)\u2014\u2014Volume","description":"","frontmatter":{"layout":"post","title":"k8s\u5B66\u4E60\u7B14\u8BB0(5)\u2014\u2014Volume","date":"2019-02-14 00:00:00 +0800"},"headers":[{"level":2,"title":"\u4E00\u3001\u5B9A\u4E49","slug":"\u4E00\u3001\u5B9A\u4E49","link":"#\u4E00\u3001\u5B9A\u4E49","children":[]},{"level":2,"title":"\u4E8C\u3001empytDir","slug":"\u4E8C\u3001empytdir","link":"#\u4E8C\u3001empytdir","children":[]},{"level":2,"title":"\u4E09\u3001hostPath","slug":"\u4E09\u3001hostpath","link":"#\u4E09\u3001hostpath","children":[]},{"level":2,"title":"\u56DB\u3001PV\u548CPVC","slug":"\u56DB\u3001pv\u548Cpvc","link":"#\u56DB\u3001pv\u548Cpvc","children":[]}],"relativePath":"my/post/2019-02-14-k8s-5.md"}'),p={name:"my/post/2019-02-14-k8s-5.md"},o=l(`<h2 id="\u4E00\u3001\u5B9A\u4E49" tabindex="-1">\u4E00\u3001\u5B9A\u4E49 <a class="header-anchor" href="#\u4E00\u3001\u5B9A\u4E49" aria-hidden="true">#</a></h2><p>Pod\u7684\u751F\u547D\u5468\u671F\u662F\u77ED\u6682\u7684\uFF0C\u4F1A\u88AB\u9500\u6BC1\u548C\u521B\u5EFA\uFF0C\u5F53Pod\u88AB\u9500\u6BC1\u7684\u65F6\u5019\uFF0C\u5176\u76F8\u5173\u5BB9\u5668\u5185\u90E8\u7684\u6587\u4EF6\u4E5F\u4F1A\u6D88\u5931\u3002\u5982\u679C\u9700\u8981\u6301\u4E45\u5316\u4FDD\u5B58\u4E00\u4E9B\u6570\u636E\uFF0C\u5C31\u9700\u8981\u4F7F\u7528Volume\u3002</p><p>Kubernetes\u5BF9Volume\u505A\u4E86\u62BD\u8C61\uFF0C\u4E8B\u5B9E\u4E0A\u7684Volume\u5B58\u50A8\u540E\u7AEF\u53EF\u4EE5\u662F\u4E3B\u673A\u4E0A\u7684\u4E00\u4E2A\u76EE\u5F55\uFF0CCeph\u5B58\u50A8\uFF0C\u516C\u6709\u4E91\u7B49\uFF08\u5177\u4F53\u53EF\u53C2\u8003 <a href="https://kubernetes.io/docs/concepts/storage/volumes/#types-of-volumes" target="_blank" rel="noreferrer">Types of Volumes</a>\uFF09\u3002\u4F46\u662F\u5BF9\u4E8EPod\u6765\u8BF4\uFF0CVolume\u5C31\u662F\u4E00\u4E2A\u76EE\u5F55\uFF0C\u5F53\u6302\u5728\u4E86\u4E00\u4E2AVolume\u4E4B\u540E\uFF0CPod\u5185\u7684\u6240\u6709\u5BB9\u5668\u90FD\u80FD\u4F7F\u7528\u3002</p><p>Pod\u7684<code>.spec.volumes</code>\u5B9A\u4E49\u4E86Volume\uFF0C<code>.spec.containers.volumeMounts</code>\u5B9A\u4E49\u4E86Volume\u7684\u6302\u8F7D\u8DEF\u5F84\u3002</p><h2 id="\u4E8C\u3001empytdir" tabindex="-1">\u4E8C\u3001empytDir <a class="header-anchor" href="#\u4E8C\u3001empytdir" aria-hidden="true">#</a></h2><p>emptyDir\u662F\u6700\u57FA\u7840\u7684\u4E00\u79CDVolume\uFF0C\u4F34\u968F\u7740Pod\u7684\u521B\u5EFA\u800C\u521B\u5EFA\uFF0C\u5F53Pod\u88AB\u5220\u9664\u7684\u65F6\u5019\uFF0CemptyDir\u4E5F\u4F1A\u88AB\u5220\u9664\u3002\u4E5F\u5C31\u662F\u8BF4\uFF0CemptyDir\u4E0EPod\u7684\u751F\u547D\u5468\u671F\u4E00\u81F4\u3002</p><p>\u4E0B\u9762\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u4F8B\u5B50\uFF1A</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Pod</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">producer-consumer</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">containers</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">busybox</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">producer</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">volumeMounts</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">mountPath</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/producer_dir</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shared-volume</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">args</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/bin/sh</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-c</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">echo &quot;hello world&quot; &gt; /producer_dir/hello; sleep 30000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">busybox</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">consumer</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">volumeMounts</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">mountPath</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/consumer_dir</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shared-volume</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">args</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/bin/sh</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-c</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cat /consumer_dir/hello; sleep 30000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">volumes</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shared-volume</span></span>
<span class="line"><span style="color:#A6ACCD;">  	</span><span style="color:#F07178;">emptyDir</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span></code></pre></div><h2 id="\u4E09\u3001hostpath" tabindex="-1">\u4E09\u3001hostPath <a class="header-anchor" href="#\u4E09\u3001hostpath" aria-hidden="true">#</a></h2><p>hostPath\u662F\u5C06\u4E3B\u673A\u4E0A\u7684\u4E00\u4E2A\u76EE\u5F55\u4F5C\u4E3AVolume\u6302\u8F7D\u5230Pod\u4E0A\u3002\u4F8B\u5982\u4E0A\u9762\u7684\u4F8B\u5B50\u4E2D\uFF0C\u5C06<code>.spec.volumes</code>\u4FEE\u6539\u5982\u4E0B\uFF1A</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">volumes</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shared-volume</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">hostPath</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/Users/xxx/Desktop/data</span></span>
<span class="line"></span></code></pre></div><p>\u91CD\u65B0apply\u540E\uFF0C\u5373\u53EF\u5728\u4E3B\u673A\u5BF9\u5E94\u7684\u76EE\u5F55\u4E0B\u770B\u5230\u521B\u5EFA\u7684\u6587\u4EF6\u3002</p><h2 id="\u56DB\u3001pv\u548Cpvc" tabindex="-1">\u56DB\u3001PV\u548CPVC <a class="header-anchor" href="#\u56DB\u3001pv\u548Cpvc" aria-hidden="true">#</a></h2><p>\u901A\u5E38\u60C5\u51B5\u4E0B\uFF0C\u7CFB\u7EDF\u7BA1\u7406\u5458\u8D1F\u8D23\u5B58\u50A8\u7684\u521B\u5EFA\uFF0C\u800C\u5E94\u7528\u5F00\u53D1\u4EBA\u5458\u4E0D\u5173\u5FC3\u5B58\u50A8\u7684\u521B\u5EFA\u548C\u7BA1\u7406\uFF0C\u53EA\u5173\u5FC3\u5982\u4F55\u4F7F\u7528\u5B58\u50A8\u7A7A\u95F4\u3002PV(Persistent Volume)\u548CPVC(Persistent Volume Claim)\u5F88\u597D\u5730\u5C06\u5B58\u50A8\u7684\u5206\u914D\u548C\u4F7F\u7528\u8FDB\u884C\u4E86\u89E3\u8026\u3002</p><p>PV\u5B9A\u4E49\u4E86\u4E00\u5757\u5916\u90E8\u7684\u5B58\u50A8\u7A7A\u95F4\uFF0C\u5B83\u7684\u751F\u547D\u5468\u671F\u72EC\u7ACB\u4E8EPod\u7684\u751F\u547D\u5468\u671F\u3002PVC\u662F\u5BF9PV\u7684\u7533\u8BF7\uFF0C\u5F53\u4E00\u4E2APod\u9700\u8981\u4F7F\u7528\u5B58\u50A8\u7684\u65F6\u5019\uFF0C\u4F1A\u521B\u5EFA\u4E00\u4E2APVC\u3002</p><p>k8s\u652F\u6301\u591A\u79CD\u7C7B\u578B\u7684PV\uFF0C\u5177\u4F53\u53EF\u4EE5\u53C2\u8003 <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes" target="_blank" rel="noreferrer">Types of Persistent Volumes</a>\u3002</p><p>\u4E0B\u9762\u662F\u4E00\u4E2A\u4F7F\u7528\u672C\u5730\u5B58\u50A8\u7684\u4F8B\u5B50\uFF1A</p><p>pv.yml:</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PersistentVolume</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pv0001</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">capacity</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">storage</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">5Gi</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">accessModes</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">persistentVolumeReclaimPolicy</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Retain</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">storageClassName</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local-storage</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">local</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/Users/xxx/Desktop/data</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">nodeAffinity</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">required</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">nodeSelectorTerms</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">matchExpressions</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">kubernetes.io/hostname</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">operator</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">In</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#F07178;">values</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker-for-desktop</span></span>
<span class="line"></span></code></pre></div><p>pvc.yml:</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">PersistentVolumeClaim</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pvc0001</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">accessModes</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ReadWriteOnce</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">storageClassName</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">local-storage</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">resources</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">requests</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">storage</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">1Gi</span></span>
<span class="line"></span></code></pre></div><p>pod.yml</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Pod</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pod0001</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">containers</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">busybox</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">busybox</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">volumeMounts</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">mountPath</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/data</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">data-volume</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">args</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/bin/sh</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-c</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">echo &quot;hello world&quot; &gt; /data/hello; sleep 30000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">volumes</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">data-volume</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">persistentVolumeClaim</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">claimName</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pvc0001</span></span>
<span class="line"></span></code></pre></div><p>\u6267\u884C</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl apply -f pv.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl apply -f pvc.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl apply -f pod.yml</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u5C06\u4F1A\u5728\u5BF9\u5E94\u7684\u4E3B\u673A\u76EE\u5F55\u4E0B\u751F\u6210hello\u6587\u4EF6\u3002</p>`,26),e=[o];function c(t,r,y,D,C,A){return a(),n("div",null,e)}const d=s(p,[["render",c]]);export{i as __pageData,d as default};
