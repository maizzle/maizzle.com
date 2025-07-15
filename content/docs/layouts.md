---
title: "Layouts"
description: "How to use layouts with templating inheritance to build HTML emails in Maizzle."
---

# Layouts

The workflow in Maizzle revolves around the concept of Layouts, Templates and Components.

A Layout is basically a [Component](/docs/components) that contains the `doctype`, `<head>` and `<body>` tags of your HTML - the kind of code that changes rarely and can be reused.

Layouts may include a `<yield />` tag, which can be used to render a Template. This allows us to create a parent-child relationship between Layouts and Templates.

In Maizzle we add this `<yield />` tag in the `<body>` of the `main.html` Layout, to define where a Template's HTML should be injected.

## Getting started

Layouts are typically stored in the `layouts` directory.

<Alert>Need to store them elsewhere? Make sure to [update the config](/docs/configuration/components#folders).</Alert>

Layouts must include a `<yield />` tag, which is used to define where the Template's HTML will be rendered.

Here's a very basic `layout.html`:

```html [layouts/main.html] {10}
<!doctype html>
<html>
<head>
  <style>
    @tailwind components;
    @tailwind utilities;
  </style>
</head>
<body>
  <yield /> // [!code ++]
</body>
```

<Alert>For Tailwind CSS to work, Layouts must include it either via a `<style>` tag like above or through a `<link>` tag that references a CSS file.</Alert>

When creating a Template, you may use that Layout like this:

```html [emails/example.html]
<x-main>
  <!-- your email template HTML... -->
</x-main>
```

As you can see, the `<x-main>` tag name is based on the Layout's file name, with the `.html` extension removed, here are some examples:

| Layout file name        | Layout tag name |
|-------------------------|-----------------|
| `layouts/main.html` | `<x-main>`      |
| `layouts/alt.html`  | `<x-alt>`       |

Read more about this in the [Components docs](/docs/components#x-tag).

## Tailwind CSS

In order for Tailwind CSS to work, you need to include it in a `<style>` or `<link>` tag.

### style tag

Add the `@tailwind` directives in a `<style>` tag inside the `<head>` of your Layout:

```html [layouts/main.html] diff {4-7}
<!doctype html>
<html>
<head>
  <style> /* [!code ++] */
    @​tailwind components; /* [!code ++] */
    @​tailwind utilities; /* [!code ++] */
  </style> // [!code ++]
</head>
<body>
  <yield />
</body>
```

<Alert>We don't recommend using `@tailwind base` because it contains CSS resets that won't work or are not needed in HTML emails. Also, some resets in there use the `*` selector, which can cause issues when CSS is inlined.</Alert>

### link tag

Maizzle also supports `<link rel="stylesheet">` tags - it will try to read the file from the `href` attribute and process it with PostCSS (including Tailwind CSS). Note that this currently only works with local files.

```html [layouts/main.html] {4}
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="css/tailwind.css" inline> // [!code ++]
</head>
<body>
  <yield />
</body>
```

<Alert>Make sure to include the `inline` attribute on the `<link>` tag, this will replace it with a `<style>` tag that can be inlined and is generally better supported in email clients.</Alert>

Then, in your `tailwind.css` file:

```css [css/tailwind.css]
@tailwind components;
@tailwind utilities;
```

## Variables

Variables from your [Environment config](/docs/environments) or from the Template's own Front Matter are available in a Layout under the `page` object.

You can use the curly braces [expression syntax](/docs/expressions) to output variables in a Layout:

```html
<meta charset="{{ page.charset || 'utf8' }}">
```

Basic JavaScript expressions are supported inside curly braces. These expressions will be evaluated and the result will be rendered in your HTML.

### Environment

The Environment name is available under `page.env`. You can use it to output stuff based on the `build` command that you ran.

For example, you could use `page.env` to output some content only when running the `maizzle build production` command:

```html [layouts/layout.html]
<if condition="page.env === 'production'">
  <p>This text will show when running `maizzle build production`</p>
</if>
```

<Alert>You may also use the `<env:production>` tag, [see the docs](/docs/tags#env).</Alert>
