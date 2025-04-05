<script setup>
import { computed, ref } from 'vue'
import { useSidebar } from 'vitepress/theme'

const { sidebar } = useSidebar()
const { showTags = false } = defineProps({
  showTags: Boolean
})

const tags = computed(() => {
  const stat = {}
  const addTags = (tags) => {
    tags.forEach((tag) => {
      stat[tag] = (stat[tag] || 0) + 1
    })
  }
  sidebar.value.forEach((item) => {
    (item.items || []).forEach((subItem) => {
      addTags(subItem.tags || [])
    })
  })
  return Object.entries(stat)
    .map(([tag, cnt]) => ({ tag, cnt }))
    .sort((a, b) => b.cnt - a.cnt)
})

const tagsVisible = computed(() => showTags && tags.value.length > 0)
const activeTags = ref([])
const onToggleTag = function(tag) {
  if (activeTags.value.includes(tag)) {
    activeTags.value = activeTags.value.filter((t) => t !== tag)
  } else {
    activeTags.value.push(tag)
  }
}

const visibleSidebar = computed(() => {
  if (!tagsVisible.value || activeTags.value.length === 0) {
    return sidebar.value
  }
  return sidebar.value.map((item) => {
    const subItems = (item.items || []).filter((subItem) => {
      return activeTags.value.every((tag) => subItem.tags.includes(tag))
    })
    return { ...item, items: subItems }
  }).filter((item) => (item.items || []).length > 0)
})
</script>

<template>
  <div v-if="tagsVisible">
    <TagGroup
      :tags="tags"
      :activeTags="activeTags"
      :onToggle="onToggleTag"
      style="margin-bottom: 16px;"
    />
  </div>
  <div v-for="{ text, items } in visibleSidebar">
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
