---
title: Head
description: The Head component renders the email head element with essential meta tags.
section: Components
order: 2
---

# Head

Renders the `<head>` element with essential meta tags for email.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Html>
      <Head /> // [!code ++]
      <Body>
        <!-- your email content -->
      </Body>
    </Html>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {3-7}
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body xml:lang="en" dir="ltr" style="margin: 0; padding: 0; width: 100%; word-break: break-word;">
      <div role="article" aria-roledescription="email" lang="en" dir="ltr" style="font-size: medium; font-size: max(16px, 1rem);"></div>
    </body>
  </html>
  ```
  :::
::

Anything you pass inside the `<Head>` tag is rendered after the default meta tags. This is where you add your `<style>` tags with Tailwind CSS imports, for example:

```vue [emails/example.vue]
<template>
  <Html>
    <Head>
      <style> /* [!code ++] */
        @import "@maizzle/tailwindcss"; /* [!code ++] */
      </style> /* [!code ++] */
    </Head>
    <Body>
      <!-- your email content -->
    </Body>
  </Html>
</template>
```

## Props

### double

Type: `boolean | string`\
Default: `false`

Renders an empty `<head>` element before the real one.

```vue [emails/example.vue]
<template>
  <Html>
    <Head :double="true">
      <style>
        @import "@maizzle/tailwindcss";
      </style>
    </Head>
    <Body>
      <!-- your email content -->
    </Body>
  </Html>
</template>
```

::callout{type="info"}
This is a workaround for Yahoo! Mail on Android, which strips styles from the first `<head>` element it finds. By rendering an empty `<head>` first, your actual styles in the second `<head>` are preserved and used by the client. Can break in some email service providers.
::
