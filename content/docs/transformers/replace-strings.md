---
title: "Replace strings"
description: "Programmatically replace strings in your HTML email content."
---

# Replace strings

Maizzle can batch-replace strings in your HTML email template, and you can even use regular expressions!

## Usage

Use the `replaceStrings` option to define key-value pairs of regular expressions and strings to replace them with:

```js [config.js]
module.exports = {
  replaceStrings: {
    'find and replace this exact string': 'with this one',
    '\\s?data-src=""': '', // remove empty data-src="" attributes
  }
}
```

<Alert type="warning">Character classes need to be escaped when defining a regular expression for `replaceStrings`. As you can see above, `\s` becomes `\\s`.</Alert>

## API

```js [app.js]
const {replaceStrings} = require('@maizzle/framework')

const html = await replaceStrings('initial text', {initial: 'updated'})
```
