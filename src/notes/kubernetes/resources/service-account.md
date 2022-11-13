# ServiceAccount

## 简介

ServiceAccount 是为 Pod 内的进程调用集群的 API 所使用的，是与 namespace 绑定的。

每个 namespace 创建的时候，会默认创建一个 default 的 ServiceAccount，每个 ServiceAccount 创建的时候，会默认创建一个类型为 `kubernetes.io/service-account-token` 的 Secret。

```bash
$ kubectl create ns test

$ kubectl get sa -n test
NAME      SECRETS   AGE
default   1         48s

$ kubectl get sa -n test default -oyaml
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: "2019-08-25T14:26:16Z"
  name: default
  namespace: test
  resourceVersion: "116679"
  selfLink: /api/v1/namespaces/test/serviceaccounts/default
  uid: 4c51e386-c744-11e9-b46c-025000000001
secrets:
- name: default-token-6wgrh

$ kubectl get secret -n test
NAME                  TYPE                                  DATA   AGE
default-token-6wgrh   kubernetes.io/service-account-token   3      83s

$ kubectl get secret -n test default-token-6wgrh -oyaml
apiVersion: v1
data:
  ca.crt: LS0tLS1CRUdJTiBDRVJUSUZJQ...
  namespace: dGVzdA==
  token: ZXlKaGJHY2lPaUpTVXpJMU5pSX...
kind: Secret
metadata:
  annotations:
    kubernetes.io/service-account.name: default
    kubernetes.io/service-account.uid: 4c51e386-c744-11e9-b46c-025000000001
  creationTimestamp: "2019-08-25T14:26:16Z"
  name: default-token-6wgrh
  namespace: test
  resourceVersion: "116678"
  selfLink: /api/v1/namespaces/test/secrets/default-token-6wgrh
  uid: 4c586a91-c744-11e9-b46c-025000000001
type: kubernetes.io/service-account-token
```

Pod 创建的时候，会默认使用当前 namespace 下 default 的 ServiceAccount，并且将其对应的 Secret 挂载到容器的 `/var/run/secrets/kubernetes.io/serviceaccount` 下。

```bash
$ kubectl describe po nginx-66f9f9cfd5-64ht8 -n test
Name:               nginx-66f9f9cfd5-64ht8
Namespace:          test
Containers:
  nginx:
    Container ID:   docker://5d84cb88a19db3390a924f85da507b24c449f9c18bf8ba49e7899eb00b87fc72
    Image:          nginx:1.16
    Port:           80/TCP
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-6wgrh (ro)
Volumes:
  default-token-6wgrh:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-6wgrh
    Optional:    false

$ kubectl get po nginx-66f9f9cfd5-64ht8 -n test -oyaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-66f9f9cfd5-64ht8
  namespace: test
spec:
  containers:
  - image: nginx:1.16
    name: nginx
    ports:
    - containerPort: 80
      protocol: TCP
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: default-token-6wgrh
      readOnly: true
  serviceAccount: default
  serviceAccountName: default
  volumes:
  - name: default-token-6wgrh
    secret:
      defaultMode: 420
      secretName: default-token-6wgrh
```

## 创建 ServiceAccount

```bash
$ kubectl create sa test-sa
```

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: test-sa
```

## 使用 ServiceAccount

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      serviceAccountName: test-sa
      containers:
      - name: nginx
        image: nginx:1.16
        ports:
        - containerPort: 80
```

ServiceAccount 通常会和 Role 或者 ClusterRole 进行绑定，从而被赋予一定的权限，例如读取 Pod 信息等。详情查看 [RBAC](../guides/rbac.md)。

## 添加 imagePullSecret

```bash
$ kubectl create secret docker-registry private-registry \
    --docker-username=admin \
    --docker-password=admin \
    --docker-email=admin@example.com \
    --docker-server=https://127.0.0.1:5000

$ kubectl create sa test-sa

$ kubectl patch sa test-sa -p '{"imagePullSecrets": [{"name": "private-registry"}]}'

$ kubectl get sa test-sa -oyaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: test-sa
  namespace: default
secrets:
- name: test-sa-token-pmk8t
imagePullSecrets:
- name: private-registry
```

然后之后创建的 Pod 就会自动带上指定的 `imagePullSecrets`：

```yaml
$ kubectl get po nginx-7988dffbf-svfvh -oyaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-7988dffbf-svfvh
  namespace: default
spec:
  containers:
  - image: nginx:1.16
    name: nginx
  imagePullSecrets:
  - name: private-registry
```

## 参考

- [Configure Service Accounts for Pods](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)
- [Managing Service Accounts](https://kubernetes.io/docs/reference/access-authn-authz/service-accounts-admin/)
