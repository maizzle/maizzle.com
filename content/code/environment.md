```js
/** @type {import('@maizzle/framework').Config} */

export default {
  build: {
    content: ['emails/**/*.html'],
    output: {
      path: 'build_production',
      extension: 'blade.php',
    },
    summary: true,
    static: {
      source: ['images/**/*.*'],
      destination: 'images',
    }
  }
}
```
