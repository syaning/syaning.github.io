<script setup>
import dayjs from 'dayjs'
import VPDoc from 'vitepress/dist/client/theme-default/components/VPDoc.vue'

const formatDate = (date) => {
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  return dayjs(date).format('YYYY-MM-DD')
}
</script>

<template>
  <VPDoc>
    <template #doc-before>
      <div class="vp-doc">
        <h1>{{ $frontmatter.title }}</h1>
        <div class="post-meta">
          <Icon icon="ep:calendar" />
          <time>{{ formatDate($frontmatter.date) }}</time>
        </div>
      </div>
    </template>
  </VPDoc>
</template>

<style>
.post-meta {
  color: var(--vp-c-text-2);
  font-size: small;
  margin: 1rem 0 2rem 0;
  display: flex;
  align-items: center;
}

.post-meta > svg {
  width: 12px;
  height: 12px;
  margin-right: 5px;
}
</style>
