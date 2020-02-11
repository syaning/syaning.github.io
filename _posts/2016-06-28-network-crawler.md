---
layout: post
title:  网络爬虫的一些总结
date:   2016-06-28 13:00:00 +0800
---

* TOC
{:toc}

### 一、引言

最早接触爬虫，是发现了一个叫做『豆瓣妹子』的网站，写了一个简单的程序可以批量下载图片。后来陆陆续续抓取过[豆瓣电影](https://movie.douban.com/)，[Google+](https://plus.google.com/)，[facejoking](http://www.facejoking.com/)等网站。毕设的选题也是抓取[新浪微博](http://weibo.com/)，然后分析博文的传播情况。最近一直对知乎的数据感兴趣，于是开发了Node模块[zhihu-api](https://github.com/syaning/zhihu-api)，用于简化数据的抓取。

通常来说，所谓的爬虫，无非是通过程序来发送HTTP请求。因此理论上来说，所有浏览器能访问到的内容，都是可以通过爬虫来进行抓取的。

一般而言，我们所感兴趣的信息，只是页面中的某一部分数据，例如：某个标签的文本、链接地址、图片地址等。有些网站会提供开放的API（往往也会有很多限制），这时只需要直接请求该API，就可以拿到比较干净的数据了，比如[Google+](https://developers.google.com/+/web/api/rest/)。对于那些没有开放API的网站，就需要先发送HTTP请求拿到页面数据，然后通过解析页面来得到所需要的数据。然而有些网站的页面内容是通过脚本来动态生成的，这种情况下就需要做更多的事情，这个后面再提。

### 二、发送请求

回想一下HTTP请求的基本组成：request line，headers，request body。发送请求与这三部分密切相关，主要需要关注的是：url，method，headers和body。在这里，[DevTools](https://developer.chrome.com/devtools)将发挥非常重要的作用，用于查看每个请求的详细信息。

对于headers，需要关注的主要有这几个：

- `User-Agent`：针对反爬虫机制，设置该字段可以简单地伪装成浏览器
- `Referer`：针对反爬虫机制，有些网站会检测该字段
- `Cookie`：模拟登陆的最简单粗暴的方法
- `Content-Type`：当请求方法为`POST`时，设置请求体的类型，最常用的为`application/x-www-form-urlencoded`和`application/json`

### 三、模拟登陆

许多网站都需要登录后才能获取到内容。最简单的的登陆方式就是用户名和密码。在这种情况下，可以通过程序维护一个Session，使用用户名和密码进行登陆，然后之后使用该Session来发送请求。

然而现在许多网站的登陆都会比较复杂，有的需要输入复杂的验证码，有的还需要手机验证等。这些情况往往都比较繁琐，如果依然使用Session的方式，通常实现起来比较麻烦，考虑到Session也不过是维护了Cookie等一些状态，在这种情况下，直接使用Cookie模拟登陆不失为一个简单粗暴的方法。

使用Cookie来模拟登陆，就是用户在浏览器先登录网站，然后将Cookie信息拷贝出来，用来设置请求的Cookie header。

### 四、页面解析

很多情况下，通过爬虫抓取到的内容是一个HTML页面或者HTML片段。为了从中提取出我们所需要的数据，需要对其进行解析。常见的解析方式有：

- 正则匹配
- DOM

对于一些比较简单的数据提取，例如提取页面中所有的图片地址，使用正则就可以做到。但是对于一些复杂的解析，常用的还是通过DOM的方式。

### 五、多线程抓取

一次发送一个请求未免效率太低。为了实现数据的快速抓取，往往会使用多线程来进行抓取。

对于Node.js，虽然本身是单线程执行，但是由于是异步IO，实际上是类似于多线程的效果。

### 六、反爬虫

许多网站针对爬虫都设置了反爬虫机制。常见的有：

- 登陆限制：通过模拟登陆可以解决
- 用户代理检测：通过设置User-Agent header
- Referer检测：通过设置Referer header
- 访问频率限制：如果是针对同一账号的频率限制，则可以使用多个账号轮流发请求；如果针对IP，可通过IP代理；还可以为相邻的两个请求设置合适的时间间隔来，减小请求频率，从而避免被服务端认定为爬虫。

### 七、其它

1. 动态内容：对于许多网页的动态内容，通过[DevTools](https://developer.chrome.com/devtools)进行查看就可以解决。对于更为复杂的动态内容，可以考虑使用[Selenium](http://www.seleniumhq.org/)和[Phantomjs](http://phantomjs.org/)。
2. 数据存储：对于多媒体文件，直接存文件。对于JSON格式的数据，使用[MongoDB](https://www.mongodb.com/)会很方便。
3. 容错机制：请求失败可能会有多种情况。如果是访问频率过快，可以考虑暂停一段时间，或者换账号，换IP等手段。如果是404，可以直接跳过该次抓取。然而有些站点返回的HTTP状态码并不一定符合其本意，因此也可以考虑统一的容错处理，例如重试n次，如果不行就丢弃。
4. 大规模分布式抓取：暂时没有过多研究，之后可能会新开一篇文章来介绍。
5. 常用工具：Python的话[requests](http://docs.python-requests.org/en/master/)和[BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/)，Node的话[request](https://github.com/request/request)和[cheerio](https://github.com/cheeriojs/cheerio)。