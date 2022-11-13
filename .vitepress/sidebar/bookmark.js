import { loadItems } from './helper'

export default {
  '/favorites/bookmark/': [
    {
      text: '书签',
      items: loadItems([
        '/favorites/bookmark/ebook',
        '/favorites/bookmark/resources',
        '/favorites/bookmark/design',
        '/favorites/bookmark/utils',
      ])
    }
  ]
}
