# ReplicaSet

## 介绍

Replicaset 用来保证 Pod 的副本数总是与期望值相等。

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.17.2
        ports:
        - containerPort: 80
```

一般很少直接使用 ReplicaSet，而是通过 [Deployment](./deployment.md) 来进行管理。

## 参考

- [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
- [ReplicationController](https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/)
