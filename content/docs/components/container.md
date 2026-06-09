---
title: Container
description: The Container component is a centered wrapper with MSO table fallback that wraps your content.
section: Components
order: 5
---

# Container

A centered wrapper that constrains your email content to a max width in modern clients, with a table fallback for classic Outlook support.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Layout>
      <Container>
        <Text>Centered, max 600px wide.</Text>
      </Container>
    </Layout>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {8-10}
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- ... -->
    </head>
    <body xml:lang="en" style="margin: 0; width: 100%; height: 100%; padding: 0; word-break: break-word;">
      <!-- ... -->
        <!--[if mso]><table role="none" cellpadding="0" cellspacing="0" style="width: 600px" align="center"><tr><td><![endif]-->
        <div style="margin: 0 auto; max-width: 600px;"><p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Centered, max 600px wide.</p></div>
        <!--[if mso]></td></tr></table><![endif]-->
      <!-- ... -->
    </body>
  </html>
  ```
  :::
::

By default, it's 600px and centered. Override with any Tailwind width utility:

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Container class="max-w-2xl">
      <Text>Wider container</Text>
    </Container>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {8-10}
  // [!code word:672px]
  <!--[if mso]><table role="none" cellpadding="0" cellspacing="0" style="width: 672px" align="center"><tr><td><![endif]-->
  <div style="margin: 0 auto; max-width: 672px;">
    <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Wider container</p>
  </div>
  <!--[if mso]></td></tr></table><![endif]-->
  ```
  :::
::

## Props

### width

Type: `string | number`\
Default: `null`

Sets the `max-width` on the `<div>` and the `width` on the MSO fallback table. Use this when you'd rather pass a numeric prop than a Tailwind class.

```vue [emails/example.vue]
<template>
  <Container :width="600">
    <Text>Constrained to 600px.</Text>
  </Container>
</template>
```

::callout{type="info"}
You may also use a string value like `width="600px"` or even `width="600"`, it will be correctly parsed and suffixed with `px` if needed.
::

### msoStyle

Type: `string`\
Default: `undefined`

Inline CSS applied only to the MSO `<td>` element. Use for Outlook-specific styling that shouldn't affect other clients.

```vue
<template>
  <Container mso-style="mso-padding-alt: 0;">
    <Text>Padding removed in Outlook only.</Text>
  </Container>
</template>
```

### outlookFallback

Type: `boolean`\
Default: `true`

Toggle Outlook (MSO) and VML fallback markup for this container and its descendants. Set this to `false` to use modern markup and skip the MSO ghost table, VML shapes, `xmlns:v` / `xmlns:o` attributes, and mso-specific CSS.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Container :outlook-fallback="false">
      <Text>Modern markup only, no MSO fallback.</Text>
    </Container>
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
    <body xml:lang="en" style="margin: 0; width: 100%; height: 100%; padding: 0; word-break: break-word;">
      <!-- ... -->
        <div style="margin: 0 auto; max-width: 600px;"><p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Modern markup only, no MSO fallback.</p></div>
      <!-- ... -->
    </body>
  </html>
  :::
::

## Column width inheritance

Container exposes its resolved width to descendant `Row` / `Column` / `Section` components, so you get automatic column width calculation based on the Container's width and the number of columns in a row.

```vue [emails/example.vue]
<template>
  <Container>
    <Row>
      <Column>200px wide</Column>
      <Column>200px wide</Column>
      <Column>200px wide</Column>
    </Row>
  </Container>
</template>
```

Same applies when you size the Container with a Tailwind utility:

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column>288px</Column>
      <Column>288px</Column>
    </Row>
  </Container>
</template>
```
