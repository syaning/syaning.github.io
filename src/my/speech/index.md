---
aside: false
---

<script setup>
const speeches = [{
  cover: './img/2022-09-09-tid.jpg',
  date: '2022-09-09',
  conference: 'TiD',
  location: '北京',
  title: 'DevOps下可观测数据质量建设最佳实践',
  link: 'https://mp.weixin.qq.com/s/2bnFrjjxFtL47fEqiYnU1A',
}, {
  cover: './img/2022-04-26-gnsec.jpg',
  date: '2022-04-26',
  conference: 'GNSEC',
  location: '线上',
  title: '现代化自建监控告警平台搭建决策实践',
  link: 'https://mp.weixin.qq.com/s/rU1cgUREN8ot23yXZA204Q',
}, {
  cover: './img/2021-09-15-qecon.jpg',
  date: '2021-09-15',
  conference: 'QECon',
  location: '上海',
  title: '基于海量日志和时序数据的质量建设最佳实践',
  link: 'https://mp.weixin.qq.com/s/SIzXdg9PHIK2R7H1x59fIQ',
}]
</script>

# Speeches

<Speeches :speeches="speeches" />
