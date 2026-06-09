---
title: Purge CSS
description: Remove unused CSS from your HTML email templates.
section: Transformers
order: 4
---

# Purge CSS

Removes unused CSS styles and orphaned classes, helping reduce your email size.

Cleaning up your HTML email results in smaller file sizes, which translates to faster email sendouts, faster opens (think slow 3G), and snappier paint times.

Gmail will clip your email [around 102KB](https://github.com/hteumeuleu/email-bugs/issues/41), so anything past that mark won't even be in the DOM (which can lead to unexpected results like tracking pixel not loaded or, worse, hidden unsubscribe links). You might also want to consider the [environmental impact](https://github.com/email-markup-consortium/email-markup-consortium/discussions/39) of sending large, unoptimized emails.

## Usage

Enabled by default. To disable, set it to `false`:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    purge: false,
  },
})
```

## Template delimiters

Template language code blocks like `{{ }}` and `{% %}` are preserved during purging, so they aren't accidentally removed or corrupted.

## Built-in safelist

The following selectors are always preserved, regardless of whether they match an element in the HTML:

- `*body*`
- `.gmail*`
- `.apple*`
- `.ios*`
- `.ox-*`
- `.outlook*`
- `[data-ogs*`
- `.bloop_container`
- `.Singleton`
- `.unused`
- `.moz-text-html`
- `.mail-detail-content`
- `*edo*`
- `#*`
- `.lang*`

These cover known email client class names that are injected at render time and wouldn't be present in your source HTML.

## Customization

Pass an [`email-comb`](https://codsen.com/os/email-comb) options object to configure CSS purging.

### safelist

Type: `string[]`\
Default: `undefined`

Additional selectors to preserve. Your values are appended to the built-in safelist.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    purge: {
      safelist: ['.custom-class', '#keep-me'],
    },
  },
})
```

### backend

Type: `Array<{ heads: string; tails: string }>`\
Default: `[{ heads: '{{', tails: '}}' }, { heads: '{%', tails: '%}' }]`

Template language delimiters to preserve from being treated as CSS. The defaults cover Handlebars/Liquid-style placeholders. Your entries are appended to the defaults. Pass an empty array to disable.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    purge: {
      backend: [
        { heads: '<%', tails: '%>' },
      ],
    },
  },
})
```

### uglify

Type: `boolean`\
Default: `false`

Rename surviving class and id selectors to short, unique strings (e.g. `.text-lg` → `.a`) to further reduce output size at the cost of readability.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    purge: {
      uglify: true,
    },
  },
})
```

### removeHTMLComments

Type: `boolean`\
Default: `true`

Strip HTML comments. Set to `false` to keep them.

### doNotRemoveHTMLCommentsWhoseOpeningTagContains

Type: `string[]`\
Default: `['[if', '[endif']`

Patterns that exempt a comment from removal. The defaults preserve Outlook conditional comments (`<!--[if mso]>` / `<!--[endif]-->`).

Probably the longest option name you've seen in your life.

### removeCSSComments

Type: `boolean`\
Default: `true`

Strip comments from inside `<style>` tags.

### htmlCrushOpts

Type: `object`\
Default: `undefined`

Options forwarded to [`html-crush`](https://codsen.com/os/html-crush) for the whitespace/minification pass that runs at the end of purging. Use this to fine-tune line-break and indentation handling.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    purge: {
      htmlCrushOpts: {
        removeLineBreaks: true,
        removeIndentations: true,
      },
    },
  },
})
```

For the full email-comb option list, see the [email-comb documentation](https://codsen.com/os/email-comb#optional-options-object).

## API

Use `purgeCss` to programmatically purge unused CSS from an HTML string.

```ts
import { purgeCss } from '@maizzle/framework'

const html = `
  <style>
    .used { color: red; }
    .gone { color: blue; }
    .keep { font-weight: bold; }
  </style>
  <p class="used">Hello</p>
`

const out = purgeCss(html, {
  safelist: ['.keep'],
})
```

The first argument is an HTML string. The second is an optional `PurgeCssOptions` object — every option documented above (`safelist`, `backend`, `uglify` etc.). Returns the transformed HTML string.
