---
title: "Inline CSS"
description: "Inline CSS in your HTML emails for better email client compatibility"
---

# Inline CSS

Automatically inline CSS from `<style>` tags in your HTML emails.

CSS inlining is still important in HTML email, mainly because of Outlook on Windows, which doesn't support multiple classes on elements.

It can also help preserve a decent layout in email clients that do not support embedded CSS (in `<style>` tags), or when an email is forwarded.

Not to mention that the utility-first approach in Tailwind CSS works great with CSS inlining: utility classes are not 'global', so you won't end up with a `font-family` inlined on every element.

## Usage

To enable CSS inlining, simply set `inlineCSS` to `true` in your config:

```js [config.js]
module.exports = {
  inlineCSS: true,
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
module.exports = {
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

Type: Array\
Default: `[]`

Array of HTML elements that will receive `width` attributes based on inline CSS width.

Defaults to an empty array `[]` so that no `width` attributes are added.

Works together with `styleToAttribute`.

```js [config.js]
module.exports = {
  inlineCSS: {
    applyWidthAttributes: ['table', 'td', 'th']
  }
}
```

### applyHeightAttributes

Type: Array\
Default: `[]`

Array of HTML elements that will receive `height` attributes based on inline CSS height.

Defaults to an empty array `[]` so that no `height` attributes are added.

Works together with `styleToAttribute`.

```js [config.js]
module.exports = {
  inlineCSS: {
    applyHeightAttributes: ['table', 'td', 'th']
  }
}
```

### keepOnlyAttributeSizes

Define for which elements should Maizzle keep _only_ attribute sizes, like `width=""` and `height=""`. Elements in these arrays will have their inline CSS widths and heights removed.

It's set to empty arrays by default, so that no elements are affected:

```js [config.js]
module.exports = {
  inlineCSS: {
    keepOnlyAttributeSizes: {
      width: [],
      height: []
    }
  }
}
```

You can add HTML elements like this:

```js [config.js]
module.exports = {
  inlineCSS: {
    keepOnlyAttributeSizes: {
      width: ['table', 'td', 'th', 'img', 'video'],
      height: ['table', 'td', 'th', 'img', 'video']
    }
  }
}
```

<Alert>This will only work for elements defined in [styleToAttribute](#style-to-attribute)</Alert>

<Alert type="warning">Using only attribute sizes is known to cause <a href="https://www.courtneyfantinato.com/correcting-outlook-dpi-scaling-issues/">scaling issues in Outlook</a></Alert>

### preferBgColorAttribute

Type: Boolean|Array\
Default: `false`

Enable this option to remove any inlined `background-color` CSS properties but keep any corresponding `bgcolor` attributes.

```js [config.js]
module.exports = {
  inlineCSS: {
    preferBgColorAttribute: true
  }
}
```

You may pass an array of tag names that it should remove the `background-color` from:

```js [config.js]
module.exports = {
  inlineCSS: {
    preferBgColorAttribute: ['td'] // default: ['body', 'marquee', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr']
  }
}
```

In the example above, `background-color` will be removed only from `<td>` elements.

<Alert>You most likely won't need to use this. CSS background-color is well-supported in HTML email.</Alert>

### excludedProperties

Type: Array\
Default: `[]`

Array of CSS property names that should be excluded from the CSS inlining process.

Names are considered unique, so you will need to specify each one you'd like to exclude.

For example:

```js [config.js]
module.exports = {
  inlineCSS: {
    excludedProperties: ['padding', 'padding-left']
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

## Prevent inlining

Use the `data-embed` attribute on a `<style>` tag to prevent Juice from inlining the CSS inside it. Useful for writing email client CSS hacks, or for preserving CSS comments when using the [`removeCSSComments: false`](/docs/transformers/remove-unused-css#removecsscomments) Cleanup option.

<Alert>CSS selectors that don't appear in your markup will still need to be [whitelisted](/docs/transformers/remove-unused-css#whitelist).</Alert>

## API

You may pass your own CSS to inline through the `customCSS` option.

If you don't specify `customCSS`, your HTML string will need to have a `<style>` with CSS tag in the `<head>`, so it can be inlined instead.

Additionally, you may configure the [Juice](https://www.npmjs.com/package/juice) library by passing options in the same object.

```js [app.js]
const {inlineCSS} = require('@maizzle/framework')
const config = {
  customCSS: '',
  excludedProperties: ['padding', 'padding-left'] // Juice option
}

const html = await inlineCSS('html string', config)
```
