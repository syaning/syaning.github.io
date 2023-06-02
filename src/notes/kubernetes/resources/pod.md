# Pod

## 简介

- Pod 是 k8s 中最小的执行单元，是对容器的一层包装，每个 Pod 内可以有一个或多个容器
- Pod 内的容器共享网络和存储，互相之间可以通过 `localhost` 来进行通信
- Pod是非持久的、一次性的 (ephemeral, disposable)
- Pod 不会自愈，当一个 Pod 失败后，会被删除
- Controller（例如 Deployment，StatefulSet，DaemonSet）用于管理 Pod，对 Pod 进行调度，副本管理，滚动升级等
- 很少直接使用 Pod，一般都是通过 Controller 来使用
- Pod template 也通常不直接使用，而是放在 Controller template 里

## Pod 生命周期

### Status

- `Pending`：尚未调度，镜像在下载中，或者找不到合适的调度节点
- `Running`：被调度到一个节点上，其中至少一个容器还在运行中，启动中或者重启中
- `Succeeded`：所有容器运行成功然后终止，且不会重启
- `Failed`：所有容器已经终止运行，且至少有一个容器失败而终止
- `Unknow`：状态未知

```bash
$ kubectl describe po nginx-66f9f9cfd5-2w97n
Name:               nginx-66f9f9cfd5-2w97n
Namespace:          default
Labels:             app=nginx
                    pod-template-hash=66f9f9cfd5
Status:             Running

$ kubectl get po nginx-66f9f9cfd5-2w97n -oyaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-66f9f9cfd5-2w97n
  namespace: default
status:
  phase: Running
```

### Conditions

每个 Pod 有一组 Condition，表示 Pod 在各个阶段的状态。每个 Condition 包含：

- `lastProbeTime`
- `lastTransitionTime`
- `message`
- `reason`
- `status`：可取值为 `True`，`False` 和 `Unknown`
- `type`
  - `PodScheduled`：Pod 被调度到 Node 上
  - `Ready`：Pod 已经可以接受请求，并且应当加入到 Service 的负载均衡池中
  - `Initialized`：所有的 Init Container 都起来了
  - `Unschedulable`：暂时无法调度，可能是由于没有满足条件的 Node
  - `ContainersReady`：所有的容器都 ready

```bash
$ kubectl describe po nginx-66f9f9cfd5-2w97n
Name:               nginx-66f9f9cfd5-2w97n
Namespace:          default
Labels:             app=nginx
                    pod-template-hash=66f9f9cfd5
Status:             Running
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True

$ kubectl get po nginx-66f9f9cfd5-2w97n -oyaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-66f9f9cfd5-2w97n
  namespace: default
status:
  conditions:
  - lastProbeTime: null
    lastTransitionTime: "2019-09-03T16:50:59Z"
    status: "True"
    type: Initialized
  - lastProbeTime: null
    lastTransitionTime: "2019-09-09T11:45:47Z"
    status: "True"
    type: Ready
  - lastProbeTime: null
    lastTransitionTime: "2019-09-09T11:45:47Z"
    status: "True"
    type: ContainersReady
  - lastProbeTime: null
    lastTransitionTime: "2019-09-03T16:48:33Z"
    status: "True"
    type: PodScheduled
  phase: Running
```

### Restart Policy

`restartPolicy` 对 Pod 内的所有容器都生效，可取值为：

- `Always` (默认值)
- `OnFailure`
- `Never`

## 容器管理

### imagePullPolicy

`imagePullPolicy` 指定了镜像的拉取策略，可取值为：

- `Always`
- `Never`
- `IfNotPresent`

如果使用的镜像 tag 为 `latest`，则默认值为 `Always`，否则默认值为 `IfNotPresent`。

### 端口

### 环境变量

环境变量可以来自于：

- 直接设置的值
- ConfigMap / Secret

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-service
spec:
  containers:
  - name: my-service
    image: my-service
    env:
    - name: MYSQL_HOST
      valueFrom:
        configMapRef:
          name: mysql-conf
          key: host
    - name: MYSQL_PORT
      value: "3306"
    - name: USERNAME
      valueFrom:
        secretKeyRef:
          name: mysql-secret
          key: username
    - name: PASSWORD
      valueFrom:
        secretKeyRef:
          name: mysql-secret
          key: password
```

### 资源限制

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-service
spec:
  containers:
  - name: my-service
    image: my-service
    resources:
      limits:
        cpu: "1"
        memory: "200Mi"
      requests:
        cpu: "500m"
        memory: "100Mi"
```

其中：

- cpu 可以是数字，表示核数；也可以是类似 `500m` 的形式，`1000m` 与 `1` 含义相同
- memory 可以是数字，表示 bytes；也可以带后缀作为单位，可选值为 `E, P, T, G, M, K, Ei, Pi, Ti, Gi, Mi, Ki`

更多内容可以参考：

- [Assign Memory Resources to Containers and Pods](https://kubernetes.io/docs/tasks/configure-pod-container/assign-memory-resource/)
- [Assign CPU Resources to Containers and Pods](https://kubernetes.io/docs/tasks/configure-pod-container/assign-cpu-resource/)

如果需要使用 GPU 资源，参考 [GPU](../guides/gpu.md).

### Volume 挂载

参考 [Persistent Volume](./persistent-volume.md).

### Probe

可以为 Pod 内的容器设置探针，检测容器的状态。

有如下三种探针：

- `livenessProbe`: 检测容器是否运行。如果检测失败，那么 kubelet 会 kill 掉容器
- `readinessProbe`: 检测容器是否可以接收请求。如果检测失败，那么 endpoints controller 会从 Service 的 endpoints 列表中移除该 Pod 的 IP
- `startupProbe`: 检测容器内的应用是否已经起来，在该探针检测成功之前，其它探针都会被禁用。对于一些启动比较慢的应用，可以使用该探针，从而避免 `livenessProbe` 过早检测失败导致频繁重启

探针可以执行以下三种操作：

- 执行一条命令，状态码为0则成功
- TCP端口，可以连接则成功
- HTTP Get 请求，返回码为 2xx 或者 3xx 则成功

例如：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: goproxy
  labels:
    app: goproxy
spec:
  containers:
  - name: goproxy
    image: k8s.gcr.io/goproxy:0.1
    ports:
    - containerPort: 8080
    readinessProbe:
      tcpSocket:
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 10
    livenessProbe:
      tcpSocket:
        port: 8080
      initialDelaySeconds: 15
      periodSeconds: 20
```

### hooks

## Init Container

## QoS

在创建一个 Pod 后，会自动为该 Pod 分配一个 QoS (Quality of Service) 等级。QoS 有如下三种：

- `Guaranteed`：Pod 中的每个容器都设置了 CPU 和 Memory 的请求和限制，且请求和限制的值相等
- `Burstable`：Pod 中至少有一个容器的资源设置不满足 `Guaranteed`
- `BestEffort`：Pod 中每一个容器都没有设置 CPU 和 Memory 的请求和限制

更多信息参考 [Configure Quality of Service for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/).

## 调度

参考 [Pod 调度](../guides/pod-schedule.md)。

## 网络配置

### hostNetwork

### dnsPolicy

### dnsConfig

### hostAliases

参考 [Adding entries to Pod /etc/hosts with HostAliases](https://kubernetes.io/docs/concepts/services-networking/add-entries-to-pod-etc-hosts-with-host-aliases/).

## 参考

- [Pod Overview](https://kubernetes.io/docs/concepts/workloads/pods/)
- [Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod/)
- [Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)
- [Configure Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- [Init Containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)
