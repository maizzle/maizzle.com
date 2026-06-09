---
title: Inline Link
description: Convert <link rel="stylesheet"> tags to inline <style> tags.
section: Transformers
order: 11
---

# Inline Link

Replace `<link rel="stylesheet">` tags with `<style>` tags containing the referenced CSS.

## Usage

The contents of `styles.css` will be read and placed inside a `<style>` tag, which then goes through normal CSS processing (Tailwind compilation, purging etc.).

```vue [emails/example.vue]
<template>
  <Html>
    <Head>
      <link rel="stylesheet" href="./styles.css">
    </Head>
    <!-- ... -->
  </Html>
</template>
```

### Remote URLs

Remote stylesheets (http/https) are only inlined if you add the `inline` attribute:

```html
<link rel="stylesheet" href="https://example.com/styles.css" inline>
```

## API

```ts
import { inlineLink } from '@maizzle/framework'

const out = await inlineLink(
  '<link rel="stylesheet" href="./styles.css">',
  '/abs/path/to/template.html',
)
```

The first argument is an HTML string. 

The second one is the absolute path of the source file the HTML came from — required to resolve relative `href` values for local stylesheets. 

Remote `<link>` tags marked with `inline` are fetched whether or not a path is passed. 

Returns a `Promise<string>` with the transformed HTML.
