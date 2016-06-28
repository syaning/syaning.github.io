---
layout: post
title:  网络爬虫的一些总结
date:   2016-06-28 13:00:00 +0800
---

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

TODO：

- 模拟登陆
- 反爬虫机制：频率控制，headers，IP代理。。。
- 多线程爬虫，分布式爬虫
- 容错机制，自动重启
- 数据存储
- Selenium，PhantomJS
- 常用工具和框架