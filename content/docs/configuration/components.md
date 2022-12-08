---
title: "Components configuration"
description: "Configuring components in Maizzle"
---

# Components configuration

Control where your Components live and how you reference them.

<alert class="lg:hidden">We're testing a new components system for v4.4.0 - [give it a try](https://github.com/maizzle/framework/releases/tag/v4.4.0-beta.1)!</alert>

## root

By default, when using a Component you have to reference its path relative to your project root, like this:

<code-sample title="src/templates/example.html">

  ```xml
  <component src="src/components/example.html">
    Content to pass inside component...
  </component>
  ```

</code-sample>

However, you may set a base path for Components in your `config.js`:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      components: {
        root: 'src/components',
      }
    }
  }
  ```

</code-sample>

This way, you can reference them relative to that `root` path and write less code:

<code-sample title="src/templates/example.html">

  ```xml
  <component src="example.html">
    Content to pass inside component...
  </component>
  ```

</code-sample>

## attribute

Use a custom attribute name:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      components: {
        attribute: 'href',
      }
    }
  }
  ```

</code-sample>

You can now use `href` instead of `src`:

<code-sample title="src/templates/example.html">

  ```xml
  <component href="src/components/example.html">
    Content to pass inside component...
  </component>
  ```

</code-sample>

## tag

Use a custom tag name:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      components: {
        tag: 'module',
      }
    }
  }
  ```

</code-sample>

Example:

<code-sample title="src/templates/example.html">

  ```xml
  <module src="src/components/example.html">
    Content to pass inside component...
  </module>
  ```

</code-sample>
