import fs from 'node:fs'
import path from 'node:path'
import * as matter from 'gray-matter'

/**
 * Try extract frontmatter.
 */
function tryExtractFrontmatter(content) {
  return matter.default(content).data || {}
}

/**
 * Try extract title with the following order:
 * 1. front matter
 * 2. content first line header
 * 3. file name
 */
function tryExtractTitle(params) {
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
function tryExtractDate(params) {
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

export const filters = {
  allMdButIndex: f => f.endsWith('.md') && f !== 'index.md'
}

export const sorters = {
  byFilenameIndex: (a, b) => parseInt(a.filename) - parseInt(b.filename),
  byDateDesc: (a, b) => b.date - a.date,
}

export const clusters = {
  byYear(posts, mapper) {
    const groups = posts.reduce((ret, post) => {
      const year = post.date.getFullYear()
      ret[year] = ret[year] || []
      ret[year].push(post)
      return ret
    }, {})
    return Object.keys(groups)
      .sort((a, b) => b - a)
      .map(key => ({
        text: key,
        collapsed: false,
        items: groups[key].map(mapper)
      }))
  }
}

export const mappers = {
  default: (post) => ({ text: post.title, link: post.link })
}

/**
 * @param  {String}   dir
 * @param  {Object}   options
 * @param  {Array}    files
 * @param  {Function} options.filter
 * @param  {Function} options.sorter
 * @param  {Function} options.cluster
 * @param  {Function} options.mapper
 */
export function loadAllFiles(dir, options = {}) {
  const {
    files,
    filter,
    sorter,
    cluster,
    mapper = mappers.default
  } = options

  const realDir = path.join('./src', dir)
  const posts = (files || fs.readdirSync(realDir))
    .filter(f => filter ? filter(f) : true)
    .map(f => {
      const filename = path.parse(f).name
      const link = path.join(dir, filename)
      const content = fs.readFileSync(path.join(realDir, f), 'utf8')
      const frontmatter = tryExtractFrontmatter(content)
      const params = { frontmatter, content, filename }
      const title = tryExtractTitle(params)
      const date = tryExtractDate(params)

      return {
        filename,
        link,
        title,
        date,
        frontmatter,
      }
    })

  if (sorter) {
    posts.sort(sorter)
  }

  if (cluster) {
    return cluster(posts, mapper)
  }

  return posts.map(mapper)
}
