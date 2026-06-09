---
title: Text
description: The Text component is a semantic text wrapper that renders a paragraph or inline span element.
section: Components
order: 10
---

# Text

Semantic text wrapper that renders a `<p>` or `<span>` element.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Text>A paragraph of text.</Text>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <p style="margin-top: 16px; font-size: 16px; line-height: 24px;">
    A paragraph of text.
  </p>
  ```
  :::
::

By default, `<Text>` renders a `<p>` with the classes top margin and a typography reset.

You can render inline text with the `as` prop:

```vue [emails/example.vue]
<template>
  <Text as="span">Inline text.</Text>
</template>
```

This renders a `<span>` tag with the default class `text-base`. You may override this with any Tailwind typography classes, for example:

```vue [emails/example.vue]
<template>
  <Text as="span" class="text-sm text-slate-500">Smaller, gray text.</Text>
</template>
```

## Props

### as

Type: `'p' | 'span'`\
Default: `'p'`

The HTML element to render.

```vue [emails/example.vue]
<template>
  <Text>This renders a paragraph.</Text>
  <Text as="span">This renders a span.</Text>
</template>
```
