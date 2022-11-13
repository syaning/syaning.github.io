import { loadAllItems } from './helper'

export default {
  '/notes/leetcode/': [
    {
      text: 'Leetcode',
      items: loadAllItems('/notes/leetcode')
    }
  ]
}
