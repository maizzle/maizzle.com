---
title: "Upgrade Guide"
description: "How to upgrade your Maizzle project to the latest major framework release."
---

# Upgrade Guide

Upgrading your Maizzle projects from v4.x to v5.x (beta).

Maizzle 5 is a major framework rewrite that comes with awesome new features and improvements, but also includes a few breaking changes.

Migrating to Maizzle 5 should take less than 10 minutes for most users.

## Node.js

<strong class="text-indigo-500">BREAKING CHANGE</strong>

Maizzle 5 requires Node.js v18.0.0 or higher.

Check your current Node.js version:

```sh
node --version
```

## Update @maizzle/cli

If you use `@maizzle/cli` installed globally, you must upgrade it to v2.x in order to use it in Maizzle 5 projects:

```sh
npm install -g @maizzle/cli@next
```

Alternatively you can just use the NPM scripts like `npm run dev` from `package.json`.

## Update package.json

The `@maizzle/framework` package is now a module, so you need to update your `package.json` file to reflect this change.

```json [package.json] {3}
{
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "maizzle serve",
    "build": "maizzle build production"
  },
  "dependencies": {
    "@maizzle/framework": "next",
    "tailwindcss-preset-email": "^1.3.0"
  }
}
```

## Upgrade dependencies

It's probably best that you do a clean install:

- remove `node_modules` directory
- remove `package-lock.json` and/or `yarn.lock`

<Alert>If using yarn, note that it might have cached your dependencies.</Alert>

Install the `next` version of Maizzle:

```sh
npm install @maizzle/framework@next
```

## Update your HTML

### yield

The `<content />` tag has been replaced with `<yield />`.

Make sure to update it in your Layouts and Components.

### style

Tailwind CSS can now be used as expected, with `@tailwind` directives in any `<style>` tag, instead of the old `<style>{{{ page.css }}}</style>`.

```handlebars [src/layouts/main.html]
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    @tailwind utilities;
    @tailwind components;
  </style>
</head>
<body>
  <yield />
</body>
</html>
```

## Update tailwind.config.js

We've created [`tailwindcss-preset-email`](https://github.com/maizzle/tailwindcss-preset-email) specifically for Maizzle, which configures Tailwind CSS for better email client support.

Using it will now greatly simplify your `tailwind.config.js` file, this is all you need:

```js [tailwind.config.js]
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('tailwindcss-preset-email'),
  ],
  content: [
    './src/**/*.html',
  ],
}
```

## Update config.js

The Maizzle config has been reimagined from the ground up, so naturally there are a few breaking changes.

### ESM export

<strong class="text-indigo-500">BREAKING CHANGE</strong>

The config file is now an ESM module, which means you can use `import` and cool stuff like top-level `await`.
It also means you need to make this change:

```js [config.js] no-copy diff
- module.exports = {
+ export default {
```

If you need to keep using `module.exports` you must use the `.cjs` extension:

```diff
- config.js
- config.production.js
+ config.cjs
+ config.production.cjs
```

### build

<strong class="text-indigo-500">BREAKING CHANGE</strong>

The `build` key, which is where you define what emails to build and where to output them, has changed considerably.

This is everything that the `build` key can contain in Maizzle 5:

```js [config.js]
export default {
  build: {
    content: ['src/templates/**/*.html'],
    static: {
      source: ['src/images/**/*.*'],
      destination: 'images',
    },
    output: {
      path: 'build_production',
      extension: 'html',
    },
    summary: true,
    spinner: 'circleHalves',
  },
}
```

### components

The `components` key has been moved outside `build`, to the root of the config file:

```js [config.js] no-copy diff
export default {
-  build: {
-    components: {}
-  }
+  components: {}
}
```

### events

Events have been moved to the root of the config file:

```js [config.js] no-copy diff
export default {
-  events: {...}
+  async beforeRender({html, config, render}) {
+    // must return `html`
+    return html
+  },
}
```

### extraAttributes

This key has been moved to `css.attributes.add`:

```js [config.js] no-copy diff
export default {
-  extraAttributes: {}
+  css: {
+    attributes: {
+      add: {}
+    }
+  }
}
```

### layouts

The `layouts` key has been deprecated, you can safely remove it.

### inlineCSS

Configuration for CSS inlining has been moved under the `css.inline` key:

```js [config.js] no-copy diff
export default {
-  inlineCSS: {}
+  css: {
+    inline: {}
+  }
}
```

There are some new options ([see docs](./transformers/inline-css)), this is the full new config for inlining:

```js [config.js]
export default {
  css: {
    inline: {
      styleToAttribute: {
        'vertical-align': 'valign',
      },
      attributeToStyle: ['width', 'height', 'bgcolor', 'background', 'align', 'valign'],
      applyWidthAttributes: [],
      applyHeightAttributes: [],
      useAttributeSizes: true,
      resolveCSSVariables: true,
      removeInlinedSelectors: true,
      excludedProperties: [],
      preferUnitlessValues: false,
      resolveCalc: true,
    },
  },
}
```

### outlook

Configuring the custom tag for Outlook conditionals is done through the same `outlook` key, but at the root of the config file instead of inside the `posthtml` key:

```js [config.js] no-copy diff
export default {
-  posthtml: {
-    outlook: {}
-  }
+  outlook: {
+    tag: 'mso',
+  },
}
```

### postcss

PostCSS is now configured under the root `postcss` key instead of the one under `build.postcss`:

```js [config.js] no-copy diff
export default {
-  build: {
-    postcss: {}
-  }
+  postcss: {}
}
```

### removeAttributes

This Transformer has been moved to `css.attributes.remove`:

```js [config.js] no-copy diff
export default {
-  removeAttributes: []
+  css: {
+    attributes: {
+      remove: []
+    }
+  }
}
```

### removeUnusedCSS

Configuration for this Transformer has been moved to `css.purge`:

```js [config.js] no-copy diff
export default {
-  removeUnusedCSS: {}
+  css: {
+    purge: {}
+  }
}
```

### shorthandCSS

This key has been moved to `css.shorthand`:

```js [config.js] no-copy diff
export default {
-  shorthandCSS: true
+  css: {
+    shorthand: true
+  }
}
```

### safeClassNames

The `safeClassNames` option has been moved to `css.safe`:

```js [config.js] no-copy diff
export default {
-  safeClassNames: true
+  css: {
+    safe: true
+  }
}
```

### server

Browsersync has been replaced with a custom dev server, powered by Express.js and WebSockets with morphdom for an HMR-like experience.

The [new dev server](./configuration/server) is much faster and provides a nicer experience, but you'll need to update your `config.js` if you want to configure it:

```js [config.js] no-copy diff
// delete the entire browsersync key
- browsersync: {...},
+ server: {
+   port: 3000,
+   hmr: true,
+   scrollSync: true,
+   watch: ['./src/images/**/*'],
+   reportFileSize: true,
+ },
```

### sixHex

This key has been moved to `css.sixHex`:

```js [config.js] no-copy diff
export default {
-  sixHex: true
+  css: {
+    sixHex: true
+  }
}
```

### tailwind

The `tailwind` key in `config.js` has been deprecated, you can safely remove it.
You may now use `@config` in your CSS to specify a custom Tailwind CSS config file to use:

```html
<style>
  @config 'tailwind.custom.js';
  @tailwind utilities;
</style>
```

Alternatively, you may define a Tailwind config object under `css.tailwind`:

```js [config.js]
export default {
  css: {
    tailwind: {}, // custom Tailwind CSS config object
  },
}
```

### templates

The `templates` key has been deprecated, see [`build`](#build) above for how to define template and other assets sources.

### applyTransformers

This has been renamed to `useTransformers`:

```js [config.js] no-copy diff
export default {
-  applyTransformers: true
+  useTransformers: true
}
```

## Optional

These updates are optional but highly recommended.

### Update components

The Maizzle 5 Starter uses updated components for dividers, spacers, or buttons.

We recommend you update your components to the latest versions, which you can find in the [Starter project](https://github.com/maizzle/maizzle) on GitHub.

Note: while in beta, the updated Starter project is in the `next` branch:

https://github.com/maizzle/maizzle/tree/next
