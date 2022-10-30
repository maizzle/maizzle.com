---
title: "Layouts"
description: "See how to use layouts with templating inheritance to build your HTML emails in Maizzle."
---

# Layouts

Layouts are the foundation of any email template in Maizzle.

Besides the standard parent-child templating relation, you can use Layouts to define markup that doesn't need to change often, like `doctype`, and `<head>` or `<body>` tags, with all the necessary child tags, like `<meta>`.

## Creating Layouts

Layouts are typically stored in the `src/layouts` directory.
Create a `layout.html` file with the required tags to yield the CSS and the Template body:

<code-sample title="src/layouts/main.html">

  ```xml
  <!doctype html>
  <html>
  <head>
    <style>{{{ page.css }}}</style>
  </head>
  <body>
    <block name="template"></block>
  </body>
  ```

</code-sample>

You can use this as a Layout that your Templates [extend](/docs/templates#extending-layouts).

## Template Blocks

The Layout in the example above uses a `<block>` tag that acts like a 'marker'.

For each Template that [extends](/docs/templates#extends) this Layout, that marker is replaced with the contents of the Template's own `<block name="template">`.

Of course, you can use custom names for blocks, like `<block name="content">`.

### Gotchas

Common pitfalls when using blocks.

#### Blocks don't work in Components

This won't work:

<code-sample title="src/components/example.html">

  ```xml
  <block name="template">
    <content></content>
  </block>
  ```

</code-sample>

#### Extending from Components doesn't work

Blocks only work in a parent-child relationship, where the `<block>` in the child is added inside an `<extends>` tag.

One exception to this is inside Components, where something like this will not work:

<code-sample title="src/components/example.html">

  ```xml
  <extends name="src/components/another-component.html">
    <block name="template">
      <content></content>
    </block>
  </extends>
  ```

</code-sample>

That will only render what was passed to the `example.html` Component, leaving the rest of the markup untouched:

<code-sample title="src/templates/example.html">

  ```xml
  <component src="src/components/example.html">
    content passed to component
  </component>
  ```

</code-sample>

Result:

<code-sample title="src/templates/example.html">

  ```xml
  <extends name="src/components/another-component.html">
    <block name="template">
      content passed to component
    </block>
  </extends>
  ```

</code-sample>

#### Block tags are not self-closing

`<block>` tags must always be closed:

<code-sample title="src/layouts/main.html">

  ```xml
  <block name="template"></block>
  ```

</code-sample>

If you write them as `<block name="template" />`, everything after the tag will be ignored.

## Variables

Variables from your [Environment config](/docs/environments) or from the Template's own Front Matter are available in a Layout under the `page` object.

You can use curly braces to output variables:

```xml
<meta charset="{{ page.charset || 'utf8' }}">
```

As you can see, inside curly braces you can write basic JavaScript expressions. These will be evaluated and the result will be output in your HTML.

### Compiled CSS

The compiled Tailwind CSS for the current Template is available under `page.css` :

```html
<style>{{{ page.css }}}</style>
```

We use 3 curly braces so that we output the CSS without escaping it - this is required for quoted property values, so that we don't get `&quot;` instead of `"` in CSS property values like `url("")` or in multi-word font names like in `font-family: "Open Sans", sans-serif`.

### Environment

The Environment name is available under `page.env`. You can use it to output stuff based on the `build` command that you ran.

For example, we could use `page.env` to output some content only when running the `maizzle build production` command:

```xml
<if condition="page.env === 'production'">
  <p>This text will show when running `maizzle build production`</p>
</if>
```

## Configuration

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
