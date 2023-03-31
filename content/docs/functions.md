---
title: "Functions"
description: "Programmatically configure Maizzle or use the output of other Node.js packages as variables in your email templates"
---

# Config Functions

Maizzle is fully configured in JavaScript, so you can programmatically set config options or process and make data available to your Templates.

## Defining functions

When defining a function, you need to make sure that:

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
  <x-main>
    {{ page.foo }}
    {{ page.bar }}
    {{ page.wha }}
  </x-main>
  ```

</code-sample>

Result:

<code-sample title="build_production/example.html">

  ```xml
  manchu baz implicit return 👌
  ```

</code-sample>
