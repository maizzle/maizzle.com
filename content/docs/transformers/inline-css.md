---
title: Inline CSS
description: Automatically inline CSS from style tags into HTML element style attributes.
section: Transformers
order: 3
---

# Inline CSS

CSS inlining is still important in HTML email, mainly because of Gmail and Outlook on Windows which have limited support for `<style>` tags.

## Usage

Enabled by default. To disable, set it to `false`:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: false,
  },
})
```

Given this input:

```html
<p class="text-blue-500">Hello</p>
```

Result:

```html
<p class="text-blue-500" style="color: #3b82f6;">Hello</p>
```

## Skip inlining

Style tags with an `embed` attribute are ignored by the inliner:

```html
<style embed>
  .keep-me { width: 100%; }
</style>
```

## Customization

Pass an object instead of `true` to configure [Juice](https://github.com/Automattic/juice) options:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: {
      preferUnitlessValues: true,
      removeStyleTags: true,
    },
  },
})
```

### preferUnitlessValues

Type: `boolean`\
Default: `true`

Converts `0px`, `0em`, and similar zero values to `0`.

### removeInlinedSelectors

Type: `boolean`\
Default: `true`

Remove selectors from `<style>` tags after they have been inlined.

### applyWidthAttributes

Type: `boolean`\
Default: `true`

Apply `width` CSS values as HTML `width` attributes on elements.

### applyHeightAttributes

Type: `boolean`\
Default: `true`

Apply `height` CSS values as HTML `height` attributes on elements.

### inlineDuplicateProperties

Type: `boolean`\
Default: `true`

When a property is defined multiple times, inline all occurrences instead of only the last one.

### safelist

Type: `string[]`\
Default: `undefined`

CSS selectors to preserve in `<style>` even after inlining.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: {
      safelist: ['.some-class'],
    },
  },
})
```

### styleToAttribute

Type: `Record<string, string>`\
Default: `undefined`

Duplicate CSS properties to HTML attributes. For example, to copy `background-color` to a `bgcolor` attribute:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: {
      styleToAttribute: {
        'background-color': 'bgcolor',
      },
    },
  },
})
```

### widthElements

Type: `string[]`\
Default: `['img', 'video']`

Elements that can receive a `width` HTML attribute from their CSS `width` value.

### heightElements

Type: `string[]`\
Default: `['img', 'video']`

Elements that can receive a `height` HTML attribute from their CSS `height` value.

### excludedProperties

Type: `string[]`\
Default: `undefined`

CSS properties to skip when inlining.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: {
      excludedProperties: ['cursor', 'animation'],
    },
  },
})
```

### codeBlocks

Type: `object`\
Default: `undefined`

Template language delimiters to preserve during inlining, so they aren't mangled by the HTML parser:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: {
      codeBlocks: {
        EJS: { start: '<%', end: '%>' },
      },
    },
  },
})
```

### customCSS

Type: `string`\
Default: `undefined`

An extra CSS string to inline alongside the existing `<style>` tags:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: {
      customCSS: 'p { font-size: 16px; }',
    },
  },
})
```

## API

Use `inlineCss` to programmatically inline CSS:

```ts
import { inlineCss } from '@maizzle/framework'

const html = `
  <style>
    .red { color: red; }
    .btn { background: blue; padding: 10px; }
  </style>
  <p class="red">Hello</p>
  <a class="btn">Click</a>
`

const out = inlineCss(html, {
  removeStyleTags: true,
  preferUnitlessValues: true,
})
```

The first argument is an HTML string. The second is an optional `InlineCssOptions` object containing every option documented above plus any [Juice option](https://github.com/Automattic/juice#options) is accepted at the top level. Returns the transformed HTML string.
