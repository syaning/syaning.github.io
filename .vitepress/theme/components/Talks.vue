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
      <img class="talk-cover" :src="talk.cover" alt="" loading="lazy" decoding="async" />
      <div class="talk-body">
        <div class="talk-title">{{ talk.title }}</div>
        <div class="talk-meta">
          {{ talk.date }} · {{ talk.conference }} · {{ talk.location }}
        </div>
      </div>
    </a>
  </div>
</template>


<style scoped>
.talks {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin: 24px 0;
}

.talk {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none !important;
  color: inherit;
  transition: opacity 0.15s ease;
}

.talk:hover {
  opacity: 0.72;
}

.talk:hover .talk-title {
  color: var(--vp-c-brand-1);
}

.talk-cover {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 2px;
  background-color: var(--vp-c-bg-soft);
}

.talk-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.talk-title {
  font-size: 1.05rem;
  line-height: 1.45;
  color: var(--vp-c-text-1);
  transition: color 0.15s ease;
}

.talk-meta {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  letter-spacing: 0.01em;
}

@media (min-width: 720px) {
  .talks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px 28px;
  }
}
</style>
