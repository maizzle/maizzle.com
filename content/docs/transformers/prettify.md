---
title: "Prettify Email Code"
description: "Pretty-print your HTML email code before sending it to a human."
---

# Prettify Code

Maizzle can pretty print your HTML email code so that it's nicely indented.

Need to send HTML to a human? Enable `prettify` in your config:

## Usage

```js [config.js]
export default {
  prettify: true,
}
```

Enabling it will use this default configuration:

```js
{
  space_around_combinator: true, // Preserve space around CSS selector combinators
  newline_between_rules: false, // Remove empty lines between CSS rules
  indent_inner_html: false, // Helps reduce file size
  extra_liners: [] // Don't add extra new line before any tag
}
```

## Customization

You may configure JS Beautify's CSS and HTML Beautifier options.

Maybe you prefer tabs for indentation?

```js [config.js]
export default {
  prettify: {
    indent_with_tabs: true,
  }
}
```

Checkout the full [list of HTML & CSS beautifier options](https://www.npmjs.com/package/js-beautify#css--html).

## ocd

Type: `Boolean`\
Default: `false`

```js [config.js]
export default {
  prettify: {
    ocd: true,
  }
}
```

This option applies several code indentation strategies:

- condenses multiple newlines to a single newline
- trims leading and trailing whitespace
- ensures that a trailing newline is inserted
- normalizes whitespace before code comments

## API

```js [app.js]
import { prettify } from '@maizzle/framework'

const options = {/* prettify options */}

const html = await prettify('html string', options)
```
