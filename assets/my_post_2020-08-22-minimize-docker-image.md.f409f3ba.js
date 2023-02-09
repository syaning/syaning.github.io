import{_ as s,o as a,c as n,a as l}from"./app.c83dc632.js";const D=JSON.parse('{"title":"Docker减小构建的镜像大小","description":"","frontmatter":{"layout":"post","title":"Docker减小构建的镜像大小","date":"2020-08-22 12:00:00 +0800"},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[{"level":3,"title":"Node.js","slug":"node-js","link":"#node-js","children":[]},{"level":3,"title":"前端应用","slug":"前端应用","link":"#前端应用","children":[]},{"level":3,"title":"Go","slug":"go","link":"#go","children":[]}]}],"relativePath":"my/post/2020-08-22-minimize-docker-image.md"}'),p={name:"my/post/2020-08-22-minimize-docker-image.md"},e=l(`<h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-hidden="true">#</a></h2><p>减小构建出来的镜像大小，通常要考虑两点：</p><ol><li>基础镜像要小，例如使用 alpine 或者 slim 镜像，关于它们的区别可以参考 <a href="https://medium.com/swlh/alpine-slim-stretch-buster-jessie-bullseye-bookworm-what-are-the-differences-in-docker-62171ed4531d" target="_blank" rel="noreferrer">Alpine, Slim, Stretch, Buster, Jessie, Bullseye — What are the Differences in Docker Images?</a></li><li>只把 build 后的文件放在镜像中，其它无关文件都可以删掉。如果构建阶段所需环境大于运行阶段所需环境，那么可以使用 <a href="https://docs.docker.com/develop/develop-images/multistage-build/" target="_blank" rel="noreferrer">multi-stage build</a>。</li></ol><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-hidden="true">#</a></h2><h3 id="node-js" tabindex="-1">Node.js <a class="header-anchor" href="#node-js" aria-hidden="true">#</a></h3><div class="language-docker"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> node:10-slim</span></span>
<span class="line"><span style="color:#F78C6C;">WORKDIR</span><span style="color:#A6ACCD;"> /usr/src/app</span></span>
<span class="line"><span style="color:#F78C6C;">COPY</span><span style="color:#A6ACCD;"> . .</span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> npm install</span></span>
<span class="line"><span style="color:#F78C6C;">EXPOSE</span><span style="color:#A6ACCD;"> 8080</span></span>
<span class="line"><span style="color:#F78C6C;">CMD</span><span style="color:#A6ACCD;"> [</span><span style="color:#C3E88D;">&quot;npm&quot;</span><span style="color:#A6ACCD;">, </span><span style="color:#C3E88D;">&quot;start&quot;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"></span></code></pre></div><h3 id="前端应用" tabindex="-1">前端应用 <a class="header-anchor" href="#前端应用" aria-hidden="true">#</a></h3><div class="language-docker"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># build stage</span></span>
<span class="line"><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> node:10-slim </span><span style="color:#F78C6C;">as</span><span style="color:#A6ACCD;"> build-stage</span></span>
<span class="line"><span style="color:#F78C6C;">WORKDIR</span><span style="color:#A6ACCD;"> /usr/src/app</span></span>
<span class="line"><span style="color:#F78C6C;">COPY</span><span style="color:#A6ACCD;"> . .</span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> npm install &amp;&amp; npm run build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># deploy stage</span></span>
<span class="line"><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> nginx:1.17-alpine</span></span>
<span class="line"><span style="color:#F78C6C;">COPY</span><span style="color:#A6ACCD;"> --from=build-stage /usr/src/app/dist/ /usr/share/nginx/html/</span></span>
<span class="line"><span style="color:#F78C6C;">COPY</span><span style="color:#A6ACCD;"> nginx.conf /etc/nginx/conf.d/default.conf</span></span>
<span class="line"><span style="color:#F78C6C;">EXPOSE</span><span style="color:#A6ACCD;"> 80</span></span>
<span class="line"></span></code></pre></div><p>其中 <code>nginx.conf</code> 参考如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen [::]:80;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    index index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">        root /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#A6ACCD;">        index index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">        try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>注意：这里示例主要是针对 SPA 且使用了基于 history 的路由模式。否则的话直接使用默认 Nginx 配置即可。</p><h3 id="go" tabindex="-1">Go <a class="header-anchor" href="#go" aria-hidden="true">#</a></h3><div class="language-docker"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> golang:1.14-alpine </span><span style="color:#F78C6C;">as</span><span style="color:#A6ACCD;"> build-stage</span></span>
<span class="line"><span style="color:#F78C6C;">WORKDIR</span><span style="color:#A6ACCD;"> /app</span></span>
<span class="line"><span style="color:#F78C6C;">COPY</span><span style="color:#A6ACCD;"> . .</span></span>
<span class="line"><span style="color:#F78C6C;">RUN</span><span style="color:#A6ACCD;"> go build -o myapp main.go</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">FROM</span><span style="color:#A6ACCD;"> alpine:3.12</span></span>
<span class="line"><span style="color:#F78C6C;">WORKDIR</span><span style="color:#A6ACCD;"> /root</span></span>
<span class="line"><span style="color:#F78C6C;">COPY</span><span style="color:#A6ACCD;"> --from=build-stage /app/myapp .</span></span>
<span class="line"><span style="color:#F78C6C;">EXPOSE</span><span style="color:#A6ACCD;"> 8080</span></span>
<span class="line"><span style="color:#F78C6C;">CMD</span><span style="color:#A6ACCD;"> [</span><span style="color:#C3E88D;">&quot;./myapp&quot;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"></span></code></pre></div><p>注意：这里只是最简单的示例。如果涉及到时间和时区的解析，可能 alpine 镜像不太足够，要么替换为标准的 Ubuntu 或者 CentOS 镜像；要么需要安装一些相关的工具，参考如下：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">RUN</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">apk</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">update</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">\\</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C3E88D;">api</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tzdata</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C3E88D;">ln</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-snf</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/share/zooneinfo/Etc/UTC</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/localtime</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">\\</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C3E88D;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Etc/UTC</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/timezone</span></span>
<span class="line"></span></code></pre></div>`,15),o=[e];function t(c,r,C,i,y,A){return a(),n("div",null,o)}const h=s(p,[["render",t]]);export{D as __pageData,h as default};
