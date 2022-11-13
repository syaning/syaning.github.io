import{_ as s,o as a,c as e,a as n}from"./app.9c5b3fde.js";const l="/assets/k8s-cluster.9f98ebe3.svg",A=JSON.parse('{"title":"k8s\u5B66\u4E60\u7B14\u8BB0(1)\u2014\u2014\u57FA\u672C\u6982\u5FF5","description":"","frontmatter":{"layout":"post","title":"k8s\u5B66\u4E60\u7B14\u8BB0(1)\u2014\u2014\u57FA\u672C\u6982\u5FF5","date":"2019-01-06 23:50:00 +0800"},"headers":[{"level":2,"title":"\u4E00\u3001\u5B89\u88C5k8s","slug":"\u4E00\u3001\u5B89\u88C5k8s","link":"#\u4E00\u3001\u5B89\u88C5k8s","children":[{"level":3,"title":"1. \u5B89\u88C5 kubeadm\uFF0Ckubelet\u548Ckubectl","slug":"_1-\u5B89\u88C5-kubeadm-kubelet\u548Ckubectl","link":"#_1-\u5B89\u88C5-kubeadm-kubelet\u548Ckubectl","children":[]},{"level":3,"title":"2. \u7981\u7528swap","slug":"_2-\u7981\u7528swap","link":"#_2-\u7981\u7528swap","children":[]},{"level":3,"title":"3. \u521D\u59CB\u5316master\u8282\u70B9","slug":"_3-\u521D\u59CB\u5316master\u8282\u70B9","link":"#_3-\u521D\u59CB\u5316master\u8282\u70B9","children":[]},{"level":3,"title":"4. \u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6","slug":"_4-\u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6","link":"#_4-\u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6","children":[]},{"level":3,"title":"5. \u67E5\u770B","slug":"_5-\u67E5\u770B","link":"#_5-\u67E5\u770B","children":[]}]},{"level":2,"title":"\u4E8C\u3001\u57FA\u672C\u6982\u5FF5","slug":"\u4E8C\u3001\u57FA\u672C\u6982\u5FF5","link":"#\u4E8C\u3001\u57FA\u672C\u6982\u5FF5","children":[{"level":3,"title":"1. Master, Node","slug":"_1-master-node","link":"#_1-master-node","children":[]},{"level":3,"title":"2. Pod","slug":"_2-pod","link":"#_2-pod","children":[]},{"level":3,"title":"3. Service","slug":"_3-service","link":"#_3-service","children":[]},{"level":3,"title":"4. Namespace","slug":"_4-namespace","link":"#_4-namespace","children":[]},{"level":3,"title":"5. Controller","slug":"_5-controller","link":"#_5-controller","children":[]}]}],"relativePath":"my/post/2019-01-06-k8s-1.md"}'),p={name:"my/post/2019-01-06-k8s-1.md"},o=n(`<h2 id="\u4E00\u3001\u5B89\u88C5k8s" tabindex="-1">\u4E00\u3001\u5B89\u88C5k8s <a class="header-anchor" href="#\u4E00\u3001\u5B89\u88C5k8s" aria-hidden="true">#</a></h2><p>\u53C2\u8003 <a href="https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/" target="_blank" rel="noreferrer">Creating a single master cluster with kubeadm</a></p><h3 id="_1-\u5B89\u88C5-kubeadm-kubelet\u548Ckubectl" tabindex="-1">1. \u5B89\u88C5 kubeadm\uFF0Ckubelet\u548Ckubectl <a class="header-anchor" href="#_1-\u5B89\u88C5-kubeadm-kubelet\u548Ckubectl" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> apt-key add -</span></span>
<span class="line"><span style="color:#A6ACCD;">$ cat </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#89DDFF;">EOF</span><span style="color:#C3E88D;"> &gt;/etc/apt/sources.list.d/kubernetes.list</span></span>
<span class="line"><span style="color:#C3E88D;">  deb https://apt.kubernetes.io/ kubernetes-xenial main</span></span>
<span class="line"><span style="color:#C3E88D;">  EOF</span></span>
<span class="line"><span style="color:#C3E88D;">$ sudo apt-get update</span></span>
<span class="line"><span style="color:#C3E88D;">$ sudo apt-get install kubeadm kubelet kubectl</span></span>
<span class="line"></span></code></pre></div><h3 id="_2-\u7981\u7528swap" tabindex="-1">2. \u7981\u7528swap <a class="header-anchor" href="#_2-\u7981\u7528swap" aria-hidden="true">#</a></h3><p>\u53C2\u8003 <a href="https://askubuntu.com/questions/214805/how-do-i-disable-swap" target="_blank" rel="noreferrer">How do I disable swap?</a></p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ sudo sed -i </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/ swap / s/^\\(.*\\)$/#\\1/g</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> /etc/fstab</span></span>
<span class="line"><span style="color:#A6ACCD;">$ sudo swapoff -a</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-\u521D\u59CB\u5316master\u8282\u70B9" tabindex="-1">3. \u521D\u59CB\u5316master\u8282\u70B9 <a class="header-anchor" href="#_3-\u521D\u59CB\u5316master\u8282\u70B9" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ sudo kubeadm init --pod-network-cidr=192.168.0.0/16 --apiserver-advertise-address=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">your_ip_address</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;"># e.g. sudo kubeadm init --pod-network-cidr=192.168.0.0/16 --apiserver-advertise-address=10.10.23.114</span></span>
<span class="line"></span></code></pre></div><p>\u8F93\u51FA\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Your Kubernetes master has initialized successfully!</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">To start using your cluster, you need to run the following as a regular user:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  mkdir -p $HOME/.kube</span></span>
<span class="line"><span style="color:#A6ACCD;">  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config</span></span>
<span class="line"><span style="color:#A6ACCD;">  sudo chown $(id -u):$(id -g) $HOME/.kube/config</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">You should now deploy a pod network to the cluster.</span></span>
<span class="line"><span style="color:#A6ACCD;">Run &quot;kubectl apply -f [podnetwork].yaml&quot; with one of the options listed at:</span></span>
<span class="line"><span style="color:#A6ACCD;">  https://kubernetes.io/docs/concepts/cluster-administration/addons/</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">You can now join any number of machines by running the following on each node</span></span>
<span class="line"><span style="color:#A6ACCD;">as root:</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  kubeadm join 10.10.23.114:6443 --token 8fssei.60vi31sjkpoinj4w --discovery-token-ca-cert-hash sha256:3b460e190cfbc9ad2cf7d3900559871efb831e252b6b8e5452a01a875229a3d7</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u7EE7\u7EED\u6267\u884C\uFF1A</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ mkdir -p </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">HOME/.kube</span></span>
<span class="line"><span style="color:#A6ACCD;">$ sudo cp -i /etc/kubernetes/admin.conf </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">HOME/.kube/config</span></span>
<span class="line"><span style="color:#A6ACCD;">$ sudo chown </span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">id -u</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">:</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">id -g</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">HOME/.kube/config</span></span>
<span class="line"></span></code></pre></div><h3 id="_4-\u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6" tabindex="-1">4. \u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6 <a class="header-anchor" href="#_4-\u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl apply -f https://docs.projectcalico.org/v3.3/getting-started/kubernetes/installation/hosted/rbac-kdd.yaml</span></span>
<span class="line"><span style="color:#A6ACCD;">$ kubectl apply -f https://docs.projectcalico.org/v3.3/getting-started/kubernetes/installation/hosted/kubernetes-datastore/calico-networking/1.7/calico.yaml</span></span>
<span class="line"></span></code></pre></div><h3 id="_5-\u67E5\u770B" tabindex="-1">5. \u67E5\u770B <a class="header-anchor" href="#_5-\u67E5\u770B" aria-hidden="true">#</a></h3><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ kubectl get nodes</span></span>
<span class="line"></span></code></pre></div><p>\u8F93\u51FA</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">NAME          STATUS   ROLES    AGE   VERSION</span></span>
<span class="line"><span style="color:#A6ACCD;">desktop-280   Ready    master   11m   v1.13.0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5982\u679C\u901A\u8FC7 <code>kubectl get pods --all-namespaces</code> \u53D1\u73B0\u6709 coredns \u62A5\u9519\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">NAMESPACE     NAME                           READY   STATUS             RESTARTS   AGE</span></span>
<span class="line"><span style="color:#A6ACCD;">kube-system   pod/coredns-86c58d9df4-ccwhd   0/1     CrashLoopBackOff   6          9m57s</span></span>
<span class="line"><span style="color:#A6ACCD;">kube-system   pod/coredns-86c58d9df4-t9gvs   0/1     CrashLoopBackOff   6          9m57s</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u53C2\u8003 <a href="https://askubuntu.com/questions/627899/nameserver-127-0-1-1-in-resolv-conf-wont-go-away/627900#627900" target="_blank" rel="noreferrer">nameserver 127.0.1.1 in resolv.conf won&#39;t go away!</a></p><p>\u9996\u5148\u7F16\u8F91 <code>/etc/NetworkManager/NetworkManager.conf</code>\uFF0C\u6CE8\u91CA <code>dns=dnsmasq</code> \u8FD9\u4E00\u884C\uFF0C\u7136\u540E\u6267\u884C <code>sudo service network-manager restart</code>\uFF0C\u7136\u540E\u67E5\u770B <code>/etc/resolv.conf</code>, \u5982\u679C\u6709 <code>nameserver 127.0.0.1</code> \u8FD9\u4E00\u884C\uFF0C\u5219\u6CE8\u91CA\u6389\u3002</p><p>\u7136\u540E\u6267\u884C <code>sudo kubeadm reset -f</code>\uFF0C\u518D\u91CD\u65B0\u6267\u884C\u4E0A\u8FF0\u6B65\u9AA4\u521D\u59CB\u5316master\u8282\u70B9\u5373\u53EF\u3002</p><h2 id="\u4E8C\u3001\u57FA\u672C\u6982\u5FF5" tabindex="-1">\u4E8C\u3001\u57FA\u672C\u6982\u5FF5 <a class="header-anchor" href="#\u4E8C\u3001\u57FA\u672C\u6982\u5FF5" aria-hidden="true">#</a></h2><p>\u8BE5\u90E8\u5206\u5185\u5BB9\u53EF\u53C2\u8003\uFF1A</p><ul><li><a href="https://kubernetes.io/docs/concepts/" target="_blank" rel="noreferrer">Concepts</a></li><li><a href="http://omerio.com/2015/12/18/learn-the-kubernetes-key-concepts-in-10-minutes/" target="_blank" rel="noreferrer">Learn the Kubernetes Key Concepts in 10 Minutes</a></li><li><a href="https://medium.com/yld-engineering-blog/kubernetes-core-concepts-324ea7028c29" target="_blank" rel="noreferrer">Kubernetes: Core Concepts</a></li></ul><p>k8s\u96C6\u7FA4\u7684\u57FA\u672C\u7ED3\u6784\u53EF\u4EE5\u53C2\u8003\u4E0B\u56FE\uFF1A</p><p><img src="`+l+`" alt=""></p><blockquote><p>\u56FE\u7247\u6765\u6E90 <a href="http://omerio.com/2015/12/18/learn-the-kubernetes-key-concepts-in-10-minutes/" target="_blank" rel="noreferrer">http://omerio.com/2015/12/18/learn-the-kubernetes-key-concepts-in-10-minutes/</a></p><p>\u6CE8\uFF1A\u56FE\u4E2D master \u8282\u70B9\u7684 Replication Controller\uFF0C\u73B0\u5728\u662F Controller Manager</p></blockquote><h3 id="_1-master-node" tabindex="-1">1. Master, Node <a class="header-anchor" href="#_1-master-node" aria-hidden="true">#</a></h3><p>Master \u8282\u70B9\u4E3B\u8981\u8FD0\u884C\u7684\u662F\uFF1A</p><ul><li>kube-apiserver\uFF1A\u63D0\u4F9B RESTful API\u3002kubectl \u7B49\u5DE5\u5177\u4EE5\u53CA\u5176\u5B83\u7EC4\u4EF6\u901A\u8FC7 apiserver \u6765\u7BA1\u7406\u96C6\u7FA4\u5185\u7684\u5404\u79CD\u8D44\u6E90</li><li>kube-controller-manager</li><li>kube-scheduler</li></ul><p>Node \u8282\u70B9\u4E3B\u8981\u8FD0\u884C\u7684\u662F\uFF1A</p><ul><li>kubelet\uFF1A\u4E0Emaster\u8282\u70B9\u8FDB\u884C\u901A\u4FE1</li><li>kube-proxy\uFF1A\u7F51\u7EDC\u901A\u4FE1</li></ul><h3 id="_2-pod" tabindex="-1">2. Pod <a class="header-anchor" href="#_2-pod" aria-hidden="true">#</a></h3><p>Pod\u662Fk8s\u96C6\u7FA4\u8C03\u5EA6\u7684\u6700\u5C0F\u5DE5\u4F5C\u5355\u5143\uFF0C\u901A\u5E38\u662F\u7531\u4E00\u4E2A\u5BB9\u5668\u6216\u8005\u591A\u4E2A\u5171\u540C\u5DE5\u4F5C\u7684\u5BB9\u5668\u7EC4\u6210\u3002\u6700\u5E38\u89C1\u7684\u6A21\u5F0F\u662F\u4E00\u4E2APod\u5185\u6709\u4E00\u4E2A\u5BB9\u5668\uFF0C\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u53EF\u4EE5\u628APod\u7B80\u5355\u7406\u89E3\u4E3A\u5BF9\u5BB9\u5668\u7684\u4E00\u5C42\u5305\u88C5\uFF0Ck8s\u76F4\u63A5\u7BA1\u7406\u7684\u662FPod\uFF0C\u800C\u4E0D\u662F\u5BB9\u5668\u3002\u5982\u679C\u4E00\u4E2APod\u5185\u6709\u591A\u4E2A\u5BB9\u5668\uFF0C\u90A3\u4E48\u8FD9\u4E9B\u5BB9\u5668\u5E94\u5F53\u662F\u7D27\u5BC6\u5173\u8054\u5171\u540C\u534F\u4F5C\u7684\u3002</p><p>\u6BCF\u4E2APod\u6709\u4E00\u4E2A\u552F\u4E00\u7684IP\uFF0C\u5E76\u4E14\u53EF\u4EE5\u6302\u8F7D\u82E5\u5E72\u4E2AVolume\uFF0CPod\u5185\u7684\u5BB9\u5668\u5171\u4EAB\u7F51\u7EDC\u8D44\u6E90\u548C\u5B58\u50A8\u8D44\u6E90\uFF0C\u5B83\u4EEC\u4E4B\u95F4\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528localhost\u6765\u8FDB\u884C\u901A\u4FE1\u3002</p><p>Pod\u7684\u6A21\u677F\u5B9A\u4E49\u4E3A\uFF1A</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Pod</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">myapp-pod</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">labels</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">myapp</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">containers</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">myapp-container</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">image</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">busybox</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">command</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">sh</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">-c</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">echo Hello Kubernetes! &amp;&amp; sleep 3600</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span></code></pre></div><h3 id="_3-service" tabindex="-1">3. Service <a class="header-anchor" href="#_3-service" aria-hidden="true">#</a></h3><p>Pod\u4F1A\u88AB\u521B\u5EFA\u6216\u8005\u9500\u6BC1\uFF0C\u9500\u6BC1\u540E\u91CD\u65B0\u521B\u5EFA\u7684Pod\u662F\u4E00\u4E2A\u65B0\u7684Pod\uFF0CIP\u4E5F\u4F1A\u53D1\u751F\u53D8\u5316\u3002\u56E0\u6B64\u901A\u8FC7Pod\u7684IP\u76F4\u63A5\u8BBF\u95EEPod\u662F\u4E0D\u73B0\u5B9E\u7684\u3002\u56E0\u6B64\u5728Pod\u4E4B\u4E0A\u52A0\u4E86\u4E00\u5C42Service\uFF0C\u7528\u6237\u901A\u8FC7\u8BBF\u95EEService\u6765\u8BBF\u95EEPod\u3002Service\u662F\u5BF9\u4E00\u7EC4Pod\u7684\u4E00\u4E2A\u62BD\u8C61\uFF0C\u901A\u8FC7Pod\u4E2D\u5B9A\u4E49\u7684labels\u6765\u9009\u62E9\u51FA\u76F8\u5E94\u7684Pod\uFF0C\u7EC4\u6210\u4E00\u4E2AService\u3002</p><p>\u6BCF\u4E2AService\u90FD\u4F1A\u5206\u914D\u4E00\u4E2A\u5168\u5C40\u552F\u4E00\u7684\u865A\u62DFIP\uFF0C\u79F0\u4E3ACluster IP\uFF0C\u5E76\u4E14\u5728\u8BE5Service\u7684\u751F\u547D\u5468\u671F\u5185\uFF0CCluster IP\u4E0D\u4F1A\u6539\u53D8\u3002\u540C\u65F6Service\u4E5F\u5BF9Pod\u505A\u4E86\u8D1F\u8F7D\u5747\u8861\u3002</p><p>Service\u7684\u6A21\u677F\u5B9A\u4E49\u5982\u4E0B\uFF1A</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki"><code><span class="line"><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Service</span></span>
<span class="line"><span style="color:#F07178;">apiVersion</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">v1</span></span>
<span class="line"><span style="color:#F07178;">metadata</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">my-service</span></span>
<span class="line"><span style="color:#F07178;">spec</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">app</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">MyApp</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">ports</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">protocol</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TCP</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">targetPort</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">9376</span></span>
<span class="line"></span></code></pre></div><p>\u4E0A\u9762\u7684\u5B9A\u4E49\u9009\u62E9\u4E86\u6240\u6709 <code>app=MyApp</code> \u6807\u7B7E\u7684Pod\uFF0C\u5E76\u4E14\u8BBF\u95EE\u8BE5Service\u768480\u7AEF\u53E3\u7684\u65F6\u5019\uFF0C\u5B9E\u9645\u4E0A\u4F1A\u53BB\u8BBF\u95EEPod\u76849376\u7AEF\u53E3\u3002</p><h3 id="_4-namespace" tabindex="-1">4. Namespace <a class="header-anchor" href="#_4-namespace" aria-hidden="true">#</a></h3><p>k8s\u652F\u6301\u5728\u4E00\u4E2A\u7269\u7406\u96C6\u7FA4\u4E0A\u5206\u51FA\u591A\u4E2A\u865A\u62DF\u96C6\u7FA4\uFF0C\u8FD9\u5C31\u662FNamespace\u3002Namespace\u53EF\u7528\u6765\u5B9E\u73B0\u591A\u79DF\u6237\u7684\u8D44\u6E90\u9694\u79BB\u3002k8s\u9ED8\u8BA4\u521B\u5EFA\u7684\u96C6\u7FA4\u6709\u4E09\u4E2A\uFF1A</p><ul><li>default</li><li>kube-public</li><li>kube-system\uFF1Ak8s\u7CFB\u7EDF\u521B\u5EFA\u7684\u8D44\u6E90\u4F4D\u4E8E\u8BE5namesapce\u4E0B</li></ul><h3 id="_5-controller" tabindex="-1">5. Controller <a class="header-anchor" href="#_5-controller" aria-hidden="true">#</a></h3><p>k8s\u901A\u8FC7Controller\u6765\u7BA1\u7406Pod\uFF0CController\u4E2D\u4F1A\u5B9A\u4E49Pod\u7684\u4E00\u4E9B\u7279\u6027\uFF0C\u4F8B\u5982\u526F\u672C\u6570\u7B49\u3002k8s\u4E2D\u63D0\u4F9B\u4E86\u591A\u79CDController\uFF0C\u7528\u6765\u4F7F\u7528\u4E0D\u540C\u7684\u573A\u666F\u3002\u5E38\u89C1\u7684\u6709\uFF1A</p><ul><li>ReplicaSet\uFF1A\u526F\u672C\u7BA1\u7406\u3002\u4E3B\u8981\u5B9A\u4E49\u4E86Pod\u7684\u671F\u671B\u526F\u672C\u6570\uFF0C\u9009\u62E9Pod\u7684Label Selector\u4EE5\u53CA\u5F53\u526F\u672C\u6570\u4E0D\u8DB3\u65F6\uFF0C\u7528\u4E8E\u521B\u5EFA\u65B0\u526F\u672C\u7684Pod\u6A21\u677F\u3002</li><li>Deployment\uFF1ADeployment\u4E0EReplicaSet\u6BD4\u8F83\u7C7B\u4F3C\uFF0C\u662FReplicaSet\u66F4\u9AD8\u4E00\u5C42\u7684\u62BD\u8C61\uFF0C\u7528\u4E8E\u7BA1\u7406\u591A\u4E2APod\uFF0C\u5E76\u786E\u4FDDPod\u6309\u7167\u671F\u671B\u7684\u65B9\u5F0F\u8FD0\u884C\u3002</li><li>StatefulSet\uFF1A\u7528\u6765\u7BA1\u7406\u6709\u72B6\u6001\u7684\u5E94\u7528\u3002StatefulSet\u53EF\u4EE5\u786E\u4FDD\u6240\u7BA1\u7406\u7684Pod\u526F\u672C\u5728\u6574\u4E2A\u751F\u547D\u5468\u671F\u5185\u7684\u540D\u79F0\u662F\u4E0D\u53D8\u7684\uFF0C\u5373\u4F7F\u9500\u6BC1\u4E86\u91CD\u65B0\u521B\u5EFA\uFF0C\u4E5F\u4F1A\u62E5\u6709\u56FA\u5B9A\u7684\u6807\u8BC6\u3002</li><li>DaemonSet\uFF1A\u7528\u4E8E\u5728\u6BCF\u4E2ANode\u4E0A\u53EA\u8FD0\u884C\u4E00\u4E2APod\u526F\u672C\u7684\u573A\u666F\u3002</li><li>Job\uFF1A\u8FD0\u884C\u7ED3\u675F\u540E\uFF0C\u76F8\u5E94\u7684Pod\u5C31\u4F1A\u88AB\u9500\u6BC1\u3002</li></ul>`,52),t=[o];function c(r,i,d,y,C,u){return a(),e("div",null,t)}const h=s(p,[["render",c]]);export{A as __pageData,h as default};
