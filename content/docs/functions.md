---
title: "Functions"
description: "Programmatically configure Maizzle or use the output of other Node.js packages as variables in your email templates"
---

# Config Functions

Maizzle is fully configured in JavaScript, so you can programmatically set config options or process and make data available to your Templates.

When using a function, you need to make sure that:

1. it returns something
2. you invoke it

<code-sample title="config.js">

  ```js
  const imaginaryLib = require('imaginary-lib')

  const foo = function() {
    return 'manchu'
  }

  module.exports = {
    foo: foo(), // invoke function defined above
    bar: function() {
      // do stuff and return
      return 'baz'
    }(), // invoke function
    wha: () => imaginaryLib.render('implicit return 👌')
  }
  ```

</code-sample>

You would access those variables under the `page` object:

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="template">
      <p>{{ page.foo }}</p>
      <p>{{ page.bar }}</p>
      <p>{{ page.wha }}</p>
    </block>
  </extends>
  ```

</code-sample>

Result:

<code-sample title="src/templates/example.html">

  ```xml
  <p>manchu</p>
  <p>baz</p>
  <p>implicit return 👌</p>
  ```

</code-sample>
