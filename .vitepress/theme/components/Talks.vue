<script setup lang="ts">
interface TalkItem {
  cover: string
  date: string
  conference: string
  location: string
  title: string
  link: string
}

const { talks } = defineProps<{
  talks: TalkItem[]
}>()
</script>

<template>
  <div class="talks">
    <div class="talk" v-for="talk in talks">
      <figure>
        <img class="talk-cover" :src="talk.cover" alt="">
      </figure>
      <div class="talk-meta">
        <div>
          <Icon icon="ep:calendar" />
          <span>{{ talk.date }}</span>
        </div>
        <div>
          <Icon icon="ph:users-three-light" />
          <span>{{ talk.conference }}</span>
        </div>
        <div>
          <Icon icon="ep:location" />
          <span>{{ talk.location }}</span>
        </div>
      </div>
      <div class="talk-title">
        <a :href="talk.link" target="_blank" rel="noreferrer">{{ talk.title }}</a>
      </div>
    </div>
  </div>
</template>


<style scoped>
.talks {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
}

.talk {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

@media (min-width: 720px) {
  .talk {
    width: calc(50% - 10px);
  }
}

.talk-cover {
  width: 100%;
  border-radius: 12px 12px 0 0;
}

.talk-meta {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  border-bottom: 2px solid var(--vp-c-bg);
}

.talk-meta > div {
  display: flex;
  align-items: center;
}

.talk-meta svg {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.talk-title {
  padding: 10px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-align: center;
}
</style>
