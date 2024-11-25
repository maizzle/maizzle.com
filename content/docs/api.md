---
title: "API"
description: "Using the API to compile an HTML email styled with Tailwind CSS."
---

# API

Use the Maizzle API to compile a string to an HTML email.

## Example

```js [app.js]
import { render } from '@maizzle/framework'
import tailwindcssPresetEmail from 'tailwindcss-preset-email'

let input = `---
title: Hello, world!
---

<!doctype html>
<html>
  <head>
    <style>
      @tailwind components;
      @tailwind utilities;
    </style>
  </head>
  <body>
    <div class="p-4 bg-blue-500 text-white">
      {{ page.title }}
    </div>
  </body>
</html>`

const { html } = await render(input,
  {
    css: {
      inline: true,
      purge: true,
      shorthand: true,
      tailwind: {
        presets: [tailwindcssPresetEmail],
        content: [
          {
            raw: input,
            extension: 'html'
          }
        ]
      }
    }
  }
)
console.log(html)
```

Your `html` string must include at least `<style> @tailwind utilities; </style>` inside the `<head>`, otherwise no CSS will be output or inlined.

Notice also the `css.tailwind` config.

The `content` key is needed for Tailwind to know where to look for classes to generate - otherwise your `<style>` tag will be empty and no CSS would be inlined either.

We also pass a `presets` array with the `tailwindcss-preset-email` package, which configures Tailwind to output CSS values optimized for HTML email.

## Usage

First, import the `render` method in your application:

```js [app.js]
import { render } from '@maizzle/framework'
```

<alert>Use object destructuring so that you don't import all the other methods from Maizzle, like `serve`.</alert>

Then, call it with two parameters: the HTML string to compile and a Maizzle config object.

```js [app.js]
import { render } from '@maizzle/framework'

const options = {
  // Maizzle config object
}

const { html, config } = await render(`html string`, options)
```

The `render` method returns an object containing the compiled HTML and the [Environment config](/docs/environments) that was computed for it.

### Options

`options` is an object with Maizzle configuration, like you would do in `config.js`.

For example:

```js
{
  css: {
    inline: true,
    purge: true,
    shorthand: true,
  },
  afterRender({html, config, matter}) {
    // ...
  },
}
```

### Tailwind&nbsp;CSS

When using the API, you might not have a `tailwind.config.js` file in the current directory.

If a `tailwind.config.js` cannot be found in the current directory (where you execute the script), the default Tailwind CSS config will be used. In order to avoid this, you may pass your own Tailwind CSS config inside the `options` object.

For example, let's use `tailwindcss-preset-email` when rendering templates programmatically:

```js [app.js]
import { render } from '@maizzle/framework'
import tailwindcssPresetEmail from 'tailwindcss-preset-email'

const input = `
  <style>
    @tailwind utilities;
  </style>

  <div class="p-2">Test</div>`

const { html } = await render(input, {
  css: {
    tailwind: {
      presets: [tailwindcssPresetEmail],
      content: [
        {
          raw: input,
          extension: 'html'
        }
      ]
    }
  }
})
```

In order for Tailwind to actually generate CSS based on classes in your `input` string, you need to pass the `content` key with an array of objects that contain the raw content and the file extension.

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

<Alert type="danger">Paths to Layouts or Components in your string must be relative to the location where you execute the script.</Alert>
<Alert type="danger">Component `x-` tags only work in Node.js and when the referenced files are available on disk.</Alert>

## Gotchas

Since the options object that you can pass to the `render` method is optional, there are a few gotchas that you need to be aware of.

### Tailwind config

Maizzle will use the Tailwind CSS config object as-is, which means that if you just include the `content` key it will generate CSS with the default values like `rem` or CSS variables.

In order to generate CSS optimized for HTML email, you need to fully configure Tailwind in the `css.tailwind` object. The simplest way to do this is to use a preset like `tailwindcss-preset-email`, as shown in the example above.

### Default Tailwind

If you don't specify a [Tailwind config object](#tailwindcss), Maizzle will try to compile Tailwind using `tailwind.config.js` at your current path.

_If the file is not found, Tailwind CSS will be compiled with its [default config](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js)._

The default config is not optimized for HTML email: it uses units like `rem` and CSS properties that are used for _web_ design and which have little to no support in the majority of email clients.

Also, the default Tailwind config will not include any `content` paths that should be scanned for generating utility classes, meaning that the `<style>` tag in your email will be empty.

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
