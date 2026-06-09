---
title: Entities
description: Encode special Unicode characters as HTML entities.
section: Transformers
order: 16
---

# Entities

Converts Unicode characters to their HTML entity equivalents so they render correctly across email clients.

## Usage

The transformer is enabled by default, so you don't need to configure anything. It processes text nodes in the DOM and replaces known Unicode characters with their HTML entities.

The default entity map covers common characters used in email:

| Character | Entity |
|-----------|--------|
| Zero-width joiner | `&zwj;` |
| Zero-width non-joiner | `&zwnj;` |
| Non-breaking space | `&nbsp;` |
| Soft hyphen | `&shy;` |
| Zero-width space | `&#8203;` |
| Figure space | `&#8199;` |
| Combining grapheme joiner | `&#847;` |
| Em space | `&emsp;` |
| Middle dot | `&middot;` |
| En dash | `&ndash;` |
| Em dash | `&mdash;` |
| Left/right single quotes | `&lsquo;` / `&rsquo;` |
| Left/right double quotes | `&ldquo;` / `&rdquo;` |
| Left/right guillemets | `&laquo;` / `&raquo;` |
| Bullet | `&bull;` |
| Left/right single angle quotes | `&lsaquo;` / `&rsaquo;` |

## Customization

### Custom entities

You may pass an object to add your own character-to-entity mappings, which will be merged with the defaults.

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    decodeEntities: {
      '©': '&copy;',
      '™': '&trade;',
    },
  },
})
```

### Disabling

You may disable the transformer if you think you don't need it:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    decodeEntities: false,
  },
})
```

## API

```ts
import { entities } from '@maizzle/framework'

// Defaults only
const out = entities('hello world')

// Add a custom mapping (merged with defaults)
const custom = entities('© Maizzle', { '©': '&copy;' })

// Disable the transform
const raw = entities('hello world', false)
```

The first argument is an HTML string. The second is an `EntitiesConfig` — `true` (or omitted) for the built-in map, an object for additional character → entity mappings merged on top of the defaults, or `false` to disable. Returns the transformed HTML string.
