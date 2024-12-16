---
title: "Attribute to style"
description: "Convert HTML attributes to inline CSS in your HTML emails."
---

# Attribute to style

Duplicate HTML attributes to inline CSS.

## Usage

This Transformer is part of the CSS inlining process, you may enable it in your `config.js` under the `css.inline` key:

```js [config.js]
export default {
  css: {
    inline: {
      attributeToStyle: true,
    }
  }
}
```

Given this HTML:

```html
<table width="100%">
  <tr>
    <td>
      <p>The quick brown fox jumped over the lazy dog.</p>
    </td>
  </tr>
</table>
```

It will transform it to:

```html
<table width="100%" style="width: 100%">
  <tr>
    <td>
      <p>The quick brown fox jumped over the lazy dog.</p>
    </td>
  </tr>
</table>
```

## Customization

You may enable it only for some attributes:

```js [config.js]
export default {
  css: {
    inline: {
      attributeToStyle: ['width', 'bgcolor', 'background'],
    }
  }
}
```

... or for all supported attributes:

```js [config.js]
export default {
  css: {
    inline: {
      attributeToStyle: ['width', 'height', 'bgcolor', 'background', 'align', 'valign'],
    }
  }
}
```

## Supported attributes

The following attributes can be duplicated as inline CSS.

### width

Inlined as: `width: ${value}${unit}`

Notes: supports only `px` and `%` values (defaults to `px`)

### height

Inlined as: height: ${value}${unit}

Notes: supports only `px` and `%` values (defaults to `px`)

### bgcolor

Inlined as: `background-color: ${value}`

### background

Inlined as: `background-image: url('${value}')`

### align

1. On `<table>` elements

    - `left` or `right` values inlined as `float: ${value}`
    - `center` value inlined as `margin-left: auto; margin-right: auto`

1. On any other elements, it is inlined as `text-align: ${value}`

### valign

Inlined as `vertical-align: ${value}`

## Overriding

This Transformer runs right before CSS inlining, so you can still override it through Tailwind CSS utility classes.

## API

The second argument must be an array of attribute names to handle:

```js [app.js]
import { attributeToStyle } from '@maizzle/framework'

const html = await attributeToStyle('html string', ['width'])
```
