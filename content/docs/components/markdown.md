---
title: Markdown
description: Renders Markdown to HTML with syntax highlighting and Outlook-compatible code blocks.
section: Components
order: 20
---

# Markdown

Render Markdown content to HTML in your email templates.

## Usage

```vue [emails/example.vue]
<template>
  <Layout>
    <Container>
      <Markdown>
        # Hello World

        This is **bold** and this is *italic*.

        ```css
        .button { color: red; }
        ```
      </Markdown>
    </Container>
  </Layout>
</template>
```

Markdown is processed with [markdown-it](https://github.com/markdown-it/markdown-it) support and the linkify, and typographer plugins enabled by default.

Fenced code blocks are syntax-highlighted with [Shiki](https://shiki.style).

::callout{type="info"}
The component inherits your global [`markdown`](/docs/development/configuration#markdown) config, so markdown-it plugins and options set there also apply here. Props on the component take precedence.
::

### From a file

Use the `src` prop to load Markdown from an external file:

```vue [emails/example.vue]
<template>
  <Markdown src="./content.md" />
</template>
```

### Wrapper

Use the `wrapper` prop to wrap the rendered output in a `<div>`, which also forwards `class` and `style` attributes:

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  // [!code word:wrapper]
  <template>
    <Markdown wrapper class="text-slate-700">
      Some _markdown_ content.
    </Markdown>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <div style="color: #334155;">
    <p>Some <em>markdown</em> content.</p>
  </div>
  ```
  :::
::

### Prose typography

`@maizzle/tailwindcss` ships a `prose` utility that gives rendered Markdown email-safe typography (vertical rhythm, link colors, code/blockquote styling) — similar to [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography), but tuned for email clients.

Apply it via the `wrapper` prop, or on any element wrapping `<Markdown>`:

```vue
// [!code word:class="prose"]
<Markdown wrapper class="prose">
  # Hello

  Some _markdown_ content with a [link](https://example.com).
</Markdown>
```

Size presets (`prose-sm`, `prose-base`, `prose-lg`, `prose-xl`) scale the typographic and spacing scale together. Element modifiers like `prose-a:text-blue-600` or `prose-h1:text-4xl` override individual elements without ejecting from the preset.

## Props

### content

Type: `string`\
Default: `''`

A Markdown content string. When provided, this takes priority over slot content.

```vue
<Markdown content="# Hello from a prop" />
```

### src

Type: `string`\
Default: `''`

Path to a Markdown file, resolved at build time. The file contents are read and injected by a Vite plugin.

```vue
<Markdown src="./newsletter-body.md" />
```

### shikiTheme

Type: `string`\
Default: `'github-dark-high-contrast'`

The [Shiki theme](https://shiki.style/themes) to use for syntax highlighting in fenced code blocks. Falls back to [`markdown.shikiTheme`](/docs/development/configuration#shikitheme) from your config when not set on the component.

```vue
<Markdown shiki-theme="one-dark-pro">
    ```js
    const greeting = 'Hello'
    ```
</Markdown>
```

### wrapper

Type: `boolean`\
Default: `false`

When `true`, wraps the rendered HTML output in a `<div>` element. Any `class` or `style` attributes on the component are forwarded to this wrapper.

### config

Type: `object`\
Default: `{}`

Options passed to `markdown-exit`. Merged over [`markdown.markdownOptions`](/docs/development/configuration#markdown) from your config, with these per-instance options taking precedence.

## Content priority

The component resolves content in this order:

1. `content` prop
2. Slot content
