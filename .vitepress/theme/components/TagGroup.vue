<script setup>
defineProps({
  tags: Array,
  activeTags: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <div class="tag-group">
    <button
      v-for="({ tag, cnt }) in tags"
      :key="tag"
      type="button"
      :class="{ tag: true, active: activeTags.indexOf(tag) >= 0 }"
      @click="emit('toggle', tag)"
    >
      <span class="tag-name">{{ tag }}</span>
      <span class="tag-cnt">{{ cnt }}</span>
    </button>
  </div>
</template>

<style scoped>
.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
}

.tag {
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font: inherit;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  transition: color 0.15s ease;
}

.tag:hover {
  color: var(--vp-c-brand-1);
}

.tag.active {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.tag-cnt {
  margin-left: 3px;
  font-size: 0.8em;
  color: var(--vp-c-text-3);
}

.tag.active .tag-cnt {
  color: var(--vp-c-brand-2);
}
</style>
