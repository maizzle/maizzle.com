---
title: "API"
description: "Use Maizzle's API on the server to compile a string to an HTML email, styled with Tailwind CSS"
---

# API

Use the Maizzle API to compile a string to an HTML email.

## Usage

First, `require()` the framework in your application:

<code-sample title="app.js">

  ```js
  const Maizzle = require('@maizzle/framework')
  ```

</code-sample>

Then, call the `render()` method, passing it a string and an options object:

<code-sample title="app.js">

  ```js
  const Maizzle = require('@maizzle/framework')

  Maizzle
    .render(`html string`, options)
    .then(({html, config}) => console.log(html, config))
  ```

</code-sample>

The `render()` method returns an object containing the compiled HTML and the [environment config](/docs/environments) that was computed for it.

### Options

`options` is an object with the following structure:

```js
{
  tailwind: {
    config: {},
    css: '',
    compiled: '',
  },
  maizzle: {},
  beforeRender() {},
  afterRender() {},
  afterTransformers() {},
}
```

<alert>`options` is not required: when omitted, Maizzle will use the defaults below.</alert>

#### tailwind

Pass in a custom Tailwind CSS configuration, or a pre-compiled CSS string.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `config` | Object | `undefined` | A Tailwind CSS config object. |
| `css` | String | `@tailwind components; @tailwind utilities;` | A CSS string. Will be compiled with Tailwind CSS, so it may use PostCSS syntax. To use Tailwind, it needs to include at least _@tailwind utilities_ |
| `compiled` | String | `undefined` | A pre-compiled CSS string, to use as-is. This will skip Tailwind compilation, resulting in faster render speed. |

<alert>To make sure Tailwind CSS utilities are correctly generated from classes throughout your project, make sure to pass a `config` with paths correctly set for [`content`](https://tailwindcss.com/docs/content-configuration).</alert>

#### maizzle

The Maizzle Environment configuration object.

| Type | Default | Description |
| --- | --- | --- |
| Object | `{}` | A Maizzle config object. |

<alert>The other options listed above, like `beforeRender() {}`, are [Events](/docs/events).</alert>

## Example

<code-sample title="app.js">

  ```js
  const Maizzle = require('@maizzle/framework')

  const html = `---
  title: Using Maizzle on the server
  ---

  <!DOCTYPE html>
  <html>
    <head>
      <style>{{{ page.css }}}</style>
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

  Maizzle.render(html,
    {
      tailwind: {
        config: require('./tailwind.config.js'),
        css: `
          .button { @apply rounded text-center bg-blue-500 text-white; }
          .button:hover { @apply bg-blue-700; }
          .button a { @apply inline-block py-4 px-6 text-sm font-semibold no-underline text-white; }
        `,
      },
      maizzle: require('./config.js')
    }
  ).then(({html}) => console.log(html)).catch(error => console.log(error))
  ```

</code-sample>

<alert type="warning">Your `html` string must include `<style>{{{ page.css }}}</style>` inside the `<head>` tag as shown above, otherwise no CSS will be output or inlined.</alert>

## Templating

Of course, templating tags are available when using Maizzle programmatically.

<code-sample title="app.js">

  ```js
  const html = `---
  title: Using Maizzle programmatically
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      <!-- your HTML -->
    </block>
  </extends>`
  ```

</code-sample>

<alert type="danger">Paths to Layouts or Components in your string to be rendered must be relative to the location where you execute the script.</alert>

## Gotchas

Since the `config` you can pass to the `render()` method is optional, there are a few gotchas that you need to be aware of.

### Default Tailwind

If you don't specify a [Tailwind config object](#tailwind), Maizzle will try to compile Tailwind using `tailwind.config.js` at your current path.

_If the file is not found, Tailwind will be compiled with its [default config](https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js)._

The default config is not optimized for HTML email: it uses units like `rem` and CSS properties that are used for _web_ design and which have little to no support in the majority of email clients.

Also, the default Tailwind config will not include any `content` paths that should be scanned for generating utility classes.

### Transformers

Transformers, such as CSS inlining or minification, are opt-in: they transform content only when you enable them.
Since you don't need to pass in a Maizzle config object, this means that most of them will not run.

The following Transformers always run:

- Markdown (can be disabled)
- Prevent Widows
- Remove Attributes - removes empty `style` attributes by default
- Filters - supports `<style tailwindcss|postcss>` tags and provides various [text filters](/docs/transformers/filters)

### CSS Output

The string to be compiled with `render()` must include `{{{ page.css }}}` in a `<style>` tag inside the `<head>`, otherwise no CSS will be output or inlined:

```diff
  <!DOCTYPE html>
  <html>
    <head>
+      <style>{{{ page.css }}}</style>
    </head>
    <body>
      ...
    </body>
  </html>
```
