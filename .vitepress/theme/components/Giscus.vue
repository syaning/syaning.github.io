<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { theme, page, isDark } = useData()
const route = useRoute()
const container = ref(null)

const giscus = computed(() => theme.value.giscus)

const pathPatterns = computed(() => {
  const patterns = giscus.value?.paths
  if (!patterns?.length) {
    return []
  }

  return patterns.flatMap((pattern) => {
    try {
      return [new RegExp(pattern)]
    } catch {
      console.warn(`[Giscus] invalid path pattern: ${pattern}`)
      return []
    }
  })
})

const enabled = computed(() => {
  if (!giscus.value?.enabled) {
    return false
  }
  if (page.value.frontmatter.comments === false) {
    return false
  }
  if (page.value.frontmatter.comments === true) {
    return true
  }

  const path = route.path.replace(/\.html$/, '')
  return pathPatterns.value.some((pattern) => pattern.test(path))
})

function resolveTheme(config) {
  if (config.themeLight && config.themeDark) {
    return isDark.value ? config.themeDark : config.themeLight
  }
  return config.theme ?? 'light'
}

function updateTheme() {
  const iframe = container.value?.querySelector('iframe.giscus-frame')
  if (!iframe?.contentWindow) {
    return false
  }

  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: resolveTheme(giscus.value),
        },
      },
    },
    'https://giscus.app',
  )
  return true
}

async function loadGiscus() {
  if (!enabled.value) {
    return
  }

  await nextTick()

  if (!container.value) {
    return
  }

  const config = giscus.value
  container.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', config.repo)
  script.setAttribute('data-repo-id', config.repoId)
  script.setAttribute('data-category', config.category)
  script.setAttribute('data-category-id', config.categoryId)
  script.setAttribute('data-mapping', config.mapping ?? 'pathname')
  script.setAttribute('data-strict', config.strict ?? '0')
  script.setAttribute('data-reactions-enabled', config.reactionsEnabled ?? '1')
  script.setAttribute('data-emit-metadata', config.emitMetadata ?? '0')
  script.setAttribute('data-input-position', config.inputPosition ?? 'bottom')
  script.setAttribute('data-theme', resolveTheme(config))
  script.setAttribute('data-lang', config.lang ?? 'en')
  container.value.appendChild(script)
}

onMounted(loadGiscus)
watch([enabled, () => route.path], loadGiscus, { flush: 'post' })
watch(isDark, () => {
  if (!updateTheme()) {
    loadGiscus()
  }
})
</script>

<template>
  <div v-if="enabled" ref="container" class="giscus-wrapper" />
</template>

<style scoped>
.giscus-wrapper {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
