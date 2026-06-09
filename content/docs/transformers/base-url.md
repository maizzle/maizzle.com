---
title: Base URL
description: Prepend a base URL to relative paths in your HTML emails.
section: Transformers
order: 13
---

# Base URL

Define a string that will be prepended to all relative sources and hrefs in your HTML.

## Usage

Configure it with `url.base` in your config:

```ts [maizzle.config.ts]
export default defineConfig({
  url: {
    base: 'https://cdn.example.com/emails/',
  },
})
```

Before:

```html
<img src="hero.jpg">
```

**Result:**

```html
<img src="https://cdn.example.com/emails/hero.jpg">
```

::callout{type="info"}
Only relative URLs are rewritten, absolute URLs are left untouched.
::

By default, all standard tags are processed: `a`, `img`, `video`, `source`, `link`, `script`, and others. URLs in `<style>` tags (`url()` values), inline style attributes, VML elements (`v:image`, `v:fill`), and MSO conditional comments are also handled. The `srcset` attribute is also processed, with each URL in the set being rewritten.

## Customization

Pass an object for fine-grained control over which tags and attributes are processed.

```ts [maizzle.config.ts]
export default defineConfig({
  url: {
    base: {
      url: 'https://cdn.example.com',
      tags: ['img', 'source'],
      styleTag: true,
      inlineCss: true,
    },
  },
})
```

### url

Type: `string`

The base URL to prepend to relative paths.

### tags

Type: `string[] | Record<string, any>`\
Default: all standard tags

Limit processing to specific HTML tags. Pass an array of tag names to only rewrite URLs in those elements.

### attributes

Type: `Record<string, any>`

Custom attribute-to-URL mappings for non-standard attributes.

### styleTag

Type: `boolean`\
Default: `true`

Whether to process `url()` values inside `<style>` tags.

### inlineCss

Type: `boolean`\
Default: `true`

Whether to process `url()` values in inline `style` attributes.

## API

```ts
import { base } from '@maizzle/framework'

// Just a URL — applied with the built-in tag/attribute defaults
const out = base('<img src="hero.jpg">', 'https://cdn.example.com/')

// Object form for finer control
const limited = base(html, {
  url: 'https://cdn.example.com/',
  tags: ['img'],
  styleTag: false,
  inlineCss: false,
})
```

The first argument is an HTML string. The second is either a base URL string or a `BaseUrlOptions` object — the same shape accepted under `url.base` in the config (`url`, `tags`, `attributes`, `styleTag`, `inlineCss`). Returns the transformed HTML string.
