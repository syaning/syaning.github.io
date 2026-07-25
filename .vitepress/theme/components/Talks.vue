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
    <a
      v-for="talk in talks"
      :key="talk.link"
      class="talk"
      :href="talk.link"
      target="_blank"
      rel="noreferrer"
    >
      <div class="talk-head">
        <span class="talk-date">{{ talk.date }}</span>
        <span class="talk-conference">{{ talk.conference }}</span>
        <span v-if="talk.location" class="talk-location">{{ talk.location }}</span>
      </div>
      <div class="talk-title">{{ talk.title }}</div>
      <img
        class="talk-cover"
        :src="talk.cover"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </a>
  </div>
</template>

<style scoped>
.talks {
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  margin: 16px 0 40px;
}

.talk {
  display: block;
  text-decoration: none !important;
  color: inherit;
}

.talk-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem 0.65rem;
  margin: 0 0 8px;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.talk-location {
  opacity: 0.75;
}

.talk-title {
  margin: 0 0 12px;
  font-size: 1.05rem;
  line-height: 1.45;
  color: var(--vp-c-text-1);
  transition: color 0.15s ease;
}

.talk:hover .talk-title {
  color: var(--vp-c-brand-1);
}

.talk-cover {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 2px;
  background-color: var(--vp-c-bg-soft);
  opacity: 0.92;
  transition: opacity 0.15s ease;
}

.talk:hover .talk-cover {
  opacity: 1;
}
</style>
