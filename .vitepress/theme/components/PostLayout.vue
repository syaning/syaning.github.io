<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import VPDoc from 'vitepress/dist/client/theme-default/components/VPDoc.vue'
import dayjs from 'dayjs'

const { frontmatter } = useData()
const tags = computed(() => {
  return (frontmatter.value.tags || '')
      .trim()
      .split(/\s+/)
      .filter((tag) => !!tag)
})

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
          <div class="post-date">
            <Icon icon="ep:calendar" />
            <time>{{ formatDate($frontmatter.date) }}</time>
          </div>
          <p class="post-tags" v-if="tags.length > 0">
            <span v-for="tag in tags">#{{ tag }}</span>
          </p>
        </div>
      </div>
    </template>
  </VPDoc>
</template>

<style scoped lang="less">
.post-meta {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
  margin: 0.75rem 0 2.25rem 0;
  letter-spacing: 0.02em;

  .post-date {
    display: flex;
    align-items: center;
    gap: 6px;

    > svg {
      width: 12px;
      height: 12px;
      opacity: 0.7;
    }
  }

  .post-tags {
    margin: 0.35rem 0 0 !important;

    > span {
      margin-right: 10px;
      color: var(--vp-c-text-3);
    }
  }
}
</style>
