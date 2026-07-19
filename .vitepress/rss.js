import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const hostname = 'https://khronosyn.com'
const srcDir = './src'

function toDate(value) {
  if (!value) {
    return null
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function tryExtractTitle(frontmatter, content, filename) {
  if (frontmatter.title) {
    return frontmatter.title
  }
  const firstLine = (content || '').trim().split('\n')[0]
  if (firstLine.startsWith('#')) {
    return firstLine.replace(/^#+\s+/, '')
  }
  return filename
}

function tryExtractDate(frontmatter, filename) {
  const fromFm = toDate(frontmatter.date)
  if (fromFm) {
    return fromFm
  }
  const matched = /^(\d{4}-\d{2}-\d{2})/.exec(filename)
  return matched ? toDate(matched[1]) : null
}

function collectMarkdownPosts(relativeDir) {
  const root = path.join(srcDir, relativeDir)
  const posts = []

  const walk = (absDir) => {
    for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
      const absPath = path.join(absDir, entry.name)
      if (entry.isDirectory()) {
        walk(absPath)
        continue
      }
      if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name === 'index.md') {
        continue
      }

      const filename = path.parse(entry.name).name
      const src = fs.readFileSync(absPath, 'utf8')
      const { data: frontmatter, content } = matter(src)
      const date = tryExtractDate(frontmatter, filename)
      if (!date) {
        continue
      }

      const relFromSrc = path.relative(srcDir, absPath).replace(/\\/g, '/')
      const urlPath = `/${relFromSrc.replace(/\.md$/, '')}`
      const description = (content || '')
        .replace(/^---[\s\S]*?---/, '')
        .replace(/:::[\s\S]*?:::/g, '')
        .replace(/^#.+$/m, '')
        .replace(/!\[[^\]]*]\([^)]*\)/g, '')
        .replace(/\[([^\]]*)]\([^)]*\)/g, '$1')
        .replace(/[#>*`_\-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 280)

      posts.push({
        title: tryExtractTitle(frontmatter, content, filename),
        url: urlPath,
        date,
        description,
      })
    }
  }

  if (fs.existsSync(root)) {
    walk(root)
  }
  return posts
}

/**
 * Generate RSS 2.0 into build outDir only (not src/public).
 * Available after `vitepress build` / `vitepress serve`, not in `dev`.
 */
export async function buildRss(siteConfig) {
  const posts = [
    ...collectMarkdownPosts('tech/posts'),
    ...collectMarkdownPosts('writing'),
  ].sort((a, b) => b.date - a.date)

  const year = new Date().getFullYear()
  const items = posts.map((post) => {
    const link = `${hostname}${post.url}`
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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

  const outFile = path.join(siteConfig.outDir, 'feed.xml')
  fs.writeFileSync(outFile, xml, 'utf8')
  console.log(`RSS feed written to ${outFile} (${posts.length} items)`)
}
