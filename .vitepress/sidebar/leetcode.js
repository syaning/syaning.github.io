import { loadAllFiles, filters } from './helper'

const items = loadAllFiles('/note/leetcode', filters.allMdButIndex)
  .map(meta => ({ text: meta.title, link: meta.link }))
  .sort((a, b) => parseInt(a.text) - parseInt(b.text))

export default {
  '/note/leetcode/': [{
    text: 'Leetcode',
    items
  }]
}
