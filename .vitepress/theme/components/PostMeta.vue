<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const enabled = computed(() => frontmatter.value.postMeta === true)

const tags = computed(() => {
  return String(frontmatter.value.tags || '')
    .trim()
    .split(/\s+/)
    .filter((tag) => !!tag)
})

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
  <div v-if="enabled" class="vp-doc post-header">
    <h1>{{ frontmatter.title }}</h1>
    <div class="post-meta">
      <div v-if="frontmatter.date" class="post-date">
        <time>{{ formatDate(frontmatter.date) }}</time>
      </div>
      <p v-if="tags.length > 0" class="post-tags">
        <span v-for="tag in tags" :key="tag">#{{ tag }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.post-meta {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  margin: 0.75rem 0 2.25rem;
  letter-spacing: 0.02em;
}

.post-tags {
  margin: 0.35rem 0 0 !important;
}

.post-tags > span {
  margin-right: 10px;
  color: var(--vp-c-text-3);
}
</style>
