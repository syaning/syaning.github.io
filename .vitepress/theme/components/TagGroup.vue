<script setup>
const {
  activeTags = [],
  onToggle = (tag) => {},
} = defineProps({
  tags: Array,
  activeTags: Array,
  onToggle: Function
})
</script>

<template>
  <div class="tag-group">
    <span
      v-for="({tag, cnt}) in tags"
      :class="{ tag: true, active: activeTags.indexOf(tag) >= 0 }"
      @click="onToggle(tag)"
    >
      {{tag}}({{cnt}})
    </span>
  </div>
</template>

<style scoped lang="less">
.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  .tag {
    background: var(--vp-c-gray-soft);
    font-size: 12px;
    line-height: 16px;
    padding: 4px 8px;
    border-radius: 50px;
    cursor: pointer;

    &:hover {
      color: var(--vp-c-brand-1);
    }

    &.active {
      color: var(--vp-c-brand-1);
      font-weight: bold;
    }
  }
}
</style>
