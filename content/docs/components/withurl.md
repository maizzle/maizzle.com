---
title: WithUrl
description: Rewrites URLs in child elements by prepending a base URL and appending query parameters.
section: Components
order: 27
---

# WithUrl

Rewrites URLs in child elements by prepending a base URL and appending query parameters.

## Usage

Prepend a base URL to all relative paths:

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <WithUrl base="https://cdn.example.com/images">
      <Img src="hero.jpg" alt="Hero" width="600" />
      <Img src="logo.png" alt="Logo" width="120" />
    </WithUrl>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <img src="https://cdn.example.com/images/hero.jpg" alt="Hero" width="600" style="max-width: 100%; vertical-align: middle;">
  <img src="https://cdn.example.com/images/logo.png" alt="Logo" width="120" style="max-width: 100%; vertical-align: middle;">
  ```
  :::
::

Add tracking parameters to URLs:

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <WithUrl parameters="utm_source=email&utm_campaign=welcome">
      <Button href="https://example.com/shop">Shop Now</Button>
      <Link href="https://example.com/about">About Us</Link>
    </WithUrl>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!-- Button renders a wrapped <a>, Link renders a plain <a> -->
  <a href="https://example.com/shop?utm_source=email&utm_campaign=welcome">Shop Now</a>
  <a href="https://example.com/about?utm_source=email&utm_campaign=welcome">About Us</a>
  ```
  :::
::

You can use both props together:

```vue [emails/example.vue]
<template>
  <WithUrl base="https://cdn.example.com" parameters="v=2">
    <Img src="hero.jpg" alt="Hero" width="600" />
  </WithUrl>
</template>
```

The component recursively processes all descendant elements, including nested components. It handles these tags and attributes:

- `a[href]`
- `img[src, srcset]`
- `video[src, poster]`
- `source[src, srcset]`
- `link[href]`
- `script[src]`
- `object[data]`
- `embed[src]`
- `iframe[src]`
- `v:image[src]`
- `v:fill[src]`

Absolute URLs are left unchanged when using `base` — only relative URLs are rewritten. When using `parameters`, query strings are appended to all URLs regardless.

Slash normalization is handled automatically, so `base="https://example.com/"` and `base="https://example.com"` both work correctly.

Values in `srcset` attributes are also processed, each URL in the set is rewritten individually.

::callout
The `url.base` and `url.parameters` config options do the same thing at the transformer level for the entire template. Use WithUrl when you need different base URLs or parameters for specific sections of your email.
::

## Props

### base

Type: `String`\
Default: _undefined_

Base URL to prepend to all relative URLs found in child elements. Absolute URLs are not affected.

```vue [emails/example.vue]
<template>
  <WithUrl base="https://cdn.example.com/images">
    <Img src="hero.jpg" alt="Hero" width="600" />
  </WithUrl>
</template>
```

### parameters

Type: `String`\
Default: _undefined_

Query parameters to append to all URLs in child elements. Provide as a query string without the leading `?`.

```vue [emails/example.vue]
<template>
  <WithUrl parameters="utm_source=email&utm_medium=newsletter">
    <Button href="https://example.com">Click here</Button>
  </WithUrl>
</template>
```
