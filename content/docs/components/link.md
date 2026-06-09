---
title: Link
description: Renders an anchor element with default styling for use in emails.
section: Components
order: 12
---

# Link

Renders an `<a>` element with email-friendly defaults. Warns if `href` is missing or empty.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Link href="https://example.com">Visit our site</Link>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <a href="https://example.com" style="text-decoration: none;">Visit our site</a>
  ```
  :::
::

`<Link>` renders an `<a>` tag with `text-decoration: none;` styling to prevent underlines in email clients. You can style it with Tailwind classes or inline styles as needed.

### Styling

Pass classes or inline CSS to override the defaults:

```vue [emails/example.vue]
<template>
  <Link href="https://example.com" class="text-blue-600 underline">Styled link</Link>
</template>
```

All HTML attributes are passed through to the rendered `<a>` element.

## Props

### href

Type: `String`\
Default: _required_

The URL that the link points to. Must be a non-empty string.

```vue [emails/example.vue]
<template>
  <Link href="https://example.com">Click here</Link>
</template>
```
