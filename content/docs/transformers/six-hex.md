---
title: Six-digit HEX
description: Convert 3-digit HEX colors to 6-digit in HTML attributes.
section: Transformers
order: 7
---

# Six-digit HEX

Some email clients don't support 3-digit shorthand HEX colors like `#fff`. This transformer converts them to their 6-digit equivalents.

## Usage

The transformer is enabled by default, so you don't need to configure anything. It only processes `bgcolor` and `color` HTML attributes, so your text content is unchanged.

Turns this:

```html
<td bgcolor="#fff" color="#000">
  The #fff and #000 colors are converted to #ffffff and #000000.
</td>
```

Into this:

```html
<td bgcolor="#ffffff" color="#000000">
  The #fff and #000 colors are converted to #ffffff and #000000.
</td>
```

## Customization

### Disabling

You may disable the transformer if you don't need it:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    sixHex: false,
  },
})
```

## API

Use `sixHex` programmatically to expand 3-digit hex codes in `bgcolor` and `color` attributes on any HTML string.

```ts
import { sixHex } from '@maizzle/framework'

const out = sixHex('<font color="#000">x</font>')
// <font color="#000000">x</font>
```

Takes an HTML string. Returns the transformed HTML string. No options.
