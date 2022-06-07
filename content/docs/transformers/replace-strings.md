---
title: "Replace strings"
description: "Replace strings in your HTML email content"
---

# Replace strings

Maizzle can batch-replace strings in your HTML email template, and it even works with regular expressions!

## Usage

Use the `replaceStrings` option to define key-value pairs of regular expressions and strings to replace them with:

<code-sample title="config.js">

  ```js
  module.exports = {
    replaceStrings: {
      'find and replace this exact string': 'with this one',
      '\\s?data-src=""': '', // remove empty data-src="" attributes
    }
  }
  ```

</code-sample>

<alert type="warning">Character classes need to be escaped when defining a regular expression for `replaceStrings`. As you can see above, `\s` becomes `\\s`.</alert>

## API

<code-sample title="app.js">

  ```js
  const {replaceStrings} = require('@maizzle/framework')

  const html = await replaceStrings('initial text', {initial: 'updated'})
  ```

</code-sample>
