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
  color: var(--vp-c-text-2);
  font-size: small;
  margin: 1rem 0 2rem 0;

  .post-date {
    display: flex;
    align-items: center;

    > svg {
      width: 12px;
      height: 12px;
      margin-right: 5px;
    }
  }

  .post-tags {
    margin: 0 !important;

    > span {
      margin-right: 8px;
    }
  }
}
</style>
