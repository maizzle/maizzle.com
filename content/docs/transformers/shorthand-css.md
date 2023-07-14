---
title: "Shorthand CSS"
description: "Group CSS properties of the same type into shorthand inline CSS in your HTML email"
---

# Shorthand CSS

Rewrite longhand CSS inside `style` attributes with shorthand syntax. Only works with `margin`, `padding` and `border`, and only when all sides are specified.

Something like this:

```xml
<p class="mx-2 my-4">Example</p>
```

... instead of becoming this:

```xml
<p style="margin-left: 2px; margin-right: 2px; margin-top: 4px; margin-bottom: 4px;">Example</p>
```

... is rewritten to this:

```xml
<p style="margin: 4px 2px;">Example</p>
```

By default, `shorthandCSS` is disabled.

## Usage

Enable it for all tags:

```js [config.js]
module.exports = {
  shorthandCSS: true,
}
```

Enable it only for a selection of tags:

```js [config.js]
module.exports = {
  shorthandCSS: ['td', 'div'],
}
```

## Disabling

Set it to `false` or simply omit it:

```js [config.js]
module.exports = {
  shorthandCSS: false,
}
```

## API

```js [app.js]
const {shorthandCSS} = require('@maizzle/framework')

const html = await shorthandCSS('html string')
```
