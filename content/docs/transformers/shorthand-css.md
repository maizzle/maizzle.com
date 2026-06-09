---
title: Shorthand CSS
description: Rewrite longhand CSS to shorthand in inline styles.
section: Transformers
order: 6
---

# Shorthand CSS

Rewrite longhand CSS inside style attributes with shorthand syntax. Only works with `margin`, `padding` and `border`, and only when all sides are specified.

Shorthand syntax for CSS properties means less code, so fewer bytes to send over the wire. Today, most email clients support shorthand CSS.

## Usage

Enabled by default. To disable, set `css.shorthand` to `false`:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    shorthand: false,
  },
})
```
Something like this:

```html
<p class="mx-2 my-4">Example</p>
```

...instead of becoming this:

```html
<p style="margin-left: 4px; margin-right: 4px; margin-top: 16px; margin-bottom: 16px">
  ...
</p>
```

...is rewritten to this:

```html
<p style="margin: 16px 4px">
  ...
</p>
```

## Customization

### tags

Type: `string[]`\
Default: `undefined`

Limit shorthand conversion to specific HTML tags by passing an object with a `tags` array:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    shorthand: {
      tags: ['td', 'div'],
    },
  },
})
```

## API

Use `shorthandCss` to merge longhand CSS into shorthand on any HTML string.

```ts
import { shorthandCss } from '@maizzle/framework'

const html = `
  <p style="margin-top: 4px; margin-right: 2px; margin-bottom: 4px; margin-left: 2px;">x</p>
`

const out = shorthandCss(html, {
  tags: ['p'],
})
```

The first argument is an HTML string. The second is an optional `ShorthandCssOptions` object — `tags` restricts the transform to specific HTML elements (omit to apply to every element with a `style` attribute). Returns the transformed HTML string.
