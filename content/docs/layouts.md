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

A Layout may include a `<content />` tag, which will be used to render a Template. This allows us to create a parent-child relationship between Layouts and Templates.

In Maizzle, we add this `<content />` tag in the `<body>` of the `main.html` Layout to define where a Template's HTML should be injected.

## Getting started

Layouts are typically stored in the `src/layouts` directory.

<alert>Need to store them elsewhere? Make sure to [update the config](/docs/configuration/components#folders).</alert>

Layouts must include a `<content />` tag, which is where the Template's HTML will be rendered.
Here's a very basic `layout.html`:

<code-sample title="src/layouts/layout.html">

  ```xml
  <!doctype html>
  <html>
  <head>
    <style>{{{ page.css }}}</style>
  </head>
  <body>
    <content />
  </body>
  ```

</code-sample>

<alert>For Tailwind CSS to work, Layouts must also include the `page.css` variable inside a `<style>` tag.</alert>

When creating a Template, you may use that Layout like this:

<code-sample title="src/templates/example.html">

  ```xml
  <x-layout>
    <!-- your email HTML... -->
  </x-layout>
  ```

</code-sample>

As you can see, the `<x-layout>` tag name is based on the Layout's filename, with the `.html` extension removed. Read more about this in the [Components docs](/docs/components#x-tag).

## Variables

Variables from your [Environment config](/docs/environments) or from the Template's own Front Matter are available in a Layout under the `page` object.

You can use the curly braces [expression syntax](/docs/expressions) to output variables in a Layout:

```xml
<meta charset="{{ page.charset || 'utf8' }}">
```

You can write basic JavaScript expressions inside curly braces. These expressions will be evaluated and the result will be rendered in your HTML.

### Compiled CSS

The compiled Tailwind CSS is available under `page.css` - you need to output it in a `<style>` tag in your Layout's `<head>` in order for Tailwind CSS to work:

<code-sample title="src/layouts/layout.html">

  ```diff
  <!doctype html>
  <html>
  <head>
+   <style>{{{ page.css }}}</style>
  </head>
  <body>
    <content />
  </body>
  ```

</code-sample>

We use 3 curly braces so that we output the CSS without escaping it - this is required for quoted property values, so that we don't get `&quot;` instead of `"` in CSS property values like `url("")` or in multi-word font names like in `font-family: "Open Sans", sans-serif`.

### Environment

The Environment name is available under `page.env`. You can use it to output stuff based on the `build` command that you ran.

For example, we could use `page.env` to output some content only when running the `maizzle build production` command:

```xml
<if condition="page.env === 'production'">
  <p>This text will show when running `maizzle build production`</p>
</if>
```
