# DaemonSet

## 创建 DaemonSet

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd-elasticsearch
  labels:
    k8s-app: fluentd-logging
spec:
  selector:
    matchLabels:
      name: fluentd-elasticsearch
  template:
    metadata:
      labels:
        name: fluentd-elasticsearch
    spec:
      tolerations:
      - key: node-role.kubernetes.io/master
        effect: NoSchedule
      containers:
      - name: fluentd-elasticsearch
        image: fluent/fluentd:v1.7
        resources:
          limits:
            memory: 200Mi
          requests:
            cpu: 100m
            memory: 200Mi
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
      terminationGracePeriodSeconds: 30
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
```

```bash
$ kubectl get ds
NAME                    DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
fluentd-elasticsearch   3         3         3       3            3           <none>          109s

$ kubectl get po -owide
NAME                          READY   STATUS    RESTARTS   AGE    IP            NODE      NOMINATED NODE   READINESS GATES
fluentd-elasticsearch-8ckdj   1/1     Running   0          2m7s   10.244.2.40   test-01   <none>           <none>
fluentd-elasticsearch-hv4nl   1/1     Running   0          2m7s   10.244.0.6    test-02   <none>           <none>
fluentd-elasticsearch-p78qr   1/1     Running   0          2m7s   10.244.1.25   test-03   <none>           <none>
```

## 参考

- [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
