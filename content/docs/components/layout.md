---
title: Layout
description: The Layout component is a convenience wrapper combining Html, Head, and Body for Maizzle email templates.
section: Components
order: 4
---

# Layout

A convenience that combines `<Html>`, `<Head>`, and `<Body>` into a single wrapper, with Tailwind CSS and Inter font included by default.

## Usage

```vue [emails/welcome.vue]
<template>
  <Layout>
    <Container>
      <Text>Hello!</Text>
    </Container>
  </Layout>
</template>
```

This renders a complete email document structure: `<html>` with VML namespaces, `<head>` with meta tags, Tailwind CSS and the Inter font from Google Fonts, as well as `<body>` with an accessible `role="article"` wrapper.

Layout is ideal for projects where all emails share the same document structure.

## Props

### bodyClass

Type: `string`\
Default: `''`

CSS classes to apply to the `<body>` element.

```vue [emails/welcome.vue]
<Layout body-class="bg-slate-100">
  <!-- content -->
</Layout>
```

### lang

Type: `string`\
Default: `'en'`

Sets the `lang` attribute on the `<html>` element, and the `xml:lang` attribute on `<body>`.

```vue [emails/welcome.vue]
<template>
  <Layout lang="de">
    <!-- German email content -->
  </Layout>
</template>
```

### dir

Type: `'ltr' | 'rtl'`\
Default: `'ltr'`

Sets the text direction on the `<html>` element.

```vue [emails/welcome.vue]
<template>
  <Layout lang="ar" dir="rtl">
    <!-- right-to-left content -->
  </Layout>
</template>
```

### ariaLabel

Type: `string`\
Default: `undefined`

Sets the `aria-label` attribute on the wrapper `<div>` inside `<body>`.

::code-tabs
  :::code-tab{label="emails/welcome.vue"}
  ```vue [emails/welcome.vue]
  <template>
    <Layout aria-label="Welcome email">
      <!-- content -->
    </Layout>
  </template>
  ```
  :::
  :::code-tab{label="dist/welcome.html"}
  ```html
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- ... -->
    </head>
    <body xml:lang="en" style="margin: 0; width: 100%; height: 100%; padding: 0; word-break: break-word;">
      <div role="article" aria-label="Welcome email" ...> // [!code word:aria-label="Welcome email"]
        <!-- content -->
      </div>
    </body>
  </html>
  ```
  :::
::

## What's included

Layout renders these elements for you:

- `<html>` with `lang`, `dir`, and VML namespace attributes
- `<head>` with essential meta tags (charset, viewport, format-detection)
- MSO-specific styles for font rendering
- Google Fonts preconnect links and Inter font import
- Tailwind CSS import
- `<body>` with an accessible `div[role="article"]` wrapper

## When to use it

Layout is opinionated syntax sugar provided as convenience — it includes Google Fonts (Inter), MSO font styles, and a specific set of meta tags. It's what we recommend using unless you know what you're doing. 

If you need full control over what goes in the `<head>` or want to use different fonts and meta tags, use the `<Html>`, `<Head>`, and `<Body>` components separately.
