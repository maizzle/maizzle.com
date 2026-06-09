---
title: Row
description: The Row component is a container for the Column component.
section: Components
order: 7
---

# Row

A container that wraps Columns and auto-calculates their widths.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Layout>
      <Container>
        <Row>
          <Column>First</Column>
          <Column>Second</Column>
          <Column>Third</Column>
        </Row>
      </Container>
    </Layout>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {9-10, 20-21}
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- ... -->
    </head>
    <body xml:lang="en" style="margin: 0; width: 100%; height: 100%; padding: 0; word-break: break-word;">
      <!--[if mso]><table role="none" cellpadding="0" cellspacing="0" style="width: 600px" align="center"><tr><td><![endif]-->
      <div style="margin: 0 auto; max-width: 600px;">
        <!--[if mso]><table role="none" cellpadding="0" cellspacing="0" style="width: 100%"><tr><![endif]-->
        <div style="font-size: 0;">
          <!--[if mso]><td style="width: 200px; vertical-align: top"><![endif]-->
          <div style="width: 200px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">First</div>
          <!--[if mso]></td><![endif]-->
          <!--[if mso]><td style="width: 200px; vertical-align: top"><![endif]-->
          <div style="width: 200px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">Second</div>
          <!--[if mso]></td><![endif]-->
          <!--[if mso]><td style="width: 200px; vertical-align: top"><![endif]-->
          <div style="width: 200px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">Third</div>
          <!--[if mso]></td><![endif]-->
        </div>
        <!--[if mso]></tr></table><![endif]-->
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
    </body>
  </html>
  ```
  :::
::

Each Column automatically gets a `200px` width. Row also uses `font-size: 0` to eliminate inline-block whitespace gaps between columns.

## Props

### width

Type: `string | number`\
Default: `null`

Explicit Row width used as the source for column width calculations. When set, this overrides the inherited width from any ancestor.

The Tailwind-first equivalent is to put a width utility on the row — child Columns will walk up to the nearest sized ancestor and use that as the source for their width calculations:

```vue [emails/example.vue]
<template>
  <Container>
    <Row class="max-w-100">
      <Column>200px wide</Column>
      <Column>200px wide</Column>
    </Row>
  </Container>
</template>
```

Use the `width` prop when you'd rather pass a number:

```vue [emails/example.vue]
<template>
  <Container>
    <Row :width="400">
      <Column>200px wide</Column>
      <Column>200px wide</Column>
    </Row>
  </Container>
</template>
```

When neither is set, Columns inherit from the nearest sized ancestor — Container, Section, or a parent Column or Row.

### cols

Type: `number`\
Default: `null`

Override the auto-detected column count. Row normally counts its direct children to determine how many columns there are — set this manually when auto-detection doesn't match your layout, e.g. with `v-if` or `v-for`.

```vue
<template>
  <Row :cols="items.length">
    <Column v-for="item in items" :key="item.id">
      {{ item.text }}
    </Column>
  </Row>
</template>
```

### outlookFallback

Type: `boolean`\
Default: `true`

Toggle Outlook (MSO) and VML fallback markup for this row and its descendants. Set this to `false` to use modern markup and skip the MSO `<table><tr>` wrapper, VML shapes, `xmlns:v` / `xmlns:o` attributes, and mso-specific CSS in descendant columns.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Row :outlook-fallback="false">
      <Column>First</Column>
      <Column>Second</Column>
    </Row>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {1}
  <div style="font-size: 0;">
    <div style="width: 300px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">First</div>
    <div style="width: 300px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">Second</div>
  </div>
  ```
  :::
::

::callout{type="warning"}
Without the MSO ghost table, columns will stack in Outlook instead of sitting side by side. Maizzle warns at build time when this happens.
::
