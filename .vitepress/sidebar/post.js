import fs from 'node:fs'
import path from 'node:path'
import * as matter from 'gray-matter'
import { formatDate } from './helper'

export function loadPosts(dir) {
  const realDir = path.join('./src', dir)
  const posts = fs.readdirSync(realDir)
    .filter( f => f.endsWith('.md'))
    .map(f => {
      const content = fs.readFileSync(path.join(realDir, f), 'utf8')
      const fm = matter.default(content).data
      const date = new Date(fm.date)
      const text = `${formatDate(date)} ${fm.title}`
      return { date, text, link: `${dir}/${f}` }
    })
    .sort((a, b) => b.date - a.date)

  const groups = posts.reduce((ret, post) => {
    const { date, text, link } = post
    const year = date.getFullYear()
    ret[year] = ret[year] || []
    ret[year].push({ text, link })
    return ret
  }, {})

  return Object.keys(groups)
    .sort((a, b) => b - a)
    .map(key => {
      return {
        text: key,
        items: groups[key]
      }
    })
}

export default {
  '/my/post': loadPosts('/my/post')
}
