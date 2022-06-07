---
title: "Remove attributes"
description: "Automatically remove attributes from your HTML email."
---

# Remove attributes

Maizzle can be configured to remove attributes from your HTML after it compiles it.

## Usage

<code-sample title="config.js">

  ```js
  module.exports = {
    removeAttributes: [
      {name: 'data-src'}, // remove empty data-src="" attributes
      {name: 'foo', value: 'bar'}, // remove all foo="bar" attributes
    ]
  }
  ```

</code-sample>

Internally, Maizzle uses this to remove any CSS inlining leftovers, like `style=""`.

## API

<code-sample title="app.js">

  ```js
  const {removeAttributes} = require('@maizzle/framework')
  const options = [
    {name: 'id'},
    {name: 'role', value: 'article'}
  ]

  const html = await removeAttributes(`<div id="" style="" role="article"></div>`, options)
  ```

</code-sample>
