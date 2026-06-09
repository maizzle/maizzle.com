---
title: Body
description: The Body component renders the body element with email-safe defaults and an accessible wrapper.
section: Components
order: 3
---

# Body

Renders the `<body>` element with email-safe resets and an accessible content wrapper.

## Usage

`<body>` is rendered with inline styles for `margin`, `padding`, `width`, and `word-break` resets, followed by an inner `<div>` wrapper for accessibility.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Html>
      <Head />
      <Body>
        <!-- your email content -->
      </Body>
    </Html>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {8-12}
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body xml:lang="en" dir="ltr" style="margin: 0; padding: 0; width: 100%; word-break: break-word;">
      <div role="article" aria-roledescription="email" lang="en" dir="ltr" style="font-size: medium; font-size: max(16px, 1rem);">
        <!-- your email content -->
      </div>
    </body>
  </html>
  ```
  :::
::

## Props

### ariaLabel

Type: `string`\
Default: `undefined`

Sets the `aria-label` attribute on the inner `<div>` wrapper, giving the email a title that helps screen readers identify the content.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Html>
      <Head />
      <Body aria-label="Welcome email">
        <!-- your email content -->
      </Body>
    </Html>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {9}
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body xml:lang="en" dir="ltr" style="margin: 0; padding: 0; width: 100%; word-break: break-word;">
      // [!code word:aria-label="Welcome email"]
      <div role="article" aria-roledescription="email" aria-label="Welcome email" lang="en" dir="ltr" style="font-size: medium; font-size: max(16px, 1rem);">
        <!-- your email content -->
      </div>
    </body>
  </html>
  ```
  :::
::

### dir

Type: `'ltr' | 'rtl'`\
Default: `'ltr'`

Sets the `dir` attribute on both the `<body>` and the inner wrapper `<div>`. You'd typically set this to `rtl` for right-to-left languages like Arabic or Hebrew.

### xmlLang

Type: `string`\
Default: inherited from `Html`

Sets the `xml:lang` attribute on the `<body>` tag. You typically don't need to set this, it's inherited from the parent `Html` component's `lang` prop through Vue's provide/inject.

### outlookFallback

Type: `boolean`\
Default: `true`

Toggle Outlook (MSO) and VML fallback markup for this `<body>` and its descendants. Set this to `false` to drop the `xml:lang` attribute on `<body>` and skip MSO ghost tables, VML shapes, `xmlns:v` / `xmlns:o` attributes, and mso-specific CSS in descendant components.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Html>
      <Head />
      <Body :outlook-fallback="false">
        <!-- modern markup only inside body -->
      </Body>
    </Html>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {8}
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- ... -->
    </head>
    <body dir="ltr" style="margin: 0; padding: 0; width: 100%; word-break: break-word;">
      <div role="article" aria-roledescription="email" lang="en" dir="ltr" style="font-size: medium; font-size: max(16px, 1rem)">
        <!-- modern markup only inside body -->
      </div>
    </body>
  </html>
  ```
  :::
::

Individual components can still re-enable their own MSO markup by passing `:outlook-fallback="true"` locally.

## Accessibility wrapper

The component renders an inner `<div>` with these attributes:

```html
<div
  role="article"
  aria-roledescription="email"
  aria-label="..."
  lang="..."
  dir="..."
  style="font-size: medium; font-size: max(16px, 1rem)"
>
```

- `role="article"` and `aria-roledescription="email"` help screen readers identify the content as an email
- `lang` and `dir` are for assistive technologies that need them on the content wrapper
- `font-size: max(16px, 1rem)` helps prevent small text auto-sizing
