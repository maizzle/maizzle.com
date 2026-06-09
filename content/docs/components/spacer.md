---
title: Spacer
description: Add vertical or horizontal spacing between elements in Maizzle email templates.
section: Components
order: 15
---

# Spacer

Adds vertical or horizontal space between elements.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Layout>
      <Container>
        <Text>Above the spacer.</Text>
        <Spacer class="h-6" /> // [!code ++]
        <Text>Below the spacer.</Text>
      </Container>
    </Layout>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {2}
  <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Above the spacer.</p>
  <div role="separator" style="line-height: 24px">&zwj;</div>
  <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Below the spacer.</p>
  ```
  :::
::

## Vertical (default)

Renders a `<div role="separator">` containing a zero-width joiner.

### Sizing

Use the `h-*` or `leading-*` utilities to set the height of the spacer.

```vue
<Spacer class="h-8" />
<Spacer class="leading-10" />
```

If you pass both, the explicit `leading-*` wins and the `h-*` is dropped:

```vue
<!-- Will be 20px tall (leading-5) -->
// [!code word:leading-5]
<Spacer class="h-10 leading-5" />
```

### Outlook fine-tuning

Use the `mso-line-height-alt-*` utilities for Outlook-only overrides. For example, this spacer will be 40px tall in modern clients, but 32px in Outlook:

```vue
// [!code word:mso-line-height-alt-8]
<Spacer class="h-10 mso-line-height-alt-8" />
```

## Horizontal

Renders an `<i>` with em-space characters and `mso-font-width` for Outlook sizing.

`width` is set via the `width` prop, which defaults to `16` (16px).

```vue
<Spacer type="horizontal" :width="24" />
```

::callout{type="info"}
Horizontal spacers use the `mso-font-width` property for Outlook, which uses percentages and has a maximum effective value of `500%`. After a certain point, increasing the `width` prop won't have any effect in Outlook.
::

## Props

### type

Type: `'vertical' | 'horizontal'`\
Default: `'vertical'`

Sets the spacer direction.

### width

Type: `string | number`\
Default: `16`

Width in pixels for horizontal spacers.

```vue
<Spacer type="horizontal" width="24" />
```

### outlookFallback

Type: `boolean`\
Default: `true`

Toggle Outlook (MSO) fallback markup. Set to `false` to skip `mso-font-width` on horizontal spacers.

```vue
<Spacer :outlook-fallback="false" type="horizontal" width="24" />
```
