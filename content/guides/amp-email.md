---
title: "How to create an AMP for Email template"
description: "Use AMP for Email in Maizzle to easily create interactive HTML emails with realtime information and in-line actions."
date: 2021-03-03
---

# How to create an AMP for Email template

<p class="text-sm">Last updated: March 18, 2023</p>

In this tutorial, you'll learn how to make use of custom config files in Maizzle to create interactive AMP for Email templates.

For a syntax refresher, checkout the [AMP Email docs](https://amp.dev/documentation/guides-and-tutorials/start/create_email/?format=email) or [AMP Email examples](https://amp.dev/documentation/examples/?format=email).

Want to dive right in? Checkout our [AMP for Email Starter](https://github.com/maizzle/starter-amp4email).

## Initial setup

As always, let's scaffold a new project:

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./amp-emails`, and select the Default Starter.

Choose Yes when prompted to Install dependencies.

Once it finishes installing dependencies, open the project folder in your favorite editor.

## Layout

AMP for Email requires some special markup, so let's create an `amp.html` Layout and save it under `src/layouts`:

```hbs [src/layouts/amp.html]
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

## Template

For this tutorial, we'll use the [AMP Carousel](https://amp.dev/documentation/components/amp-carousel/?format=email) component.

Create `src/templates/amp/carousel.html` and add a basic AMP carousel:

```xml [src/templates/amp/carousel.html]
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

You initialize [AMP components](https://amp.dev/documentation/guides-and-tutorials/learn/email-spec/amp-email-components/?format=email) by pushing their `<script>` tag to the `<stack name="head" />` from the layout, as shown above.

You can then use the component's markup inside `<fill:template></fill:template>`.

## CSS inlining

Inline style attributes are not allowed in AMP, so you need to disable CSS inlining.

Do it either globally, in your environment config:

```js [config.js]
module.exports = {
  inlineCSS: false
}
```

... or locally, in the Template's Front Matter:

```yaml [src/templates/amp/carousel.html]
---
inlineCSS: false
---
```

## !important

AMP for Email doesn't support `!important` in CSS, either.

This can be easily turned off in your Tailwind config:

```js [tailwind.config.js]
module.exports = {
  important: false,
}
```

However, you probably want to turn it off _only_ for AMP templates.

You can do this with a custom build Environment:

```js [config.amp.js]
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

Next, duplicate `tailwind.config.js` to `tailwind.amp.js` and disable `important`:

```js [tailwind.amp.js]
module.exports = {
  important: false,
}
```

Finally, run `maizzle build amp` to build your ⚡4email templates.

In case you haven't installed the [Maizzle CLI](/docs/cli), add an npm script to `package.json`:

```json [package.json]
"scripts": {
  "build:amp": "maizzle build amp"
}
```

You'd then build your AMP emails by running `npm run build:amp`.


## Resources

- [Official AMP for Email docs](https://amp.dev/documentation/guides-and-tutorials/start/create_email/?format=email)
- [Maizzle AMP for Email Starter](https://github.com/maizzle/starter-amp4email)
