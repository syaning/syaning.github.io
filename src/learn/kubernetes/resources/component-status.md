# ComponentStatus

通过 `kubectl get componentstatus` 可以查看集群的状态：

```bash
$ kubectl get componentstatus
NAME                 STATUS    MESSAGE             ERROR
controller-manager   Healthy   ok
scheduler            Healthy   ok
etcd-0               Healthy   {"health":"true"}

$ kubectl get cs controller-manager -oyaml
apiVersion: v1
conditions:
- message: ok
  status: "True"
  type: Healthy
kind: ComponentStatus
metadata:
  creationTimestamp: null
  name: controller-manager
  selfLink: /api/v1/componentstatuses/controller-manager

$ kubectl get cs scheduler -oyaml
apiVersion: v1
conditions:
- message: ok
  status: "True"
  type: Healthy
kind: ComponentStatus
metadata:
  creationTimestamp: null
  name: scheduler
  selfLink: /api/v1/componentstatuses/scheduler

$ kubectl get cs etcd-0 -oyaml
apiVersion: v1
conditions:
- message: '{"health":"true"}'
  status: "True"
  type: Healthy
kind: ComponentStatus
metadata:
  creationTimestamp: null
  name: etcd-0
  selfLink: /api/v1/componentstatuses/etcd-0
```