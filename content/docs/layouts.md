---
title: "Layouts"
description: "See how to use layouts with templating inheritance to build your HTML emails in Maizzle."
---

# Layouts

**👋 New syntax**

You are viewing the documentation for Layouts built with the new Components syntax introduced in `v4.4.0`.
Not ready to switch yet? We still support `<extends>` and `<block>`, see the [legacy Layouts docs](https://v43x.maizzle.com/docs/layouts).

---

The workflow in Maizzle is structured around the concept of Layouts and Templates.

A Layout is basically a Component that contains the `doctype`, `<head>` and `<body>` tags of your HTML - the kind of code that changes rarely and can be reused.

A Layout may include `slot` tags that can be filled by Templates. This allows us to create a parent-child relationship between Layouts and Templates.

In Maizzle, we use the `<slot:template />` tag in the `<body>` of the `main.html` Layout to define where a Template's HTML should be injected.

## Getting started

Layouts are typically stored in the `src/layouts` directory.

<alert>Need to store them elsewhere? Make sure to [update the config](/docs/configuration/components#folders).</alert>

They must contain the `page.css` variable inside a `<style>` tag (for Tailwind CSS to work), and at least one `slot` where to inject the Template's HTML.

Here's a very basic `layout.html`:

<code-sample title="src/layouts/layout.html">

  ```xml
  <!doctype html>
  <html>
  <head>
    <style>{{{ page.css }}}</style>
  </head>
  <body>
    <slot:template />
  </body>
  ```

</code-sample>

From a Template, you can then `fill` that `slot` with your markup:

<code-sample title="src/templates/example.html">

  ```xml
  <x-layout>
    <fill:template>
      <!-- your email HTML... -->
    </fill:template>
  </x-layout>
  ```

</code-sample>

Of course, you're free to name the slot whatever you want, like `<slot:body />`, in which case you'd use `<fill:body>` in the Template.

## Variables

Variables from your [Environment config](/docs/environments) or from the Template's own Front Matter are available in a Layout under the `page` object.

You can use the curly braces [expression syntax](/docs/expressions) to output variables in a Layout:

```xml
<meta charset="{{ page.charset || 'utf8' }}">
```

As you can see, inside curly braces you can write basic JavaScript expressions. These will be evaluated and the result will be output in your HTML.

### Compiled CSS

The compiled Tailwind CSS for the current Template is available under `page.css` - you need to output it in a `<style>` tag in your Layout in order for Tailwind CSS to work:

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
