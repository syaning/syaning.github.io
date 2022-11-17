import { loadDirItems } from './helper'

export default {
  '/notes/rust/': [{
    text: '1. Hello World',
    collapsible: true,
    items: loadDirItems('/notes/rust/1-hello-world', [
      'hello-world',
      'cargo',
    ])
  }, {
    text: '2. Basic',
    collapsible: true,
    items: loadDirItems('/notes/rust/2-basic', [
      'comment',
      'datatype',
      'var-and-const',
      'control-flow',
      'function',
    ])
  }, {
    text: '3. Ownership',
    collapsible: true,
    items: loadDirItems('/notes/rust/3-ownership', [
      'ownership',
      'references-and-borrowing',
      'slice',
    ])
  }, {
    text: '4. Struct',
    collapsible: true,
    items: loadDirItems('/notes/rust/4-struct', [
      'struct',
      'method',
    ])
  }, {
    text: '5. Enum',
    collapsible: true,
    items: loadDirItems('/notes/rust/5-enum', [
      'enum',
      'match',
    ])
  }, {
    text: '6. Data Structure',
    collapsible: true,
    items: loadDirItems('/notes/rust/6-data-structure', [
      'string',
      'vector',
      'hashmap',
    ])
  }]
}
