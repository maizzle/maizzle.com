---
title: Section
description: The Section component is full-width content block with optional width constraints.
section: Components
order: 6
---

# Section

A full-width content block with optional width constraint.

## Usage

```vue [emails/example.vue]
<template>
  <Layout>
    <Container>
      <Section> // [!code ++]
        <Text>A constrained section.</Text>
      </Section> // [!code ++]
    </Container>
  </Layout>
</template>
```

The output is similar to a [Container](/docs/components/container), but without the `max-width` and centering. Use a Section when you want a full-width background color or border, but still want to constrain the content inside, or to wrap multiple rows and columns in a shared width context.

## Props

### width

Type: `string | number`\
Default: `null`

Sets the `max-width` on the `<div>` and the `width` on the MSO fallback table. Use this when you'd rather pass a numeric prop than a Tailwind class.

```vue [emails/example.vue]
<template>
  <Section :width="400">
    <Text>Constrained to 400px.</Text>
  </Section>
</template>
```

When `width` is omitted, the fallback MSO table width is auto-derived from either a width utility (`max-w-md`, `w-[400px]`, …) or inline `max-width`/`width` style on the component, after CSS inlining. If no width source is found, the MSO table falls back to `100%`.

```vue [emails/example.vue]
<template>
  <Section class="max-w-md">
    <Text>MSO table width matches max-w-md after inlining.</Text>
  </Section>
</template>
```

### msoStyle

Type: `string`\
Default: `undefined`

Applies inline CSS only to the MSO `<td>` element. Use this when you need Outlook-specific styling that shouldn't affect other email clients.

```vue [emails/example.vue]
<template>
  <Section mso-style="padding: 16px">
    <Text>Extra padding in Outlook only.</Text>
  </Section>
</template>
```

### outlookFallback

Type: `boolean`\
Default: `true`

Toggle Outlook (MSO) and VML fallback markup for this section and its descendants. Set this to `false` to use modern markup and skip the MSO ghost table, VML shapes, `xmlns:v` / `xmlns:o` attributes, and mso-specific CSS.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Section :outlook-fallback="false" class="max-w-100 text-white p-6">
      <Text>Modern markup only, no MSO fallback.</Text>
    </Section>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {1}
  <div style="max-width: 400px; color: #fffffe; padding: 24px;">
    <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Modern markup only, no MSO fallback.</p>
  </div>
  ```
  :::
::

## Style forwarding

Any `style` or `class` attributes you add to Section are forwarded to both the `<div>` and the MSO `<td>` element, so your styles render consistently across clients.

## Column width source

When Section has a resolvable width — either a Tailwind utility, an inline `max-width`/`width` style, or the `width` prop — it acts as a width source for descendant `Row` / `Column` components. They'll divide the section width instead of the outer Container width.

```vue
<template>
  <Container>
    <Section class="max-w-100">
      <Row>
        <Column>200px (max-w-100 / 2)</Column>
        <Column>200px</Column>
      </Row>
    </Section>
  </Container>
</template>
```
