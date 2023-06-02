# ConfigMap

## 创建 ConfigMap

### From literal

```bash
$ kubectl create configmap mysql-conf \
    --from-literal=host=mysql \
    --from-literal=port=3306
```

### From file

```bash
$ echo -n mysql | tee host
$ echo -n 3306 | tee port

$ kubectl create configmap mysql-conf \
    --from-file=host \
    --from-file=port
```

### From directory

```bash
$ echo -n mysql | tee conf/host
$ echo -n 3306 | tee conf/port

$ kubectl create configmap mysql-conf --from-file=conf/
```

### From env file

```bash
$ echo "host=mysql\nport=3306" | tee conf.env

$ kubectl create configmap mysql-conf --from-env-file=conf.env
```

### From YAML

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-conf
data:
  host: mysql
  port: "3306"
```

```bash
$ kubectl create -f conf.yaml
```

## 使用 ConfigMap

### 作为环境变量

可以使用 `env` 从 ConfigMap 中取出特定的值作为环境变量：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox
spec:
  containers:
  - name: busybox
    image: busybox:1.31.0
    command:
    - /bin/sh
    - -c
    - echo $MYSQL_HOST:$MYSQL_PORT
    env:
    - name: MYSQL_HOST
      valueFrom:
        configMapKeyRef:
          name: mysql-conf
          key: host
    - name: MYSQL_PORT
      valueFrom:
        configMapKeyRef:
          name: mysql-conf
          key: port
  restartPolicy: Never
```

也可以使用 `envFrom` 使用整个 ConfigMap 作为环境变量：

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql-conf
data:
  MYSQL_HOST: mysql
  MYSQL_PORT: "3306"

---

apiVersion: v1
kind: Pod
metadata:
  name: busybox
spec:
  containers:
  - name: busybox
    image: busybox:1.31.0
    command:
    - /bin/sh
    - -c
    - echo $MYSQL_HOST:$MYSQL_PORT
    envFrom:
    - configMapRef:
        name: mysql-conf
  restartPolicy: Never
```

### 作为 Volume

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox
spec:
  containers:
  - name: busybox
    image: busybox:1.31.0
    command:
    - /bin/sh
    - -c
    - echo $(cat /app/config/mysql-host):$(cat /app/config/mysql-port)
    volumeMounts:
    - name: config
      mountPath: /app/config
      readOnly: true
  volumes:
  - name: config
    configMap:
      name: mysql-conf
      items:
      - key: host
        path: mysql-host
      - key: port
        path: mysql-port
  restartPolicy: Never
```

ConfigMap 作为 Volume 使用的时候，会覆盖掉 `mountPath` 目录下的其它文件。如果只是想创建出新的文件，而不会目录下的其它文件产生影响，可以使用 `subPath`：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox
spec:
  containers:
  - name: busybox
    image: busybox:1.31.0
    command:
    - /bin/sh
    - -c
    - ls /var; sleep 3000
    volumeMounts:
    - name: config
      mountPath: /var/mysql-host
      subPath: mysql-host
  volumes:
  - name: config
    configMap:
      name: mysql-conf
      items:
      - key: host
        path: mysql-host
      - key: port
        path: mysql-port
  restartPolicy: Never
```

如果 ConfigMap 的数据发生更新，相应的 Volume 内容也会跟着自动更新。需要注意的是，使用了 `subPath` 的 Volume 内容不会自动更新。

## 参考

- [Configure a Pod to Use a ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/)
