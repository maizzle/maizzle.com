---
title: "Tailwind CSS"
description: "Learn how to use Tailwind CSS to create HTML email templates with CSS utility classes"
---

# Using Tailwind CSS

Maizzle uses the [Tailwind CSS](https://tailwindcss.com) framework, so you can quickly style HTML email templates with utility classes instead of writing inline styles.

If you've never worked with CSS utility classes in HTML emails, at first you might say:

> I could just write inline CSS, it's the same thing!

However, utility classes in Tailwind are much more powerful and allow you to:

- style responsive breakpoints
- style pseudos like `:hover`
- do both of the above with one class
- style for dark mode, print, reduced motion and more
- stay on-brand by using a design system in your team

... all while never having to leave your HTML.

Combine that with powerful plugins like `tailwindcss-email-variants` that allow you to target email clients just by using a class like `gmail:hidden` and you can quickly see why utility-first CSS with Tailwind CSS is such a powerful tool for HTML emails.

For most of the time, you won't be writing CSS anymore 😎

## Workflow

The compiled Tailwind CSS is available under `page.css`, so you should first add it inside a `<style>` tag in your Layout's `<head>`:

<code-sample title="src/layouts/main.html">

  ```xml
  <!DOCTYPE html>
  <html>
    <head>
      <if condition="page.css">
        <style>{{{ page.css }}}</style>
      </if>
    </head>
    <body>
      <block name="template"></block>
    </body>
  </html>
  ```

</code-sample>

In the example above, we used a [conditional tag](/docs/tags#conditionals) to output `<style>` only if `page.css` is truthy (i.e. not an empty string).

You might have noticed that we used `{{{ }}}` instead of the usual `{{ }}`.

We do this to avoid double-escaping the CSS, which can break the build process when quoted property values are encountered (for example quoted font family names, background image URLs, etc.).

<alert type="warning">In order to use Tailwind CSS, the Layout that you're extending must output `page.css` inside a `<style>` tag.</alert>

### Utility-first

Simply write your HTML markup and use Tailwind utility classes to style elements.

Instead of writing something like this:

```xml
<table style="width: 100%;">
  <tr>
    <td style="padding: 24px 0; background-color: #e5e7eb;">
      <h1 style="margin: 0; font-size: 36px; font-family: -apple-system, 'Segoe UI', sans-serif; color: #000000;">Some title</h1>
      <p style="margin: 0; font-size: 16px; line-height: 24px; color: #374151;">Content here...</p>
    </td>
  </tr>
</table>
```

You simply write:

<code-sample title="src/templates/example.html">

  ```xml
  <table class="w-full">
    <tr>
      <td class="py-6 px-0 bg-gray-200">
        <h1 class="m-0 text-4xl font-sans text-black">Some title</h1>
        <p class="m-0 text-base leading-6 text-gray-700">Content here...</p>
      </td>
    </tr>
  </table>
  ```

</code-sample>

Read more about the concept of utility-first CSS and familiarize yourself with the syntax in the [Tailwind CSS docs](https://tailwindcss.com/docs/utility-first).

### Components

If you find yourself repeating common utility combinations to apply the same styling in many different places (buttons maybe?), you can extract those to a component.

Tailwind includes an [@apply directive](https://tailwindcss.com/docs/extracting-components#extracting-css-components-with-apply) that can be used to compose custom CSS classes by "applying" Tailwind utilities to it.

Here's a quick example:

```postcss
.button-danger {
  @apply px-6 py-3 text-white bg-red-500;
}
```

Unlike utility classes that you add to `tailwind.config.js`, you add that in a CSS file that Maizzle tells Tailwind to compile along with the rest of the CSS.

And that brings us to...

## CSS Files

The [official Maizzle Starter](https://github.com/maizzle/maizzle) uses a `tailwind.css` file stored in `src/css`.

Although optional, this is included in order to provide an example of how you can use custom CSS components that go beyond the utility-first concept of Tailwind.

For example, Tailwind CSS might not include some utility class that you need. If you want to organize custom utilities and CSS components into files, this is how you do it.

`tailwind.css` does two things:

1. it imports Tailwind CSS components and utilities
2. it imports custom CSS files

<code-sample title="src/css/tailwind.css">

  ```postcss
  /* Tailwind CSS components */
  @import "tailwindcss/components";

  /**
   * @import here any custom CSS components - that is, CSS that
   * you'd want loaded before the Tailwind utilities, so the
   * utilities can still override them.
  */

  /* Tailwind CSS utility classes */
  @import "tailwindcss/utilities";

  /* Your custom utility classes */
  @import "utilities";
  ```

</code-sample>

### Custom file paths

Maizzle will automatically use `src/css/tailwind.css` if it's available.

If you need to use a custom file, you must define its path:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      tailwind: {
        css: 'src/css/custom/tw-custom.css',
      }
    }
  }
  ```

</code-sample>

Again, this is totally optional: you can use Tailwind CSS in Maizzle without creating any CSS file at all! In this case, Tailwind will only generate components and utilities, based on your `tailwind.config.js`.

### Custom CSS

Add custom CSS files anywhere under `src/css`.

Maizzle adds `utilities.css`, which contains a sample custom utility class that Tailwind CSS doesn't provide.

<alert type="warning">Files that you `@import` in `tailwind.css` must be relative to `src/css`</alert>

## Shorthand CSS

<alert>This section refers to writing shorthand CSS inside `<style>` tags. For <em>inline</em> CSS shorthand, see the <nuxt-link to="/docs/transformers/shorthand-inline-css">Shorthand Inline CSS docs</nuxt-link>.</alert>

Maizzle can rewrite your `padding`, `margin`, and `border` CSS properties in shorthand-form, when possible.

Because utility classes map one-to-one with CSS properties, this normally doesn't have any effect with Tailwind CSS. However, in the context of `<style>` tags, it's useful when you extract utilities to components, with Tailwind's `@apply`.

Consider this template:

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="template">
      <div class="col">test</div>
    </block>
  </extends>
  ```

</code-sample>

Let's use `@apply` to compose a `col` class by  extracting two padding utilities:

<code-sample title="src/css/components.css">

  ```postcss
  .col {
    @apply py-2 px-1;
  }
  ```

</code-sample>

Remember to import that file:

<code-sample title="src/css/tailwind.css">

  ```postcss
  /**
   * @import here any custom CSS components - that is, classes that
   * you'd want loaded before the Tailwind utilities, so the
   * utilities can still override them.
  */
  @import "components";
  ```

</code-sample>

When building with CSS inlining enabled, normally that would yield:

<code-sample title="src/templates/example.html">

  ```xml
  <div style="padding-top: 8px; padding-bottom: 8px; padding-left: 4px; padding-right: 4px;">test</div>
  ```

</code-sample>
However, Maizzle will merge those to shorthand-form, so we get this:

<code-sample title="src/templates/example.html">

```xml
<div style="padding: 8px 4px;">test</div>
```

</code-sample>

This results in smaller HTML size, helping to reduce the risk of [Gmail clipping your email](https://github.com/hteumeuleu/email-bugs/issues/41).

Using shorthand CSS for these properties is well supported in email clients and will make your HTML lighter, but the shorthand border is particularly useful because it's the only way Outlook will render it properly.

<alert>For shorthand CSS to work with `padding` or `margin`, you need to specify property values for all four sides. For borders, keep reading.</alert>

### Shorthand borders

To get shorthand-form CSS borders, you need to specify all these:

- border-width
- border-style
- border-color

With Tailwind's `@apply`, that means you can do something like this:

```postcss
.my-border {
  @apply border border-solid border-blue-500;
}
```

... which will turn this:

```xml
<div class="my-border">Border example</div>
```

... into this:

```xml
<div style="border: 1px solid #3f83f8;">Border example</div>
```

## Plugins

To use a Tailwind CSS plugin, simply `npm install` it and follow its instructions to add it to `plugins: []` in your `tailwind.config.js`.
See the [Tailwind CSS docs](https://tailwindcss.com/docs/configuration#plugins).

## Use in Template

You can use Tailwind CSS, including directives like `@apply`, `@responsive`, and even nested syntax, right inside a Template.
You simply need to use a `<block>` to push a `<style tailwindcss>` tag to the Layout being extended.

First, add a `<block name="head">` inside your Layout's `<head>` tag:

<code-sample title="src/layouts/main.html">

  ```xml
  <!DOCTYPE html>
  <html>
  <head>
    <if condition="page.css">
      <style>{{{ page.css }}}</style>
    </if>
    <block name="head"></block>
  </head>
  <body>
    <block name="template"></block>
  </body>
  ```

</code-sample>

Next, use that block in a Template:

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="head">
      <style tailwindcss>
        a {
          @apply text-blue-500;
        }

        @screen sm {
          table {
            @apply w-full;
          }
        }
      </style>
    </block>

    <block name="template">
      <!-- ... -->
    </block>
  </extends>
  ```

</code-sample>

Maizzle will compile the contents of any `<style>` tag that has a `tailwindcss` attribute.

<alert>The `tailwindcss` attribute is only required if you want the CSS to be compiled with Tailwind CSS. If you're just writing regular CSS syntax, you don't need to include this attribute.</alert>

#### postcss attribute

You may also use the `postcss` attribute instead of `tailwindcss`.

This will compile the `<style postcss>` contents with PostCSS and any plugins you've enabled, including:

- postcss-import
- postcss-nested
- postcss-merge-longhand

However, Tailwind CSS will not be enabled in this case.

### Prevent inlining

When adding a `<style>` tag inside a Template, you can prevent all rules inside it from being inlined by using a `data-embed` attribute:

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="head">
      <style tailwindcss data-embed>
        img {
          border: 0;
          @apply leading-full align-middle;
        }
      </style>
    </block>

    <block name="template">
      <!-- ... -->
    </block>
  </extends>
  ```

</code-sample>
<alert>Although it won't be inlined, unused CSS will still be purged by the <nuxt-link to="/docs/transformers/remove-unused-css">removeUnusedCSS</nuxt-link> Transformer.</alert>

## Transforms

Maizzle doesn't include Tailwind's base reset, as it would lead to many CSS properties being inlined all over the place.

To use transform utilities, you'll need to add the resets back yourself, in a `<style>` tag that won't be inlined:

<code-sample title="src/templates/example.html">

  ```xml
   <extends src="src/layouts/main.html">
    <block name="head">
      <style data-embed>
        *, ::before, ::after {
         --tw-translate-x: 0;
         --tw-translate-y: 0;
         --tw-rotate: 0;
         --tw-skew-x: 0;
         --tw-skew-y: 0;
         --tw-scale-x: 1;
         --tw-scale-y: 1;
        }
      </style>
    </block>

    <block name="template">
      <div class="translate-x-10 rotate-45 bg-rose-600 w-4 h-4"></div>
    </block>
  </extends>
  ```

</code-sample>

The same applies to other utilities that rely on resets through `--tw-x` CSS variables, like `backdrop-blur` or CSS filters.
