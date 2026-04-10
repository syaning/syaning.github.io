import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const srcDir = './src'

type Frontmatter = Record<string, any>

interface PostMeta {
  filename: string
  link: string
  title: string
  date: Date | null
  frontmatter: Frontmatter
}

type FileFilter = (filename: string) => boolean
type PostSorter = (a: PostMeta, b: PostMeta) => number
type PostMapper = (post: PostMeta) => Record<string, any>
type PostCluster = (posts: PostMeta[], mapper: PostMapper) => any[]
type DirSorter = (a: string, b: string) => number
type DirConfig = string | { dir: string, title?: string }
type SidebarSection = { text: string, items: any[] }

interface LoadFileOptions {
  title?: string
  filter?: FileFilter
  sorter?: PostSorter
  cluster?: PostCluster
  mapper?: PostMapper
  dirs?: DirConfig[]
  recursive?: boolean
  dirSorter?: DirSorter
}

/**
 * Try extract title with the following order:
 * 1. front matter
 * 2. content first line header
 * 3. file name
 */
function tryExtractTitle(params: { frontmatter: Frontmatter, content: string, filename: string }) {
  const { frontmatter, content, filename } = params
  if (frontmatter.title) {
    return frontmatter.title
  }

  const firstLine = (content || '').trim().split('\n')[0]
  if (firstLine.startsWith('#')) {
    return firstLine.replace(/^#+\s+/, '')
  }

  return filename || ''
}

/**
 * Try extract date with the folloing order:
 * 1. front matter
 * 2. file name with YYYY-MM-DD prefix
 */
function tryExtractDate(params: { frontmatter: Frontmatter, filename: string }) {
  const { frontmatter, filename } = params
  if (frontmatter.date) {
    return new Date(frontmatter.date)
  }

  const dateRe = /^\d{4}-\d{2}-\d{2}/
  const monthRe = /^\d{4}-\d{2}/

  let result = dateRe.exec(filename)
  if (result) {
    return new Date(result[0])
  }
  result = monthRe.exec(filename)
  if (result) {
    return new Date(`${result[0]}-01`)
  }

  return null
}

function parseLeadingNumber(text: string) {
  const matched = /^(\d+)/.exec(text)
  if (!matched) {
    return null
  }

  return Number.parseInt(matched[1], 10)
}

function safeTimestamp(date: Date | null) {
  if (!(date instanceof Date)) {
    return null
  }
  const ts = date.getTime()
  return Number.isNaN(ts) ? null : ts
}

function compareNameAutoDesc(a: string, b: string) {
  const aNum = parseLeadingNumber(a)
  const bNum = parseLeadingNumber(b)
  if (aNum !== null && bNum !== null && aNum !== bNum) {
    return bNum - aNum
  }
  return b.localeCompare(a)
}

export const filters = {
  allMdButIndex: (f: string) => f.endsWith('.md') && f !== 'index.md'
}

export const sorters = {
  byFilenameIndex: (a: PostMeta, b: PostMeta) => parseInt(a.filename, 10) - parseInt(b.filename, 10),
  byFilenameIndexDesc: (a: PostMeta, b: PostMeta) => parseInt(b.filename, 10) - parseInt(a.filename, 10),
  byDateDesc: (a: PostMeta, b: PostMeta) => (safeTimestamp(b.date) || 0) - (safeTimestamp(a.date) || 0),
}

export const dirSorters = {
  byNameAutoDesc: compareNameAutoDesc,
}

export const clusters = {
  byYear: (posts: PostMeta[], mapper: PostMapper) => {
    const groups = posts.reduce((ret: Record<string, PostMeta[]>, post) => {
      if (!post.date) {
        return ret
      }
      const year = String(post.date.getFullYear())
      ret[year] = ret[year] || []
      ret[year].push(post)
      return ret
    }, {})
    return Object.keys(groups)
      .sort((a, b) => Number(b) - Number(a))
      .map(key => ({
        text: key,
        collapsed: false,
        items: groups[key].map(mapper)
      }))
  }
}

export const mappers = {
  default: (post: PostMeta) => {
    const tags = (post.frontmatter.tags || '')
      .trim()
      .split(/\s+/)
      .filter((tag) => tag !== '')

    return {
      text: post.title,
      link: post.link,
      tags,
    }
  }
}

export function loadFlatFiles(dir: string, options: LoadFileOptions = {}) {
  const {
    title,
    filter = filters.allMdButIndex,
    sorter = sorters.byDateDesc,
    cluster,
    mapper = mappers.default
  } = options

  const realDir = path.join(srcDir, dir)
  const posts = fs.readdirSync(realDir)
    .filter((f) => filter ? filter(f) : true)
    .map((f) => {
      const filename = path.parse(f).name
      const link = path.join(dir, filename)
      const src = fs.readFileSync(path.join(realDir, f), 'utf8')
      const { data: frontmatter, content } = matter(src)
      const params = { frontmatter, content, filename }
      const title = tryExtractTitle(params)
      const date = tryExtractDate(params)

      const post: PostMeta = {
        filename,
        link,
        title,
        date,
        frontmatter,
      }
      return post
    })

  if (sorter) {
    posts.sort(sorter)
  }

  if (cluster) {
    return cluster(posts, mapper)
  }

  return [{
    text: title || dir,
    items: posts.map(mapper),
  }]
}

function discoverMarkdownDirs(
  dir: string,
  options: {
    filter: FileFilter
    recursive: boolean
    dirSorter: DirSorter
  }
) {
  const { filter, recursive, dirSorter } = options
  const rootDir = path.join(srcDir, dir)
  const results: string[] = []

  const walk = (absDir: string, relativeDir: string) => {
    const entries = fs.readdirSync(absDir, { withFileTypes: true })

    const hasMarkdown = entries.some((entry) => {
      return entry.isFile() && filter(entry.name)
    })
    if (hasMarkdown) {
      results.push(relativeDir)
    }

    const childDirs = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort(dirSorter)

    childDirs.forEach((name) => {
      const absChildDir = path.join(absDir, name)
      const relativeChildDir = relativeDir === '' ? name : path.join(relativeDir, name)

      if (recursive) {
        walk(absChildDir, relativeChildDir)
        return
      }

      const childEntries = fs.readdirSync(absChildDir, { withFileTypes: true })
      const childHasMarkdown = childEntries.some((entry) => {
        return entry.isFile() && filter(entry.name)
      })
      if (childHasMarkdown) {
        results.push(relativeChildDir)
      }
    })
  }

  walk(rootDir, '')
  return results
}

function loadHierarchyFiles(dir: string, subdirs: DirConfig[], options: LoadFileOptions = {}) {
  return subdirs.reduce<SidebarSection[]>((result, item) => {
    const subdir = typeof item === 'string' ? item : item.dir
    const title = typeof item === 'string'
      ? (subdir ? path.basename(subdir) : options.title)
      : item.title
    const newOptions = { ...options, title }
    const targetDir = subdir ? path.join(dir, subdir) : dir
    return [
      ...result,
      ...loadFlatFiles(targetDir, newOptions)
    ]
  }, [])
}

export function genSidebar(conf: Record<string, LoadFileOptions>) {
  return Object.keys(conf).reduce((ret, dir) => {
    const {
      dirs = [],
      recursive = true,
      dirSorter = dirSorters.byNameAutoDesc,
      ...options
    } = conf[dir]

    const autoDirs = dirs.length > 0
      ? dirs
      : discoverMarkdownDirs(dir, {
        filter: options.filter || filters.allMdButIndex,
        recursive,
        dirSorter,
      })

    ret[dir] = autoDirs.length > 0
      ? loadHierarchyFiles(dir, autoDirs, options)
      : loadFlatFiles(dir, options)
    return ret
  }, {})
}
