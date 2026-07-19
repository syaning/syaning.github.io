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
      return activeTags.value.some((tag) => subItem.tags.includes(tag))
    })
    return { ...item, items: subItems }
  }).filter((item) => (item.items || []).length > 0)
})
</script>

<template>
  <div class="nav-page">
    <div v-if="tagsVisible" class="nav-tags">
      <TagGroup
        :tags="tags"
        :activeTags="activeTags"
        :onToggle="onToggleTag"
      />
    </div>
    <section v-for="{ text, items } in visibleSidebar" :key="text" class="nav-section">
      <h3 class="nav-year">{{ text }}</h3>
      <ul class="nav-list">
        <li v-for="item in items" :key="item.link || item.text">
          <a v-if="item.link" :href="item.link">{{ item.text }}</a>
          <template v-if="item.items">
            <div class="nav-group">{{ item.text }}</div>
            <ul class="nav-list">
              <li v-for="subItem in item.items" :key="subItem.link">
                <a :href="subItem.link">{{ subItem.text }}</a>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.nav-tags {
  margin-bottom: 1.5rem;
}

.nav-section + .nav-section {
  margin-top: 1.5rem;
}

.nav-year {
  margin: 0 0 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  letter-spacing: 0.04em;
}

.nav-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.nav-list li {
  margin: 0.15rem 0;
  line-height: 1.7;
}

.nav-list a {
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: color 0.15s ease;
}

.nav-list a:hover {
  color: var(--vp-c-brand-1);
}

.nav-group {
  margin-top: 0.35rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
</style>
