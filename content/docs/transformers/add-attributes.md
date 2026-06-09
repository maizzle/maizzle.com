---
title: Add Attributes
description: Automatically add HTML attributes to elements.
section: Transformers
order: 2
---

# Add Attributes

Adds HTML attributes to elements matched by tag name, class, ID, or attribute selector.

## Usage

The transformer runs by default with these built-in defaults:

- `<table>` gets `cellpadding="0"`, `cellspacing="0"`, and `role="none"`
- `<img>` gets `alt=""`

Any config you provide is merged on top of these defaults.

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: {
      add: {
        table: { cellpadding: 0, cellspacing: 0, role: 'none' },
        img: { alt: '' },
      },
    },
  },
})
```

## Customization

### Selectors

You may target elements using tag names, classes, IDs, attribute selectors, or comma-separated combinations:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: {
      add: {
        table: { cellpadding: 0, cellspacing: 0, role: 'none' },
        img: { alt: '' },
        '.cta': { role: 'button' },
        '#header': { 'aria-label': 'Header' },
        '[role]': { tabindex: 0 },
        '[role=alert]': { 'aria-live': 'assertive' },
        'div, p': { role: 'presentation' },
      },
    },
  },
})
```

### Merge behavior

For the `class` attribute, new classes are merged with any existing ones on the element. For all other attributes, the value is only added if the attribute is not already present on the element.

### Disabling

You may disable the transformer entirely:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: {
      add: false,
    },
  },
})
```

## API

```ts
import { addAttributes } from '@maizzle/framework'

const out = addAttributes('<table></table>', { add: { table: { role: 'none' } } })
```
