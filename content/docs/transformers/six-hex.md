---
title: "Six-digit HEX"
description: "Ensure your bgcolor attributes use six-digit hexadecimal"
---

# Six-digit HEX

Some email clients do not support 3-digit HEX colors like `#fff` in `bgcolor` or `<font color="">`. This Transformer ensures that all your HEX colors inside `bgcolor` and `color` attributes are defined with six digits.

For better email client compatibility, it is enabled by default.

## Disabling

You may disable it by setting it to `false`:

<code-sample title="config.js">

  ```js
  module.exports = {
    sixHex: false,
  }
  ```

</code-sample>

## API

<code-sample title="app.js">

  ```js
  const {ensureSixHEX} = require('@maizzle/framework')

  const html = await ensureSixHEX('<td bgcolor="#fff"><font color=""#000>test</font></td>')
  ```

</code-sample>
