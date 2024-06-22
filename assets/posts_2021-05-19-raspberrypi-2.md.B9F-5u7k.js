import{_ as s,c as i,o as a,a4 as e}from"./chunks/framework.C0rDbzzf.js";const g=JSON.parse('{"title":"树莓派初体验(2)——安装k8s","description":"","frontmatter":{"doctype":"post","title":"树莓派初体验(2)——安装k8s","date":"2021-05-19 22:30:00 +0800"},"headers":[],"relativePath":"posts/2021-05-19-raspberrypi-2.md","filePath":"posts/2021-05-19-raspberrypi-2.md"}'),n={name:"posts/2021-05-19-raspberrypi-2.md"},t=e(`<h2 id="安装容器运行时" tabindex="-1">安装容器运行时 <a class="header-anchor" href="#安装容器运行时" aria-label="Permalink to &quot;安装容器运行时&quot;">​</a></h2><ul><li>如果使用 Docker，参考下面的 “安装Docker”</li><li>如果使用 containerd，参考下面的 “安装containerd”</li></ul><h2 id="安装docker" tabindex="-1">安装Docker <a class="header-anchor" href="#安装docker" aria-label="Permalink to &quot;安装Docker&quot;">​</a></h2><p>参考 <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" rel="noreferrer">Install Docker Engine on Ubuntu</a>.</p><p>修改 cgroup driver 为 systemd，可以参考 <a href="https://www.ibm.com/docs/pl/cloud-private/3.1.2?topic=ts-changing-cgroup-driver-systemd-red-hat-enterprise-linux" target="_blank" rel="noreferrer">Changing the cgroup driver to systemd on Red Hat Enterprise Linux</a>.</p><blockquote><p>不修改 cgroup driver 也没事，只不顾在安装 k8s 的时候会有一个 warning，不影响。</p></blockquote><h2 id="安装containerd" tabindex="-1">安装containerd <a class="header-anchor" href="#安装containerd" aria-label="Permalink to &quot;安装containerd&quot;">​</a></h2><p>containerd 官方不提供 ARM64 编译版本，因此需要自己编译，参考 <a href="https://github.com/containerd/containerd/blob/master/BUILDING.md" target="_blank" rel="noreferrer">Build containerd from source</a>.</p><p>首先安装 Golang，参考 <a href="https://golang.org/doc/install" target="_blank" rel="noreferrer">Download and install</a>.</p><p>然后安装相关的依赖工具：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/protocolbuffers/protobuf/releases/download/v3.17.0/protoc-3.17.0-linux-aarch_64.zip</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> unzip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> protoc-3.17.0-linux-aarch_64.zip</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> btrfs-progs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libbtrfs-dev</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pkg-config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libseccomp-dev</span></span></code></pre></div><p>手动 build runc：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/opencontainers/runc</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> runc</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><p>手动 build containerd 并启动：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://github.com/containerd/containerd</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd.service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/systemd/system/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daemon-reload</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd.service</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd.service</span></span></code></pre></div><h2 id="安装k8s" tabindex="-1">安装k8s <a class="header-anchor" href="#安装k8s" aria-label="Permalink to &quot;安装k8s&quot;">​</a></h2><p>首先安装 kubeadm、kubelet、kubectl，参考 <a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/" target="_blank" rel="noreferrer">安装 kubeadm</a>。</p><p>然后初始化集群，参考 <a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/" target="_blank" rel="noreferrer">使用 kubeadm 创建集群</a>。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> su</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubeadm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --pod-network-cidr=10.244.0.0/16</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --image-repository=registry.aliyuncs.com/google_containers</span></span></code></pre></div><p>如果有如下报错：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>error execution phase preflight: [preflight] Some fatal errors occurred:</span></span>
<span class="line"><span>	[ERROR SystemVerification]: missing required cgroups: memory</span></span></code></pre></div><p>可以参考 <a href="https://askubuntu.com/questions/1189480/raspberry-pi-4-ubuntu-19-10-cannot-enable-cgroup-memory-at-boostrap" target="_blank" rel="noreferrer">Raspberry Pi 4 Ubuntu 19.10 cannot enable cgroup memory at boostrap</a>，修改 <code>/boot/firmware/cmdline.txt</code> 添加 <code>cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1</code> 即可。</p><p>另外由于 google registry 无法访问，这里使用阿里云的 registry 地址。在此有坑，可能报错如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[ERROR ImagePull]: failed to pull image registry.aliyuncs.com/google_containers/coredns/coredns:v1.8.0: output: Error response from daemon: pull access denied for registry.aliyuncs.com/google_containers/coredns/coredns, repository does not exist or may require &#39;docker login&#39;: denied: requested access to the resource is denied</span></span></code></pre></div><p>如果出现该错误，那么需要手动 pull 一下 coredns 的镜像：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coredns/coredns:1.8.0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tag</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> coredns/coredns:1.8.0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> registry.aliyuncs.com/google_containers/coredns/coredns:v1.8.0</span></span></code></pre></div><p>集群初始化后：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $HOME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/.kube</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cp</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/kubernetes/admin.conf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $HOME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/.kube/config</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">id</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -u</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">id</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) $HOME</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/.kube/config</span></span></code></pre></div><p>然后部署网络插件，参考 <a href="https://kubernetes.io/docs/concepts/cluster-administration/addons/" target="_blank" rel="noreferrer">Installing Addons</a>。</p><p>因为只有一个节点，可以执行如下命令允许 master 节点调度 pod：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kubectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> taint</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nodes</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --all</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> node-role.kubernetes.io/master-</span></span></code></pre></div><h2 id="安装helm" tabindex="-1">安装Helm <a class="header-anchor" href="#安装helm" aria-label="Permalink to &quot;安装Helm&quot;">​</a></h2><p>参考 <a href="https://helm.sh/zh/docs/intro/install/" target="_blank" rel="noreferrer">安装Helm</a>。</p>`,33),l=[t];function p(h,r,k,o,d,c){return a(),i("div",null,l)}const u=s(n,[["render",p]]);export{g as __pageData,u as default};