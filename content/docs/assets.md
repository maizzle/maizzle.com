---
title: "Assets"
description: "How Maizzle handles asset files when building your HTML emails."
---

# Asset Files

Any files that you add to your [content sources](/docs/configuration/build#content) will be copied over to the root of the build destination directory, so you can organize your email templates as needed.

## Global assets

You may define a global email assets folder that will be copied to the build directory. The Starter sets it to the `images` directory:

```js [config.js]
export default {
  build: {
    static: {
      source: ['images/**/*'],
      destination: 'images',
    }
  }
}
```

Everything inside `static.source` will be copied to the `static.destination` directory, which is relative to [`build.output.path`](/docs/configuration/build#path).

## Multiple sources

You may define multiple asset source paths and all files from those paths will be copied to a single destination directory:

```js [config.js]
export default {
  build: {
    static: {
      source: ['images/**/*', 'fonts/**/*'],
      destination: 'assets'
    }
  }
}
```
