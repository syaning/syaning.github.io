import { loadItems } from './helper'

export default {
  '/favorites/bookmark/': [
    {
      text: 'Bookmarks',
      items: loadItems([
        '/favorites/bookmark/ebook',
        '/favorites/bookmark/resources',
        '/favorites/bookmark/design',
        '/favorites/bookmark/utils',
      ])
    }
  ]
}
