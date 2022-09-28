---
title: "Add attributes"
description: "Automatically add attributes to your HTML emails. Write less code and easily improve accessibility."
---

# Add attributes

Maizzle can automatically add attributes to HTML elements in your email templates.

This can be useful for:

- adding default attributes based on build Environment or Template
- not having to write required attributes all the time
- automating email accessibility

The `extraAttributes` key in your config defines which elements in your emails should receive which attributes with what values.

## Usage

Here is how you would add a `role="article"` attribute to a `<div>`:

<code-sample title="config.js">

  ```js
  module.exports = {
    extraAttributes: {
      div: {
        role: 'article'
      }
    }
  }
  ```

</code-sample>

## Default attributes

By default, Maizzle makes any `<table>` accessible, resets its spacing, and ensures that an empty `alt=""` attribute is added to images that don't have it.

This is the default configuration:

```js
let attributes = {
  table: {
    cellpadding: 0,
    cellspacing: 0,
    role: 'presentation'
  },
  img: {
    alt: ''
  }
}
```

### Disabling

You may turn this off by setting `extraAttributes` to `false` in your config:

<code-sample title="config.js">

  ```js
  module.exports = {
    extraAttributes: false
  }
  ```

</code-sample>

<alert>Attributes will be added only if they're not already present on the element.</alert>

## Selectors

Tag, class, id, and attribute selectors are supported:

<code-sample title="config.js">

  ```js
  module.exports = {
    extraAttributes: {
      div: {
        id: 'new'
      },
      '.test': {
        editable: true
      },
      '#test': {
        'data-foo': 'bar'
      },
      '[role]': {
        'aria-roledescription': 'slide'
      }
    }
  }
  ```

</code-sample>

## Multiple selectors

Add multiple attributes to multiple elements in one go:

<code-sample title="config.js">

  ```js
  module.exports = {
    extraAttributes: {
      'div, p': {
        class: 'test'
      },
      'div[role=alert], section.alert': {
        class: 'alert'
      }
    }
  }
  ```

</code-sample>

## Tailwind CSS

Any Tailwind CSS classes that you add with this Transformer need to be added to your `content` key. Simply add the config file to the `content` array:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    content: ['config.js'],
  }
  ```

</code-sample>

## API

<code-sample title="app.js">

  ```js
  const {applyExtraAttributes} = require('@maizzle/framework')

  const html = await applyExtraAttributes('<div></div>', {div: {role: 'article'}})
  ```

</code-sample>
