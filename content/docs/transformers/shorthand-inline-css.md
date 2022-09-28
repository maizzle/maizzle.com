---
title: "Shorthand inline CSS"
description: "Group CSS properties of the same type into shorthand inline CSS in your HTML email"
---

# Shorthand inline CSS

Rewrite longhand CSS with shorthand syntax. Only works with `margin`, `padding` and `border`, and only when all sides are specified.

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

By default, `shorthandInlineCSS` is disabled.

## Usage

Enable it for all tags:

<code-sample title="config.js">

  ```js
  module.exports = {
    shorthandInlineCSS: true
  }
  ```

</code-sample>

Enable it only for a selection of tags:

<code-sample title="config.js">

  ```js
  module.exports = {
    shorthandInlineCSS: ['td', 'div']
  }
  ```

</code-sample>

## Disabling

Set it to `false` or simply omit it:

<code-sample title="config.js">

  ```js
  module.exports = {
    shorthandInlineCSS: false
  }
  ```

</code-sample>

## API

<code-sample title="app.js">

  ```js
  const {shorthandInlineCSS} = require('@maizzle/framework')

  const html = await shorthandInlineCSS('html string')
  ```

</code-sample>
