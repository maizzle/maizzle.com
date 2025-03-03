```js
/** @type {import('@maizzle/framework').Config} */

export default {
  build: {
    content: ['emails/**/*.html'],
    output: {
      path: 'build_production',
    },
  },
  css: {
    inline: true,
    purge: true,
    shorthand: true,
  },
  prettify: true,
}
```
