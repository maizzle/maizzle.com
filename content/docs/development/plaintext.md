---
title: Plaintext
description: Generate plaintext versions of your email templates alongside HTML output.
section: Development
order: 4
---

# Plaintext

Plaintext versions of HTML emails give recipients a fallback when their client can't render HTML. Maizzle can generate them automatically for every template, on demand per template, or via the API.

These are actual text files that you would use as the text mime part of a multipart email. They are not minimally styled HTML that looks less designed or more "personal".

## Enable globally

Set `plaintext: true` in your config to write a `.txt` file next to every HTML output. The plaintext file name will be the same as the template it corresponds to.

```ts [maizzle.config.ts]
import { defineConfig } from '@maizzle/framework'

export default defineConfig({
  plaintext: true,
})
```

For more control, pass an object:

```ts [maizzle.config.ts]
export default defineConfig({
  plaintext: {
    destination: 'build_production/plaintext',
    extension: 'txt',
    options: {
      ignoreTags: ['br'],
    },
  },
})
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `destination` | `string` | HTML output dir | Output directory for `.txt` files. Nested template paths are preserved. |
| `extension` | `string` | `'txt'` | File extension (without leading dot). |
| `options` | `object` | `{}` | Forwarded to [`string-strip-html`](https://codsen.com/os/string-strip-html). |

## Enable per-template

Use the `usePlaintext()` composable in `<script setup>` to generate plaintext for a specific template, independent of the global config:

```vue [emails/welcome.vue]
<script setup>
  usePlaintext()
</script>

<template>
  <Html>
    <!-- ... -->
  </Html>
</template>
```

You can pass `destination`, `extension`, or `options` to override the global config for this template only:

```vue
<script setup>
  usePlaintext({
    destination: 'build_production/plaintext/welcome',
    extension: 'text',
    options: { ignoreTags: ['br'] },
  })
</script>
```

## Render API

When using `render()` programmatically, plaintext is returned in the result object whenever generation is enabled — either via config or `usePlaintext()`:

```ts
import { render } from '@maizzle/framework'

const { html, plaintext } = await render('emails/welcome.vue', {
  plaintext: true,
})
```

See [API Reference → render()](/docs/api/utilities#render) for details.

## Direct conversion

Convert any HTML string to plaintext directly with `createPlaintext()`:

```ts
import { createPlaintext } from '@maizzle/framework'

const text = createPlaintext('<p>Hello <a href="https://example.com">world</a></p>', {
  dumpLinkHrefsNearby: { enabled: true, putOnNewLine: true },
})
```

See [API Reference → createPlaintext()](/docs/api/utilities#createplaintext) for the full signature.

## Components

For per-template control over what shows up in HTML versus plaintext, use the [`<Plaintext>`](/docs/components/plaintext) components.
