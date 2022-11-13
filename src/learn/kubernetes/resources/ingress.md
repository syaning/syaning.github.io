# Ingress

## Ingress 和 Ingress Controller

Ingress 可以将集群内的服务对外暴露，并且提供了负载均衡，HTTPS，以及基于域名的分流支持。Ingress 本身是一种配置，配置了如何对外提供服务。

如果需要 Ingress 真正生效，需要依赖于 Ingress Controller。可以简单类比为，Ingress Controller 就像是 Nginx，而 Ingress 则是 Nginx 的配置。

常见的 Ingress Controller 有多种，例如 [ingress-nginx](https://kubernetes.github.io/ingress-nginx/)，[ambassador](https://www.getambassador.io/) 等，使用不同的 Ingress Controller 的时候，Ingress 的配置也会有所差别。

这里以 ingress-nginx 为例。

## 安装 Ingress Controller

```bash
$ helm install --name nginx --namespace ingress-nginx stable/nginx-ingress

$ kubectl get all -n ingress-nginx
NAME                                                      READY   STATUS    RESTARTS   AGE
pod/nginx-nginx-ingress-controller-7d9449d76c-v4cf9       1/1     Running   0          30s
pod/nginx-nginx-ingress-default-backend-7f79f9545-9px9f   1/1     Running   0          30s

NAME                                          TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
service/nginx-nginx-ingress-controller        LoadBalancer   10.97.45.251     localhost     80:30432/TCP,443:32760/TCP   30s
service/nginx-nginx-ingress-default-backend   ClusterIP      10.108.182.134   <none>        80/TCP                       30s

NAME                                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx-nginx-ingress-controller        1/1     1            1           30s
deployment.apps/nginx-nginx-ingress-default-backend   1/1     1            1           30s

NAME                                                            DESIRED   CURRENT   READY   AGE
replicaset.apps/nginx-nginx-ingress-controller-7d9449d76c       1         1         1       30s
replicaset.apps/nginx-nginx-ingress-default-backend-7f79f9545   1         1         1       30s
```

## 创建 Ingress

### IP 访问

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: nginx
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - http:
      paths:
      - path: /
        backend:
          serviceName: nginx
          servicePort: 80
```

```bash
$ kubectl get ingress
NAME    HOSTS   ADDRESS   PORTS   AGE
nginx   *                 80      3s
```

### 域名分流

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: nginx
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - host: nginx-example.com
    http:
      paths:
      - path: /
        backend:
          serviceName: nginx
          servicePort: 80
```

```bash
kubectl get ingress
NAME    HOSTS               ADDRESS   PORTS   AGE
nginx   nginx-example.com             80      10s
```

## 参考

- [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)
