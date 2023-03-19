---
title: "Layouts configuration"
description: "Configuring layout options in Maizzle"
---

# Layouts configuration

**⚠️ Deprecation notice**

The docs on this page apply only to the [legacy Layouts syntax](https://v43x.maizzle.com/docs/layouts), that used `<extends>` / `<block>` tags. If you're using the new, x-tags Components syntax (which we recommended), you don't need it.

This configuration is now deprecated and will be removed in the next major release.

---

You may use the `layouts` key in `config.js` to customize the way you use Layouts:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      layouts: {
        // ... options
      }
    }
  }
  ```
</code-sample>

Let's take a look at the available options:

### Encoding

You may specify the encoding used by your Layout files through the `encoding` option:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      layouts: {
        encoding: 'windows-1250',
      }
    }
  }
  ```
</code-sample>

By default, this is set to `utf8`.

<alert>This encoding is only used when reading a Layout file from disk, it does not automatically set the `<meta charset>` tag in your compiled Template.</alert>

### Blocks

Normally, Template Blocks are defined through the `<block>` tag.

However, you may customize this tag name:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      layouts: {
        slotTagName: 'slot', // default: 'block'
        fillTagName: 'fill' // default: 'block'
      }
    }
  }
  ```

</code-sample>

Now you can use `<slot>` tags in the Layout, and `<fill>` tags in your Template:

<code-sample title="src/layouts/main.html">

  ```xml
  <!doctype html>
  <html>
  <head>
    <style>{{{ page.css }}}</style>
  </head>
  <body>
    <slot name="template"></slot>
  </body>
  ```

</code-sample>

<code-sample title="src/templates/example.html">

  ```xml
  ---
  title: "A template with a <fill> tag"
  ---

  <extends src="src/layouts/main.html">
    <fill name="template"></fill>
  </extends>
  ```

</code-sample>

### Root

You may define a path to the directory where your Layouts live:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      layouts: {
        root: 'src/layouts',
      }
    }
  }
  ```

</code-sample>

This allows you to specify a `src=""` relative to the path in that `root` key:

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="main.html">
    <block name="template">
      <!--  -->
    </block>
  </extends>
  ```

</code-sample>

<alert type="danger">If you're extending a file that also extends a file (i.e. when extending a Template), this will not work. Instead, don't define the `root` key and only use project root-relative paths (i.e. `src/templates/template.html`)</alert>

### Tag

You may use a tag name other than `extends`:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      layouts: {
        tagName: 'layout',
      }
    }
  }
  ```

</code-sample>

<code-sample title="src/templates/example.html">

  ```xml
  <layout src="src/layouts/main.html">
    <block name="template">
      <!-- ... -->
    </block>
  </layout>
  ```

</code-sample>
