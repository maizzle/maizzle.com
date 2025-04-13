---
title: "Upgrade Guide"
description: "How to upgrade your Maizzle project to the latest major framework release."
---

# Upgrade Guide

Upgrading your Maizzle projects from v4.x to v5.

Maizzle 5 is a major framework rewrite that comes with awesome new features and improvements, but also includes a few breaking changes.

Migrating an existing project to Maizzle 5 takes less than 10 minutes in most cases.

## Node.js

<strong class="text-indigo-500">BREAKING CHANGE</strong>

Maizzle 5 requires Node.js v18.20 or higher.

Check your current Node.js version:

```sh
node --version
```

<Alert>Maizzle is tested on Node.js 18, 20, and 22.</Alert>

## Update @maizzle/cli

If you use `@maizzle/cli` installed globally, you must upgrade it to v2.x in order to use it in Maizzle 5 projects:

```sh
npm install -g @maizzle/cli
```

Alternatively, you can just use the NPM scripts like `npm run dev` from `package.json`.

## Update package.json

The `@maizzle/framework` package is now a module, so you need to update your `package.json` file to reflect this change.

```json [package.json] {3}
{
  "private": true,
  "type": "module",  // [!code ++]
  "scripts": {
    "dev": "maizzle serve",
    "build": "maizzle build production"
  },
  "dependencies": {
    "@maizzle/framework": "latest",
    "tailwindcss-preset-email": "latest"
  }
}
```

## Upgrade dependencies

It's probably best that you do a clean install:

- remove `node_modules` directory
- remove `package-lock.json` and/or `yarn.lock`

<Alert>If using yarn, note that it might have cached your dependencies.</Alert>

Install the `latest` version of Maizzle:

```sh
npm install @maizzle/framework@latest
```

## Update your HTML

### yield

<strong class="text-indigo-500">BREAKING CHANGE</strong>

The `<content />` tag has been replaced with `<yield />`.

Make sure to update it in your Layouts and Components:

```html [layouts/main.html] {8}
<!doctype html>
<html lang="en">
<head>
  <!-- ... -->
</head>
<body>
  <content /> // [!code --]
  <yield /> // [!code ++]
</body>
</html>
```

### style

<strong class="text-indigo-500">BREAKING CHANGE</strong>

Tailwind CSS can now be used as expected, with `@tailwind` directives in any `<style>` tag, instead of the old `<style>{{{ page.css }}}</style>`.

```html [layouts/main.html] {6-7}
<!doctype html>
<html lang="en">
<head>
  <style>
    {{{ page.css }}} /* [!code --] */
    @​tailwind components; /* [!code ++] */
    @​​tailwind utilities; /* [!code ++] */
  </style>
</head>
<body>
  <yield />
</body>
</html>
```

## Update tailwind.config.js

We created [`tailwindcss-preset-email`](https://github.com/maizzle/tailwindcss-preset-email) to make it easier to use Tailwind CSS for styling HTML emails - it outputs more email-friendly CSS and includes some useful plugins.

Using it will now greatly simplify your `tailwind.config.js` file, this is all you need:

```js [tailwind.config.js]
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('tailwindcss-preset-email'),
  ],
  content: [
    './components/**/*.html',
    './emails/**/*.html',
    './layouts/**/*.html',
  ],
}
```

You now also need to define content sources in your `tailwind.config.js` - Maizzle will _not_ automatically scan any paths for files containing Tailwind classes to generate.

## Update config.js

The Maizzle config has been reimagined, so naturally there are a few breaking changes.

### ESM export

<strong class="text-indigo-500">BREAKING CHANGE</strong>

The config file is now an ESM module, which means you can use `import` and cool stuff like top-level `await`.
It also means you need to make this change:

```js [config.js] {2} no-copy
  module.exports = { // [!code --]
  export default { // [!code ++]
```

If you need to keep using `module.exports` you must use the `.cjs` extension:

```js [C:/dev/maizzle] {3,4} no-copy
  config.js // [!code --]
  config.production.js // [!code --]
  config.cjs // [!code ++]
  config.production.cjs // [!code ++]
```

### build

<strong class="text-indigo-500">BREAKING CHANGE</strong>

The `build` key, which is where you define what emails to build and where to output them, has changed considerably.

This is how the `build` key looks in Maizzle 5:

```js [config.js]
export default {
  build: {
    content: ['emails/**/*.html'],
    static: {
      source: ['images/**/*.*'],
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

```js [config.js] {5}
export default {
   build: { // [!code --]
     components: {} // [!code --]
   } // [!code --]
   components: {} // [!code ++]
}
```

### events

Events have been moved to the root of the config file:

```js [config.js] {3-5}
export default {
   events: {...} // [!code --]
   async beforeRender({html, matter, config}) { // [!code ++]
     // ... // [!code ++]
   }, // [!code ++]
}
```

### extraAttributes

This key has been moved to `css.attributes.add`:

```js [config.js] {3-7}
export default {
   extraAttributes: {} // [!code --]
   css: { // [!code ++]
     attributes: { // [!code ++]
       add: {} // [!code ++]
     } // [!code ++]
   } // [!code ++]
}
```

### layouts

The `layouts` key is no longer used, you can safely remove it.

### inlineCSS

Configuration for CSS inlining has been moved under the `css.inline` key:

```js [config.js] {3-5}
export default {
   inlineCSS: {} // [!code --]
   css: { // [!code ++]
     inline: true, // [!code ++]
   } // [!code ++]
}
```

See the [CSS inlining docs](/docs/transformers/inline-css) for all the options available.

### outlook

Configuring the custom tag for Outlook conditionals is done through the same `outlook` key, but at the root of the config file instead of inside the `posthtml` key:

```js [config.js] {5-7}
export default {
   posthtml: { // [!code --]
     outlook: {} // [!code --]
   } // [!code --]
   outlook: { // [!code ++]
     tag: 'mso', // [!code ++]
   }, // [!code ++]
}
```

### fetch

The `fetch` key has been moved to the root of the config file:

```js [config.js] diff {5-7}
export default {
   posthtml: { // [!code --]
     fetch: {} // [!code --]
   } // [!code --]
   fetch: { // [!code ++]
     tags: ['get'], // [!code ++]
   }, // [!code ++]
}
```

See the [fetch docs](/docs/tags#fetch-options) for the available options.

### postcss

PostCSS may now be configured under the root `postcss` key:

```js [config.js] {5}
export default {
   build: { // [!code --]
     postcss: {} // [!code --]
   } // [!code --]
   postcss: {} // [!code ++]
}
```

### removeAttributes

This Transformer has been moved to `css.attributes.remove`:

```js [config.js] {3-7}
export default {
   removeAttributes: [] // [!code --]
   css: { // [!code ++]
     attributes: { // [!code ++]
       remove: []  // [!code ++]
     } // [!code ++]
   } // [!code ++]
}
```

### removeUnusedCSS

Configuration for this Transformer has been moved to `css.purge`:

```js [config.js] {3-5}
export default {
   removeUnusedCSS: {} // [!code --]
   css: { // [!code ++]
     purge: {} // [!code ++]
   } // [!code ++]
}
```

### shorthandCSS

The shorthand CSS Transformer config has been moved to `css.shorthand`:

```js [config.js] {3-5}
export default {
   shorthandCSS: true // [!code --]
   css: { // [!code ++]
     shorthand: true // [!code ++]
   } // [!code ++]
}
```

### safeClassNames

The `safeClassNames` option has been renamed and moved to `css.safe`:

```js [config.js] {3-5}
export default {
   safeClassNames: {} // [!code --]
   css: { // [!code ++]
     safe: {} // [!code ++]
   } // [!code ++]
}
```

### server

Browsersync has been replaced with a custom dev server, powered by Express.js and WebSockets with `morphdom` for an HMR-like local development experience.

We call this Hot Markup Replacement&trade;.

This [new dev server](/docs/configuration/server) is much faster and provides a nicer experience, but you'll need to update your `config.js` if you want to configure it:

```js [config.js] {3-10}
export default {
   browsersync: {...}, // [!code --]
   server: { // [!code ++]
     port: 3000, // [!code ++]
     hmr: true, // [!code ++]
     scrollSync: false, // [!code ++]
     watch: ['./images/**/*'], // [!code ++]
     reportFileSize: false, // [!code ++]
     spinner: 'circleHalves', // [!code ++]
   }, // [!code ++]
}
```

### sixHex

This Transformer config has been moved to `css.sixHex`:

```js [config.js] {3-5}
export default {
   sixHex: true // [!code --]
   css: { // [!code ++]
     sixHex: true // [!code ++]
   } // [!code ++]
}
```

### tailwind

The `tailwind` key in `config.js` has been deprecated, you can safely remove it.

You may now simply use `@config` in your `<style>` tags or files included with `<link>`, to specify a custom Tailwind CSS config file to use:

```html [layouts/main.html]
<style>
  @config 'tailwind.custom.js';
  @tailwind components;
  @tailwind utilities;
</style>
```

If you prefer using CSS files:

```css [css/tailwind.css]
@config 'tailwind.custom.js';
@tailwind components;
@tailwind utilities;
```

... you may import that through a `<link>` tag or with an `@import` statement:

```html
<link rel="stylesheet" href="css/tailwind.css">

<!-- or -->
<style>
  @import 'css/tailwind.css';
</style>
```

You can still define a Tailwind config object if you need to, under `css.tailwind`:

```js [config.js]
export default {
  css: {
    tailwind: {}, // custom Tailwind CSS config object
  },
}
```

### templates

The `templates` key has been deprecated, see [`build`](#build) above for how to define Template and other assets sources.

### applyTransformers

This has been renamed to `useTransformers`:

```js [config.js] {3}
export default {
   applyTransformers: true // [!code --]
   useTransformers: true // [!code ++]
}
```

## Optional

These updates are optional but highly recommended.

### Update components

The Maizzle 5 Starter uses updated components for dividers, spacers, or buttons.

We recommend you update your components to the latest versions, which you can find in the [Starter project](https://github.com/maizzle/maizzle) on GitHub.
