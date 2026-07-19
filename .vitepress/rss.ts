import fs from 'node:fs'
import path from 'node:path'
import type { ContentData } from 'vitepress'

export interface BuildRssOptions {
  /** Build output directory (e.g. siteConfig.outDir) */
  outDir: string
  /** Site origin, e.g. https://khronosyn.com or http://localhost:4173 */
  hostname: string
  /**
   * Max number of posts in the feed.
   * -1 = unlimited. Default: 10.
   */
  limit?: number
}

function toDate(value: unknown): Date | null {
  if (!value) {
    return null
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  const date = new Date(value as string | number)
  return Number.isNaN(date.getTime()) ? null : date
}

function escapeXml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function isPostPage(url: string): boolean {
  if (!url || url.endsWith('/')) {
    return false
  }
  return !/\/(posts|writing)\/?$/.test(url.replace(/\.html$/, ''))
}

function stripHtml(html: string | undefined): string {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function cdata(html: string): string {
  return String(html || '').replace(/]]>/g, ']]]]><![CDATA[>')
}

/** Resolve built HTML file path for a content loader url. */
function resolveBuiltHtmlPath(outDir: string, url: string): string | null {
  const clean = url.replace(/^\//, '').replace(/\.html$/, '').replace(/\/$/, '')
  const filePath = path.join(outDir, `${clean}.html`)
  return fs.existsSync(filePath) ? filePath : null
}

/** Find the closing </div> that matches an open div starting after openEnd. */
function findMatchingCloseDiv(html: string, openEnd: number): number {
  let depth = 1
  const re = /<\/?div\b[^>]*>/gi
  re.lastIndex = openEnd
  let match: RegExpExecArray | null
  while ((match = re.exec(html))) {
    if (match[0].startsWith('</')) {
      depth -= 1
      if (depth === 0) {
        return match.index
      }
    } else if (!match[0].endsWith('/>')) {
      depth += 1
    }
  }
  return -1
}

/**
 * Extract article HTML from a VitePress-built page.
 * Uses the largest .vp-doc block inside <main> (skips the short title/meta block).
 */
function extractBuiltDocHtml(pageHtml: string): string {
  const mainStart = pageHtml.indexOf('<main class="main"')
  if (mainStart < 0) {
    return ''
  }
  const contentStart = pageHtml.indexOf('>', mainStart) + 1
  const mainEnd = pageHtml.indexOf('</main>', contentStart)
  if (mainEnd < 0) {
    return ''
  }
  const main = pageHtml.slice(contentStart, mainEnd)

  const blocks: string[] = []
  const openRe = /<div class="[^"]*\bvp-doc\b[^"]*"[^>]*>/g
  let openMatch: RegExpExecArray | null
  while ((openMatch = openRe.exec(main))) {
    const openEnd = openMatch.index + openMatch[0].length
    const closeAt = findMatchingCloseDiv(main, openEnd)
    if (closeAt > openEnd) {
      blocks.push(main.slice(openEnd, closeAt).trim())
    }
  }

  if (blocks.length === 0) {
    return main.trim()
  }
  // Prefer the longest block (article body over title/meta shell)
  return blocks.reduce((best, cur) => (cur.length > best.length ? cur : best))
}

/** Prefix root-relative /assets/... URLs with hostname for feed readers. */
function absolutizeBuiltHtml(html: string, hostname: string): string {
  return html.replace(
    /\b(href|src)="(\/[^"]*)"/g,
    (_match, attr: string, value: string) => `${attr}="${hostname}${value}"`,
  )
}

function loadBuiltContent(outDir: string, url: string, hostname: string): string {
  const filePath = resolveBuiltHtmlPath(outDir, url)
  if (!filePath) {
    return ''
  }
  const pageHtml = fs.readFileSync(filePath, 'utf8')
  const docHtml = extractBuiltDocHtml(pageHtml)
  return absolutizeBuiltHtml(docHtml, hostname)
}

/**
 * Generate RSS 2.0 with full HTML body into build outDir.
 * Content is taken from built pages so image URLs match Vite hashed /assets/* paths.
 * Available after `vitepress build` / `vitepress serve`, not in `dev`.
 */
export async function buildRss(options: BuildRssOptions): Promise<void> {
  const { outDir, hostname, limit = 10 } = options
  const { createContentLoader } = await import('vitepress')

  const [techPosts, writingPosts] = await Promise.all([
    createContentLoader('tech/posts/**/*.md', {
      excerpt: true,
    }).load(),
    createContentLoader('writing/**/*.md', {
      excerpt: true,
    }).load(),
  ])

  let posts: ContentData[] = [...techPosts, ...writingPosts]
    .filter(({ url, frontmatter }) => isPostPage(url) && !!toDate(frontmatter.date))
    .sort((a, b) => {
      return (toDate(b.frontmatter.date)!.getTime()) - (toDate(a.frontmatter.date)!.getTime())
    })

  if (limit >= 0) {
    posts = posts.slice(0, limit)
  }

  const year = new Date().getFullYear()
  const items = posts.map(({ url, frontmatter, excerpt }) => {
    const link = `${hostname}${url}`
    const title = (frontmatter.title as string | undefined) || url
    const content = loadBuiltContent(outDir, url, hostname)
    const description = stripHtml(excerpt).slice(0, 280)
      || stripHtml(content).slice(0, 280)
    const pubDate = toDate(frontmatter.date)!.toUTCString()

    return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
      <content:encoded><![CDATA[${cdata(content)}]]></content:encoded>
    </item>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>khronosyn</title>
    <link>${hostname}</link>
    <description>Alex Sun's homepage, blog and notes.</description>
    <language>en</language>
    <copyright>Copyright © 2013–${year} Alex Sun</copyright>
    <atom:link href="${hostname}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`

  const outFile = path.join(outDir, 'feed.xml')
  fs.writeFileSync(outFile, xml, 'utf8')
  console.log(`RSS feed written to ${outFile} (${posts.length} items)`)
}
