import { loadAllFiles, formatDate, filters } from './helper'

export function loadPosts(dir) {
  const posts = loadAllFiles(dir, filters.allMdButIndex)
    .map(meta => {
      const { link, frontmatter } = meta
      const date = new Date(frontmatter.date)
      const text = `${formatDate(date)} ${frontmatter.title}`
      return { text, link, date }
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
        collapsible: true,
        items: groups[key]
      }
    })
}

export default {
  '/my/post/': loadPosts('/my/post')
}
