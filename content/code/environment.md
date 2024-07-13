```js
/** @type {import('@maizzle/framework').Config} */

export default {
  build: {
    content: ['src/templates/**/*.html'],
    output: {
      path: 'build_production',
      extension: 'blade.php',
    },
    summary: true,
    static: {
      source: 'src/images',
      destination: 'images',
    }
  }
}
```
