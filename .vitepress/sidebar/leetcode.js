import { loadAllItems } from './helper'

export default {
  '/learn/leetcode/': [
    {
      text: 'Leetcode',
      items: loadAllItems('/learn/leetcode')
    }
  ]
}
