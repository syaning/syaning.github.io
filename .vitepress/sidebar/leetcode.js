import { loadAllFiles, filters } from './helper'

const items = loadAllFiles('/notes/leetcode', filters.allMdButIndex)
  .map(meta => ({ text: meta.title, link: meta.link }))
  .sort((a, b) => parseInt(a.text) - parseInt(b.text))

export default {
  '/notes/leetcode/': [{
    text: 'Leetcode',
    items
  }]
}
