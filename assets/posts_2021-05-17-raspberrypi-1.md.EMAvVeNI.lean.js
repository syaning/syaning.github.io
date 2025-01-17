import{_ as a,c as i,a3 as n,o as e}from"./chunks/framework.BjmIUQRb.js";const c=JSON.parse('{"title":"树莓派初体验(1)——部署","description":"","frontmatter":{"doctype":"post","title":"树莓派初体验(1)——部署","date":"2021-05-17 22:30:00 +0800"},"headers":[],"relativePath":"posts/2021-05-17-raspberrypi-1.md","filePath":"posts/2021-05-17-raspberrypi-1.md"}'),l={name:"posts/2021-05-17-raspberrypi-1.md"};function t(p,s,h,k,r,o){return e(),i("div",null,s[0]||(s[0]=[n(`<h2 id="_1-组装" tabindex="-1">1. 组装 <a class="header-anchor" href="#_1-组装" aria-label="Permalink to &quot;1. 组装&quot;">​</a></h2><p>买的是 4B 的板子，8G 内存，32G TF 存储卡。组装比较简单，不做赘述。</p><h2 id="_2-安装系统" tabindex="-1">2. 安装系统 <a class="header-anchor" href="#_2-安装系统" aria-label="Permalink to &quot;2. 安装系统&quot;">​</a></h2><p>参考 <a href="https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi" target="_blank" rel="noreferrer">How to install Ubuntu Server on your Raspberry Pi</a> 安装 Ubuntu 20.04.</p><h2 id="_3-配置静态ip" tabindex="-1">3. 配置静态IP <a class="header-anchor" href="#_3-配置静态ip" aria-label="Permalink to &quot;3. 配置静态IP&quot;">​</a></h2><p>如果没有该需求，可以直接跳过。</p><p>如果需要配置静态IP，可以参考 <a href="https://ubuntu.com/server/docs/network-configuration" target="_blank" rel="noreferrer">Network Configuration</a>.</p><p>修改 <code>/etc/netplan/99_config.yaml</code> 文件：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>network:</span></span>
<span class="line"><span>  version: 2</span></span>
<span class="line"><span>  renderer: networkd</span></span>
<span class="line"><span>  ethernets:</span></span>
<span class="line"><span>    eth0:</span></span>
<span class="line"><span>      addresses:</span></span>
<span class="line"><span>        - 192.168.0.151/24</span></span>
<span class="line"><span>      gateway4: 192.168.0.1</span></span>
<span class="line"><span>      nameservers:</span></span>
<span class="line"><span>        addresses: [114.114.114.114]</span></span></code></pre></div><p>然后执行 <code>sudo netplan apply</code> 即可。</p><h2 id="_4-配置时区" tabindex="-1">4. 配置时区 <a class="header-anchor" href="#_4-配置时区" aria-label="Permalink to &quot;4. 配置时区&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">timedatectl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set-timezone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Asia/Shanghai</span></span></code></pre></div><h2 id="_5-更新" tabindex="-1">5. 更新 <a class="header-anchor" href="#_5-更新" aria-label="Permalink to &quot;5. 更新&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> upgrade</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> autoremove</span></span></code></pre></div><h2 id="_6-科学上网" tabindex="-1">6. 科学上网 <a class="header-anchor" href="#_6-科学上网" aria-label="Permalink to &quot;6. 科学上网&quot;">​</a></h2><p>参考：</p><ul><li><a href="https://ochicken.top/2019/10/11/20191011-Shadowsocks-libev/" target="_blank" rel="noreferrer">Shadowsocks-libev的Server和Client(for Linux)配置</a></li><li><a href="https://blog.gadflysu.com/linux/ubuntu-primer/" target="_blank" rel="noreferrer">现在开始使用 Ubuntu 20.04</a></li></ul><h3 id="安装-shadowsocks-libev" tabindex="-1">安装 shadowsocks-libev <a class="header-anchor" href="#安装-shadowsocks-libev" aria-label="Permalink to &quot;安装 shadowsocks-libev&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 安装 shadowsocks-libev</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shadowsocks-libev</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 由于这里只需要启动 client，因此禁用 server</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> disable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shadowsocks-libev</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> stop</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shadowsocks-libev</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 配置 /etc/shadowsocks-libev/client.json</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 4. 设置开启启动并启动 client</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shadowsocks-libev-local@client</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shadowsocks-libev-local@client</span></span></code></pre></div><h3 id="安装-privoxy" tabindex="-1">安装 privoxy <a class="header-anchor" href="#安装-privoxy" aria-label="Permalink to &quot;安装 privoxy&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1. 安装 privoxy</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> privoxy</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2. 配置 /etc/privoxy/config</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加 forward-socks5  /   127.0.0.1:1080 .</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 3. 重启</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> privoxy</span></span></code></pre></div><p>以上配置是设置了全局代理，如果希望以 PAC 模式进行代理，可以参考 <a href="https://github.com/zfl9/gfwlist2privoxy" target="_blank" rel="noreferrer">gfwlist2privoxy</a>，此时上面第 2 步中不用添加 <code>forward-socks5 / 127.0.0.1:1080 .</code>。</p><blockquote><p>最好是不要用全局代理，而是设置为 PAC 模式，这样对于一些正常网站访问会比较快。</p></blockquote><p>然后在 <code>~/.bashrc</code> 添加：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> enable_ss</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> HTTP_PROXY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://127.0.0.1:8118&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> HTTPS_PROXY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://127.0.0.1:8118&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> disable_ss</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  unset</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HTTP_PROXY</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  unset</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> HTTPS_PROXY</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>这样就可以通过 <code>enable_ss</code> 来开启代理，通过 <code>disable_ss</code> 来关闭代理。</p>`,26)]))}const F=a(l,[["render",t]]);export{c as __pageData,F as default};
