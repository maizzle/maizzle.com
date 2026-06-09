---
title: Hr
description: Tailwind-first horizontal rule or divider in Maizzle email templates.
section: Components
order: 16
---

# Hr

A horizontal rule for visually separating content sections.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Layout>
      <Container>
        <Text>Content above.</Text>
        <Hr /> // [!code ++]
        <Text>Content below.</Text>
      </Container>
    </Layout>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {2}
  <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Above.</p>
  <div role="separator" style="margin-top: 24px; margin-bottom: 24px; height: 1px; background-color: #cbd5e1; line-height: 1px;">&zwj;</div>
  <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">Below.</p>
  ```
  :::
::

Renders a `<div role="separator">` with these defaults:

- `h-px` — 1px height
- `leading-px` — 1px line-height
- `my-6` — 24px vertical margin
- `bg-slate-300` — `#cbd5e1` background

## Customizing

Override defaults with Tailwind utility classes or inline styles.

### Color

```vue [emails/example.vue]
<Hr class="bg-blue-200" />
<Hr style="background-color: #e2e8f0;" />
```

### Height

Pass either `h-*` or `leading-*`, either will work:

```vue
<Hr class="h-0.5" />
<Hr class="h-[3px]" />
<Hr class="leading-1" />
```

If you pass both, the explicit `leading-*` wins:

```vue
<Hr class="h-4 leading-2" />  
<!-- will be 8px thick, not 16px -->
```

### Margin

```vue
<Hr class="my-8" />
<Hr class="mt-4 mb-8" />
<Hr class="mx-4" />
```

## Outlook

Use `mso-line-height-alt-*` utilities to override thickness in Outlook. For example, this renders a 2px line in modern clients but 8px in Outlook:

```vue
<Hr class="h-0.5 mso-line-height-alt-2" />
```
