<script setup>
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

const { sidebar } = useSidebar()
</script>

<template>
  <div v-for="{ text, items } in sidebar">
    <h1>{{ text }}</h1>
    <ul>
      <li v-for="item in items">
        <a v-if="item.link" :href="item.link">{{ item.text }}</a>
        <template v-if="item.items">
          <div>{{ item.text }}</div>
          <ul>
            <li v-for="subItem in item.items">
              <a :href="subItem.link">{{ subItem.text }}</a>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>
