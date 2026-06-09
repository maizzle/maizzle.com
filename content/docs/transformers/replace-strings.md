---
title: Replace Strings
description: Find and replace strings in the final HTML output.
section: Transformers
order: 15
---

# Replace Strings

Replace strings in your compiled HTML using key-value pairs.

## Usage

Configure `replaceStrings` with an object where keys are regular expression patterns and values are the replacement strings. Keys are treated as regex patterns with case-insensitive, global matching.

```ts [maizzle.config.ts]
export default defineConfig({
  replaceStrings: {
    '{{ year }}': new Date().getFullYear().toString(),
    '{{ company }}': 'Acme Inc.',
  },
})
```

Given this in your template:

```vue
<template>
  <p v-pre>© {{ year }} {{ company }}</p>
</template>
```

**Result:**

```html
<p>© 2026 Acme Inc.</p>
```

The transformer runs on the serialized HTML string, so it can match anything: tags, attributes, or text content.

Character classes must be escaped in keys — for example, use `\\s` to match `\s`.

## API

```ts
import { replaceStrings } from '@maizzle/framework'

const out = replaceStrings(html, { replaceStrings: { foo: 'bar' } })
```
