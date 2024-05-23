---
doctype: post
title:   JS formatUnicorn
date:    2020-12-05 12:00:00 +0800
---

```js
/**
 * Format a string.
 *
 * @example
 * formatUnicorn('hello {0}', 'world')              // hello world
 * formatUnicorn('{0} {1}', 'hello', 'world')       // hello world
 * formatUnicorn('{0} {1}', ['hello', 'world'])     // hello world
 * formatUnicorn('hello {name}', { name: 'world' }) // hello world
 * 
 * @param  {String} str
 * @param  {...Any} args
 * @return {String}
 */
function formatUnicorn(str, ...args) {
  if (args.length) {
    const t = typeof args[0]
    args = (t === 'string' || t === 'number') ? args : args[0]

    for (let key in args) {
      str = str.replace(new RegExp(`\\{${key}\\}`, 'gi'), args[key])
    }
  }

  return str
}
```
