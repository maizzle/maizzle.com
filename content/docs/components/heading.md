---
title: Heading
description: The Heading component renders semantic heading elements from h1 through h6.
section: Components
order: 9
---

# Heading

Renders a semantic heading element from `<h1>` through `<h6>`, with vertical spacing reset.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Heading>Main Title</Heading>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <h1 style="margin: 0;">Main Title</h1>
  ```
  :::
::

This renders an `<h1>` tag with the default class `m-0` to reset the margins.

### Custom level

Use the `level` prop to render different heading levels:

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Heading :level="2" class="text-xl text-slate-700">Subtitle</Heading>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <h2 style="margin: 0; font-size: 20px; line-height: 28px; color: #334155;">Subtitle</h2>
  ```
  :::
::

## Props

### level

Type: `String | Number`\
Default: `1`

The heading level to render, from 1 to 6. Can be passed as a number or string.

```vue [emails/example.vue]
<template>
  <Heading>H1 heading</Heading>
  <Heading :level="2">H2 heading</Heading>
  <Heading level="3">H3 heading</Heading>
</template>
```
