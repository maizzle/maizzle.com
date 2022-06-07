---
title: "Email Code Minification"
description: "Minify your HTML email code so that your production emails weigh even less and you avoid Gmail clipping."
---

# Minify Email Code

Use the `minify` option to trim down the HTML size of your production emails.

Minified email code weighs less in KB, resulting in faster sendouts, faster opens, and bandwidth savings on limited mobile data plans. Every little bit helps 🙂

Additionally, it reduces the risk of [Gmail clipping](https://github.com/hteumeuleu/email-bugs/issues/41).

## Usage

<code-sample title="config.js">

  ```js
  module.exports = {
    minify: true,
  }
  ```

</code-sample>

## Customization

You may configure the underlying `html-crush` library:

<code-sample title="config.js">

  ```js
  module.exports = {
    minify: {
      lineLengthLimit: 500,
      removeIndentations: true,
      breakToTheLeftOf: [],
    }
  }
  ```

</code-sample>

Checkout the full list of [html-crush options](https://codsen.com/os/html-crush/#optional-options-object).

<alert type="warning">Minifying email code can lead to unexpected results if not done properly. Make sure you know what you're doing, and always test your emails!</alert>

## API

<code-sample title="app.js">

  ```js
  const {minify} = require('@maizzle/framework')
  const options = {/* html-crush options */}

  const html = await minify('html string', options)
  ```

</code-sample>
