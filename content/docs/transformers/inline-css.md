---
title: "Inline CSS"
description: "Inline CSS in your HTML emails for better email client compatibility."
---

# Inline CSS

Automatically inline CSS from `<style>` tags in your HTML emails.

CSS inlining is still important in HTML email, mainly because of Outlook on Windows, which doesn't support multiple classes on elements.

It can also help preserve a decent layout in email clients that do not support embedded CSS (in `<style>` tags), or when an email is forwarded.

Not to mention that the utility-first approach in Tailwind CSS works great with CSS inlining: utility classes are not 'global', so you won't end up with a `font-family` inlined on every element (unless you really, really want to).

## Usage

To enable CSS inlining, simply set `css.inline` to `true` in your config:

```js [config.js]
export default {
  css: {
    inline: true,
  }
}
```

<Alert>You will want to keep CSS inlining off when developing ⚡[AMP4EMAIL templates](/guides/amp-email)</Alert>

## Customization

If you need control over how your CSS is inlined, you may pass a configuration object to `inlineCSS`. Doing this in your Environment `config.js` will enable CSS inlining for all Templates when building for that Environment.

### styleToAttribute

Type: Object\
Default: `{}`

Defines which CSS properties should be duplicated as what HTML attributes.

For example, this property-attribute assignment:

```js [config.js]
export default {
  inlineCSS: {
    styleToAttribute: {
      'background-color': 'bgcolor',
    }
  }
}
```

... will transform this:

```xml
<table class="bg-slate-300">
  <tr>
    <td>...</td>
  </tr>
</table>
```

... into this:

```xml
<table bgcolor="#cbd5e1" style="background-color: #cbd5e1">
  <tr>
    <td>...</td>
  </tr>
</table>
```

The available mappings are:

CSS Property | HTML Attribute
--- | ---
`background-color` | `bgcolor`
`background-image` | `background`
`text-align` | `align`
`vertical-align` | `valign`

### attributeToStyle

Duplicates specified HTML attributes as inline CSS.

See the documentation [here](/docs/transformers/attribute-to-style).

### applyWidthAttributes

Type: Boolean\
Default: `true`

Whether to use any CSS pixel widths to create `width` attributes on elements set in `css.inline.widthElements`.

Set it to `false` to prevent any `width` attributes from being added based on inline CSS width:

```js [config.js]
export default {
  css: {
    inline: {
      applyWidthAttributes: false,
    }
  }
}
```

### widthElements

Type: Array\
Default: `['img', 'video']`

Array of HTML elements that can receive `width` attributes based on inline CSS width.

```js [config.js]
export default {
  css: {
    inline: {
      widthElements: ['table', 'td', 'th'],
    }
  }
}
```

### applyHeightAttributes

Type: Boolean\
Default: `true`

Whether to use any CSS pixel heights to create `height` attributes on elements set in `css.inline.heightElements`.

Set it to `false` to prevent any `height` attributes from being added based on inline CSS height:

```js [config.js]
export default {
  css: {
    inline: {
      applyHeightAttributes: false,
    }
  }
}
```

### heightElements

Type: Array\
Default: `['img', 'video']`

Array of HTML elements that can receive `height` attributes based on inline CSS height.

```js [config.js]
export default {
  css: {
    inline: {
      heightElements: ['table', 'td', 'th'],
    }
  }
}
```

### excludedProperties

Type: Array\
Default: `[]`

Array of CSS property names that should be excluded from the CSS inlining process.

Names are considered unique, so you will need to specify each one you'd like to exclude.

For example:

```js [config.js]
export default {
  css: {
    inline: {
      excludedProperties: ['padding', 'padding-left'],
    }
  }
}
```

<Alert>`--tw-shadow` is automatically excluded from the properties that can be inlined.</Alert>

### codeBlocks

Type: Object\
Default: `{ EJS: {}, HBS: {} }`

An object where each value has a start and end to specify fenced code blocks that should be ignored during CSS inlining.

By default, <abbr title="Embedded JavaScript Templates">EJS</abbr> and <abbr title="Handlebars">HBS</abbr> code blocks are ignored:

```js
{
  EJS: { start: '<%', end: '%>' },
  HBS: { start: '{{', end: '}}' },
}
```

### removeInlinedSelectors

Type: Boolean\
Default: `true`

When `css.inline` is enabled, classes will be removed from the `class` attribute of a tag after they have been successfully inlined.

Set this option to `false` to preserve the classes in the `class` attribute.

```js [config.production.js]
export default {
  css: {
    inline: {
      removeInlinedSelectors: false,
    }
  }
}
```

### resolveCSSVariables

Type: Boolean\
Default: `true`

Whether to resolve CSS variables to their actual values in the inlined CSS.

By default, something like this:

```html
<style>
  :root {
    --color: red;
  }
  .text-red { color: var(--color); }
</style>

<div class="text-red">Hello</div>
```

... will be inlined as:

```html
<div style="color: red">Hello</div>
```

If you prefer to keep CSS variables when inlining, set this option to `false`:

```js [config.js]
export default {
  css: {
    inline: {
      resolveCSSVariables: false,
    }
  }
}
```

### resolveCalc

Type: Boolean\
Default: `true`

Whether to resolve `calc()` expressions in the inlined CSS.

By default, something like this:

```html
<style>
  div {
    width: calc(100% / 3);
  }
</style>

<div>Hello</div>
```

... will be inlined as:

```html
<div style="width: 33.33%">Hello</div>
```

### preferUnitlessValues

Type: Boolean\
Default: `true`

When inlining CSS, 0 values will be inlined without units.

For example, `margin: 0px` will be inlined as `margin: 0` instead of `margin: 0px`.

Set this option to `false` to keep units on 0 values.

```js [config.js]
export default {
  css: {
    inline: {
      preferUnitlessValues: false,
    }
  }
}
```

## Prevent inlining

Use the `data-embed` attribute on a `<style>` tag to prevent Juice from inlining the CSS inside it. Useful for writing email client CSS hacks, or for preserving CSS comments when using the [`removeCSSComments: false`](/docs/transformers/remove-unused-css#removecsscomments) Cleanup option.

```html
<style data-embed>
  /* This CSS will not be inlined */
  .text-red { color: red; }
</style>
```

<Alert>CSS selectors that don't appear in your markup will still need to be [whitelisted for purging](/docs/transformers/remove-unused-css#whitelist).</Alert>

## API

You may pass your own CSS to inline through the `customCSS` option.

If you don't specify `customCSS`, your HTML string will need to have a `<style>` with CSS tag in the `<head>`, so it can be inlined instead.

Additionally, you may configure the [Juice](https://www.npmjs.com/package/juice) library by passing options in the same object.

```js [app.js]
import { inlineCSS } from '@maizzle/framework'

const config = {
  customCSS: 'body { background-color: #f8f9fa; }',
  excludedProperties: ['padding', 'padding-left'] // Juice option
}

const html = await inlineCSS('html string', config)
```
