```js
module.exports = {
  build: {
    templates: {
      source: 'src/templates',
      destination: {
        path: 'build_production',
        extension: 'html',
      },
      assets: {
        source: 'src/images',
        destination: 'images',
      },
    },
  }
}
```
