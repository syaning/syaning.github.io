# Persistent Volume

## Volume

以下列出几种基础且常用的 Volume。更多详情参考 [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)。

### configMap

参考 [ConfigMap](./configmap.md)。

### secret

参考 [Secret](./secret.md)。

### downwardAPI

downwardAPI 可以将 Pod 或 Container 的字段作为 Volume 来使用，从而可以让运行的容器来获取这些信息。更多详情可参考 [Expose Pod Information to Containers Through Files](https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/)。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
      annotations:
        app-owner: alex
    spec:
      containers:
      - name: nginx
        image: nginx:1.16
        resources:
          requests:
            cpu: "100m"
            memory: "32Mi"
        volumeMounts:
        - name: podinfo
          mountPath: /etc/podinfo          
      volumes:
      - name: podinfo
        downwardAPI:
          items:
          - path: labels
            fieldRef:
              fieldPath: metadata.labels
          - path: annotations
            fieldRef:
              fieldPath: metadata.annotations
          - path: cpu_request
            resourceFieldRef:
              containerName: nginx
              resource: requests.cpu
              divisor: 1m
          - path: mem_request
            resourceFieldRef:
              containerName: nginx
              resource: requests.memory
              divisor: 1Mi
```

### emptyDir

emptyDir 在 Pod 被调度到 Node 上的时候创建，初始为空目录，并且存在于 Pod 的生命周期内。当 Pod 从 Node 上移除后，emptyDir 会被永久删除。主要适用于存放一些临时文件，而非持久化的数据。

例如：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 1
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
        volumeMounts:
        - name: data
          mountPath: /data
      volumes:
      - name: data
        emptyDir: {}
```

通常来说，emptyDir 可以使用任何存储介质，当然，也可以设置 `emptyDir.menium: Memory` 来使用 tmpfs（基于内存）。

### hostPath

可以将 Node 上的文件或目录，挂载到 Pod 中。通常需要将一些系统文件挂载到 Pod 内部时会用到。在使用 `hostPath` 的情况下，即使 Pod 被删除，hostPath 的文件依然存在。

例如以下例子可以让 Pod 内使用当地时间：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 1
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
        volumeMounts:
        - name: timezone
          mountPath: /ect/timezone
        - name: localtime
          mountPath: /etc/localtime
      volumes:
      - name: timezone
        hostPath:
          path: /etc/timezone
      - name: localtime
        hostPath:
          path: /etc/localtime
```

`hostPath` 除了必需的 `path` 属性外，还可以设置 `type` 属性，详细可参考 [emptyDir](https://kubernetes.io/docs/concepts/storage/volumes/#hostpath)。

### local

`local` Volume 表示一个磁盘，分区或者一个目录。只能用于 static provisioning，不支持 dynamic provisioning（参考 [Provisioning](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#provisioning)）。需要结合 `nodeAffinity` 特性来使用，因此相比于 `hostPath` 方式，不用手动指定 Pod 所应该被调度的 Node。

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-pv
spec:
  capacity:
    storage: 10Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local-storage
  local:
    path: /opt/local-pv
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - test-03

---

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nginx-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: local-storage

---

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
        volumeMounts:
        - name: test
          mountPath: /opt/data
      volumes:
      - name: test
        persistentVolumeClaim:
          claimName: nginx-pvc
```

此外，Rancher 提供的 [local-path-provisioner](https://github.com/rancher/local-path-provisioner) 与 `local` 比较类似，但是支持 dynamic provisioning.

### persistentVolumeClaim

参考 [Persistent Volume Claim](./persistent-volume-claim.md)。

### projected

一般而言，多个 Volume 不能够挂载到同一个 MoutPath，例如如下就会报错：

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-conf
data:
  mysql-host: mysql.middlewares.svc.cluster.local

---

apiVersion: v1
kind: Secret
metadata:
  name: mysql-secret
data:
  mysql-pass: cm9vdA==

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 1
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
        volumeMounts:
        - name: mysql-conf
          mountPath: /ect/mysql
        - name: mysql-secret
          mountPath: /etc/mysql
      volumes:
      - name: mysql-conf
        configMap:
          name: mysql-conf
      - name: mysql-secret
        secret:
          secretName: mysql-secret
```

可以使用 `subPath` 的方式：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 1
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
        volumeMounts:
        - name: mysql-conf
          mountPath: /etc/mysql/mysql-host
          subPath: mysql-host
        - name: mysql-secret
          mountPath: /etc/mysql/mysql-pass
          subPath: mysql-pass
      volumes:
      - name: mysql-conf
        configMap:
          name: mysql-conf
      - name: mysql-secret
        secret:
          secretName: mysql-secret
```

也可以使用 `projected` Volume，例如：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 1
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
        volumeMounts:
        - name: mysql
          mountPath: /etc/mysql
      volumes:
      - name: mysql
        projected:
          sources:
          - configMap:
              name: mysql-conf
          - secret:
              name: mysql-secret
```

`projected` Volume 支持：

- `secret`
- `configMap`
- `downwardAPI`
- `serviceAccountToken`

## 生命周期

### Provisioning

### Binding

### Using

## 参考

- [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)
- [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
