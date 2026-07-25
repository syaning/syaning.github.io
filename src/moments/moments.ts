import { shallowRef } from 'vue'
import { data as momentsData } from './moments.data.js'

const thumbLoaders = import.meta.glob('./img/*.{webp,jpeg,jpg}', {
  import: 'default',
  query: {
    w: '480',
    h: '480',
    fit: 'cover',
    format: 'webp',
  },
})

const imageLoaders = import.meta.glob('./img/*.{webp,jpeg,jpg}', {
  import: 'default',
  query: {
    w: '1200',
    format: 'webp',
  },
})

export type MomentItem = {
  file: string
  time: string
  location: string
  desc: string
  thumb: string
  img: string
}

const imageCache = new Map<string, Promise<string>>()

function keyFor(file: string) {
  return `./img/${file}`
}

function patchMoment(file: string, patch: Partial<MomentItem>) {
  const list = moments.value
  const index = list.findIndex((item) => item.file === file)
  if (index < 0) {
    return
  }
  const current = list[index]
  if (
    (patch.thumb === undefined || patch.thumb === current.thumb)
    && (patch.img === undefined || patch.img === current.img)
  ) {
    return
  }
  moments.value = list.map((item, i) =>
    i === index ? { ...item, ...patch } : item,
  )
}

/** Resolve full-size image URL on demand and patch `moments` (cached). */
export function ensureMomentImage(file: string) {
  const key = keyFor(file)
  let pending = imageCache.get(key)
  if (!pending) {
    const loader = imageLoaders[key]
    if (!loader) {
      return Promise.resolve('')
    }
    pending = loader().then((url) => url as string)
    imageCache.set(key, pending)
  }

  return pending.then((url) => {
    if (url) {
      patchMoment(file, { img: url })
    }
    return url
  })
}

/** Warm full-size transforms in the background (one at a time). */
export function prefetchMomentImages(files: string[]) {
  let chain = Promise.resolve()
  for (const file of files) {
    if (!file || imageCache.has(keyFor(file))) {
      continue
    }
    chain = chain.then(() => ensureMomentImage(file)).then(() => undefined)
  }
  return chain
}

export const moments = shallowRef<MomentItem[]>(
  momentsData
    .filter((item) => {
      const key = keyFor(item.file)
      return Boolean(thumbLoaders[key] && imageLoaders[key])
    })
    .map((item) => ({
      ...item,
      thumb: '',
      img: '',
    })),
)

function scheduleIdle(task: () => void) {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(() => task(), { timeout: 1500 })
    return
  }
  setTimeout(task, 200)
}

/** Progressive thumb hydration — must not block route module evaluation. */
async function hydrateThumbs() {
  const files = moments.value.map((item) => item.file)
  const batchSize = 4

  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize)
    const thumbs = await Promise.all(
      batch.map(async (file) => {
        const loader = thumbLoaders[keyFor(file)]
        return loader ? ((await loader()) as string) : ''
      }),
    )

    moments.value = moments.value.map((item) => {
      const offset = batch.indexOf(item.file)
      if (offset === -1) {
        return item
      }
      return { ...item, thumb: thumbs[offset] }
    })
  }

  // After thumbs are ready, quietly warm full-size transforms.
  scheduleIdle(() => {
    prefetchMomentImages(files)
  })
}

hydrateThumbs()
