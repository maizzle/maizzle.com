---
title: Attribute to Style
description: Convert HTML attributes like width, height, and bgcolor to inline CSS styles.
section: Transformers
order: 8
---

# Attribute to Style

Converts HTML attributes like `width`, `height` or `bgcolor` to their inline CSS counterparts.

## Usage

The transformer is disabled by default, enable it in your config:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: {
      attributeToStyle: true,
    },
  },
})
```

When set to `true`, it processes all default attributes: `width`, `height`, `bgcolor`, `background`, `align`, and `valign`.

For example:

::code-tabs
  :::code-tab{label="Input"}
  ```html
  <td width="600" bgcolor="#ffffff">
  ```
  :::
  :::code-tab{label="Output"}
  ```html
  <td width="600" bgcolor="#ffffff" style="width: 600px; background-color: #ffffff">
  ```
  :::
::

New styles are appended to any existing `style` attribute on the element.

## Customization

### attributeToStyle

Type: `boolean | string[]`\
Default: `false`

You may pass an array of attribute names to process only specific attributes:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: {
      attributeToStyle: ['width', 'bgcolor'],
    },
  },
})
```

### Conversion reference

Here's how each attribute is converted to CSS:

| Attribute | CSS Output |
|-----------|-----------|
| `width="600"` | `width: 600px` |
| `height="400"` | `height: 400px` |
| `bgcolor="#fff"` | `background-color: #fff` |
| `background="img.jpg"` | `background-image: url('img.jpg')` |
| `align="center"` (on `<table>`) | `margin-left: auto; margin-right: auto` |
| `align="left"` (on `<table>`) | `float: left` |
| `align="center"` (on other elements) | `text-align: center` |
| `valign="top"` | `vertical-align: top` |

::callout{type=info}
Width and height support both `px` and `%` values. If no unit is specified, `px` is used.
::

## API

Use `attributeToStyle` programmatically to copy HTML presentational attributes to inline `style` declarations on any HTML string outside the build pipeline:

```ts
import { attributeToStyle } from '@maizzle/framework'

// Process every supported attribute (default)
const all = attributeToStyle('<table align="center"><tr><td bgcolor="#f00">x</td></tr></table>')

// Restrict to specific attribute names
const limited = attributeToStyle(html, ['width', 'height'])
```

The first argument is an HTML string. The second is a `boolean | string[]`: omit (or pass `true`) to convert every supported attribute, pass an array to restrict to specific names, or `false` to bail. Returns the transformed HTML string.
