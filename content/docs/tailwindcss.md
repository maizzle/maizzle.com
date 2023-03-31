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

The compiled Tailwind CSS is available under `page.css`, so you need to make sure it is added inside a `<style>` tag in your Layout's `<head>`:

<code-sample title="src/layouts/main.html">

  ```xml
  <!doctype html>
  <html>
    <head>
      <style>
        {{{ page.css }}}
      </style>
    </head>
    <body>
      <content />
    </body>
  </html>
  ```

</code-sample>

You might have noticed that we used `{{{ }}}` instead of the usual `{{ }}`.

We do this to avoid double-escaping the CSS, which can break the build process when quoted property values are encountered (for example quoted font family names, background image URLs, etc.).

<alert type="warning">Tailwind CSS only works when `page.css` is added inside a `<style>` tag in the `<head>`.</alert>

### Utility-first

Simply write your HTML markup and use Tailwind CSS utility classes to style elements.

Instead of writing something like this:

```xml
<table style="width: 100%;">
  <tr>
    <td style="padding: 24px 0; background-color: #e5e7eb;">
      <h1 style="margin: 0; font-size: 36px; font-family: -apple-system, 'Segoe UI', sans-serif; color: #000000;">
        Some title
      </h1>
      <p style="margin: 0; font-size: 16px; line-height: 24px; color: #374151;">
        Content here...
      </p>
    </td>
  </tr>
</table>
```

You can write:

<code-sample title="src/templates/example.html">

  ```xml
  <table class="w-full">
    <tr>
      <td class="py-6 px-0 bg-gray-200">
        <h1 class="m-0 text-4xl font-sans text-black">
          Some title
        </h1>
        <p class="m-0 text-base leading-6 text-gray-700">
          Content here...
        </p>
      </td>
    </tr>
  </table>
  ```

</code-sample>

Read more about the concept of utility-first CSS and familiarize yourself with the syntax in the [Tailwind CSS docs](https://tailwindcss.com/docs/utility-first). And if you're using VSCode, make sure to install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension.

### Components

If you find yourself repeating common utility combinations to apply the same styling in many different places (buttons maybe?), you can extract those to a component.

Tailwind CSS includes an [@apply directive](https://tailwindcss.com/docs/extracting-components#extracting-css-components-with-apply) that can be used to compose custom CSS classes by "applying" utilities to them.

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

Again, this is totally optional: you can use Tailwind CSS in Maizzle without creating any CSS file at all!
Doing so will only generate components and utilities based on your `tailwind.config.js`.

### Custom CSS

Add custom CSS files anywhere under `src/css`.

Maizzle adds `utilities.css`, which contains a sample custom utility class that Tailwind CSS doesn't provide.

<alert type="warning">Files that you `@import` in `tailwind.css` must be relative to `src/css`</alert>

<alert type="danger">Any `@import` rules must come first in your `tailwind.css` file.</alert>

## Shorthand CSS

<alert>This section refers to writing shorthand CSS inside `<style>` tags. For _inline_ CSS shorthand, see the [Shorthand CSS Transformer docs](/docs/transformers/shorthand-css).</alert>

Maizzle can rewrite your `padding`, `margin`, and `border` CSS properties in shorthand-form, when possible.

Because utility classes map one-to-one with CSS properties, this normally doesn't have any effect with Tailwind CSS. However, in the context of `<style>` tags, it's useful when you extract utilities to components, with Tailwind's `@apply`.

Consider this template:

<code-sample title="src/templates/example.html">

  ```xml
  <x-main>
    <div class="col">test</div>
  </x-main>
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

When running the build command, normally that would yield:

<code-sample title="src/templates/example.html">

  ```css
  .col {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 4px;
    padding-right: 4px
  }
  ```

</code-sample>

However, Maizzle will merge those to shorthand-form, so we get this:

<code-sample title="src/templates/example.html">

  ```css
  .col {
    padding: 8px 4px;
  }
  ```

</code-sample>

This results in smaller HTML size, reducing the risk of [Gmail clipping your email](https://github.com/hteumeuleu/email-bugs/issues/41).

Using shorthand CSS for these properties is well supported in email clients and will make your HTML lighter, but the shorthand border (documented next) is particularly useful because it's the only way Outlook will render it properly.

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

Alternatively, you may use an arbitrary values:

```xml
<div class="[border:1px_solid_#3f83f8]">Border example</div>
```

Arbitrary values are actually really useful for Outlook, because something like `border-b border-solid border-black` will not be shorthanded and Outlook can only apply individual borders when you write them in shorthand.

So you can do this:

```xml
<div class="[border-bottom:1px_solid_#000]">Bottom border example</div>
```

Arbitrary values might look like inline styles with extra steps, but it's still Tailwind so you can do stuff that you can't with inline CSS, like pseudos or media queries:

```xml
<div class="hover:[border:1px_solid_#000] sm:[border:none]">
  Border example
</div>
```

## Plugins

To use a Tailwind CSS plugin, simply `npm install` it and follow its instructions to add it to `plugins: []` in your `tailwind.config.js`.

Here's an example from the Starter:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    // ...
    plugins: [
      require('tailwindcss-mso'),
      require('tailwindcss-box-shadow'),
      require('tailwindcss-email-variants'),
    ],
  }
  ```

</code-sample>

See the [Tailwind CSS docs](https://tailwindcss.com/docs/configuration#plugins) for more information on plugins.

## Use in Template

You can use Tailwind CSS, including directives like `@apply`, `@responsive`, and even nested syntax, right inside a Template.
You simply need to use a `<stack>` to push a `<style tailwindcss>` tag to the Layout being extended.

First, add a `<stack name="head" />` inside your Layout's `<head>` tag:

<code-sample title="src/layouts/main.html">

  ```xml
  <!doctype html>
  <html>
  <head>
    <style>
      {{{ page.css }}}
    </style>
    <stack name="head" />
  </head>
  <body>
    <content />
  </body>
  ```

</code-sample>

Next, `push` to that `stack` from a Template:

<code-sample title="src/templates/example.html">

  ```xml
  <x-main>
    <push name="head">
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
    </push>

    <!-- your email HTML... -->
  </x-main>
  ```

</code-sample>

The `tailwindcss` attribute is only required if you want the CSS to be compiled with Tailwind CSS. There's no need to include it if you're just writing plain CSS.

#### postcss attribute

You may also use the `postcss` attribute instead of `tailwindcss`.

This will compile the contents of `<style postcss>` tags with PostCSS and any plugins you've enabled, including:

- postcss-import
- postcss-nested
- postcss-merge-longhand

However, Tailwind CSS will not be enabled in this case.

### Prevent inlining

When adding a `<style>` tag inside a Template, you can prevent all CSS rules inside it from being inlined by using a `data-embed` attribute:

<code-sample title="src/templates/example.html">

  ```xml
  <x-main>
    <push name="head">
      <style tailwindcss data-embed>
        img {
          border: 0;
          @apply leading-full align-middle;
        }
      </style>
    </push>

    <!-- your email HTML... -->
  </x-main>
  ```

</code-sample>

Although it will no longer be inlined, unused CSS will still be purged by the <nuxt-link to="/docs/transformers/remove-unused-css">removeUnusedCSS</nuxt-link> Transformer.

## Transforms

Maizzle doesn't include Tailwind's base reset, as that would lead to many unwanted CSS properties being inlined all over the place.

To use transform utilities, add the resets back in a `<style>` tag that won't be inlined:

<code-sample title="src/templates/example.html">

  ```xml
   <x-main>
    <push name="head">
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
    </push>

    <div class="translate-x-10 rotate-45 bg-rose-600 w-4 h-4"></div>
  </x-main>
  ```

</code-sample>

The same applies to other utilities that rely on resets through `--tw-x` CSS variables, like `backdrop-blur` or CSS filters.

## Email client targeting

Maizzle comes with [tailwindcss-email-variants](https://github.com/maizzle/tailwindcss-email-variants), a Tailwind CSS plugin that makes it easy to style your HTML emails for certain email clients.

It adds custom variants that you may use to style elements only for certain email clients.

### Gmail

Use the `gmail` variant to style elements in Gmail's webmail:


```html
<body class="body">
  <div class="gmail:hidden">...</div>
</body>
```

The compiled HTML will include this CSS rule:

```css
u + .body .gmail\:hidden {
  display: none;
}
```

<alert>As you can see, this also requires that you add a `body` class on your `<body>` tag.</alert>

Gmail on older versions of Android requires a different selector, so there's a separate variant provided:

```html
<body class="body">
  <div class="gmail-android:hidden">...</div>
</body>
```

Result:

```css
div > u + .body .gmail-android\:hidden {
  display: none;
}
```

### Apple Mail (10+)

The `apple-mail` variant will target Apple Mail 10 and up:

```html
<div class="apple-mail:hidden">...</div>
```

Result:

```css
.Singleton .apple-mail\:hidden {
  display: none;
}
```

### iOS Mail (10+)

Use the `ios` variant to target iOS Mail 10 and up:

```html
<div class="ios:hidden">...</div>
```

Result:

```css
@supports (-webkit-overflow-scrolling:touch) and (color:#ffff) {
  .ios\:hidden {
    display: none;
  }
}
```

### iOS Mail (15)

Use the `ios-15` variant if you need to target iOS Mail 15 specifically:

```html
<div class="ios-15:hidden">...</div>
```

Result:

```css
@supports (-webkit-overflow-scrolling:touch) and (aspect-ratio: 1 / 1) {
  .ios-15\:hidden {
    display: none;
  }
}
```

### Outlook.com dark mode

Change `color` and `background-color` of elements in [Outlook.com dark mode](https://www.hteumeuleu.com/2021/emails-react-outlook-com-dark-mode/).

```html
<!-- Color -->
<div class="ogsc:text-slate-200">...</div>

<!-- Background color -->
<div class="ogsb:bg-slate-900">...</div>
```

Result:

```css
[data-ogsc] .ogsc\:text-slate-200 {
  color: #e2e8f0;
}

[data-ogsb] .ogsb\:bg-slate-900 {
  background-color: #0f172a;
}
```

### Open-Xchange

Use the `ox` variant to target webmail clients that are powered by [Open-Xchange](https://www.open-xchange.com/).

Some of these email clients include Comcast, Libero, 1&1 MailXchange, Network Solutions Secure Mail, Namecheap Email Hosting, Mailbox.org, 123-reg Email, acens Correo Professional, Home.pl Cloud Email Xchange, Virgin Media Mail, and Ziggo Mail.

```html
<div class="ox:hidden">...</div>
```

Result:

```css
.ox\:hidden[class^="ox-"] {
  display: none;
}
```

## Outlook CSS

Outlook and Office 365 on Windows support proprietary `mso-` CSS properties.

You can use [tailwindcss-mso](https://github.com/maizzle/tailwindcss-mso) in Maizzle to add Outlook-only CSS:

```html
<p class="mso-hide-all">...</p>
```

These are utility classes that work just as you'd expect - they support arbitrary values:

```html
<p class="mso-color-alt-[#ffcc00]">...</p>
```

... and, where it makes sense, negative values too:

```html
<p class="-mso-text-raise-4">...</p>
```

<alert type="info">
  If you're looking show/hide content in/from Outlook, have a look at the available <a href="/docs/tags#outlook">Outlook tags</a>.
</alert>
