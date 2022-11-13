# Deployment

## 创建 Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
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
        image: nginx:1.16
        ports:
        - containerPort: 80
```

Deployment 会自动创建 ReplicaSet：

```bash
$ kubectl get deploy
NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
nginx     3         3         3            3           4s

$ kubectl get rs
NAME               DESIRED   CURRENT   READY     AGE
nginx-65fc954674   3         3         3         12s

$ kubectl get po
NAME                     READY     STATUS    RESTARTS   AGE
nginx-65fc954674-2tc4v   1/1       Running   0          15s
nginx-65fc954674-fmqpf   1/1       Running   0          15s
nginx-65fc954674-ssz7x   1/1       Running   0          15s
```

## 扩容

### 手动扩容

```bash
$ kubectl scale --replicas=5 deploy/nginx
```

### 自动扩容

参考 [HorizontalPodAutoscaler](./horizontal-pod-autoscaler.md)。

## 滚动升级

### 升级

只有当 Deployment 中 Pod 的模板发生改变时，才会触发升级，即 `spec.template` 发生变化。例如修改镜像为 `nginx:1.17.2`：

```yaml
apiVersion: apps/v1
kind: Deployment
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

然后进行查看：

```bash
$ kubectl get deploy
NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
nginx     3         4         3            3           48s

$ demo kubectl get rs
NAME               DESIRED   CURRENT   READY     AGE
nginx-56b7d6bcf7   3         3         3         10s
nginx-65fc954674   0         0         0         51s

$ demo kubectl get po
NAME                     READY     STATUS    RESTARTS   AGE
nginx-56b7d6bcf7-2jhsm   1/1       Running   0          11s
nginx-56b7d6bcf7-dxkf5   1/1       Running   0          15s
nginx-56b7d6bcf7-q6jss   1/1       Running   0          13s
```

可以看到，更新之后，会生成一个新的 ReplicaSet。

查看升级状态：

```bash
$ kubectl rollout status deploy/nginx
deployment "nginx" successfully rolled out
```

查看 Deployment 的滚动升级详情：

```bash
$ kubectl describe deploy nginx
......
Events:
  Type    Reason             Age   From                   Message
  ----    ------             ----  ----                   -------
  Normal  ScalingReplicaSet  3m    deployment-controller  Scaled up replica set nginx-65fc954674 to 3
  Normal  ScalingReplicaSet  2m    deployment-controller  Scaled up replica set nginx-56b7d6bcf7 to 1
  Normal  ScalingReplicaSet  2m    deployment-controller  Scaled down replica set nginx-65fc954674 to 2
  Normal  ScalingReplicaSet  2m    deployment-controller  Scaled up replica set nginx-56b7d6bcf7 to 2
  Normal  ScalingReplicaSet  2m    deployment-controller  Scaled down replica set nginx-65fc954674 to 1
  Normal  ScalingReplicaSet  2m    deployment-controller  Scaled up replica set nginx-56b7d6bcf7 to 3
  Normal  ScalingReplicaSet  2m    deployment-controller  Scaled down replica set nginx-65fc954674 to 0
```

### 升级历史

```bash
$ kubectl rollout history deploy/nginx
deployments "nginx"
REVISION  CHANGE-CAUSE
1         <none>
2         <none>

$ kubectl rollout history deploy/nginx --revision=2
deployments "nginx" with revision #2
Pod Template:
  Labels:	app=nginx
	pod-template-hash=1263826793
  Containers:
   nginx:
    Image:	nginx:1.17.2
    Port:	80/TCP
    Host Port:	0/TCP
    Environment:	<none>
    Mounts:	<none>
  Volumes:	<none>
```

`.spec.revisionHistoryLimit` 可以设置保留多少次升级历史，默认为 10。如果设置为 0，则不保留任何升级历史，因此也就无法执行回滚操作。

### 回滚

修改 YAML 文件为上个版本，重新 apply，可以做回滚操作；或者

```bash
# 回滚到上一版本
$ kubectl rollout undo deploy/nginx

# 回滚到指定版本
$ kubectl rollout undo deploy/nginx --to-revision=1
```

### 升级策略

`.spec.strategy` 可以设置升级策略，其中 `.spec.strategy.type` 可以取值为：

- Recreate：会直接 kill 掉已有 Pod，然后重新创建
- RollingUpdate：滚动升级，默认策略。如果为该策略，还可以设置 `maxUnavailable` 和 `maxSurge` 来控制升级的过程

更多详情参考 [Strategy](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy)。

## 参考

- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
