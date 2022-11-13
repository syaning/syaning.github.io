# Secret

## 类型

执行 `kubectl create secret -h`，可以看到：

```
Create a secret using specified subcommand.

Available Commands:
  docker-registry Create a secret for use with a Docker registry
  generic         Create a secret from a local file, directory or literal value
  tls             Create a TLS secret

Usage:
  kubectl create secret [flags] [options]
```

可以通过如下 flag 去创建 Secret：

- generic：创建出来的 Secret 类型为 `Opaque`
- docker-registry：创建出来的 Secret 类型为 `kubernetes.io/dockerconfigjson`
- tls：创建出来的 Secret 类型为 `kubernetes.io/tls`

除了以上三种类型外，还有 `kubernetes.io/service-account-token` 类型的 Secret，可以参考 [ServiceAccount](./service-account.md)

## 创建 Generic Secret

### From literal

```bash
$ kubectl create secret generic userauth \
    --from-literal=username=admin \
    --from-literal=password=admin
```

### From file

```bash
$ echo -n admin | tee username
$ echo -n admin | tee password

$ kubectl create secret generic userauth \
    --from-file=username \
    --from-file=password
```

### From directory

```bash
$ echo -n admin | tee auth/username
$ echo -n admin | tee auth/password

$ kubectl create secret generic userauth --from-file=auth/
```

### From env file

```bash
$ echo "username=admin\npassword=admin" | tee auth.env

$ kubectl create secret generic userauth --from-env-file=auth.env
```

### From YAML

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: userauth
type: Opaque
data:
  username: YWRtaW4=
  password: YWRtaW4=
```

```bash
$ kubectl apply -f userauth.yaml
```

## 创建 Docker Registry Secret

```bash
$ kubectl create secret docker-registry private-registry \
    --docker-username=admin \
    --docker-password=admin \
    --docker-email=admin@example.com \
    --docker-server=https://127.0.0.1:5000
```

然后通过 `kubectl get secret private-registry -oyaml` 查看：

```yaml
apiVersion: v1
data:
  .dockerconfigjson: eyJhdXRocyI6eyJodHRwczovLzEyNy4wLjAuMTo1MDAwIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImF1dGgiOiJZV1J0YVc0NllXUnRhVzQ9In19fQ==
kind: Secret
metadata:
  creationTimestamp: 2019-08-11T10:03:47Z
  name: private-registry
  namespace: default
  resourceVersion: "571738"
  selfLink: /api/v1/namespaces/default/secrets/private-registry
  uid: 4fb6a863-bc1f-11e9-98fc-025000000001
type: kubernetes.io/dockerconfigjson
```

其中 `.dockerconfigjson` 存放的内容如下：

```bash
$ echo eyJhdXRocyI6eyJodHRwczovLzEyNy4wLjAuMTo1MDAwIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImF1dGgiOiJZV1J0YVc0NllXUnRhVzQ9In19fQ== | base64 -D | jq
```

```json
{
  "auths": {
    "https://127.0.0.1:5000": {
      "username": "admin",
      "password": "admin",
      "email": "admin@example.com",
      "auth": "YWRtaW46YWRtaW4="
    }
  }
}
```

> 也可以通过 `.yaml` 文件将内容 base64 编码去创建 Secret

## 创建 TLS Secret

首先生成自签名证书：

```bash
# genrate private key
$ openssl genrsa -out server.key 2048

# generate certificate signing request
$ openssl req -new -sha256 -key server.key -out server.csr

# generate self-signed certificate
$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

然后执行：

```bash
$ kubectl create secret tls tls-secret --cert=server.cert --key=server.key
```

通过 `kubectl get secret tls-secret -oyaml` 查看内容：

```
apiVersion: v1
data:
  tls.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ0...
  tls.key: LS0tLS1CRUdJTiBSU0EgUFJJVk...
kind: Secret
metadata:
  creationTimestamp: 2019-08-11T10:17:07Z
  name: tls-secret
  namespace: default
  resourceVersion: "572616"
  selfLink: /api/v1/namespaces/default/secrets/tls-secret
  uid: 2c35e338-bc21-11e9-98fc-025000000001
type: kubernetes.io/tls
```

> 也可以通过 `.yaml` 文件将 crt 和 key 做 base64 编码去创建 Secret

## 使用 Secret

Secret 的使用和 [ConfigMap](./configmap.md) 类似，即可以作为环境变量，也可以作为 Volume。

### 作为环境变量

可以使用 `env` 从 Secret 中取出特定的值作为环境变量：

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
    - echo $USERNAME:$PASSWORD
    env:
    - name: USERNAME
      valueFrom:
        secretKeyRef:
          name: userauth
          key: username
    - name: PASSWORD
      valueFrom:
        secretKeyRef:
          name: userauth
          key: password
  restartPolicy: Never
```

也可以使用 `envFrom` 使用整个 Secret 作为环境变量：

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: userauth
type: Opaque
data:
  USERNAME: YWRtaW4=
  PASSWORD: YWRtaW4=

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
    - echo $USERNAME:$PASSWORD
    envFrom:
    - secretRef:
        name: userauth
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
    - echo $(cat /app/auth/username):$(cat /app/auth/password)
    volumeMounts:
    - name: userauth
      mountPath: /app/auth
  volumes:
  - name: userauth
    secret:
      secretName: userauth
  restartPolicy: Never
```

### 使用 Docker Registry Secret

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: private-reg
spec:
  containers:
  - name: private-reg-container
    image: private-image
  imagePullSecrets:
  - name: private-registry
```

## 参考

- [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
