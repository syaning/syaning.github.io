<script setup>
import DefaultTheme from 'vitepress/theme'
import dayjs from 'dayjs'

const { Layout } = DefaultTheme
const formatDate = (date) => {
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  return dayjs(date).format('YYYY-MM-DD')
}
</script>

<template>
  <Layout>
    <template #doc-before v-if="$frontmatter.doctype === 'post'">
      <div class="vp-doc">
        <h1>{{ $frontmatter.title }}</h1>
        <div class="post-meta">
          <time>{{ formatDate($frontmatter.date) }}</time>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style>
.post-meta {
  color: var(--vp-c-text-2);
  font-size: small;
  margin: 1rem 0 2rem 0;
}
</style>
