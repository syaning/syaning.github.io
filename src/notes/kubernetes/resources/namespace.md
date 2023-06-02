# Namespace

## 简介

Namespace 可以实现对部分资源的隔离，从而被不同的用户或用户组使用。例如 Deployment，Pod，Service 等资源是属于某一个 Namespace 的，而 Node，Persistent Volume 等资源则是全局的，不属于任何 Namespace。

```bash
# 查看所有可以 Namespace 管理的资源
$ kubectl api-resources --namespaced=true

# 查看所有全局的资源
$ kubectl api-resources --namespaced=false
```

## 操作

### 查看

可以通过 `kubectl get ns` 来查看所有的 Namespace：

```bash
$ kubectl get ns
NAME          STATUS    AGE
default       Active    35d
kube-public   Active    35d
kube-system   Active    35d
```

其中 `default` 是默认的 Namespace，k8s 自身的服务在 `kube-system` Namespace 下。

### 管理

```bash
# 创建 Namespace
$ kubectl create ns test-namespace

# 删除 Namespace
$ kubectl delete ns test-namespace
```

`kubectl` 命令通过 `-n <namespace>` 选项可以管理相应 Namespace 下的资源，通过 `--all-namespaces` 选项可以管理所有 Namespace 下的资源。

## 参考

- [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)
