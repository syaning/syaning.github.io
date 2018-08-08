```sh
$ docker run -d -p 8086:8086 -v "$PWD/influxdb":/var/lib/influxdb --name influxdb influxdb
$ docker run -d -p 3000:3000 --name grafana --link influxdb grafana/grafana
```

```py

```