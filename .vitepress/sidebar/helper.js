import fs from 'node:fs'
import path from 'node:path'

function extractTitle(f) {
  return fs.readFileSync(f, 'utf8')
    .split('\n')[0]
    .replace(/^#\s+/, '')
}

/**
 * Load all items from directory.
 *
 * @param dir directory from `src` child. e.g. /learn/leetcode
 */
export function loadAllItems(dir) {
  const realDir = path.join('./src', dir)
  return fs.readdirSync(realDir)
    .filter(f => f.endsWith('.md'))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(f => {
      const text = extractTitle(path.join(realDir, f))
      const link = path.join(dir, path.basename(f, '.md'))
      return { text, link }
    })
}

export function loadItems(arr) {
  return arr.map(f => {
    const text = extractTitle(path.join('./src', `${f}.md`))
    return { text, link: f }
  })
}

export function formatDate(date) {
  const y = date.getFullYear()
  const m = `0${date.getMonth() + 1}`.slice(-2)
  const d = `0${date.getDate()}`.slice(-2)
  return `${y}-${m}-${d}`
}
