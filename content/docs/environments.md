---
title: "Environments"
description: "Define distinct build scenarios for your HTML email workflow, each with their own settings"
---

# Environments

> When I run `maizzle build [environment]`, should CSS be inlined? Should my HTML be minified? Do I need to make some data available to the templates?

You might want to use different settings when developing locally versus when building the production-ready emails.

For example, you don't need CSS inlining or code indentation when developing on your computer, but you'll want both enabled for the final, production-ready emails.

Maizzle makes it easy to define as many build scenarios as you need, by using distinct configuration files that enable their own build command.

We call these Environments.

## Default Environments

Maizzle comes with two config files, each enabling its own build command:

| File | Command |
| --- | --- |
| `config.js` | `maizzle build` |
| `config.production.js` | `maizzle build production` |

You probably noticed the link between <span class="font-mono text-sm">config.<strong>production</strong>.js</span> and <span class="font-mono text-sm">maizzle build <strong>production</strong></span> - the keyword in the config file name enables its own build command.

<Alert>Remember, the `maizzle` executable will only be available if you installed the [CLI tool](/docs/cli) globally. Otherwise, use the npm scripts provided by the Starter in `package.json`.</Alert>

### Data merging

Any new Environment configuration file that you create will be merged _on top_ of the base `config.js` when you run the build command for that particular Environment.

With the example above, when running the `maizzle build production` command, `config.production.js` will be merged on top of the base `config.js`: if the same key is present in both files, the value from `config.production.js` will be used.

<Alert>When creating a new Environment config file you only need to specify the config values that will be different from those (or don't exist) in `config.js`.</Alert>

## Environment builds

To build your emails for a specific Environment, pass its name as an argument to the `maizzle build` command:

```sh
maizzle build production
```

The Starter's `config.production.js` is configured to output production-ready emails in a `build_production` folder at the root of the project.

<Alert type="warning">In this example, if a `config.production.js` file is not found at the current location, the build will fail.</Alert>

## Custom Environments

You may create as many Environments as you need, and name them as you like.

For example, you might create a config file named `config.shopify.js` that you would use to build only the templates from the `src/templates/shopify` folder:

```js [config.shopify.js]
module.exports = {
  build: {
    templates: {
      source: 'src/templates/shopify',
      destination: {
        path: 'build_shopify'
      }
    }
  }
}
```

The build command for it would be:

```sh
maizzle build shopify
```

## Config variables

Maizzle exposes a `page` object that you can access through [expressions](/docs/expressions) in your HTML.

This object contains:

- your Template config (`config.[env].js` merged with Front Matter variables)
- the compiled Tailwind CSS (`page.css`)

This makes it possible to define variables in `config.js`:

```js [config.js]
module.exports = {
  doctype: 'html'
}
```

... and use them in your markup:

```xml [src/templates/example.html]
<x-main>
  <p>doctype is: {{ page.doctype }}</p>
</x-main>
```

### Current Environment

The current Environment name is globally available under the `page.env` variable.

You can output content in your emails based on the Environment that you're building for:

```xml [src/templates/example.html]
<if condition="page.env === 'production'">
  This will show only when running `maizzle build production`
</if>
```

### Top-level variables

If you need to define variables outside of the `page` object, you can use the `locals` key in your `config.js`:

```js [config.js]
module.exports = {
  locals: {
    company: {
      name: 'Spacely Space Sprockets, Inc.'
    }
  }
}
```

Now, you can access `company` properties directly:

```js [src/templates/example.html] diff
- Company name is {{ page.company.name }}
+ Company name is {{ company.name }}
```

<Alert>Maizzle does not allow overwriting the `page` object through `locals`.</Alert>
