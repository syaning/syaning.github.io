<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { parseTags } from '../archive'

const { frontmatter } = useData()

const enabled = computed(() => frontmatter.value.postMeta === true)

const tags = computed(() => parseTags(frontmatter.value.tags))

const hasDate = computed(() => {
  const date = frontmatter.value.date
  return date != null && date !== ''
})

const hasMeta = computed(() => hasDate.value || tags.value.length > 0)

const formatDate = (value) => {
  if (!value) {
    return ''
  }
  const date = value instanceof Date
    ? value
    : new Date(typeof value === 'string' ? value.replace(/-/g, '/') : value)
  if (Number.isNaN(date.getTime())) {
    return String(value)
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<template>
  <div v-if="enabled" class="vp-doc post-header" :class="{ 'has-meta': hasMeta }">
    <h1>{{ frontmatter.title }}</h1>
    <div v-if="hasMeta" class="post-meta">
      <div v-if="hasDate" class="post-date">
        <time>{{ formatDate(frontmatter.date) }}</time>
      </div>
      <span v-if="hasDate && tags.length > 0" class="post-meta-sep" aria-hidden="true">·</span>
      <p v-if="tags.length > 0" class="post-tags">
        <span v-for="tag in tags" :key="tag">#{{ tag }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.post-header h1 {
  margin-bottom: 0;
}

.post-header:not(.has-meta) {
  margin-bottom: 1.5rem;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 0.75rem;
  row-gap: 0.35rem;
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  margin: 0.5rem 0 1.5rem;
  letter-spacing: 0.02em;
}

.post-meta-sep {
  user-select: none;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 !important;
}

.post-tags > span {
  color: var(--vp-c-text-3);
}
</style>
