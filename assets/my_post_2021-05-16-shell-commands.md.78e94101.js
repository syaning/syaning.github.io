import{_ as s,o as a,c as n,a as l}from"./app.aede3185.js";const A=JSON.parse('{"title":"\u4E00\u4E9B\u5E38\u7528\u7684Shell\u547D\u4EE4\u603B\u7ED3","description":"","frontmatter":{"layout":"post","title":"\u4E00\u4E9B\u5E38\u7528\u7684Shell\u547D\u4EE4\u603B\u7ED3","date":"2021-05-16 10:30:00 +0800"},"headers":[{"level":2,"title":"\u683C\u5F0F\u5316\u8F93\u51FA","slug":"\u683C\u5F0F\u5316\u8F93\u51FA","link":"#\u683C\u5F0F\u5316\u8F93\u51FA","children":[]},{"level":2,"title":"Generate Random String","slug":"generate-random-string","link":"#generate-random-string","children":[]},{"level":2,"title":"Crontab","slug":"crontab","link":"#crontab","children":[]},{"level":2,"title":"Logrotate","slug":"logrotate","link":"#logrotate","children":[]},{"level":2,"title":"SSH","slug":"ssh","link":"#ssh","children":[{"level":3,"title":"Generate SSH Key","slug":"generate-ssh-key","link":"#generate-ssh-key","children":[]},{"level":3,"title":"Set Alive Interval","slug":"set-alive-interval","link":"#set-alive-interval","children":[]}]},{"level":2,"title":"SSL/TLS","slug":"ssl-tls","link":"#ssl-tls","children":[{"level":3,"title":"Generate self-signed certificate","slug":"generate-self-signed-certificate","link":"#generate-self-signed-certificate","children":[]}]},{"level":2,"title":"Hardware","slug":"hardware","link":"#hardware","children":[{"level":3,"title":"Arch","slug":"arch","link":"#arch","children":[]},{"level":3,"title":"CPU","slug":"cpu","link":"#cpu","children":[]},{"level":3,"title":"Memory","slug":"memory","link":"#memory","children":[]},{"level":3,"title":"Disk","slug":"disk","link":"#disk","children":[]},{"level":3,"title":"Other","slug":"other","link":"#other","children":[]}]}],"relativePath":"my/post/2021-05-16-shell-commands.md"}'),e={name:"my/post/2021-05-16-shell-commands.md"},p=l(`<h2 id="\u683C\u5F0F\u5316\u8F93\u51FA" tabindex="-1">\u683C\u5F0F\u5316\u8F93\u51FA <a class="header-anchor" href="#\u683C\u5F0F\u5316\u8F93\u51FA" aria-hidden="true">#</a></h2><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># http://linuxcommand.org/lc3_adv_tput.php</span></span>
<span class="line"><span style="color:#676E95;"># for example:</span></span>
<span class="line"><span style="color:#676E95;">#     echo &quot;\${red}Error \${normal}something wrong&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">test</span><span style="color:#A6ACCD;"> -t 1</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">then</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># if terminal</span></span>
<span class="line"><span style="color:#A6ACCD;">    ncolors=</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">which tput </span><span style="color:#89DDFF;">&gt;</span><span style="color:#C3E88D;"> /dev/null </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#C3E88D;"> tput colors</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># supports color</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">test</span><span style="color:#A6ACCD;"> -n </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">ncolors</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">test</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">ncolors -ge 8</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">then</span></span>
<span class="line"><span style="color:#A6ACCD;">        termcols=</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">tput cols</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        bold=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput bold</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        underline=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput smul</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        standout=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput smso</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        normal=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput sgr0</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        black=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput setaf 0</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        red=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput setaf 1</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        green=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput setaf 2</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        yellow=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput setaf 3</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        blue=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput setaf 4</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        magenta=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput setaf 5</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        cyan=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput setaf 6</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        white=</span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#C3E88D;">tput setaf 7</span><span style="color:#89DDFF;">)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">fi</span></span>
<span class="line"><span style="color:#89DDFF;">fi</span></span>
<span class="line"></span></code></pre></div><h2 id="generate-random-string" tabindex="-1">Generate Random String <a class="header-anchor" href="#generate-random-string" aria-hidden="true">#</a></h2><p>\u53C2\u8003 <a href="https://gist.github.com/earthgecko/3089509" target="_blank" rel="noreferrer">bash generate random alphanumeric string</a>.</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># bash generate random 32 character alphanumeric string (upper and lowercase) and </span></span>
<span class="line"><span style="color:#A6ACCD;">NEW_UUID=</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">cat /dev/urandom </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> tr -dc </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">a-zA-Z0-9</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> fold -w 32 </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> head -n 1</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># bash generate random 32 character alphanumeric string (lowercase only)</span></span>
<span class="line"><span style="color:#A6ACCD;">cat /dev/urandom </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> tr -dc </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">a-zA-Z0-9</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> fold -w 32 </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> head -n 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Random numbers in a range, more randomly distributed than $RANDOM which is not</span></span>
<span class="line"><span style="color:#676E95;"># very random in terms of distribution of numbers.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># bash generate random number between 0 and 9</span></span>
<span class="line"><span style="color:#A6ACCD;">cat /dev/urandom </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> tr -dc </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">0-9</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> fold -w 256 </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> head -n 1 </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> head --bytes 1</span></span>
<span class="line"></span></code></pre></div><p>\u5982\u679C\u62A5\u9519 <code>head: illegal option -- -</code>\uFF0C\u52A0\u73AF\u5883\u53D8\u91CF <code>LC_CTYPE=C</code> \u5373\u53EF\u3002</p><h2 id="crontab" tabindex="-1">Crontab <a class="header-anchor" href="#crontab" aria-hidden="true">#</a></h2><ul><li><a href="https://crontab.guru/" target="_blank" rel="noreferrer">crontab guru</a> - The quick and simple editor for cron schedule expressions.</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">* * * * * command to be executed</span></span>
<span class="line"><span style="color:#A6ACCD;">- - - - -</span></span>
<span class="line"><span style="color:#A6ACCD;">| | | | |</span></span>
<span class="line"><span style="color:#A6ACCD;">| | | | ----- Day of week (0 - 7) (Sunday=0 or 7)</span></span>
<span class="line"><span style="color:#A6ACCD;">| | | ------- Month (1 - 12)</span></span>
<span class="line"><span style="color:#A6ACCD;">| | --------- Day of month (1 - 31)</span></span>
<span class="line"><span style="color:#A6ACCD;">| ----------- Hour (0 - 23)</span></span>
<span class="line"><span style="color:#A6ACCD;">------------- Minute (0 - 59)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># list cron jobs</span></span>
<span class="line"><span style="color:#A6ACCD;">$ crontab -l</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># edit crontab file</span></span>
<span class="line"><span style="color:#A6ACCD;">$ crontab -e</span></span>
<span class="line"><span style="color:#A6ACCD;">$ EDITOR=vi crontab -e</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># add a cron job</span></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">crontab -l</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*/1 * * * 1-5 echo hello</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> crontab -</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># add a cron job with no duplication</span></span>
<span class="line"><span style="color:#A6ACCD;">$ croncmd=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*/1 * * * 1-5 echo hello</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">$ </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">crontab -l </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> grep -v -F </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">croncmd</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">croncmd</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> crontab -</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># remove a cron job</span></span>
<span class="line"><span style="color:#A6ACCD;">$ crontab -l </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> grep -v -F </span><span style="color:#89DDFF;">&quot;$</span><span style="color:#A6ACCD;">croncmd</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> crontab -</span></span>
<span class="line"></span></code></pre></div><h2 id="logrotate" tabindex="-1">Logrotate <a class="header-anchor" href="#logrotate" aria-hidden="true">#</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"># /etc/logrotate.d/xxx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">/path/to/your/logfile {</span></span>
<span class="line"><span style="color:#A6ACCD;">    daily                # or weekly/monthly/yearly</span></span>
<span class="line"><span style="color:#A6ACCD;">    size 100M            # or 100/100k/100G</span></span>
<span class="line"><span style="color:#A6ACCD;">    rotate 7</span></span>
<span class="line"><span style="color:#A6ACCD;">    compress</span></span>
<span class="line"><span style="color:#A6ACCD;">    delaycompress</span></span>
<span class="line"><span style="color:#A6ACCD;">    missingok</span></span>
<span class="line"><span style="color:#A6ACCD;">    notifempty</span></span>
<span class="line"><span style="color:#A6ACCD;">    create 644 root root</span></span>
<span class="line"><span style="color:#A6ACCD;">    postrotate</span></span>
<span class="line"><span style="color:#A6ACCD;">        /usr/bin/killall -HUP rsyslogd</span></span>
<span class="line"><span style="color:#A6ACCD;">    endscript</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><blockquote><p>Troubleshooting: <a href="https://serverfault.com/questions/480551/logrotate-not-rotating-file-after-file-size-exceeds-the-limit" target="_blank" rel="noreferrer">Logrotate not rotating file after file size exceeds the limit</a></p></blockquote><h2 id="ssh" tabindex="-1">SSH <a class="header-anchor" href="#ssh" aria-hidden="true">#</a></h2><h3 id="generate-ssh-key" tabindex="-1">Generate SSH Key <a class="header-anchor" href="#generate-ssh-key" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ ssh-keygen -t rsa -b 4096 -C </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">your_email@example.com</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="set-alive-interval" tabindex="-1">Set Alive Interval <a class="header-anchor" href="#set-alive-interval" aria-hidden="true">#</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;"># ~/.ssh/config</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Host *</span></span>
<span class="line"><span style="color:#A6ACCD;">  ServerAliveInterval 30</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Host example</span></span>
<span class="line"><span style="color:#A6ACCD;">  HostName 1.1.1.1</span></span>
<span class="line"><span style="color:#A6ACCD;">  User testuser</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="ssl-tls" tabindex="-1">SSL/TLS <a class="header-anchor" href="#ssl-tls" aria-hidden="true">#</a></h2><h3 id="generate-self-signed-certificate" tabindex="-1">Generate self-signed certificate <a class="header-anchor" href="#generate-self-signed-certificate" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># genrate private key</span></span>
<span class="line"><span style="color:#A6ACCD;">$ openssl genrsa -out server.key 2048</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># generate certificate signing request</span></span>
<span class="line"><span style="color:#A6ACCD;">$ openssl req -new -sha256 -key server.key -out server.csr</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># generate self-signed certificate</span></span>
<span class="line"><span style="color:#A6ACCD;">$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt</span></span>
<span class="line"></span></code></pre></div><h2 id="hardware" tabindex="-1">Hardware <a class="header-anchor" href="#hardware" aria-hidden="true">#</a></h2><h3 id="arch" tabindex="-1">Arch <a class="header-anchor" href="#arch" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">$ arch</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">$ dpkg --print-architecture</span></span>
<span class="line"></span></code></pre></div><h3 id="cpu" tabindex="-1">CPU <a class="header-anchor" href="#cpu" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># list cpu info</span></span>
<span class="line"><span style="color:#A6ACCD;">$ lscpu</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># cpu info</span></span>
<span class="line"><span style="color:#A6ACCD;">$ cat /proc/cpuinfo</span></span>
<span class="line"></span></code></pre></div><h3 id="memory" tabindex="-1">Memory <a class="header-anchor" href="#memory" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># memory usage</span></span>
<span class="line"><span style="color:#A6ACCD;">$ free</span></span>
<span class="line"><span style="color:#A6ACCD;">$ free -m</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># memory info</span></span>
<span class="line"><span style="color:#A6ACCD;">$ cat /proc/meminfo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># memory statistics</span></span>
<span class="line"><span style="color:#A6ACCD;">$ vmstat -s</span></span>
<span class="line"></span></code></pre></div><h3 id="disk" tabindex="-1">Disk <a class="header-anchor" href="#disk" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># file system disk usage</span></span>
<span class="line"><span style="color:#A6ACCD;">$ df -h</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># list block devices</span></span>
<span class="line"><span style="color:#A6ACCD;">$ lsblk</span></span>
<span class="line"></span></code></pre></div><h3 id="other" tabindex="-1">Other <a class="header-anchor" href="#other" aria-hidden="true">#</a></h3><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># list hardware configuration</span></span>
<span class="line"><span style="color:#A6ACCD;">$ lshw</span></span>
<span class="line"><span style="color:#A6ACCD;">$ lshw -short</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># list usb</span></span>
<span class="line"><span style="color:#A6ACCD;">$ lsusb</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># list pci</span></span>
<span class="line"><span style="color:#A6ACCD;">$ lspci</span></span>
<span class="line"></span></code></pre></div>`,32),o=[p];function t(c,r,i,y,D,C){return a(),n("div",null,o)}const h=s(e,[["render",t]]);export{A as __pageData,h as default};
