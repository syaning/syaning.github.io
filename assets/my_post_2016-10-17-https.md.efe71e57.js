import{_ as s,o as l,c as n,a}from"./app.c83dc632.js";const p="/assets/https.3d6783c1.png",h=JSON.parse('{"title":"HTTPS小结","description":"","frontmatter":{"layout":"post","title":"HTTPS小结","date":"2016-10-17 12:00:00 +0800"},"headers":[{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]},{"level":2,"title":"CA证书","slug":"ca证书","link":"#ca证书","children":[]},{"level":2,"title":"HTTPS流程概述","slug":"https流程概述","link":"#https流程概述","children":[]},{"level":2,"title":"Node.js HTTPS","slug":"node-js-https","link":"#node-js-https","children":[]}],"relativePath":"my/post/2016-10-17-https.md"}'),o={name:"my/post/2016-10-17-https.md"},e=a('<h2 id="参考文章" tabindex="-1">参考文章 <a class="header-anchor" href="#参考文章" aria-hidden="true">#</a></h2><ul><li><a href="https://yanhooit.gitbooks.io/ios_study_note/content/httpsyuan_li_pian.html" target="_blank" rel="noreferrer">iOS学习笔记——HTTPS原理篇</a></li><li><a href="http://www.cnblogs.com/ttltry-air/archive/2012/08/20/2647898.html" target="_blank" rel="noreferrer">HTTPS工作原理和TCP握手机制</a></li><li><a href="http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html" target="_blank" rel="noreferrer">图解SSL/TLS协议</a></li><li><a href="https://www.sitepoint.com/how-to-use-ssltls-with-node-js/" target="_blank" rel="noreferrer">How to Use SSL/TLS with Node.js</a></li></ul><p>在上一篇博文《Node核心模块之crypto》中，提到了加密（摘要，加密解密，签名等）的四种常见类型：</p><ul><li>Hash（哈希）</li><li>HMAC（基于哈希的消息认证码）</li><li>加密，解密</li><li>签名，验证</li></ul><p>HTTPS的整个过程和以上几种方法密切相关。</p><h2 id="ca证书" tabindex="-1">CA证书 <a class="header-anchor" href="#ca证书" aria-hidden="true">#</a></h2><p>CA 即 Certificate Authority （<a href="https://zh.wikipedia.org/wiki/%E6%95%B0%E5%AD%97%E8%AF%81%E4%B9%A6%E8%AE%A4%E8%AF%81%E6%9C%BA%E6%9E%84" target="_blank" rel="noreferrer">数字证书认证机构</a>），CA证书的签发以及验证包含以下三方：</p><ul><li>CA</li><li>Server</li><li>Client</li></ul><p>过程包括：</p><ol><li>Server生成一对公钥和私钥</li><li>Server将公钥以及域名等信息提交给CA</li><li>CA对Server提交的信息进行审核，如果审核通过，则使用CA的私钥对Server所提交的信息进行签名</li><li>Client向Server发起请求时，Server返回证书</li><li>Client使用CA的公钥对证书进行验证</li><li>如果验证通过，则Client认为Server可信，进行后续通话</li></ol><h2 id="https流程概述" tabindex="-1">HTTPS流程概述 <a class="header-anchor" href="#https流程概述" aria-hidden="true">#</a></h2><p>下面是HTTPS流程的简要概述：</p><p><img src="'+p+`" alt="HTTPS"></p><blockquote><p>图片来源：<a href="http://www.cnblogs.com/ttltry-air/archive/2012/08/20/2647898.html" target="_blank" rel="noreferrer">http://www.cnblogs.com/ttltry-air/archive/2012/08/20/2647898.html</a></p></blockquote><ol><li>Client发起HTTPS连接请求，Server返回证书</li><li>Client生成随机数</li><li>Client使用证书中的公钥加密随机数</li><li>Client将加密后的随机数发给Server，Server使用私钥进行解密得到随机数</li><li>使用该随机数作为对称加密密钥进行后续通话</li></ol><p>当然，这只是一个非常简要的概述，而实际上协商对称加密密钥等过程要复杂的多，可以通过参考文章查看更加详细的过程。</p><h2 id="node-js-https" tabindex="-1">Node.js HTTPS <a class="header-anchor" href="#node-js-https" aria-hidden="true">#</a></h2><p>下面是用Node创建一个HTTPS服务器的例子。</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 生成私钥 server.key</span></span>
<span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">genrsa</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-out</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server.key</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2048</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 生成请求文件 server.csr</span></span>
<span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">req</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-new</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-key</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server.key</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-out</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server.csr</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 自签名，生成证书 server.crt</span></span>
<span class="line"><span style="color:#FFCB6B;">openssl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">x509</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-req</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-days</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">365</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-in</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server.csr</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-signkey</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server.key</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-out</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">server.crt</span></span>
<span class="line"></span></code></pre></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> fs </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">fs</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> https </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> express </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">require</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">express</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">express</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> options </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">key</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readFileSync</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">server.key</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">cert</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> fs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readFileSync</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">server.crt</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">req</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">res</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">send</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello world</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">https</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createServer</span><span style="color:#A6ACCD;">(options</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> app)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">9000</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">server on port 9000 ...</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"></span></code></pre></div><p>然后访问<code>https://localhost:9000</code>就可以了。</p>`,21),t=[e];function r(c,C,y,i,A,D){return l(),n("div",null,t)}const d=s(o,[["render",r]]);export{h as __pageData,d as default};
