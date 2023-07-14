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

```js [config.js]
module.exports = {
  extraAttributes: {
    div: {
      role: 'article'
    }
  }
}
```

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

<Alert>Attributes will be added only if they're not already present on the element.</Alert>

### Disabling

You may turn this off by setting `extraAttributes` to `false` in your config:

```js [config.js]
module.exports = {
  extraAttributes: false,
}
```

## Selectors

Tag, class, id, and attribute selectors are supported:

```js [config.js]
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

## Multiple selectors

Add multiple attributes to multiple elements in one go:

```js [config.js]
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

## Tailwind CSS

Any Tailwind CSS classes that you add with this Transformer need to be added to your `content` key, otherwise they will not be generated.

To do this, simply add the path to your `config.js` file to the `content` array:

```js [tailwind.config.js]
module.exports = {
  content: ['./config.js'],
}
```

## API

```js [app.js]
const {applyExtraAttributes} = require('@maizzle/framework')
const options = {
  div: {
    role: 'article'
  }
}

const html = await applyExtraAttributes('<div></div>', options)
```
