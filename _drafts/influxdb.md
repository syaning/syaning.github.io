```sh
$ docker run -d -p 8086:8086 -v "$PWD/influxdb":/var/lib/influxdb --name influxdb influxdb
$ docker run -d -p 3000:3000 --name grafana --link influxdb grafana/grafana
```

```py
import psutil
from influxdb import InfluxDBClient


def gen_point(i, percent):
    return {
        'measurement': 'cpu_load',
        'tags': {
            'cpu': 'cpu%d' % i
        },
        'fields': {
            'percent': percent
        }
    }


def main(host='localhost', port=8086):
    database = 'example'
    client = InfluxDBClient(host, port, database=database)
    client.create_database(database)

    while True:
        cpu_percent = psutil.cpu_percent(interval=2, percpu=True)
        data = [gen_point(idx + 1, percent) for idx, percent in enumerate(cpu_percent)]
        client.write_points(data)

if __name__ == '__main__':
    main()
```