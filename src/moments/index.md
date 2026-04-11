---
sidebar: false
aside: false
---

<script setup>
import { computed } from 'vue'
import { data as momentsData } from './moments.data.js'

const images = import.meta.glob('./img/*.webp', {
  eager: true,
  import: 'default',
})

const moments = computed(() => {
  return momentsData
    .map((item) => ({
      ...item,
      img: images[`./img/${item.file}`] || '',
    }))
    .filter((item) => item.img)
})
</script>

# Moments

<Moments :moments="moments" />