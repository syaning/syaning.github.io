import { loadDirItems } from './helper'

export default {
  '/favorites/bookmark/': [
    {
      text: 'Bookmarks',
      items: loadDirItems('/favorites/bookmark', [
        'ebook',
        'resources',
        'design',
        'awesome',
        'utils',
      ])
    }
  ]
}
