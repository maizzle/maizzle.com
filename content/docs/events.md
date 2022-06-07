---
title: "Events"
description: "Use lifecycle hooks to hook into the email build process at specific points in time"
---

# Events

When compiling your email templates, Maizzle goes through a series of steps like generating a Template config, rendering, or applying Transformers.

You can hook into the build process and manipulate it by using functions that run before or after some of these steps.

## Usage

You may use Events both when developing locally with the CLI `build` or `serve` commands, and when using the [API](/docs/api) with the `render()` method.

### CLI

To use events when developing locally with the CLI commands, add them inside an `events` object in your config:

<code-sample title="config.js">

  ```js
  module.exports = {
    events: {
      beforeCreate(config) {
        // do stuff with config
      },
    }
  }
  ```

</code-sample>

### API Events

When using the API, add events inside the object that you pass to the `render()` method:

<code-sample title="app.js">

  ```js
  const Maizzle = require('@maizzle/framework')

  html = Maizzle.render(`some HTML string...`, {
      tailwind: {},
      maizzle: {},
      beforeRender(config) {
        // ...
      }
    }
  ).then(({html}) => console.log(html))
  ```

</code-sample>

## Event types

These are the Events that you can use in Maizzle.

The following ones are CLI-only - they run only when added inside the `events: {}` object in your `config.js` and when you run one of the [build commands](/docs/cli#development):

- [`beforeCreate`](#beforecreate)
- [`afterBuild`](#afterbuild)

These always run, every time a Template is compiled:

- [`beforeRender`](#beforerender)
- [`afterRender`](#afterrender)
- [`afterTransformers`](#aftertransformers)

### beforeCreate

Runs after the [Environment config](/docs/environments) has been computed, but before Templates are processed.
Exposes the config object so you can further customize it.

For example, let's use a custom highlight function for Markdown fenced code blocks:

<code-sample title="config.js">

  ```js
  const Prism = require('prismjs')

  module.exports = {
    events: {
      async beforeCreate(config) {
        config.markdown.highlight = (code, lang, callback) => {
          return Prism.highlight(code, Prism.languages[lang], lang)
        }
      }
    }
  }
  ```

</code-sample>

<alert>Use `beforeCreate` if you need to manipulate your config only once.</alert>

### beforeRender

Runs after the Template's config has been computed, but just before it is compiled.
It exposes the Template's config, as well as the HTML.

For (a silly) example, let's fetch data from an API and set it as the preheader text:

<code-sample title="config.js">

  ```js
  const axios = require('axios')

  module.exports = {
    events: {
      async beforeRender(html, config) {
        const url = 'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'

        config.preheader = await axios(url).then(result => result.data).catch(error => 'Could not fetch preheader, using default one.')

        // must always return the `html`
        return html
      }
    }
  }
  ```

</code-sample>

Then, you'd render it in your HTML, like so:

<code-sample title="src/layouts/main.html">

  ```xml
  <if condition="page.preheader">
    <div class="hidden">{{ page.preheader }}</div>
  </if>
  ```

</code-sample>

<alert>`beforeRender` runs for each template that is going to be compiled. For performance reasons, you should use it only if you need access to the config of the Template currently being processed (which includes variables from the Template's Front Matter).</alert>

<alert type="warning">You must always return the `html` when using `beforeRender()`.</alert>

### afterRender

Runs after the Template has been compiled, but before any Transformers have been applied.
Exposes the rendered `html` string and the `config`.

It's your last chance to alter the HTML or any settings in your config, before Transformers process your email template.

For example, let's disable CSS inlining:

<code-sample title="config.js">

  ```js
  module.exports = {
    events: {
      afterRender(html, config) {
        config.inlineCSS = false

        // must always return the `html`
        return html
      }
    }
  }
  ```

</code-sample>

<alert type="warning">You must always return the `html` when using `afterRender()`.</alert>

### afterTransformers

Runs after all Transformers have been applied, just before the final HTML is returned.

Same as `afterRender()`, it exposes the `html` and the `config`, so you can do further adjustments to the HTML, or read some config settings.

For example, maybe you don't like the minifier that Maizzle includes, and you disabled it in your config so that you can use your own:

<code-sample title="config.js">

  ```js
  const Minifier = require('imaginary-minifier')

  module.exports = {
    minify: false,
    events: {
      afterTransformers(html, config) {
        if (!config.minify) {
          return Minifier.minify(html)
        }

        return html
      }
    }
  }
  ```

</code-sample>

<alert type="warning">You must always return the `html` when using `afterTransformers()`.</alert>

### afterBuild

Runs after all Templates have been compiled and output to disk.
Returns an array with the paths to all the files inside the [`destination.path`](/docs/configuration/templates#path) directory.

<code-sample title="config.js">

  ```js
  module.exports = {
    events: {
      afterBuild(files) {
        console.log(files)
      }
    }
  }
  ```

</code-sample>

Using it with the Starter, `maizzle build production` will output:

```js
[
  'build_production/images/maizzle.png',
  'build_production/promotional.html',
  'build_production/transactional.html'
]
```

<alert type="warning">The `afterBuild` event is available only when using the `maizzle build` CLI command, so it will only work if added to the `events` object in your environment config and not with the API.</alert>
