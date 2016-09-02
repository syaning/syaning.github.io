---
layout: post
title:  Golang体验
date:   2016-09-02 17:00:00 +0800
---

最近由于兴趣开始学习Go语言。对于编译型语言，最早接触的是Java，写了三年多，然而自从接触了异常灵活的脚本后就对它再也喜欢不起来。对于C系语言也一直没感觉。后来偶然看了一些Go相关的资料，也接触了一些基于Go编写的开源项目，觉得挺有意思，就学了一些，总的来说，还是比较喜欢Go的。

相比于Java，Go中没有了诸多繁琐的OO概念，接口的设计也非常简洁和解耦合。语法上，介于静态语言和动态语言之间，对于喜欢脚本的人来说，还是比较容易接受。

然后就是不得不提的goroutine，足够轻量和简单易用，比起其他语言中啰啰嗦嗦的一大堆多线程代码，确实更加让人喜欢。

基于Go，实现了一个HTTP请求模块[ok](https://github.com/syaning/ok)。

### 学习资料

- [A Tour of Go](https://tour.golang.org/welcome/1) - 对语言的整体认识
- [Go by Example](https://gobyexample.com/) - 通过简单地例子快速入门
- [The Go Programming Language](http://www.gopl.io/) - 非常不错的一本书，详细了解语言的各个方面
- [The Golang Standard Library by Example](https://github.com/polaris1119/The-Golang-Standard-Library-by-Example) - 对Go语言标准库的一些讲解，不完整，结合着Go源码来看比较有帮助
- [Awesome Go](https://github.com/avelino/awesome-go) - 这个就不多说了