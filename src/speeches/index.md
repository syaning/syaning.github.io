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

<div class="speeches">
  <div class="speech" v-for="speech in speeches">
    <figure>
      <img class="speech-cover" :src="speech.cover" alt="">
    </figure>
    <div class="speech-meta">
      <div>
        <IconCalendar />
        <span>{{ speech.date }}</span>
      </div>
      <div>
        <IconUsers />
        <span>{{ speech.conference }}</span>
      </div>
      <div>
        <IconLocation />
        <span>{{ speech.location }}</span>
      </div>
    </div>
    <div class="speech-title">
      <a :href="speech.link" target="_blank" rel="noreferrer">{{ speech.title }}</a>
    </div>
  </div>
</div>

<style scoped>
.speeches {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
}

.speech {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

@media (min-width: 720px) {
  .speech {
    width: calc(50% - 10px);
  }
}

.speech-cover {
  width: 100%;
  border-radius: 12px 12px 0 0;
}

.speech-meta {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  border-bottom: 2px solid var(--vp-c-bg);
}

.speech-meta > div {
  display: flex;
  align-items: center;
}

.speech-meta svg {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.speech-title {
  padding: 10px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-align: center;
}
</style>
