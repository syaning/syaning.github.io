<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'

const eagerImageCount = 4
const expandedIndex = ref(-1)
const activeYear = ref('')
const revealed = shallowRef(new Set())
const rootEl = ref(null)
const prefetched = new Set()
let yearObserver = null

const props = defineProps({
  moments: {
    type: Array,
    default: () => [],
  },
  /** Lazy full-image resolver: (file) => Promise<string> */
  resolveImage: {
    type: Function,
    default: null,
  },
})

const yearAnchorId = (year) => `moment-year-${year}`

const items = computed(() => {
  const list = Array.isArray(props.moments) ? props.moments : []
  return list.map((moment, index) => {
    const year = String(moment.time || '').slice(0, 4) || ''
    const prevYear = index > 0 ? String(list[index - 1].time || '').slice(0, 4) : ''
    const meta = [moment.time, moment.location].filter(Boolean).join(' · ')
    return {
      moment,
      index,
      year,
      isYearStart: index === 0 || year !== prevYear,
      meta,
      alt: moment.desc || meta,
    }
  })
})

const years = computed(() => {
  return items.value.filter((item) => item.isYearStart && item.year).map((item) => item.year)
})

const markThumbReady = (event) => {
  event.currentTarget.classList.add('is-ready')
}

const prefetchFull = (src) => {
  if (!src || prefetched.has(src)) {
    return
  }
  prefetched.add(src)
  const img = new Image()
  img.decoding = 'async'
  img.src = src
}

const resolveFull = async (moment) => {
  if (!moment) {
    return ''
  }
  if (moment.img) {
    return moment.img
  }
  if (!props.resolveImage || !moment.file) {
    return ''
  }
  return props.resolveImage(moment.file)
}

/** Start transform early (hover / focus) so click rarely waits. */
const warmFull = (moment) => {
  if (!moment?.file || moment.img) {
    return
  }
  resolveFull(moment).then(prefetchFull)
}

const reveal = (index) => {
  if (revealed.value.has(index)) {
    return
  }
  const next = new Set(revealed.value)
  next.add(index)
  revealed.value = next
}

const toggle = (index) => {
  if (expandedIndex.value === index) {
    expandedIndex.value = -1
    return
  }

  // Expand immediately; full image swaps in when ready.
  expandedIndex.value = index
  reveal(index)

  const current = items.value[index]?.moment
  resolveFull(current).then((src) => {
    prefetchFull(src)
  })

  const next = items.value[index + 1]?.moment
  if (next) {
    resolveFull(next).then(prefetchFull)
  }
}

const jumpToYear = async (year) => {
  activeYear.value = year
  await nextTick()
  const el = rootEl.value?.querySelector(`#${yearAnchorId(year)}`)
  if (!el) {
    return
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${yearAnchorId(year)}`)
}

const setupYearObserver = async () => {
  yearObserver?.disconnect()
  yearObserver = null

  if (typeof IntersectionObserver === 'undefined' || years.value.length === 0) {
    return
  }

  await nextTick()

  const nodes = rootEl.value?.querySelectorAll('.moment[data-year]')
  if (!nodes?.length) {
    return
  }

  const ratios = new Map()
  yearObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const year = entry.target.getAttribute('data-year')
        if (!year) {
          continue
        }
        ratios.set(year, entry.isIntersecting ? entry.intersectionRatio : 0)
      }

      let bestYear = activeYear.value || years.value[0]
      let bestRatio = -1
      for (const year of years.value) {
        const ratio = ratios.get(year) || 0
        if (ratio > bestRatio) {
          bestRatio = ratio
          bestYear = year
        }
      }
      if (bestRatio > 0) {
        activeYear.value = bestYear
      }
    },
    {
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    },
  )

  nodes.forEach((node) => yearObserver.observe(node))
}

watch(
  items,
  () => {
    if (!activeYear.value) {
      activeYear.value = years.value[0] || ''
    }
    setupYearObserver()
  },
  { flush: 'post' },
)

onMounted(() => {
  if (!activeYear.value) {
    activeYear.value = years.value[0] || ''
  }
  setupYearObserver()

  const match = location.hash.match(/^#moment-year-(\d{4})$/)
  if (match) {
    jumpToYear(match[1])
  }
})

onBeforeUnmount(() => {
  yearObserver?.disconnect()
  yearObserver = null
})
</script>

<template>
  <div ref="rootEl" class="moments">
    <div class="moments-main">
      <div class="moments-timeline">
        <article
          v-for="item in items"
          :id="item.isYearStart ? yearAnchorId(item.year) : undefined"
          :key="item.moment.file || item.index"
          class="moment"
          :class="{ 'is-expanded': expandedIndex === item.index }"
          :data-year="item.year || undefined"
        >
          <div class="moment-rail" aria-hidden="true">
            <span class="moment-dot" />
          </div>
          <div class="moment-body">
            <div class="moment-head">
              <span class="moment-date">{{ item.moment.time }}</span>
              <span v-if="item.moment.location" class="moment-location">{{ item.moment.location }}</span>
            </div>

            <button
              type="button"
              class="moment-media"
              :class="{
                'is-expanded': expandedIndex === item.index,
                'is-loading': expandedIndex === item.index && !item.moment.img,
              }"
              :aria-expanded="expandedIndex === item.index"
              :aria-busy="expandedIndex === item.index && !item.moment.img"
              :aria-label="expandedIndex === item.index ? 'Collapse photo' : 'Expand photo'"
              @pointerenter="warmFull(item.moment)"
              @focus="warmFull(item.moment)"
              @click="toggle(item.index)"
            >
              <img
                v-if="item.moment.thumb"
                class="moment-thumb"
                :src="item.moment.thumb"
                :alt="item.alt"
                width="200"
                height="200"
                :loading="item.index < eagerImageCount ? 'eager' : 'lazy'"
                :fetchpriority="item.index < 2 ? 'high' : 'auto'"
                decoding="async"
                @load="markThumbReady"
                @error="markThumbReady"
              />
              <span
                v-else
                class="moment-thumb"
                aria-hidden="true"
              />
              <img
                v-if="revealed.has(item.index) && item.moment.img"
                class="moment-full"
                :src="item.moment.img"
                :alt="item.alt"
                decoding="async"
              />
            </button>

            <p v-if="item.moment.desc" class="moment-desc">{{ item.moment.desc }}</p>
          </div>
        </article>
      </div>
    </div>

    <nav
      v-if="years.length > 1"
      class="moments-toc"
      aria-label="Years"
    >
      <button
        v-for="year in years"
        :key="year"
        type="button"
        class="moments-toc-link"
        :class="{ 'is-active': activeYear === year }"
        @click="jumpToYear(year)"
      >
        {{ year }}
      </button>
    </nav>
  </div>
</template>

<style scoped>
.moments {
  --moments-toc-width: 3.5rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--moments-toc-width);
  gap: 28px;
  margin: 16px 0 40px;
  align-items: start;
}

.moments-main {
  min-width: 0;
}

.moments-toc {
  position: sticky;
  top: calc(var(--vp-nav-height, 56px) + 24px);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding-top: 2px;
}

.moments-toc-link {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--vp-c-text-3);
  font: inherit;
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  text-align: right;
  cursor: pointer;
  transition: color 0.15s ease;
}

.moments-toc-link:hover {
  color: var(--vp-c-text-2);
}

.moments-toc-link.is-active {
  color: var(--vp-c-brand-1);
}

.moments-timeline {
  position: relative;
}

.moment {
  --moment-meta-size: 0.85rem;
  --moment-meta-lh: 1.4;
  display: grid;
  grid-template-columns: 12px minmax(0, 1fr);
  gap: 12px;
  padding-bottom: 22px;
  scroll-margin-top: calc(var(--vp-nav-height, 56px) + 16px);
}

.moment:last-child {
  padding-bottom: 0;
}

.moment-rail {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.moment-rail::before {
  content: '';
  position: absolute;
  top: calc(var(--moment-meta-size) * var(--moment-meta-lh) / 2);
  bottom: -22px;
  left: 50%;
  width: 1px;
  background: color-mix(in srgb, var(--vp-c-divider) 85%, var(--vp-c-text-3));
  transform: translateX(-50%);
}

.moment:last-child .moment-rail::before {
  display: none;
}

.moment-dot {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: 7px;
  height: 7px;
  margin-top: calc((var(--moment-meta-size) * var(--moment-meta-lh) - 7px) / 2);
  border: 1px solid color-mix(in srgb, var(--vp-c-text-3) 70%, transparent);
  border-radius: 50%;
  /* Opaque page bg masks the rail so the line stops at the ring. */
  background: var(--vp-c-bg);
}

.moment.is-expanded .moment-dot {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.moment-body {
  min-width: 0;
}

.moment-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem 0.65rem;
  margin: 0 0 8px;
  min-height: calc(var(--moment-meta-size) * var(--moment-meta-lh));
}

.moment-date {
  color: var(--vp-c-text-3);
  font-size: var(--moment-meta-size);
  line-height: var(--moment-meta-lh);
  font-variant-numeric: tabular-nums;
}

.moment-location {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  line-height: var(--moment-meta-lh);
  opacity: 0.75;
}

.moment-media {
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.moment-thumb,
.moment-full {
  display: block;
  border-radius: 2px;
  background-color: var(--vp-c-bg-soft);
}

.moment-thumb {
  width: 200px;
  height: 200px;
  object-fit: cover;
  opacity: 0.35;
  transition: opacity 0.2s ease;
}

.moment-thumb.is-ready {
  opacity: 1;
}

.moment-media.is-expanded:not(.is-loading) .moment-thumb {
  display: none;
}

.moment-media.is-loading .moment-thumb {
  opacity: 0.55;
}

.moment-full {
  width: 100%;
  height: auto;
  max-height: min(70vh, 720px);
  object-fit: contain;
}

.moment-media:not(.is-expanded) .moment-full {
  display: none;
}

.moment-desc {
  margin: 8px 0 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

@media (max-width: 960px) {
  .moments {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .moments-toc {
    order: -1;
    position: sticky;
    top: var(--vp-nav-height, 56px);
    z-index: 5;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.85rem;
    margin: 0 -12px 8px;
    padding: 10px 12px;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    background: color-mix(in srgb, var(--vp-c-bg) 92%, transparent);
    backdrop-filter: blur(8px);
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .moments-toc::-webkit-scrollbar {
    display: none;
  }

  .moments-toc-link {
    flex: 0 0 auto;
    text-align: left;
  }
}

@media (max-width: 640px) {
  .moment-thumb {
    width: 160px;
    height: 160px;
  }
}
</style>
