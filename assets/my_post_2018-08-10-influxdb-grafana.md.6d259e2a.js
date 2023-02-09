import{_ as s,o as a,c as n,a as l}from"./app.c83dc632.js";const p="/assets/datasource.ba50e3e8.png",o="/assets/metrics.6dd1a244.png",e="/assets/grafana.571c14ec.png",f=JSON.parse('{"title":"InfluxDB+Grafana搭建监控系统","description":"","frontmatter":{"layout":"post","title":"InfluxDB+Grafana搭建监控系统","date":"2018-08-10 00:30:00 +0800"},"headers":[],"relativePath":"my/post/2018-08-10-influxdb-grafana.md"}'),t={name:"my/post/2018-08-10-influxdb-grafana.md"},c=l(`<p>InfluxDB是一个时序型数据库，主要用于存储时序型相关的数据，例如实时的温度、湿度，计算机的CPU使用率、内存使用率等。时序型数据的一些主要特点有：</p><ul><li>写入平稳，持续写入</li><li>写入多，读取少</li><li>写入的数据几乎不会更新</li><li>数据量大，数据具有时效性</li><li>需要多精度的查询</li><li>……</li></ul><p>InfluxDB中的基本概念是：</p><ul><li>measurement，对应关系数据库中的表</li><li>tags，对应关系数据库中的索引列</li><li>fields，对应关系数据库中的普通列</li></ul><p>其数据协议格式为：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;measurement&gt;[,&lt;tag-key&gt;=&lt;tag-value&gt;...] &lt;field-key&gt;=&lt;field-value&gt;[,&lt;field2-key&gt;=&lt;field2-value&gt;...] [unix-nano-timestamp]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>例如下面的都是有效的数据：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">cpu,host=serverA,region=us_west value=0.64</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">payment,device=mobile,product=Notepad,method=credit billed=33,licenses=3i 1434067467100293230</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">stock,symbol=AAPL bid=127.46,ask=127.48</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">temperature,machine=unit42,type=assembly external=25,internal=37 1434067467000000000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>InfluxDB结合Grafana，可以进行数据的监控。下面是使用docker做的一个简单例子。</p><p>首先启动InfluxDB和Grafana：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">8086</span><span style="color:#C3E88D;">:</span><span style="color:#F78C6C;">8086</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">$PWD</span><span style="color:#C3E88D;">/influxdb</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">:/var/lib/influxdb</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">influxdb</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">influxdb</span></span>
<span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-d</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3000</span><span style="color:#C3E88D;">:</span><span style="color:#F78C6C;">3000</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--name</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">grafana</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--link</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">influxdb</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">grafana/grafana</span></span>
<span class="line"></span></code></pre></div><p>然后要向InfluxDB中写入数据，这里使用psutil来统计CPU的使用情况：</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> psutil</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> influxdb </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> InfluxDBClient</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">gen_point</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">i</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">percent</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">measurement</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cpu_load</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">tags</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cpu</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">cpu</span><span style="color:#F78C6C;">%d</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">%</span><span style="color:#A6ACCD;"> i</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">fields</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">percent</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> percent</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">host</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">localhost</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">port</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">8086</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    database </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">example</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    client </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">InfluxDBClient</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">host</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> port</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">database</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">database</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    client</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create_database</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">database</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">True:</span></span>
<span class="line"><span style="color:#A6ACCD;">        cpu_percent </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> psutil</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">cpu_percent</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">interval</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">percpu</span><span style="color:#89DDFF;">=True)</span></span>
<span class="line"><span style="color:#A6ACCD;">        data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#82AAFF;">gen_point</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">idx </span><span style="color:#89DDFF;">+</span><span style="color:#82AAFF;"> </span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> percent</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> idx</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> percent </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">enumerate</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">cpu_percent</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#A6ACCD;">        client</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">write_points</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">data</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> __name__ </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">__main__</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span></span>
<span class="line"></span></code></pre></div><p>这个时候就可以查看到数据了：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">influxdb</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> use example</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">select</span><span style="color:#A6ACCD;"> * from cpu_load limit </span><span style="color:#F78C6C;">5</span></span>
<span class="line"></span></code></pre></div><p>接下来浏览器打开 localhost:3000，登录Grafana，首先配置数据源：</p><p><img src="`+p+'" alt=""></p><p>然后新建dashboard，配置图表：</p><p><img src="'+o+'" alt=""></p><p>然后就可以看到统计图了：</p><p><img src="'+e+'" alt=""></p>',21),r=[c];function D(y,C,F,A,i,d){return a(),n("div",null,r)}const m=s(t,[["render",D]]);export{f as __pageData,m as default};
