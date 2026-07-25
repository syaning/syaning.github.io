import type { ContentData } from 'vitepress'

export interface ArchiveItem {
  text: string
  link: string
  tags: string[]
}

export interface ArchiveSection {
  text: string
  items: ArchiveItem[]
  collapsed?: boolean
}

/** Map archive sections to VitePress DefaultTheme sidebar items. */
export function archiveToSidebar(
  sections: ArchiveSection[],
  options: { flat?: boolean } = {},
) {
  if (options.flat) {
    return sections.flatMap((section) =>
      section.items.map(({ text, link }) => ({ text, link })),
    )
  }
  return sections.map(({ text, items, collapsed }) => ({
    text,
    collapsed: !!collapsed,
    items: items.map(({ text, link }) => ({ text, link })),
  }))
}

export function normalizeUrl(url: string) {
  return url.replace(/\.html$/, '')
}

export function isSectionIndex(url: string) {
  const path = normalizeUrl(url)
  return path.endsWith('/') || /\/index$/.test(path)
}

export function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.map(String).filter(Boolean)
  }
  if (typeof tags === 'string') {
    return tags.trim().split(/\s+/).filter(Boolean)
  }
  return []
}

export function extractTitle(
  frontmatter: Record<string, unknown>,
  src: string | undefined,
  fallback: string,
) {
  if (typeof frontmatter.title === 'string' && frontmatter.title) {
    return frontmatter.title
  }
  const heading = /^#\s+(.+)$/m.exec(src || '')
  if (heading) {
    return heading[1].trim()
  }
  return fallback
}

function toTime(value: unknown) {
  if (!value) {
    return 0
  }
  const date = value instanceof Date ? value : new Date(value as string | number)
  const time = date.getTime()
  return Number.isNaN(time) ? 0 : time
}

function yearFrom(frontmatter: Record<string, unknown>, url: string) {
  const time = toTime(frontmatter.date)
  if (time) {
    return String(new Date(time).getFullYear())
  }
  const matched = /\/(\d{4})\//.exec(url)
  return matched ? matched[1] : 'Other'
}

/** Group dated posts into year sections (newest year first). */
export function toYearSections(raw: ContentData[]): ArchiveSection[] {
  type Row = ArchiveItem & { time: number, year: string }

  const rows: Row[] = raw
    .filter(({ url }) => !isSectionIndex(url))
    .map(({ url, frontmatter, src }) => {
      const link = normalizeUrl(url)
      return {
        text: extractTitle(frontmatter, src, link),
        link,
        tags: parseTags(frontmatter.tags),
        time: toTime(frontmatter.date),
        year: yearFrom(frontmatter, url),
      }
    })
    .sort((a, b) => b.time - a.time)

  const years = [...new Set(rows.map((row) => row.year))]
  return years.map((year, index) => ({
    text: year,
    collapsed: index > 0,
    items: rows
      .filter((row) => row.year === year)
      .map(({ text, link, tags }) => ({ text, link, tags })),
  }))
}

/** Flat list sorted by leading number in the filename. */
export function toIndexSection(
  raw: ContentData[],
  title = 'Index',
): ArchiveSection[] {
  const items = raw
    .filter(({ url }) => !isSectionIndex(url))
    .map(({ url, frontmatter, src }) => {
      const link = normalizeUrl(url)
      const filename = link.split('/').pop() || ''
      return {
        text: extractTitle(frontmatter, src, filename),
        link,
        tags: parseTags(frontmatter.tags),
        index: Number.parseInt(filename, 10) || 0,
      }
    })
    .sort((a, b) => a.index - b.index)
    .map(({ text, link, tags }) => ({ text, link, tags }))

  return [{ text: title, items }]
}

export type ArchiveEntry = {
  sections: ArchiveSection[]
  /** Flatten sidebar items (no section groups). */
  flat?: boolean
}

export type ArchiveData = Record<string, ArchiveEntry>

/** Build VitePress multi-sidebar map from archive data. */
export function toArchiveSidebars(archiveData: ArchiveData) {
  return Object.fromEntries(
    Object.entries(archiveData).map(([path, { sections, flat }]) => [
      path,
      archiveToSidebar(sections, { flat }),
    ]),
  )
}
