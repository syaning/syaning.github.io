# Event

通过 `kubectl get event` 可以查看事件信息：

```bash
$ kubectl get event
LAST SEEN   TYPE      REASON             OBJECT                       MESSAGE
3m33s       Warning   FailedScheduling   pod/nginx-66f9f9cfd5-2w97n   0/1 nodes are available: 1 Insufficient cpu.
3m33s       Warning   FailedScheduling   pod/nginx-66f9f9cfd5-7dzb8   0/1 nodes are available: 1 Insufficient cpu.
3m33s       Warning   FailedScheduling   pod/nginx-66f9f9cfd5-wn9ph   0/1 nodes are available: 1 Insufficient cpu.
```

也可以通过 `-n, --namespace` 参数来查看指定 Namespace 下的事件。