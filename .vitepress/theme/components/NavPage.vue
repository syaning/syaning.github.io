<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const data = useData()

const props = defineProps({
  navPath: String
})

const collections = computed(() => {
  return data.theme.value.sidebar[props.navPath] || []
})
</script>

<template>
  <div v-for="{ text, items } in collections">
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
