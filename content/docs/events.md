---
title: "Events"
description: "Using lifecycle hooks to tap into the email build process."
---

# Events

When compiling your HTML emails, Maizzle goes through a series of steps like generating a Template config, rendering, or applying Transformers.

You can hook into the build process and manipulate it by using functions that run before or after some of these steps.

## Usage

You may use Events both when developing locally with the CLI `build` or `serve` commands, and when using the [API](/docs/api) with the `render()` method.

### CLI

To use events with the CLI commands, add them to your `config.js` file:

```js [config.js]
export default {
  beforeCreate({ config }) {
    // do stuff with config
  },
}
```

### API Events

When using the API, add events inside the object that you pass to the `render()` method:

```js [app.js]
const Maizzle = require('@maizzle/framework')

html = Maizzle.render(`some HTML string...`, {
    beforeRender({ html, config, matter }) {
      // ...
    }
  }
).then(({html}) => console.log(html))
```

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

Runs after the [Environment config](/docs/environments) has been computed, but before Templates are processed. Exposes the config object so you can further customize it.

For example, let's use a custom highlight function for Markdown fenced code blocks:

```js [config.js]
import Prism from 'prismjs'

export default {
  async beforeCreate({ config }) {
    config = Object.assign(config, {
      markdown: {
        markdownit: {
          highlight: (code, lang) => {
            lang = lang || 'html'
            return Prism.highlight(code, Prism.languages[lang], lang)
          }
        }
      }
    })
  }
}
```

<Alert>Use `beforeCreate` if you need to update the config only once.</Alert>

### beforeRender

Runs after the Template's config has been computed, but just before it is compiled.

It exposes the Template's HTML and Front Matter, as well as its config.

For (a silly) example, let's fetch data from an API and set it as the preheader text:

```js [config.js]
import axios from 'axios'

export default {
  async beforeRender({ html, config, matter }) {
    const url = 'https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1'

    config.preheader = await axios(url).then(result => result.data).catch(error => 'Could not fetch preheader, using default one.')

    return html
  }
}
```

Then, you'd render it in your HTML, like so:

```hbs [layouts/main.html]
<if condition="page.preheader">
  <div class="hidden">{{{ page.preheader }}}</div>
</if>
```

`beforeRender` runs for each Template that is going to be compiled. For performance reasons, you should only use it if you need access to the config of the Template that is about to be compiled (which includes variables from the Template's Front Matter).

<Alert type="warning">If you don't return the `html` when using `beforeRender()`, the original HTML will be rendered.</Alert>

### afterRender

Runs after the Template has been compiled, but before any Transformers have been applied. Exposes the rendered `html` string and the `config`, as well as the Template's Front Matter.

It's your last chance to alter the HTML or any settings in your config, before Transformers process your email template.

For example, let's disable CSS inlining:

```js [config.js]
export default {
  afterRender({ html, config, matter }) {
    config.css = {
      inline: false
    }

    return html
  }
}
```

`afterRender` runs for each Template, right after it has been compiled. Use it only if you need access to the config of the Template that was just compiled.

<Alert type="warning">If you don't return the `html` when using `afterRender()`, the original HTML will be rendered.</Alert>

### afterTransformers

Runs after all Transformers have been applied, just before the final HTML is returned.

It exposes the same options as `afterRender()`, so you can do further adjustments to the HTML, or read some config settings.

For example, maybe you don't like the minifier that Maizzle includes, and you disabled it in your config so that you can use your own:

```js [config.js]
import Minifier from 'imaginary-minifier'

export default {
  minify: false,
  afterTransformers({ html, config, matter }) {
    if (!config.minify) {
      return Minifier.minify(html)
    }

    return html
  },
}
```

<Alert type="warning">If you don't return the `html` when using `afterTransformers()`, the original HTML will be rendered.</Alert>

### afterBuild

Runs after all Templates have been compiled and output to disk. The `files` parameter will contain the paths to all the files inside the [`destination.path`](/docs/configuration/templates#path) directory.

```js [config.js]
export default {
  afterBuild({ files, config }) {
    console.log(files)
  }
}
```

Using it with the Starter, `maizzle build production` will output:

```js
[
  'build_production/images/maizzle.png',
  'build_production/promotional.html',
  'build_production/transactional.html'
]
```

<Alert type="warning">`afterBuild` is available only when using the `maizzle build` CLI command and not with the [API](/docs/api/).</Alert>
