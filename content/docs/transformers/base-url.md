---
title: "Base URL"
description: "Set a base URL and easily prepend absolute URLs to any source in your HTML emails"
---

# Base URL

Define a base URL that will be prepended to all sources and hrefs in your HTML.

Useful if you already host your images somewhere like a CDN, so you don't have to write the full URL every time when developing.

## Usage

Make it globally available by setting it in your environment config:

<code-sample title="config.js">

  ```js
  module.exports = {
    baseURL: 'https://cdn.example.com/'
  }
  ```

</code-sample>

<alert type="danger">Note that this will apply to _all_ sources and hrefs, including `<a>` tags, as long as the source's value is not an URL.</alert>

## Customization

You'll most likely want to customize the transformer so that it applies only to certain elements.

For example, apply the base URL only to `<img>` elements:

<code-sample title="config.js">

  ```js
  module.exports = {
    baseURL: {
      url: 'https://cdn.example.com/',
      tags: {
        img: {
          src: 'https://foo.com/',
          srcset: 'https://bar.com/',
        },
      },
    },
  }
  ```

</code-sample>

## Front Matter

You may override it for a single Template, through Front Matter:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  baseURL: 'https://res.cloudinary.com/user/image/upload/v.../'
  ---

  <extends src="src/layouts/base.html">
    <block name="template">
      <img src="example.jpg">
    </block>
  </extends>
  ```

</code-sample>

## Trailing slash

Mind the trailing slash on your URL, this influences how you reference images:

<code-sample title="src/templates/example.html">

  ```xml
  <!-- baseURL: 'https://cdn.example.com/img' -->
  <img src="/folder/product-1.png">

  <!-- baseURL: 'https://cdn.example.com/img/' -->
  <img src="folder/product-1.png">
  ```

</code-sample>


## Disabling

If you have `baseURL` set globally (in your config), you may disable it for a Template by setting its value to an empty string or a falsy value in Front Matter:

<code-sample title="src/templates/example.html">

  ```yaml
  ---
  baseURL: ''
  ---
  ```

</code-sample>

or

<code-sample title="src/templates/example.html">

  ```yaml
  ---
  baseURL: false
  ---
  ```

</code-sample>

## API

<code-sample title="app.js">

  ```js
  const {applyBaseUrl} = require('@maizzle/framework')
  const config = {
    url: 'https://cdn.example.com/img/',
  }

  const html = await applyBaseUrl('<img src="image.jpg">', config)
  ```

</code-sample>
