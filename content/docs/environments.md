---
title: "Environments"
description: "Define distinct build scenarios for your HTML email workflow, each with their own settings"
---

# Environments

You might want to use different settings when developing locally versus when building production-ready emails.

For example, you don't need CSS inlining or code indentation when developing on your computer, but you'll most likely want both enabled for the final, production-ready emails.

Maizzle makes it easy to have as many build targets as you need by using distinct configuration files that enable their own build command.

We call these Environments.

## Creating Environments

Think of Environments as 'build scenarios':

> When I run `maizzle build [environment]`, should X happen? Should CSS be inlined? Should my HTML be minified? Do I need some data to be available for the templates?

For example, let's define a _production_ environment, by creating a new file named `config.production.js`, in the project root:

<code-sample title="config.production.js">

  ```js
  module.exports = {
    build: {
      templates: {
        destination: {
          path: 'build_production'
        }
      }
    }
  }
  ```

</code-sample>

This <span class="font-mono text-sm">config.<strong>production</strong>.js</span> file will be used when running <span class="font-mono text-sm">maizzle build <strong>production</strong></span>.

<alert>Remember, the `maizzle` executable will only be available if you installed the [CLI tool](/docs/cli) globally. Otherwise, use the npm scripts provided by the Starter in `package.json`.</alert>

### Data merging

Any new Environment configuration file that you create will be merged _on top_ of the base `config.js` when you run the build command for that particular Environment.

With the example above, when running the `maizzle build production` command, `config.production.js` will be merged on top of the base `config.js`: if the same key is present in both files, the value from `config.production.js` will be used.

<alert>When creating a new Environment config file you only need to specify the config values that will be different from those in `config.js`.</alert>

## Environment builds

To build your emails for a specific Environment, pass its name as an argument to the `maizzle build` command:

<terminal show-copy>

  ```
  maizzle build production
  ```

</terminal>

<alert type="warning">In this example, if a `config.production.js` file is not found at the current location, the build will fail.</alert>

The Starter's `config.production.js` is configured to output production-ready emails in a `build_production` folder at the root of the project.

## Custom Environments

You may create as many Environments as you need, and name them as you like.

For example, you might create a config file named `config.shopify.js` that you would use to build only the templates from the `src/templates/shopify` folder:

<code-sample title="config.shopify.js">

  ```js
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

</code-sample>

The build command for it would be:

<terminal show-copy>

  ```
  maizzle build shopify
  ```

</terminal>

## Config variables

Maizzle exposes a `page` object that you can access through [expressions](/docs/templates#expressions) in your HTML.

This object contains:

- your Template config (`config.[env].js` merged with Front Matter)
- the compiled Tailwind CSS (`page.css`)

This makes it possible to define variables in `config.js`:

<code-sample title="config.js">

  ```js
  module.exports = {
    doctype: 'html'
  }
  ```

</code-sample>

... and use them in your markup:

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="template">
      <p>doctype is: {{ page.doctype }}</p>
    </block>
  </extends>
  ```

</code-sample>

### Template variable

The Environment name is globally available under the `page.env` variable.

You can output content in your emails based on the Environment you're building for:

<code-sample title="src/templates/example.html">

  ```xml
  <if condition="page.env === 'production'">
    This will show only when running `maizzle build production`
  </if>
  ```

</code-sample>

### Top-level variables

If you need to define variables outside of the `page` object, you can use the `locals` key in your `config.js`:

<code-sample title="config.js">

  ```js
  module.exports = {
    locals: {
      company: {
        name: 'Spacely Space Sprockets, Inc.'
      }
    }
  }
  ```

</code-sample>

Now, you can access `company` properties directly:

<code-sample title="example.html">

  ```diff
  - Company name is {{ page.company.name }}
  + Company name is {{ company.name }}
  ```

</code-sample>

<alert>Maizzle does not allow overwriting the `page` object through `locals`.</alert>
