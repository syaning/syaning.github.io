---
layout: post
title:  树莓派初体验(1)——部署
date:   2021-05-17 22:30:00 +0800
---

* TOC
{:toc}

## 1. 组装

买的是 4B 的板子，8G 内存，32G TF 存储卡。组装比较简单，不做赘述。

## 2. 安装系统

参考 [How to install Ubuntu Server on your Raspberry Pi](https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi) 安装 Ubuntu 20.04.

> 注意：启动的时候，电源稳定很重要。我最开始打开风扇，导致每次都无法启动。后来拔掉风扇，就可以启动了。启动之后再插上风扇就一切正常。应该是电源质量不太行。

## 3. 配置静态IP

如果没有该需求，可以直接跳过。

如果需要配置静态IP，可以参考 [Network Configuration](https://ubuntu.com/server/docs/network-configuration).

修改 `/etc/netplan/99_config.yaml` 文件：

```
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses:
        - 192.168.0.151/24
      gateway4: 192.168.0.1
      nameservers:
        addresses: [192.168.0.1]
```

然后执行 `sudo netplan apply` 即可。

## 4. 配置时区

```shell
timedatectl set-timezone Asia/Shanghai
```

## 5. 更新

```shell
sudo apt update
sudo apt upgrade
sudo apt autoremove
```

## 6. 科学上网

参考：

- [Shadowsocks-libev的Server和Client(for Linux)配置](https://ochicken.top/2019/10/11/20191011-Shadowsocks-libev/)
- [现在开始使用 Ubuntu 20.04](https://blog.gadflysu.com/linux/ubuntu-primer/)

### 安装 shadowsocks-libev

```shell
# 1. 安装 shadowsocks-libev
sudo apt install shadowsocks-libev

# 2. 由于这里只需要启动 client，因此禁用 server
sudo systemctl disable shadowsocks-libev
sudo systemctl stop shadowsocks-libev

# 3. 配置 /etc/shadowsocks-libev/client.json

# 4. 设置开启启动并启动 client
sudo systemctl enable shadowsocks-libev-local@client
sudo systemctl start shadowsocks-libev-local@client
```

### 安装 privoxy

```shell
# 1. 安装 privoxy
sudo apt install privoxy

# 2. 配置 /etc/privoxy/config
# 添加 forward-socks5  /   127.0.0.1:1080 .

# 3. 重启
sudo systemctl restart privoxy

# 4. 配置环境变量 ~/.bashrc 添加如下配置
export HTTP_PROXY='http://localhost:8118'
export HTTPS_PROXY='https://localhost:8118'
```