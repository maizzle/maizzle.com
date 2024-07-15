---
title: "Assets"
description: "How Maizzle handles asset files when building your HTML emails."
---

# Asset Files

Any files that you add to your [Template sources](/docs/configuration/templates) will be copied over to the root of the build destination directory, so you can organize your email templates as needed.

## Global assets

You may define a global email assets folder that will be copied to the build directory. The Starter sets it to the `src/images` directory:

```js [config.js]
export default {
  build: {
    static: {
      source: 'src/images/**/*.*',
      destination: 'images',
    }
  }
}
```

Everything inside `static.source` will be copied to the `static.destination` directory, which is relative to [`build.output.path`](/docs/configuration/templates#path).

## Multiple sources

You may define multiple asset source paths by using an array - all files will be copied to a single destination directory:

```js [config.js]
export default {
  build: {
    static: {
      source: ['src/images/**/*.*', 'src/fonts/**/*.*'],
      destination: 'assets'
    }
  }
}
```
