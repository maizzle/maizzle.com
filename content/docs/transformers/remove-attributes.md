---
title: "Remove attributes"
description: "Automatically remove attributes from your HTML email."
---

# Remove attributes

Maizzle can automatically remove attributes from your HTML.

By default, it removes empty `style` and `class` attributes that are sometimes left over after the CSS inlining process.

## Usage

You may configure which attributes to remove through the `removeAttributes` array.

### Empty values

To remove attributes with no values, specify the attribute name as a string:

<code-sample title="config.js">

  ```js
  module.exports = {
    removeAttributes: ['data-src']
  }
  ```

</code-sample>

Input:

<code-sample title="src/templates/example.html">

  ```xml
  <img src="example.jpg" data-src alt="">
  ```

</code-sample>

Output:

<code-sample title="src/templates/example.html">

  ```xml
  <img src="example.jpg" alt="">
  ```

</code-sample>

<alert>Maizzle automatically removes empty `style` and `class` attributes, no need to add them yourself.</alert>

### By name and value

If you know the exact name and value of the attribute, you may pass them as an object:

<code-sample title="config.js">

  ```js
  module.exports = {
    removeAttributes: [
      {name: 'id', value: 'test'}
    ]
  }
  ```

</code-sample>

Input:

<code-sample title="src/templates/example.html">

  ```xml
  <div style="color: #000" id="test">Test</div>
  ```

</code-sample>

Output:

<code-sample title="src/templates/example.html">

  ```xml
  <div style="color: #000">Test</div>
  ```

</code-sample>

### With a RegExp

You may also use a regular expression for the `value`.

All attributes with a value matching the regex will be removed:

<code-sample title="config.js">

  ```js
  module.exports = {
    removeAttributes: [
      {name: 'data-id', value: /\d/}
    ]
  }
  ```

</code-sample>

Input:

<code-sample title="src/templates/example.html">

  ```xml
  <div data-id="test"></div>
  <div data-id="99"></div>
  ```

</code-sample>

Output:

<code-sample title="src/templates/example.html">

  ```xml
  <div data-id="test"></div>
  <div></div>
  ```

</code-sample>

## API

<code-sample title="app.js">

  ```js
  const {removeAttributes} = require('@maizzle/framework')
  const options = [
    'id',
    {name: 'role', value: 'article'}
  ]

  const html = await removeAttributes(`<div id="" style="" role="article"></div>`, options)
  ```

</code-sample>
