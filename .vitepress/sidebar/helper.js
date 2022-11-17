import fs from 'node:fs'
import path from 'node:path'
import * as matter from 'gray-matter'

export function formatDate(date) {
  const y = date.getFullYear()
  const m = `0${date.getMonth() + 1}`.slice(-2)
  const d = `0${date.getDate()}`.slice(-2)
  return `${y}-${m}-${d}`
}

function tryExtractTitle(content) {
  const firstLine = (content || '').trim().split('\n')[0]
  if (firstLine.startsWith('#')) {
    return firstLine.replace(/^#+\s+/, '')
  }
  return ''
}

function tryExtractFrontmatter(content) {
  return matter.default(content).data
}

export const filters = {
  allMdButIndex: f => f.endsWith('.md') && f !== 'index.md'
}

export function loadItems(arr) {
  return arr.map(f => {
    const content = fs.readFileSync(path.join('./src', `${f}.md`), 'utf8')
    const text = tryExtractTitle(content)
    return { text, link: f }
  })
}

export function loadDirItems(dir, arr) {
  return loadItems(arr.map(f => path.join(dir, f)))
}

export function loadAllFiles(dir, filter) {
  const realDir = path.join('./src', dir)
  return fs.readdirSync(realDir)
    .filter(f => filter ? filter(f) : true)
    .map(f => {
      const link = path.join(dir, path.parse(f).name)
      const content = fs.readFileSync(path.join(realDir, f), 'utf8')
      const title = tryExtractTitle(content)
      const frontmatter = tryExtractFrontmatter(content)
      return { link, title, frontmatter }
    })
}
