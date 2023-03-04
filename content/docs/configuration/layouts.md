---
title: "Layouts configuration"
description: "Configuring layout options in Maizzle"
---

# Layouts configuration

Configure where your Layouts are located, and how you reference them.

### root

You may define the path where your Layouts are located:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      layouts: {
        root: './src/layouts'
      }
    }
  }
  ```

</code-sample>

You will then be able to extend Layouts by referencing them relative to that path - no need to write out the full path relative to your project root:

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="main.html">
    <block name="template">
      <!-- ... -->
    </block>
  </extends>
  ```

</code-sample>

<alert type="danger">If you're extending a file that also extends a file (i.e. when extending a Template), this will not work. Instead, don't define the `root` key and only use project root-relative paths (i.e. `<extends src="/templates/template.html">`)</alert>

### tagName

You may also customize the `<extends>` tag name:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      layouts: {
        tagName: 'layout'
      }
    }
  }
  ```

</code-sample>

Usage:

<code-sample title="src/templates/example.html">

  ```xml
  <layout src="src/layouts/main.html">
    <block name="template">
      <!-- ... -->
    </block>
  </layout>
  ```

</code-sample>
