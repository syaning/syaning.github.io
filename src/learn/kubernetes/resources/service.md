# Service

## 类型

- ClusterIP：默认类型，会分配一个集群内可访问的虚拟 IP
- NodePort：会暴露一个端口出去，通过 `<NodeIP>:<NodePort>` 可以访问
- LoadBalancer：使用云服务商提供的负载均衡器对外提供服务
- ExternalName：转发到其它服务上

## 创建 Service

### ClusterIP

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  type: ClusterIP
  selector:
    app: nginx
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
```

其中 `port` 是 Service 对外暴露的端口，`targetPort` 是目标 Pod 的端口。在不声明的情况下，`targetPort` 默认和 `port` 保持一致。

### NodePort

`NodePort` 类型的 Service 可以使用 `<NodeIP>:<NodePort>` 来访问，例如：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
    nodePort: 32080
```

如果不指定 `nodePort`，系统会默认分配一个端口。默认的端口范围是 `30000-32767`。

更多详情参考 [Type NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#nodeport)。

### LoadBalancer

通过云服务商提供的负载均衡器对外暴露服务。

更多详情参考 [Type LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer)。

### ExternalName

`ExternalName` 类型的 Service 可以在 DNS 解析阶段，将服务地址解析成另一个外部服务的地址，从而进行访问。例如：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: httpbin
spec:
  type: ExternalName
  externalName: httpbin.org
```

更多详情参考 [Type ExternalName](https://kubernetes.io/docs/concepts/services-networking/service/#externalname)。

## 多端口

一个 Service 可以对外暴露多个端口，此时应当为每个端口指定一个 `name`：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 9376
  - name: https
    protocol: TCP
    port: 443
    targetPort: 9377
```

## 服务发现

### 环境变量

详情参考 [Environment variables](https://kubernetes.io/docs/concepts/services-networking/service/#environment-variables)。

由于对服务启动顺序有依赖，因此实际很少使用。

### DNS

服务之间可以通过 `service-name.namespacee` 的方式来互相访问，如果两个服务在同一个 namespace 下，可以直接通过 `service-name` 来互相访问。

例如：

```bash
$ kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
nginx        ClusterIP   10.107.254.54   <none>        80/TCP    1d

$ kubectl run -it --rm busybox --image=busybox:1.28.4 sh
If you don't see a command prompt, try pressing enter.
/ # wget http://nginx
Connecting to nginx (10.107.254.54:80)
index.html           100% |******************************|   612   0:00:00 ETA
/ #
/ # nslookup nginx.default
Server:    10.96.0.10
Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

Name:      nginx.default
Address 1: 10.107.254.54 nginx.default.svc.cluster.local
```

可以看到 DNS 解析 `nginx.default` 的地址就是 nginx Service 的 ClusterIP。

更多详情参考 [DNS for Services and Pods](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)。

## Headless Service

如果显式指定 `clusterIP` 为 `None`，那么创建出来的就是 Headless Service，通过这种方式用户可以定制负载均衡的方式。

Headless Service 不会被自动分配 ClusterIP，而且 DNS 解析也会直接解析为 Pod 的地址。

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
spec:
  selector:
    app: nginx
  clusterIP: None
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
```

```bash
$ kubectl get svc
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
nginx        ClusterIP   None         <none>        80/TCP    16s

$ kubectl get po -owide
NAME                     READY     STATUS    RESTARTS   AGE       IP          NODE
nginx-65fc954674-lcvcj   1/1       Running   0          22s       10.1.0.62   docker-for-desktop
nginx-65fc954674-nsnz2   1/1       Running   0          22s       10.1.0.60   docker-for-desktop
nginx-65fc954674-s7rmj   1/1       Running   0          22s       10.1.0.61   docker-for-desktop

$ kubectl run -it --rm busybox --image=busybox:1.28.4 sh
If you don't see a command prompt, try pressing enter.
/ # nslookup nginx.default
Server:    10.96.0.10
Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

Name:      nginx.default
Address 1: 10.1.0.62
Address 2: 10.1.0.60
Address 3: 10.1.0.61
```

## 对外提供服务

- NodePort
- LoadBalancer
- [Ingress](./ingress.md)

## 参考

- [Service](https://kubernetes.io/docs/concepts/services-networking/service/)
