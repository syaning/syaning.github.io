---
layout: post
title:  Docker减小构建的镜像大小
date:   2020-08-22 12:00:00 +0800
---

## 简介

减小构建出来的镜像大小，通常要考虑两点：

1. 基础镜像要小，例如使用 alpine 或者 slim 镜像，关于它们的区别可以参考 [Alpine, Slim, Stretch, Buster, Jessie, Bullseye — What are the Differences in Docker Images?](https://medium.com/swlh/alpine-slim-stretch-buster-jessie-bullseye-bookworm-what-are-the-differences-in-docker-62171ed4531d)
2. 只把 build 后的文件放在镜像中，其它无关文件都可以删掉。如果构建阶段所需环境大于运行阶段所需环境，那么可以使用 [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/)。

## 示例

### Node.js

```docker
FROM node:10-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
```

### 前端应用

```docker
# build stage
FROM node:10-slim as build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

# deploy stage
FROM nginx:1.17-alpine
COPY --from=build-stage /usr/src/app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

其中 `nginx.conf` 参考如下：

```
server {
    listen 80;
    listen [::]:80;

    server_name localhost;

    index index.html;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

注意：这里示例主要是针对 SPA 且使用了基于 history 的路由模式。否则的话直接使用默认 Nginx 配置即可。

### Go

```docker
FROM golang:1.14-alpine as build-stage
WORKDIR /app
COPY . .
RUN go build -o myapp main.go

FROM alpine:3.12
WORKDIR /root
COPY --from=build-stage /app/myapp .
EXPOSE 8080
CMD ["./myapp"]
```

注意：这里只是最简单的示例。如果涉及到时间和时区的解析，可能 alpine 镜像不太足够，要么替换为标准的 Ubuntu 或者 CentOS 镜像；要么需要安装一些相关的工具，参考如下：

```shell
RUN apk update && \
	api add tzdata \
	ln -snf /usr/share/zooneinfo/Etc/UTC /etc/localtime && \
	echo Etc/UTC > /etc/timezone
```
