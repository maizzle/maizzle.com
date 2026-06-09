---
title: Format
description: Pretty-print compiled HTML email output by indenting lines for improved readability for humans.
section: Transformers
order: 17
---

# Format

Format the compiled HTML output by indenting lines for better readability.

## Usage

Need to send HTML to a human? Enable `html.format` in your config:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    format: false,
  },
})
```

| Option | Default |
| --- | --- |
| `printWidth` | `320` |
| `htmlWhitespaceSensitivity` | `'ignore'` |
| `embeddedLanguageFormatting` | `'off'` |

::callout{type="info"}
HTML formatting is skipped when [`minify`](/docs/transformers/minify) is enabled.
::

## Customization

### Options

Pass an object to customize the `oxfmt` options, it will be merged with the defaults.

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    format: {
      printWidth: 200,
    },
  },
})
```

## API

Use `format` programmatically to pretty-print any HTML string outside the build pipeline:

```ts
import { format } from '@maizzle/framework'

// Defaults only
const pretty = await format('<html><body><p>hi</p></body></html>')

// Pass any oxfmt FormatOptions
const tabs = await format(html, {
  useTabs: true,
  tabWidth: 4,
  singleAttributePerLine: true,
})
```

The first argument is an HTML string. The second is an optional [oxfmt `FormatOptions`](https://github.com/oxc-project/oxfmt) object — Maizzle's defaults are merged underneath:

Returns a `Promise<string>` with the formatted HTML.
