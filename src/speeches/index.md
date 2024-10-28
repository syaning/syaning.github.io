---
aside: false
lastUpdated: false
---

<script setup>
import tid2022 from './img/2022-09-09-tid.jpg'
import gnsec2022 from './img/2022-04-26-gnsec.jpg'
import qecon2021 from './img/2021-09-15-qecon.jpg'

const speeches = [{
  cover: tid2022,
  date: '2022-09-09',
  conference: 'TiD',
  location: '北京',
  title: 'DevOps下可观测数据质量建设最佳实践',
  link: 'https://mp.weixin.qq.com/s/2bnFrjjxFtL47fEqiYnU1A',
}, {
  cover: gnsec2022,
  date: '2022-04-26',
  conference: 'GNSEC',
  location: '线上',
  title: '现代化自建监控告警平台搭建决策实践',
  link: 'https://mp.weixin.qq.com/s/rU1cgUREN8ot23yXZA204Q',
}, {
  cover: qecon2021,
  date: '2021-09-15',
  conference: 'QECon',
  location: '上海',
  title: '基于海量日志和时序数据的质量建设最佳实践',
  link: 'https://mp.weixin.qq.com/s/SIzXdg9PHIK2R7H1x59fIQ',
}]
</script>

# Speeches

<Speeches :speeches="speeches" />
