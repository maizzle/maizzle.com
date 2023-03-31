---
title: "How to create an AMP for Email template"
description: "Use AMP for Email in Maizzle to easily create interactive HTML emails with realtime information and in-line actions"
date: 2021-03-03
---

# How to create an AMP for Email template

<p class="text-sm">Last updated: March 18, 2023</p>

In this tutorial, you'll learn how to make use of custom config files in Maizzle to create interactive AMP for Email templates.

For a syntax refresher, checkout the [AMP Email docs](https://amp.dev/documentation/guides-and-tutorials/start/create_email/?format=email) or [AMP Email examples](https://amp.dev/documentation/examples/?format=email).

Want to dive right in? Checkout our [AMP for Email Starter](https://github.com/maizzle/starter-amp4email).

## Layout

AMP for Email requires some special markup, so let's create an `amp.html` Layout and save it under `src/layouts`:

<code-sample title="src/layouts/amp.html">

  ```xml
  <!doctype html>
  <html ⚡4email>
  <head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp4email-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>{{{ page.css }}}</style>
    <stack name="head" />
  </head>
  <body>
    <content />
  </body>
  </html>
  ```

</code-sample>

## Template

For this tutorial, we'll use the [AMP Carousel](https://amp.dev/documentation/components/amp-carousel/?format=email) component.

Create `src/templates/amp/carousel.html` and add a basic AMP carousel:

<code-sample title="src/templates/amp/carousel.html">

  ```xml
  <x-amp>
    <push name="head">
      <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"></script>
    </push>

    <div class="p-4">
      <div class="max-w-full">
        <amp-carousel width="600" height="400" layout="responsive" type="slides">
          <amp-img src="https://ampbyexample.com/img/image1.jpg" width="600" height="400" alt="a sample image" />
          <amp-img src="https://ampbyexample.com/img/image2.jpg" width="600" height="400" alt="another sample image" />
          <amp-img src="https://ampbyexample.com/img/image3.jpg" width="600" height="400" alt="and another sample image" />
        </amp-carousel>
      </div>
    </div>
  </x-amp>
  ```

</code-sample>

You initialize [AMP components](https://amp.dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components/?format=email) by pushing their `<script>` tag to the `<stack name="head" />` from the layout, as shown above.

You can then use the component's markup inside `<fill:template></fill:template>`.

## CSS inlining

Inline style attributes are not allowed in AMP, so you need to disable CSS inlining.

Do it either globally, in your environment config:

<code-sample title="config.js">

  ```js
  module.exports = {
    inlineCSS: false
  }
  ```

</code-sample>

... or locally, in the Template's Front Matter:

<code-sample title="src/templates/amp/carousel.html">

  ```yaml
  ---
  inlineCSS: false
  ---
  ```

</code-sample>

## !important

AMP for Email doesn't support `!important` in CSS, either.

This can be easily turned off in your Tailwind config:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    important: false,
  }
  ```

</code-sample>

However, you probably want to turn it off _only_ for AMP templates.

You can do this with a custom build Environment:

<code-sample title="config.amp.js">

  ```js
  module.exports = {
    build: {
      destination: {
        path: 'build_amp'
      },
      templates: {
        source: 'src/templates/amp'
      },
      tailwind: {
        config: 'tailwind.amp.js'
      }
    }
  }
  ```

</code-sample>

Next, duplicate `tailwind.config.js` to `tailwind.amp.js` and disable `important`:

<code-sample title="tailwind.amp.js">

  ```js
  module.exports = {
    important: false,
    // ...
  }
  ```

</code-sample>

Finally, run `maizzle build amp` to build your ⚡4email templates.

In case you haven't installed the [Maizzle CLI](/docs/cli), add an npm script to `package.json`:

<code-sample title="package.json">

  ```json
  "scripts": {
    "build:amp": "maizzle build amp"
  }
  ```

</code-sample>

You'd then build your AMP emails by running `npm run build:amp`.


## Resources

- [Official AMP for Email docs](https://amp.dev/documentation/guides-and-tutorials/start/create_email/?format=email)
- [Maizzle AMP for Email Starter](https://github.com/maizzle/starter-amp4email)
