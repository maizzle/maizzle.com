---
title: "Components configuration"
description: "Configuring components in Maizzle"
---

# Components configuration

Control where your Components live and how you reference them.

### root

You may define the path where your Components are located:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      components: {
        root: 'src/components'
      }
    }
  }
  ```

</code-sample>

This will allow you to reference components like so:

<code-sample title="src/templates/example.html">

  ```xml
  <component src="example.html"></component>
  ```

</code-sample>

### tags

Additionally, you may also customize the tag and attribute:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      components: {
        tag: 'module',
        attribute: 'href'
      }
    }
  }
  ```

</code-sample>

The above would allow you to pull in Components using the following markup:

<code-sample title="src/templates/example.html">

  ```xml
  <module href="src/components/example.html"></module>
  ```

</code-sample>
