---
title: CodeInline
description: Inline code formatting with default styling.
section: Components
order: 19
---

# CodeInline

Inline code formatting, with default styles and Shiki syntax highlighting support. 

## Usage

```vue [emails/example.vue]
<template>
  <Layout>
    <Container>
      <Text>
        Use the <CodeInline>defineConfig()</CodeInline> composable to override settings.
      </Text>
    </Container>
  </Layout>
</template>
```

This renders a `<code>` element with default styling: light gray background, subtle border, and rounded corners where supported.

## Syntax highlighting

Pass `theme` and `language` props to get syntax highlighting with Shiki.

```vue
<template>
  <Text>
    Set <CodeInline language="css" theme="github-light">display: none</CodeInline> to hide the element.
  </Text>
</template>
```

When `theme` is omitted, CodeInline falls back to the plain gray styling. This keeps inline code visually quiet in body copy, where token coloring is often noisy.

## Props

### code

Type: `string`\
Default: `''`

The inline code text. Alternative to passing it as slot content.

```vue
<script setup>
  const snippet = `display: none`
</script>

<template>
  <Text>
    Set <CodeInline :code="snippet" /> to hide the element.
  </Text>
</template>
```

### language

Type: `BundledLanguage`\
Default: `'html'`

Shiki language used for syntax highlighting. Only used when `theme` is also set.

```vue
<template>
  <CodeInline language="ts" theme="github-light">const x = 1</CodeInline>
</template>
```

### theme

Type: `BundledTheme`\
Default: `undefined`

Shiki theme to apply. Omit to use default styling without syntax highlighting.

```vue
<template>
  <CodeInline theme="github-dark">npm install</CodeInline>
</template>
```

## Styling

You can override the defaults with `class` or `style` attributes:

```vue
<template>
  <CodeInline class="bg-blue-100 text-blue-800">npm install</CodeInline>
</template>
```
