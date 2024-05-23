---
doctype: post
title:   树莓派初体验(2)——安装k8s
date:    2021-05-19 22:30:00 +0800
---

## 安装容器运行时

- 如果使用 Docker，参考下面的 “安装Docker”
- 如果使用 containerd，参考下面的 “安装containerd”

## 安装Docker

参考 [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/).

修改 cgroup driver 为 systemd，可以参考 [Changing the cgroup driver to systemd on Red Hat Enterprise Linux](https://www.ibm.com/docs/pl/cloud-private/3.1.2?topic=ts-changing-cgroup-driver-systemd-red-hat-enterprise-linux).

> 不修改 cgroup driver 也没事，只不顾在安装 k8s 的时候会有一个 warning，不影响。

## 安装containerd

containerd 官方不提供 ARM64 编译版本，因此需要自己编译，参考 [Build containerd from source](https://github.com/containerd/containerd/blob/master/BUILDING.md).

首先安装 Golang，参考 [Download and install](https://golang.org/doc/install).

然后安装相关的依赖工具：

```shell
wget -c https://github.com/protocolbuffers/protobuf/releases/download/v3.17.0/protoc-3.17.0-linux-aarch_64.zip
sudo unzip protoc-3.17.0-linux-aarch_64.zip -d /usr/local

sudo apt install btrfs-progs libbtrfs-dev

sudo apt install make gcc pkg-config libseccomp-dev
```

手动 build runc：

```shell
git clone https://github.com/opencontainers/runc
cd runc
make
sudo make install
```

手动 build containerd 并启动：

```shell
git clone https://github.com/containerd/containerd
cd containerd
make
sudo make install

sudo cp containerd.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable containerd.service
sudo systemctl start containerd.service
```

## 安装k8s

首先安装 kubeadm、kubelet、kubectl，参考 [安装 kubeadm](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)。

然后初始化集群，参考 [使用 kubeadm 创建集群](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)。

```shell
sudo su
kubeadm init --pod-network-cidr=10.244.0.0/16 --image-repository=registry.aliyuncs.com/google_containers
```

如果有如下报错：

```
error execution phase preflight: [preflight] Some fatal errors occurred:
	[ERROR SystemVerification]: missing required cgroups: memory
```

可以参考 [Raspberry Pi 4 Ubuntu 19.10 cannot enable cgroup memory at boostrap](https://askubuntu.com/questions/1189480/raspberry-pi-4-ubuntu-19-10-cannot-enable-cgroup-memory-at-boostrap)，修改 `/boot/firmware/cmdline.txt`
添加 `cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1` 即可。

另外由于 google registry 无法访问，这里使用阿里云的 registry 地址。在此有坑，可能报错如下：

```
[ERROR ImagePull]: failed to pull image registry.aliyuncs.com/google_containers/coredns/coredns:v1.8.0: output: Error response from daemon: pull access denied for registry.aliyuncs.com/google_containers/coredns/coredns, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
```

如果出现该错误，那么需要手动 pull 一下 coredns 的镜像：

```shell
docker pull coredns/coredns:1.8.0
docker tag coredns/coredns:1.8.0 registry.aliyuncs.com/google_containers/coredns/coredns:v1.8.0
```

集群初始化后：

```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

然后部署网络插件，参考 [Installing Addons](https://kubernetes.io/docs/concepts/cluster-administration/addons/)。

因为只有一个节点，可以执行如下命令允许 master 节点调度 pod：

```shell
kubectl taint nodes --all node-role.kubernetes.io/master-
```

## 安装Helm

参考 [安装Helm](https://helm.sh/zh/docs/intro/install/)。
