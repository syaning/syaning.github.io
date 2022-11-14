import { loadItems } from './helper'

export default {
  '/notes/rust/': [{
    text: '1. Hello World',
    collapsible: true,
    items: loadItems([
      '/notes/rust/1-hello-world/hello-world',
      '/notes/rust/1-hello-world/cargo',
    ])
  }, {
    text: '2. Basic',
    collapsible: true,
    items: loadItems([
      '/notes/rust/2-basic/comment',
      '/notes/rust/2-basic/datatype',
      '/notes/rust/2-basic/var-and-const',
      '/notes/rust/2-basic/control-flow',
      '/notes/rust/2-basic/function',
    ])
  }, {
    text: '3. Ownership',
    collapsible: true,
    items: loadItems([
      '/notes/rust/3-ownership/ownership',
      '/notes/rust/3-ownership/references-and-borrowing',
      '/notes/rust/3-ownership/slice',
    ])
  }]
}
