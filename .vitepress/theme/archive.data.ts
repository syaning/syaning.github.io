import { createContentLoader, type ContentData } from 'vitepress'
import {
  toYearSections,
  toIndexSection,
  type ArchiveData,
  type ArchiveSection,
} from './archive'

type ArchiveSourceConfig = {
  glob: string
  includeSrc?: boolean
  flat?: boolean
  transform: (raw: ContentData[]) => ArchiveSection[]
}

const archiveSources = {
  '/tech/posts/': {
    glob: 'tech/posts/**/*.md',
    transform: toYearSections,
  },
  '/writing/': {
    glob: 'writing/**/*.md',
    transform: toYearSections,
  },
  '/tech/leetcode/': {
    glob: 'tech/leetcode/*.md',
    includeSrc: true,
    flat: true,
    transform: (raw: ContentData[]) => toIndexSection(raw, 'LeetCode'),
  },
} satisfies Record<string, ArchiveSourceConfig>

type ArchiveSource = keyof typeof archiveSources

declare const data: ArchiveData
export { data }

const loaders = Object.fromEntries(
  Object.entries(archiveSources).map(([key, source]) => {
    const { glob, includeSrc, transform } = source as ArchiveSourceConfig
    return [key, createContentLoader(glob, { includeSrc, transform })]
  }),
) as Record<ArchiveSource, ReturnType<typeof createContentLoader>>

export default {
  watch: Object.values(loaders).map((loader) => loader.watch).flat(),
  async load(): Promise<ArchiveData> {
    const entries = await Promise.all(
      (Object.entries(loaders) as [ArchiveSource, (typeof loaders)[ArchiveSource]][]).map(
        async ([path, loader]) => {
          const { flat } = archiveSources[path] as ArchiveSourceConfig
          const sections = (await loader.load()) as ArchiveSection[]
          return [path, { sections, flat }] as const
        },
      ),
    )
    return Object.fromEntries(entries) as ArchiveData
  },
}
