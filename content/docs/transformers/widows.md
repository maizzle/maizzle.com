---
title: "Prevent Widow Words"
description: "Prevent widow words in your HTML email content"
---

# Prevent Widow Words

Add a `prevent-widows` attribute on any HTML tag and the last space in every text node inside it will be replaced with a `&nbsp;`.

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="template">
      <div prevent-widows>
        <p>The quick brown fox jumped over the lazy dog.</p>
      </div>
    </block>
  </extends>
  ```

</code-sample>

That will output:

```xml
<div>
  <p>The quick brown fox jumped over the lazy&nbsp;dog.</p>
</div>
```

## Enable globally

Enable `prevent-widows` globally by adding it to your Layout's `<body>` tag.

<code-sample title="src/layouts/example.html">

  ```xml
  <!DOCTYPE html>
  <html>
    <head></head>
    <body prevent-widows>
      <block name="template"></block>
    </body>
  </html>
  ```

</code-sample>

## API

<code-sample title="app.js">

  ```js
  const {preventWidows} = require('@maizzle/framework')

  const html = await preventWidows('html string')
  ```

</code-sample>
