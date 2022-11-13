---
layout: post
title:  Go交叉编译
date:   2021-05-10 23:30:00 +0800
---

通过 `go tool dist list` 可以获取到 `${GOOS}/${GOARCH}` 列表，例如：

```shell
$ go tool dist list
aix/ppc64
android/386
android/amd64
android/arm
android/arm64
darwin/amd64
darwin/arm64
...
```

通过 `go env` 可以查看 GOOS 和 GOARCH 环境变量配置，例如：

```shell
$ go env GOOS GOARCH
darwin
amd64
```

通过设置 GOOS 和 GOARCH 可以进行交叉编译，例如：

```shell
$ GOOS=linux GOARCH=arm64 go build -o main main.go
```

参考文档：

- [Building Go Applications for Different Operating Systems and Architectures](https://www.digitalocean.com/community/tutorials/building-go-applications-for-different-operating-systems-and-architectures)
