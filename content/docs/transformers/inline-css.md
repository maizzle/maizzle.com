---
title: "Inline CSS"
description: "Inline CSS in your HTML emails for better email client compatibility"
---

# Inline CSS

Automatically inline CSS from `<style>` tags in your HTML emails.

CSS inlining is still important in HTML email, mainly because of Outlook on Windows, which doesn't support multiple classes on elements.

At the same time, CSS inlining can help preserve a decent layout in email clients that do not support embedded CSS (in `<style>` tags), or when an email is forwarded.

## Usage

To enable CSS inlining, simply set `inlineCSS` to `true` in your config:

<code-sample title="config.js">

  ```js
  module.exports = {
    inlineCSS: true,
  }
  ```

</code-sample>

<alert>You will want to turn CSS inlining off when developing ⚡[AMP4EMAIL templates](/guides/amp-email)</alert>

## Customization

If you need control over how your CSS is inlined, you may pass a configuration object to `inlineCSS`.
Doing this in your Environment `config.js` will enable CSS inlining for all Templates when building for that Environment.

### Style to attribute

Defines which CSS properties should be duplicated as what HTML attributes.

It runs by default as part of the CSS inlining process and it duplicates `vertical-align` as `valign`, but you may customize the property-attribute mapping.

For example, this property-attribute assignment:

<code-sample title="config.js">

  ```js
  module.exports = {
    inlineCSS: {
      styleToAttribute: {
        'background-color': 'bgcolor',
      }
    }
  }
  ```

</code-sample>

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

### Attribute to style

Duplicates specified HTML attributes as inline CSS.

See the documentation [here](/docs/transformers/attribute-to-style).

### Width attributes

Array of HTML elements that will receive `width` attributes based on inline CSS width.

Defaults to an empty array `[]` so that no `width` attributes are added.

Works together with `styleToAttribute`.

<code-sample title="config.js">

  ```js
  module.exports = {
    inlineCSS: {
      applyWidthAttributes: ['TABLE', 'TD', 'TH']
    }
  }
  ```

</code-sample>

### Height attributes

Array of HTML elements that will receive `height` attributes based on inline CSS height.

Defaults to an empty array `[]` so that no `height` attributes are added.

Works together with `styleToAttribute`.

<code-sample title="config.js">

  ```js
  module.exports = {
    inlineCSS: {
      applyHeightAttributes: ['TABLE', 'TD', 'TH']
    }
  }
  ```

</code-sample>

### Keep only attribute sizes

Define for which elements should Maizzle keep _only_ attribute sizes, like `width=""` and `height=""`. Elements in these arrays will have their inline CSS widths and heights removed.

It's set to empty arrays by default, so that no elements are affected:

<code-sample title="config.js">

  ```js
  module.exports = {
    inlineCSS: {
      keepOnlyAttributeSizes: {
        width: [],
        height: []
      }
    }
  }
  ```

</code-sample>

You can add HTML elements like this:

```js
module.exports = {
  inlineCSS: {
    keepOnlyAttributeSizes: {
      width: ['TABLE', 'TD', 'TH', 'IMG', 'VIDEO'],
      height: ['TABLE', 'TD', 'TH', 'IMG', 'VIDEO']
    }
  }
}
```

<alert>This will only work for elements defined in [styleToAttribute](#style-to-attribute)</alert>

<alert type="warning">Using only attribute sizes is known to cause <a href="https://www.courtneyfantinato.com/correcting-outlook-dpi-scaling-issues/">scaling issues in Outlook</a></alert>

### Prefer bgcolor attribute

Enable this option to remove any inlined `background-color` CSS properties, but keep any corresponding `bgcolor` attributes.

<code-sample title="config.js">

  ```js
  module.exports = {
    inlineCSS: {
      preferBgColorAttribute: true
    }
  }
  ```

</code-sample>

You may pass an array of tag names that it should remove the `background-color` from:

<code-sample title="config.js">

  ```js
  module.exports = {
    inlineCSS: {
      preferBgColorAttribute: ['td'] // default: ['body', 'marquee', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr']
    }
  }
  ```

In the example above, `background-color` will be removed only from `<td>` elements.

<alert>You most likely won't need to use this. CSS background-color is well-supported in HTML email.</alert>

### Excluded properties

Array of CSS property names that should be excluded from the CSS inlining process.

Names are considered unique, so you will need to specify each one you'd like to exclude.

For example:

<code-sample title="config.js">

  ```js
  module.exports = {
    inlineCSS: {
      excludedProperties: ['padding', 'padding-left']
    }
  }
  ```

</code-sample>

<alert>`--tw-shadow` is automatically excluded from the properties that can be inlined.</alert>

## Prevent inlining

Use the `data-embed` attribute on a `<style>` tag to prevent Juice from inlining the CSS inside it.
Useful for writing email client CSS hacks, or for preserving CSS comments in tandem with the [`removeCSSComments: false`](/docs/transformers/remove-unused-css#removecsscomments) Cleanup option.

<alert>CSS selectors that don't appear in your markup, like for email client targeting, will still need to be [whitelisted](/docs/transformers/remove-unused-css#whitelist) so that they do not get purged.</alert>

## API

You may pass your own CSS through the `customCSS` option.

If you don't specify `customCSS`, your HTML string will need to have a `<style>` with CSS tag in the `<head>`.

Additionally, you may configure the [Juice](https://www.npmjs.com/package/juice) library by passing options in the same object.

<code-sample title="app.js">

  ```js
  const {inlineCSS} = require('@maizzle/framework')
  const config = {
    customCSS: '',
    excludedProperties: ['padding', 'padding-left'] // Juice option
  }

  const html = await inlineCSS('html string', config)
  ```

</code-sample>
