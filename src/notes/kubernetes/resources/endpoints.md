# Endpoints

## 默认 Endpoints

通常情况下，在创建 Service 的时候，会默认创建 Endpoints，例如：

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

---

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

查看 Service：

```bash
$ kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
nginx        ClusterIP   10.107.227.24   <none>        80/TCP    2m
```

查看 Pod：

```bash
$ kubectl get po -owide
NAME                     READY     STATUS    RESTARTS   AGE       IP          NODE
nginx-56b7d6bcf7-8pf6f   1/1       Running   0          1m        10.1.0.43   docker-for-desktop
nginx-56b7d6bcf7-bl9vh   1/1       Running   0          1m        10.1.0.45   docker-for-desktop
nginx-56b7d6bcf7-wl4qb   1/1       Running   0          1m        10.1.0.44   docker-for-desktop
```

查看 Service：

```bash
$ kubectl get endpoints
NAME         ENDPOINTS                                AGE
nginx        10.1.0.43:80,10.1.0.44:80,10.1.0.45:80   3m

$ kubectl get endpoints nginx -oyaml
apiVersion: v1
kind: Endpoints
metadata:
  creationTimestamp: 2019-08-14T15:09:13Z
  name: nginx
  namespace: default
  resourceVersion: "670768"
  selfLink: /api/v1/namespaces/default/endpoints/nginx
  uid: 7a0d276e-bea5-11e9-98fc-025000000001
subsets:
- addresses:
  - ip: 10.1.0.43
    nodeName: docker-for-desktop
    targetRef:
      kind: Pod
      name: nginx-56b7d6bcf7-8pf6f
      namespace: default
      resourceVersion: "670758"
      uid: 7a11eab2-bea5-11e9-98fc-025000000001
  - ip: 10.1.0.44
    nodeName: docker-for-desktop
    targetRef:
      kind: Pod
      name: nginx-56b7d6bcf7-wl4qb
      namespace: default
      resourceVersion: "670761"
      uid: 7a10580e-bea5-11e9-98fc-025000000001
  - ip: 10.1.0.45
    nodeName: docker-for-desktop
    targetRef:
      kind: Pod
      name: nginx-56b7d6bcf7-bl9vh
      namespace: default
      resourceVersion: "670766"
      uid: 7a124e66-bea5-11e9-98fc-025000000001
  ports:
  - port: 80
    protocol: TCP
```

可以看到，默认的 Endpoints 即为所选中的 Pod 的集合。

## 自定义 Endpoints

如果 Service 没有定义 Selector，那么它默认不会选中任何 Pod，也就不会自动创建 Endpoints。可以自定义 Endpoints 来使得 Service 使用集群外部的服务。例如：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  ports:
  - protocol: TCP
    port: 80

---

apiVersion: v1
kind: Endpoints
metadata:
  name:  my-service
subsets:
- addresses:
  - ip: 192.168.1.3
  ports:
  - port: 9000
    protocol: TCP
```

甚至可以指定多组 `subsets`：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  ports:
  - protocol: TCP
    port: 80

---

apiVersion: v1
kind: Endpoints
metadata:
  name:  my-service
subsets:
- addresses:
  - ip: 192.168.1.3
  ports:
  - port: 9000
    protocol: TCP
- addresses:
  - ip: 192.168.1.3
  ports:
  - port: 9001
    protocol: TCP
```

需要特别注意的是，Endpoints 的 `name` 和 Service 的 `name` 必须保持一致。
