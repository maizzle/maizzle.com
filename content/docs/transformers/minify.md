---
title: Minify
description: Minify HTML email output to reduce file size.
section: Transformers
order: 18
---

# Minify

Minify the HTML output to reduce file size. Gmail clips emails around 102KB, so keeping your code lean helps ensure the full email is displayed.

## Usage

The transformer is disabled by default. Enable it in your config:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    minify: true,
  },
})
```

## Customization

### Options

Pass an object to customize `html-crush` options. Your options are merged with the defaults.

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    minify: {
      removeLineBreaks: true,
      removeIndentations: true,
    },
  },
})
```

::callout{type="info"}
When `minify` is enabled, the [`format`](/docs/transformers/format) transformer is automatically skipped.
::

## API

Use `minify` programmatically to compress any HTML string outside the build pipeline:

```ts
import { minify } from '@maizzle/framework'

// Defaults only
const tight = minify('<div>\n  <p>hi</p>\n</div>')

// Pass any html-crush option
const aggressive = minify(html, {
  removeLineBreaks: true,
  removeIndentations: true,
  removeHTMLComments: 1,
})
```

The first argument is an HTML string. The second is an optional [html-crush options](https://codsen.com/os/html-crush) object — Maizzle's only default override (`removeLineBreaks: true`) is merged underneath. 

Returns the minified HTML string.
