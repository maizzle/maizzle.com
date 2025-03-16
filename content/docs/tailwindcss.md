---
title: "Tailwind CSS"
description: "Learn how to use Tailwind CSS to style HTML email templates with CSS utility classes."
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

To use Tailwind CSS in your HTML emails, simply add the `@tailwind` directives to a `<style>` tag in your Layout's `<head>`:

```html [layouts/main.html] {5-6}
<!doctype html>
<html>
  <head>
    <style>
      @​tailwind components; /* [!code ++] */
      @​tailwind utilities; /* [!code ++] */
    </style>
  </head>
  <body>
    <yield />
  </body>
</html>
```

Alternatively, you may store them in a CSS file:

```css [css/tailwind.css]
@tailwind components;
@tailwind utilities;

img {
  @apply max-w-full align-middle;
}
```

... and `@import` that instead:

```html [layouts/main.html]
<style>
  @import "css/tailwind.css";
</style>
```

Prefer `<link>` tags? Maizzle supports that too:

```html [layouts/main.html] {4}
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="css/tailwind.css" inline> <!-- [!code ++] -->
  </head>
  <body>
    <yield />
  </body>
</html>
```

When using `<link>` tags, you must make sure they include:

- the `rel="stylesheet"` attribute
- an `inline` or `expand` attribute

Otherwise, the CSS file they reference will not be compiled.

### Utility-first

Simply write your HTML markup and use Tailwind CSS utility classes to style elements.

Instead of writing something like this:

```html
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

```html [emails/example.html]
<table class="w-full">
  <tr>
    <td class="py-6 px-0 bg-gray-200">
      <h1 class="m-0 text-4xl font-sans text-black">
        Some title
      </h1>

      <p class="m-0 text-base/6 text-gray-700">
        Content here...
      </p>
    </td>
  </tr>
</table>
```

Read more about the concept of utility-first CSS and familiarize yourself with the syntax in the [Tailwind CSS docs](https://tailwindcss.com/docs/utility-first). And if you're using VSCode, make sure to install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension, to get autocompletion and hover tooltips for Tailwind classes.

### Components

If you're repeating the same utility classes over and over again, you can extract them to a [Component](/docs/components) so you've got a single source of truth and can make changes in one place.

### Custom classes

As an alternative to creating a Component, you may extract utility classes to a custom class using Tailwind's `@apply` directive.

Here's a quick example:

```css [css/components.css]
@layer components {
  .button-danger {
    @apply py-3 px-6 text-white bg-red-500;
  }
}
```

Unlike custom utility classes that you may add to `tailwind.config.js`, you would add that in a CSS file that is imported in your main `<style>` tag or through a `<link>` tag.

And that brings us to...

## CSS Files

You may organize your CSS into files if you prefer, and then `@import` them in a `<style>` tag or through a `<link>` in your Layout's `<head>`.

For example, let's import that `css/components.css` file we just created:

```html [layouts/main.html] {5}
<!doctype html>
<html>
  <head>
    <style>
      @import "css/components.css"; /* [!code ++] */
      @tailwind components;
      @tailwind utilities;
    </style>
  </head>
  <body>
    <yield />
  </body>
</html>
```

<Alert>When importing CSS files you need to use the path relative to the root of your project's directory.</Alert>

<Alert type="danger">`@import` statements need to come before any other CSS rules in the `<style>` tag, otherwise the entire CSS inside them will be discarded.</Alert>

## Shorthand CSS

<Alert>This section refers to writing shorthand CSS inside `<style>` tags. For _inline_ CSS shorthand, see the [Shorthand CSS Transformer docs](/docs/transformers/shorthand-css).</Alert>

Maizzle can automatically rewrite your `padding`, `margin`, and `border` CSS properties in shorthand-form, when possible.

Because utility classes map one-to-one with CSS properties, this normally doesn't have any effect with Tailwind CSS. However, in the context of `<style>` tags, it's useful when you extract utilities to components, with Tailwind's `@apply`.

Consider this template:

```html [emails/example.html]
<x-main>
  <div class="col">test</div>
</x-main>
```

Let's use `@apply` to compose a `col` class by  extracting two padding utilities:

```html [layouts/main.html] {5-7}
<!doctype html>
<html>
  <head>
    <style>
      .col { /* [!code ++] */
        @apply py-2 px-1; /* [!code ++] */
      } /* [!code ++] */

      @tailwind components;
      @tailwind utilities;
    </style>
  </head>
  <body>
    <yield />
  </body>
</html>
```

When running the build command, normally that would generate:

```css
.col {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 4px;
  padding-right: 4px
}
```

However, Maizzle will merge those to shorthand-form, so we get this:

```css
.col {
  padding: 8px 4px;
}
```

This results in smaller HTML size, reducing the risk of [Gmail clipping your email](https://github.com/hteumeuleu/email-bugs/issues/41).

Using shorthand CSS for these properties is well supported in email clients and will make your HTML lighter, but the shorthand border (documented next) is particularly useful because it's the only way Outlook will render it properly.

<Alert>For shorthand CSS to work with `padding` or `margin`, you need to specify property values for all four sides. For borders, keep reading.</Alert>

### Shorthand borders

To get shorthand-form CSS borders, you need to specify all these:

- border-width
- border-style
- border-color

With Tailwind's `@apply`, that means you can do something like this:

```css
.my-border {
  @apply border border-solid border-blue-500;
}
```

... which will turn this:

```html
<div class="my-border">Border example</div>
```

... into this:

```html
<div style="border: 1px solid #3f83f8;">Border example</div>
```

Alternatively, you may use an arbitrary values:

```html
<div class="[border:1px_solid_#3f83f8]">Border example</div>
```

You can even reference colors from your Tailwind config:

```html
<div class="[border:1px_solid_theme(colors.gray.300)]">Border example</div>
```

Arbitrary values are actually really useful for Outlook, because something like `border-b border-solid border-black` will not be shorthanded and Outlook can only apply individual borders when you write them in shorthand.

So you can do this:

```html
<div class="[border-bottom:1px_solid_#000]">Bottom border example</div>
```

This might look like inline styles with extra steps, but it's still Tailwind so you can do stuff that you can't do with inline CSS, like pseudos or media queries:

```html
<div class="hover:[border:1px_solid_#000] sm:[border:none]">
  Border example
</div>
```

## Plugins

To use a Tailwind CSS plugin, simply `npm install` it and follow its instructions to add it to `plugins: []` in your `tailwind.config.js`:

```js [tailwind.config.js]
import emailVariants from 'tailwindcss-email-variants'

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    emailVariants,
  ],
}
```

Or, with a CJS config file:

```js [tailwind.config.js]
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('tailwindcss-email-variants'),
  ],
}
```

See the [Tailwind CSS docs](https://tailwindcss.com/docs/configuration#plugins) for more information on plugins.

<alert><code>tailwindcss-email-variants</code> is already included in our Tailwind CSS preset, you don't need to install it separately.</alert>


## Use in Template

You may use Tailwind CSS, including directives like `@apply`, `@layer`, and even nested syntax, right inside a Template. You simply need to use the stack/push pattern to inject a `<style>` tag into the Layout being extended.

First, add a `<stack name="head" />` inside your Layout's `<head>` tag:

```html [layouts/main.html] {8} diff
<!doctype html>
<html>
<head>
  <style>
    @tailwind components;
    @tailwind utilities;
  </style>
  <stack name="head" /> // [!code ++]
</head>
<body>
  <yield />
</body>
```

Next, `push` to that `stack` from a Template:

```html [emails/example.html]
<x-main>
  <push name="head">
    <style>
      a {
        @apply text-blue-500;
      }

      @media screen(sm) {
        table {
          @apply w-full;
        }
      }
    </style>
  </push>

  <!-- your email HTML... -->
</x-main>
```

### Prevent inlining

You can prevent CSS inside a `<style>` tag from being inlined:

```html [emails/example.html]
<x-main>
  <push name="head">
    <style data-embed>
      img {
        @apply max-w-full align-middle;
      }
    </style>
  </push>

  <!-- your email HTML... -->
</x-main>
```

You may use any of the following attributes for this purpose:

- `data-embed`
- `no-inline`
- `embed`

Although it will no longer be inlined, unused CSS will still be purged - see the [css.purge](/docs/transformers/purge-css) Transformer docs for more information.

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

<Alert>As you can see, this also requires that you add a `body` class on your `<body>` tag.</Alert>

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

Use the `ogsc` and `ogsb` variants to change `color` and `background-color` of elements in [Outlook.com dark mode](https://www.hteumeuleu.com/2021/emails-react-outlook-com-dark-mode/).

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

Maizzle includes [tailwindcss-mso](https://github.com/maizzle/tailwindcss-mso), allowing you to use Outlook-only utilities:

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

<Alert type="info">
  If you're looking show/hide content in/from Outlook, have a look at the available <a href="/docs/tags#outlook">Outlook tags</a>.
</Alert>
