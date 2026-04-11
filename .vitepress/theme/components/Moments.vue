<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const visible = ref(false)
const currentIndex = ref(0)
const data = useData()
const pointerStart = ref(null)
const eagerImageCount = 6
const loadedImages = ref({})
const momentImageElements = ref([])

const props = defineProps({
  moments: {
    type: Array,
    default: null,
  },
  limit: {
    type: Number,
    default: -1,
  }
})

const transformations = {
  oss: (imgSrc) => `${imgSrc}?x-oss-process=image/resize,m_mfit,s_200`,
  cloudflare: (imgSrc) => `/cdn-cgi/image/width=200,quality=75,format=auto${imgSrc}`,
  local: (imgSrc) => imgSrc,
}

const transform = computed(() => {
  const transformation = import.meta.env.VITE_IMAGE_TRANSFORMATION
  return transformations[transformation] || transformations.local
})

const sourceMoments = computed(() => {
  if (props.moments && Array.isArray(props.moments)) {
    return props.moments
  }
  return data.theme.value.moments || []
})

const moments = computed(() => {
  if (props.limit > 0) {
    return sourceMoments.value.slice(0, props.limit)
  }
  return sourceMoments.value
})

const shouldLimit = computed(() => {
  return props.limit > 0 && sourceMoments.value.length > props.limit
})

const current = computed(() => {
  if (currentIndex.value < moments.value.length) {
    return moments.value[currentIndex.value]
  }
  return null
})

const showDetail = (index) => {
  currentIndex.value = index
  visible.value = true
  document.body.classList.add('noscroll')
}

const getLoadingMode = (index) => (index < eagerImageCount ? 'eager' : 'lazy')

const onMomentImageLoaded = (index) => {
  loadedImages.value[index] = true
}

const setMomentImageRef = (element, index) => {
  if (!element) {
    return
  }
  momentImageElements.value[index] = element
  if (element.complete) {
    onMomentImageLoaded(index)
  }
}

const hideDetail = () => {
  document.body.classList.remove('noscroll')
  visible.value = false
}

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const next = () => {
  if (currentIndex.value < moments.value.length - 1) {
    currentIndex.value++
  }
}

const onPointerDown = (event) => {
  if (event.pointerType !== 'touch') {
    return
  }
  pointerStart.value = {
    pointerId: event.pointerId,
    x: event.clientX,
    y: event.clientY,
  }
}

const onPointerUp = (event) => {
  if (!pointerStart.value || event.pointerType !== 'touch') {
    return
  }
  if (pointerStart.value.pointerId !== event.pointerId) {
    return
  }

  const dx = event.clientX - pointerStart.value.x
  const dy = event.clientY - pointerStart.value.y
  pointerStart.value = null

  const swipeThreshold = 30
  const isHorizontalSwipe = Math.abs(dx) > Math.abs(dy)
  if (!isHorizontalSwipe || Math.abs(dx) < swipeThreshold) {
    return
  }

  if (dx < 0) {
    next()
  } else {
    prev()
  }
}

const onPointerCancel = () => {
  pointerStart.value = null
}

const onWindowKeydown = (event) => {
  if (event.key === 'Escape' && visible.value) {
    hideDetail()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onWindowKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onWindowKeydown)
  document.body.classList.remove('noscroll')
})
</script>

<template>
  <div class="moments">
    <img v-for="(moment, index) in moments" :key="moment.img || index" :ref="(element) => setMomentImageRef(element, index)"
      :class="{ 'is-loading': !loadedImages[index] }"
      :src="transform(moment.img)" alt="" width="100" height="100"
      :loading="getLoadingMode(index)" :fetchpriority="index < 2 ? 'high' : 'auto'" decoding="async"
      @click="showDetail(index)" @load="onMomentImageLoaded(index)" @error="onMomentImageLoaded(index)"
    />
    <a href="/moments" v-if="shouldLimit">
      <div class="moments-more">
        <Icon icon="ep:more" />
      </div>
    </a>
  </div>

  <div v-if="visible" class="moment" tabindex="0"
    @keyup.left="prev"
    @keyup.right="next"
  >
    <div class="moment-op">
      <Icon icon="ep:close" @click="hideDetail" />
    </div>
    <div class="moment-img"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
      @pointercancel="onPointerCancel"
    >
      <div class="moment-img-btn-bar">
        <div v-if="currentIndex > 0" class="moment-img-btn" @click="prev">
          <Icon icon="ep:arrow-left" />
        </div>
      </div>
      <div class="moment-img-wrapper">
        <img v-if="current" :src="current.img" alt="">
      </div>
      <div class="moment-img-btn-bar">
        <div v-if="currentIndex < moments.length - 1" class="moment-img-btn" @click="next">
          <Icon icon="ep:arrow-right" />
        </div>
      </div>
    </div>
    <div v-if="current" class="moment-detail">
      <div v-if="current.time || current.location" class="moment-meta">
        <div v-if="current.time">
          <Icon icon="ep:calendar" />
          {{ current.time }}
        </div>
        <div v-if="current.location">
          <Icon icon="ep:location" />
          {{ current.location }}
        </div>
      </div>
      <div v-if="current.desc">
        {{ current.desc }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.moments {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;
  margin: 16px 0;
}

.moments > img {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  object-fit: cover;
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: opacity .2s ease;

  &.is-loading {
    opacity: .35;
  }
}

.moments-more {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--vp-c-text-3);
  font-size: 32px;
}

.moment {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .95);
  z-index: 100;
  display: flex;
  flex-direction: column;
  outline: none;
}

.moment-op {
  flex: 0 0 50px;
  height: 50px;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  font-size: 24px;

  svg {
    cursor: pointer;
  }
}

.moment-img {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  touch-action: pan-y;
}

.moment-img-btn-bar {
  width: 40px;
  margin: 0 16px;

  @media (max-width: 720px) {
    display: none;
  }
}

.moment-img-btn {
  padding: 10px;
  border-radius: 50%;
  color: var(--vp-c-gray-3);
  cursor: pointer;
  transition: all linear .35s;

  &:hover {
    color: var(--vp-c-white);
    background-color: var(--vp-c-black-mute);
  }

  > svg {
    width: 20px;
    height: 20px;
  }
}

.moment-img-wrapper {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  height: 100%;

  > img {
    max-width: 100%;
    max-height: 100%;
  }
}

.moment-detail {
  flex: 0 0 auto;
  color: var(--vp-c-white);
  padding: 16px;
  font-size: 14px;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
}

.moment-meta {
  display: flex;

  > div {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-right: 32px;
    }
  }
}
</style>
