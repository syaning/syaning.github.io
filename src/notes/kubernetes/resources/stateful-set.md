# StatefulSet

## 简介

Deployment 所管理的 Pod，可以认为是无状态的，可以任意的水平扩展，Pod 被销毁后，重新创建出来的 Pod 的名字也和之前的不一样。

StatefulSet 则主要用来管理有状态的应用，例如数据库的主从关系。并且如果一个 Pod 重新创建了，会保持名字永远是和之前一致的。

## 参考

- [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
