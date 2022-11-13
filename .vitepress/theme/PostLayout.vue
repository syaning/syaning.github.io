<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { formatDate } from '../sidebar/helper'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #doc-before v-if="frontmatter.layout === 'post'">
      <div class="vp-doc">
        <h1>{{ frontmatter.title }}</h1>
        <div class="post-meta">
          <time>{{ formatDate(new Date(frontmatter.date)) }}</time>
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
