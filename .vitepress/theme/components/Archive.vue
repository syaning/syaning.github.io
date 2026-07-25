<script setup>
import { computed, ref } from 'vue'
import { data } from '../archive.data'
import TagGroup from './TagGroup.vue'

const props = defineProps({
  source: {
    type: String,
    required: true,
    validator: (value) => value in data,
  },
  showTags: Boolean,
})

const sections = computed(() => data[props.source]?.sections || [])

const tags = computed(() => {
  const stat = {}
  sections.value.forEach((section) => {
    ;(section.items || []).forEach((item) => {
      ;(item.tags || []).forEach((tag) => {
        stat[tag] = (stat[tag] || 0) + 1
      })
    })
  })
  return Object.entries(stat)
    .map(([tag, cnt]) => ({ tag, cnt }))
    .sort((a, b) => b.cnt - a.cnt)
})

const tagsVisible = computed(() => props.showTags && tags.value.length > 0)
const activeTags = ref([])

const onToggleTag = (tag) => {
  if (activeTags.value.includes(tag)) {
    activeTags.value = activeTags.value.filter((t) => t !== tag)
  } else {
    activeTags.value.push(tag)
  }
}

const visibleSections = computed(() => {
  if (!tagsVisible.value || activeTags.value.length === 0) {
    return sections.value
  }
  return sections.value
    .map((section) => {
      const items = (section.items || []).filter((item) =>
        activeTags.value.some((tag) => (item.tags || []).includes(tag)),
      )
      return { ...section, items }
    })
    .filter((section) => section.items.length > 0)
})
</script>

<template>
  <div class="archive">
    <div v-if="tagsVisible" class="archive-tags">
      <TagGroup
        :tags="tags"
        :activeTags="activeTags"
        @toggle="onToggleTag"
      />
    </div>
    <section
      v-for="{ text, items } in visibleSections"
      :key="text"
      class="archive-section"
    >
      <h3 class="archive-year">{{ text }}</h3>
      <ul class="archive-list">
        <li v-for="item in items" :key="item.link">
          <a :href="item.link">{{ item.text }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.archive-tags {
  margin-bottom: 1.5rem;
}

.archive-section + .archive-section {
  margin-top: 1.5rem;
}

.archive-year {
  margin: 0 0 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  letter-spacing: 0.04em;
}

.archive-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.archive-list li {
  margin: 0.15rem 0;
  line-height: 1.7;
}

.archive-list a {
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: color 0.15s ease;
}

.archive-list a:hover {
  color: var(--vp-c-brand-1);
}
</style>
