---
title: "API"
description: "Using the API to compile an HTML email styled with Tailwind CSS."
---

# API

Use the Maizzle API to compile a string to an HTML email.

## Usage

First, `import()` the `render` method in your application:

```js [app.js]
import { render } from '@maizzle/framework'
```

<alert>Use destructuring so that you don't load all the other exported methods, like <code>serve</code>.</alert>

Then call it, passing it a string and an options object:

```js [app.js]
import { render } from '@maizzle/framework'

const options = {
  // Maizzle config object
}

const { html, config } = await render(`html string`, options)
```

The `render` method returns an object containing the compiled HTML and the [Environment config](/docs/environments) that was computed for it.

### Options

`options` is an object with the following structure:

```js
{
  // ... Maizzle config options,
  beforeRender() {},
  afterRender() {},
  afterTransformers() {},
}
```

### Tailwind&nbsp;CSS

If a `tailwind.config.js` cannot be found in the current directory (where you execute the script), the default Tailwind CSS config will be used.

In order to avoid this, you may pass your own Tailwind config:

```js
{
  css: {
    tailwind: {
      // your Tailwind config...
    }
  }
}
```

This way, you could (and should!) include `tailwindcss-preset-email` or any other Tailwind plugin that you need.

## Example

```js [app.js]
import { render } from '@maizzle/framework'

let html = `---
title: Using Maizzle on the server
---

<!doctype html>
<html>
  <head>
    <style>
      .button {
        @apply rounded text-center bg-blue-500 text-white;
      }
      .button:hover {
        @apply bg-blue-700;
      }
      .button a {
        @apply inline-block py-4 px-6 text-sm font-semibold no-underline text-white;
      }

      @tailwind components;
      @tailwind utilities;
    </style>
  </head>
  <body>
    <table>
      <tr>
        <td class="button">
          <a href="https://maizzle.com">Confirm email address</a>
        </td>
      </tr>
    </table>
  </body>
</html>`

render(html,
  {
    css: {
      inline: true,
      purge: true,
      shorthand: true,
    }
  }
).then(({html}) => console.log(html)).catch(error => console.log(error))
```

<Alert type="warning">Your `html` string must include at least `<style> @tailwind utilities; </style>` inside the `<head>`, otherwise no CSS will be output or inlined.</Alert>

## Templating

Of course, templating tags are available when using Maizzle programmatically.

```js [app.js]
let html = `---
title: Using Maizzle programmatically
---

<x-main>
  <!-- your email HTML... -->
</x-main>`
```

<Alert type="danger">Paths to Layouts or Components in your string to be rendered must be relative to the location where you execute the script.</Alert>

## Gotchas

Since the options object that you can pass to the `render` method is optional, there are a few gotchas that you need to be aware of.

### Default Tailwind

If you don't specify a [Tailwind config object](#tailwindcss), Maizzle will try to compile Tailwind using `tailwind.config.js` at your current path.

_If the file is not found, Tailwind CSS will be compiled with its [default config](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js)._

The default config is not optimized for HTML email: it uses units like `rem` and CSS properties that are used for _web_ design and which have little to no support in the majority of email clients.

Also, the default Tailwind config will not include any `content` paths that should be scanned for generating utility classes.

### Transformers

Most Transformers, such as CSS inlining or minification, are opt-in: they transform content only when you enable them. Since you don't need to pass in a Maizzle config object, this means that most of them will not run.

The following Transformers always run:

- Markdown (can be disabled)
- Prevent Widows
- Remove Attributes - removes empty `style` attributes by default
- Filters - provides various [text filters](/docs/transformers/filters)

### CSS Output

You must add the `@tailwind` directives in a `<style>` tag in the `<head>` of your email HTML, otherwise Tailwind CSS will not be compiled.

```mdx {4-7} diff
  <!doctype html>
  <html>
    <head>
+      <style>
+        @tailwind components;
+        @tailwind utilities;
+      </style>
    </head>
    <body>
      ...
    </body>
  </html>
```
