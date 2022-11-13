# Node

## 简介

通过如下方式可以查看集群的节点信息：

```bash
$ kubectl get node
NAME      STATUS   ROLES    AGE   VERSION
test-01   Ready    master   38d   v1.15.0
test-02   Ready    <none>   38d   v1.15.0
test-03   Ready    <none>   38d   v1.15.0

$ kubectl get node -owide
NAME      STATUS   ROLES    AGE   VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE           KERNEL-VERSION      CONTAINER-RUNTIME
test-01   Ready    master   38d   v1.15.0   10.40.57.233   <none>        Ubuntu 16.04 LTS   4.15.0-39-generic   docker://18.6.1
test-02   Ready    <none>   38d   v1.15.0   10.40.57.71    <none>        Ubuntu 16.04 LTS   4.15.0-39-generic   docker://18.6.1
test-03   Ready    <none>   38d   v1.15.0   10.40.57.77    <none>        Ubuntu 16.04 LTS   4.15.0-39-generic   docker://18.6.1
```

Node 默认有如下标签：

- `kubernetes.io/arch`
- `kubernetes.io/hostname`
- `kubernetes.io/os`

```bash
$ kubectl get node test-01 -oyaml
apiVersion: v1
kind: Node
metadata:
  labels:
    kubernetes.io/arch: amd64
    kubernetes.io/hostname: test-01
    kubernetes.io/os: linux
    node-role.kubernetes.io/master: ""
  name: test-01
spec:
  podCIDR: 10.244.0.0/24
  taints:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
```

## Taint

详情参考 [Taints and Tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/)。

Taint 是 Node 的特性，一般包含 `key`，`value` 和 `effect`，表示形式为 `key=value:effect`。可以为 Node 打上 taint，以及一定的副作用。通过 `kubectl taint` 命令可以为 Node 添加或者删除 taint，例如：

```bash
# 添加 taint
$ kubectl taint node node-01 dedicated=special-user:NoSchedule

# 删除 taint
$ kubectl taint node node-01 dedicated:NoSchedule-
```

在上一部分的例子中，master 节点默认 taint 如下：

```yaml
spec:
  taints:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
```

通常默认情况下，master 节点是不允许调度 Pod 的，如果希望 master 节点也可以调度 Pod，可以执行：

```bash
kubectl taint nodes --all node-role.kubernetes.io/master-
```

effect 的取值为：

- `NoSchedule`：禁止调度
- `PreferNoSchedule`：优先不调度
- `NoExecute`：不调度到该节点，同时会驱逐已经调度到该节点的 Pod

## 管理

### cordon / uncordon

`cordon` 将节点标记为不可调度；`uncordon` 将节点重新标记为可调度。

```bash
$ kubectl cordon test-03
NAME      STATUS                     ROLES    AGE   VERSION
test-01   Ready                      master   45d   v1.15.0
test-02   Ready                      <none>   45d   v1.15.0
test-03   Ready,SchedulingDisabled   <none>   45d   v1.15.0
```

### drain

如果需要将一个 Node 从集群中移除，则需要先执行 `kubectl drain <node name>` 操作。该操作会：

- 标记该 Node 为不可调度 (`kubectl cordon <node name>`)
- 驱逐该 Node 上的 Pod

通过 `--ignore-daemonsets` 可以忽略 DaemonSet；如果有 Pod 使用本地存储，例如 `emptyDir`，可以使用 `--delete-local-data` 参数。

`drain` 操作结束后，即可将 Node 从集群中移除。如果想要 Node 继续使用，可以通过 `kubectl uncordon <node name>`.

该操作在驱逐 Pod 的时候，会遵循 [PodDisruptionBudget](./pod-disruption-budget.md)

## 参考

- [Nodes](https://kubernetes.io/docs/concepts/architecture/nodes/)
- [Taints and Tolerations](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/)
- [Safely Drain a Node while Respecting the PodDisruptionBudget](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/)
