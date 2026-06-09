---
title: Configuration
description: Reference of all Maizzle configuration options.
section: Development
order: 3
---

# Configuration

Maizzle is configured through an optional `maizzle.config.ts` file in your project root or via the `defineConfig()` composable in your templates.

## Usage

Use `defineConfig()` for type safety:

```ts [maizzle.config.ts]
import { defineConfig } from '@maizzle/framework'

export default defineConfig({
  content: ['emails/**/*.vue'],
  output: {
    path: 'dist',
  },
})
```

## Defaults

These are the config defaults in Maizzle:

```ts
{
  content: ['emails/**/*.{vue,md}'],
  output: { path: 'dist', extension: 'html' },
  static: { source: ['public/**/*.*'], destination: 'public' },
  server: { port: 3000, watch: [] },
  css: { inline: true, purge: true, shorthand: true, safe: true, preferUnitless: true },
  html: { decodeEntities: true, format: true },
  useTransformers: true,
}
```

## Vite plugin

When using Maizzle as a Vite plugin, pass your config object directly to the plugin:

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  plugins: [
    // ...your app's plugins
    maizzle({
      root: 'src/emails', // [!code highlight]
      content: ['**/*.vue'], // [!code highlight]
      output: { // [!code highlight]
        path: 'build/emails', // [!code highlight]
      }, // [!code highlight]
    }),
  ],
})
```

## Config hierarchy

Configuration is resolved in three layers:

1. **Defaults** (built-in) — lowest priority
2. **Config file** (`maizzle.config.ts`) — overrides defaults
3. **Programmatic config** (`defineConfig` composable) — highest priority

::callout{type="info"}
Arrays will be replaced instead of being merged: if you set `content: ['x']`, it replaces the default `content` path entirely.
::

### Per-template overrides

You can override config on a per-template basis by using `defineConfig()` inside a `<script setup>` block. These overrides are deep-merged with the global config.

```vue [emails/example.vue]
<script setup>
  defineConfig({
    css: {
      inline: false, // disable CSS inlining for this template
    },
  })
</script>

<template>
  <!-- template content -->
</template>
```

## root

Type: `string`\
Default: `process.cwd()`

Set the root directory for your Maizzle email project. When set, `content`, `static.source`, and `css.base` patterns are resolved relative to this directory.

```ts [maizzle.config.ts]
import { defineConfig } from '@maizzle/framework'

export default defineConfig({
  root: 'resources/js/emails', // [!code highlight]
  content: ['**/*.vue'],
})
```

::callout{type="info"}
`components.source` is resolved relative to the current working directory, not `root` — extra component dirs often live outside the email root.
::

### When to use it

You typically don't need to set `root` for a standard Maizzle project where you run commands from the project root and templates live at `emails/**`. Reach for it when:

- **Embedding Maizzle in a larger app** — emails live in a subfolder of a non-Maizzle project (e.g. `resources/js/emails` in a Laravel app, `src/emails` in a Vite SPA). Setting `root` lets Maizzle resolve template globs and Tailwind `@source` paths correctly without changing the working directory.
- **Monorepos and workspaces** — running Maizzle from the repo root while templates sit in `apps/marketing/emails/` or similar.
- **Custom directory layouts** — anything where the email folder isn't the place you want to invoke Maizzle from.

## content

Type: `string[]`\
Default: `['emails/**/*.{vue,md}']`

Glob patterns for template files. Patterns are resolved relative to `root`. Directory structure is preserved in output.

```ts [maizzle.config.ts]
export default defineConfig({
  content: ['emails/**/*.vue'],
})
```

You can pass multiple glob patterns, including negation patterns prefixed with `!`:

```ts [maizzle.config.ts]
export default defineConfig({
  content: [
    'emails/**/*.vue',
    'shared/emails/**/*.vue',
    '!emails/drafts/**',
  ],
})
```

### Output base {#content-output-base}

Output paths are relative to the **content base** — the static (non-glob) prefix of the *first* content pattern — which is stripped from each output path. So `emails/**/*.vue` makes `emails/` the base, and `emails/app/welcome.vue` → `dist/app/welcome.html` (the `emails/` is dropped, the rest of the structure preserved).

This means a pattern like `marketing/**/*.vue` drops the `marketing/` segment from the output. To keep a top-level category directory in the output, make the static prefix resolve to the project root by starting the pattern with a glob token (e.g. a brace) so there's nothing to strip:

```ts [maizzle.config.ts]
export default defineConfig({
  // marketing/pricing/plan.vue → dist/marketing/pricing/plan.html
  content: ['{marketing,ecommerce,ui}/**/*.{vue,md}'],
})
```

::callout{type="info"}
Only the first non-negated pattern determines the base. Listing the categories as separate patterns (`['marketing/**', 'ecommerce/**']`) would strip `marketing/`; the single brace pattern keeps it.
::

## output

Configure where and how Maizzle writes compiled email templates. Directory structure from your content path is preserved — for example, `emails/app/welcome.vue` compiles to `dist/app/welcome.html`.

```ts [maizzle.config.ts]
export default defineConfig({
  output: {
    path: 'build_production',
    extension: 'blade.php',
  },
})
```

### path

Type: `string`\
Default: `'dist'`

Directory to write compiled HTML files to.

### extension

Type: `string`\
Default: `'html'`

File extension for output files. Useful when generating templates for other languages.

## parallel

Type: `boolean | { workers?: number; threshold?: number }`\
Default: auto - parallel above 50 templates

Build templates in parallel across worker threads. For large projects (hundreds or thousands of templates) this can cut build time substantially; for small projects the sequential build is just as fast, so parallel stays off.

- **omitted** (default) - parallel turns on automatically above 50 templates
- **`true`** - always parallel
- **`false`** - always sequential

```ts [maizzle.config.ts]
export default defineConfig({
  parallel: true,
})
```

Pass an object for fine-grained control over the worker count and the auto-on threshold:

```ts [maizzle.config.ts]
export default defineConfig({
  parallel: {
    workers: 8,     // 8 worker threads
    threshold: 100, // only parallelize past 100 templates
  },
})
```

::callout{type="warning"}
`parallel` may only be configured in a config file like `maizzle.config.ts` (the CLI) or a config path you pass to `build()`. Setting it in a programmatic inline config object is ignored.
::

### workers

Type: `number`\
Default: up to 8

Number of worker threads to use. Defaults to `CPU count - 1`, capped at 8.

::callout{type="info"}
More workers is not necessarily faster. Each worker spins up its own renderer, so startup and contention outweigh the gains past ~8 threads. In our benchmarks 8 workers beat 12, 16, and 23 at every project size. That's why the default caps at 8; only raise `workers` if you've measured a win on your own machine.
::

### threshold

Type: `number`\
Default: `50`

Minimum number of templates before parallel mode kicks in. Below this, the build runs sequentially. Set to `0` to always parallelize.

## static

Configure static file copying to the output directory. Files matched by `source` are copied to the `destination` subdirectory inside your output folder.

```ts [maizzle.config.ts]
export default defineConfig({
  static: {
    source: ['images/**/*.*', 'fonts/**/*.*'],
    destination: 'assets',
  },
})
```

### source

Type: `string[]`\
Default: `['public/**/*.*']`

Glob patterns for static files to copy.

### destination

Type: `string`\
Default: `'public'`

Subdirectory path in the output folder where static files are placed.

## components

Configure component auto-import directories. The `components` directory at project root is always scanned automatically.

### source

Type: `ComponentSource | ComponentSource[]`\
Default: `undefined`

Additional directories to scan for auto-imported Vue components. Resolved relative to `cwd` (not `root` option), so paths outside the email root work.

A `ComponentSource` is either a string (just the path) or an object with extra options:

```ts
type ComponentSource =
  | string
  | {
    path: string
    prefix?: string        // override the folder-derived namespace
    pathPrefix?: boolean   // include subfolder names in the resolved name (default true)
  }
```

String entries auto-namespace by folder name (`widgets/Button.vue` → `<WidgetsButton />`):

```ts [maizzle.config.ts]
export default defineConfig({
  components: {
    source: ['resources/js/components/email'],
  },
})
```

Multiple directories:

```ts [maizzle.config.ts]
export default defineConfig({
  components: {
    source: ['components', 'shared/email-components'],
  },
})
```

Object entries override the namespace with a custom `prefix`:

```ts [maizzle.config.ts]
export default defineConfig({
  components: {
    source: [
      { path: 'src/widgets', prefix: 'W' }, // <WButton />, <WCard />…
    ],
  },
})
```

Use `pathPrefix: false` to flatten subfolders (the `prefix` still applies, but folder names drop out of the resolved component name):

```ts [maizzle.config.ts]
export default defineConfig({
  components: {
    source: [
      { path: 'src/icons', prefix: 'Icon', pathPrefix: false },
      // src/icons/social/Twitter.vue → <IconTwitter />
      // src/icons/ui/Chevron.vue     → <IconChevron />
    ],
  },
})
```

::callout{type="info"}
See [Component locations](/docs/components/overview#component-locations) for the full namespacing rules and examples.
::

## css

Configure CSS processing — inlining, purging, safe class names, shorthand, and more.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: true,
    purge: true,
    safe: true,
    shorthand: true,
    sixHex: true,
    preferUnitless: true,
    media: true,
    removeDeclarations: undefined,
    base: undefined,
    exclude: undefined,
  },
})
```

### inline

Type: `boolean | object`\
Default: `true`

Inline CSS from `<style>` tags into matching HTML elements. Set to `false` to disable, or pass an object with [Juice](https://github.com/Automattic/juice) options.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: {
      attributeToStyle: ['width', 'height', 'bgcolor'],
      excludedProperties: ['cursor'],
    },
  },
})
```

### purge

Type: `boolean | object`\
Default: `true`

Remove unused CSS after inlining. Set to `false` to disable, or pass [email-comb](https://codsen.com/os/email-comb) options.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    purge: true,
  },
})
```

### safe

Type: `boolean | Record<string, string>`\
Default: `true`

Replace unsafe CSS class names with email-safe equivalents. Selectors like `sm:text-lg` are rewritten to `sm-text-lg`. Pass an object to define custom replacements.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    safe: {
      ':': '-',
      '/': '-',
    },
  },
})
```

### shorthand

Type: `boolean | { tags?: string[] }`\
Default: `true`

Rewrite longhand CSS to shorthand where possible. For example, `padding: 10px 20px 10px 20px` becomes `padding: 10px 20px`. Set to `false` to disable.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    shorthand: true,
  },
})
```

### sixHex

Type: `boolean`\
Default: `true`

Convert 3-digit HEX colors to 6-digit in `bgcolor` and `color` HTML attributes. Some email clients don't support shorthand HEX colors.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    sixHex: true,
  },
})
```

### preferUnitless

Type: `boolean`\
Default: `true`

Strip units from zero values in inlined styles. For example, `padding: 0px 16px` becomes `padding: 0 16px`.

### media

Type: `boolean | { sort?: 'mobile-first' | 'desktop-first' | function }`\
Default: `true`

Merge duplicate `@media` queries and sort them. Set to `false` to disable.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    media: { sort: 'desktop-first' },
  },
})
```

### removeDeclarations

Type: `Record<string, string | string[]>`\
Default: `undefined`

Remove specific CSS declarations by selector.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    removeDeclarations: {
      ':root': '*',
    },
  },
})
```

### base

Type: `string`\
Default: `undefined` (auto-set to `root` when root is configured)

Base directory for Tailwind CSS `@source` resolution. You almost never don't need to set this.

### exclude

Type: `string[]`\
Default: `undefined`

Glob patterns or paths excluded from Tailwind's `@source` scanner. Tailwind won't generate utilities for classes used in these files. Useful for ignoring AMP variants, archived templates, or any files whose classes shouldn't end up in the output CSS.

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    exclude: ['emails/amp/**'],
  },
})
```

## html

Configure HTML post-processing — attributes, entities, formatting, and minification.

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: {
      add: {
        table: { cellpadding: 0, cellspacing: 0, role: 'none' },
      },
    },
    decodeEntities: true,
  },
})
```

### attributes

#### add

Type: `false | Record<string, false | Record<string, false | string | boolean | number>>`\
Default: `{ table: { ... }, img: { alt: '' } }`

Add attributes to HTML elements by tag name. Your config is merged on top of the built-in defaults shown below.

Set the whole map to `false` to disable auto-add entirely. Set a selector entry to `false` to skip that selector. Set an individual attribute to `false` to skip just that attribute while keeping the rest.

Override or extend defaults:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: {
      add: {
        table: { role: 'presentation' }, // override default role
        a: { target: '_blank' },         // add to <a>
        img: { alt: false },             // drop the default alt=""
      },
    },
  },
})
```

Disable auto-add entirely:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: { add: false },
  },
})
```

#### remove

Type: `Array<string | { name: string; value?: string | RegExp }>`\
Default: `['style', 'class']`

Remove attributes from elements. Empty `style` and `class` attributes are always stripped, regardless of config. Add entries to remove additional attributes.

- **String** — remove the attribute when its value is empty.
- **`{ name, value: 'literal' }`** — remove when the value matches the string exactly.
- **`{ name, value: /regex/ }`** — remove when the value matches the regex.

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: {
      remove: [
        'data-foo',                       // strip data-foo when empty
        { name: 'role', value: 'none' },  // strip role="none"
        { name: 'class', value: /^js-/ }, // strip classes matching /^js-/
      ],
    },
  },
})
```

### decodeEntities

Type: `boolean | Record<string, string>`\
Default: `true`

Replace literal unicode characters in text nodes with their HTML entity equivalents. By default, common characters like non-breaking space (` ` → `&nbsp;`), zero-width joiner (`‍` → `&zwj;`), em dash (`—` → `&mdash;`), curly quotes (`‘`/`’` → `&lsquo;`/`&rsquo;`), bullets, and similar are converted. Useful for keeping email-safe entities intact across clients.

Pass a custom map to add your own replacements (merged on top of the defaults):

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    decodeEntities: {
      '©': '&copy;',  // © → &copy;
      '™': '&trade;', // ™ → &trade;
    },
  },
})
```

Set to `false` to disable entirely:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    decodeEntities: false,
  },
})
```

### format

Type: `boolean | object`\
Default: `true`

Pretty-prints the HTML output. Set to `false` to disable, or pass [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) options. Automatically skipped when `minify` is enabled.

Maizzle's defaults are:

- `printWidth: 320` 
- `htmlWhitespaceSensitivity: 'ignore'` 
- `embeddedLanguageFormatting: 'off'` 

Your options are merged on top:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    format: {
      printWidth: 500,
      tabWidth: 4,
      useTabs: false,
    },
  },
})
```

Disable entirely:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    format: false,
  },
})
```

### minify

Type: `boolean | object`\
Default: `undefined`

Minify the HTML output. Set to `true` for defaults, or pass [html-crush](https://codsen.com/os/html-crush) options. 

Minified email code weighs less in KB — this matters because Gmail clips emails at around 102KB. Enabling `minify` automatically skips the `format` transformer.

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    minify: true,
  },
})
```

## url

Configure base URL prepending and query parameter appending for URLs in your emails.

```ts [maizzle.config.ts]
export default defineConfig({
  url: {
    base: 'https://cdn.example.com/emails/',
    query: {
      utm_source: 'maizzle',
    },
  },
})
```

### base

Type: `string | object`\
Default: `undefined`

Prepend a base URL to relative paths in your HTML.

String shorthand:

```ts [maizzle.config.ts]
export default defineConfig({
  url: {
    base: 'https://cdn.example.com/emails/',
  },
})
```

Object for fine-grained control:

```ts [maizzle.config.ts]
export default defineConfig({
  url: {
    base: {
      url: 'https://cdn.example.com',
      tags: ['img', 'source'],
      styleTag: true,
      inlineCss: true,
    },
  },
})
```

Object sub-options:

- `url` (string) — the base URL
- `tags` (string[] | Record) — tags or tag-attribute map to process
- `attributes` (Record) — attributes to process
- `styleTag` (boolean) — apply to URLs in `<style>` tags
- `inlineCss` (boolean) — apply to URLs in inline `style` attributes

### query

Type: `Record<string, unknown>`\
Default: `undefined`

Append query parameters to URLs.

```ts [maizzle.config.ts]
export default defineConfig({
  url: {
    query: {
      utm_source: 'maizzle',
      utm_medium: 'email',
    },
  },
})
```

You can configure which tags and attributes are processed through the `_options` key:

- `tags` (string[]) — selectors to process. Default: `['a']`
- `attributes` (string[]) — URL attributes. Default: `['src', 'href', 'poster', 'srcset', 'background']`
- `strict` (boolean) — only process absolute URLs. Default: `true`
- `qs` (object) — query-string library options. Default: `{ encode: false }`

```ts [maizzle.config.ts]
export default defineConfig({
  url: {
    query: {
      utm_source: 'maizzle',
      _options: {
        tags: ['a', 'img'],
        strict: false,
      },
    },
  },
})
```

## postcss

Configure PostCSS processing for your email templates.

### removeSelectors

Type: `string[]`\
Default: `[':host', ':lang']`

Selector prefixes to strip from compiled CSS. Tailwind v4 may generate selectors like `:host` or `:lang()` that aren't useful in emails.

```ts [maizzle.config.ts]
export default defineConfig({
  postcss: {
    removeSelectors: [':host', ':lang', ':root'],
  },
})
```

### removeAtRules

Type: `string[]`\
Default: `['layer', 'property']`

At-rule names to strip from compiled CSS. Tailwind v4 uses `@layer` and `@property` which email clients don't support.

```ts [maizzle.config.ts]
export default defineConfig({
  postcss: {
    removeAtRules: ['layer', 'property', 'charset'],
  },
})
```

## markdown

Type: `object`\
Default: `undefined`

Configure Markdown processing for `.md` email templates and the [`<Markdown>`](/docs/components/markdown) component. Extends [`unplugin-vue-markdown`](https://github.com/unplugin/unplugin-vue-markdown) options.

### shikiTheme

Type: `string` (Shiki BundledTheme)\
Default: `'github-light'`

The Shiki theme used for syntax highlighting in Markdown fenced code blocks.

```ts [maizzle.config.ts]
export default defineConfig({
  markdown: {
    shikiTheme: 'github-dark',
  },
})
```

### wrapperComponent

Type: `string | ((id: string, raw: string) => string | null)`\
Default: built-in resolver (returns `'MarkdownLayout'` for entry-template `.md` files, honors a `layout` frontmatter override, returns `null` for `.md` files inside component dirs)

The component used to wrap each compiled `.md` template. By default, Maizzle wraps every `.md` entry template in [`MarkdownLayout`](/docs/development/templates#default-layout) and honors the `layout` frontmatter convention. Set this option to override that default globally:

```ts [maizzle.config.ts]
export default defineConfig({
  markdown: {
    wrapperComponent: 'MarketingLayout',
  },
})
```

Pass a function for conditional logic. For example, using a different layout based on file path:

```ts [maizzle.config.ts]
export default defineConfig({
  markdown: {
    wrapperComponent: (id) => {
      if (id.includes('/promo/')) return 'PromoLayout'
      if (id.includes('/transactional/')) return 'TransactionalLayout'
      return 'MarkdownLayout'
    },
  },
})
```

A user-supplied `wrapperComponent` takes precedence over the built-in default and the `layout:` frontmatter convention.

### markdownUses

Type: `array`\
Default: `undefined`

Register [markdown-it](https://github.com/markdown-it/markdown-it) plugins. Each entry is a plugin, or a `[plugin, options]` tuple:

```ts [maizzle.config.ts]
import { defineConfig } from '@maizzle/framework'
import anchor from 'markdown-it-anchor'

export default defineConfig({
  markdown: {
    markdownUses: [
      anchor,
      [anotherPlugin, { /* options */ }],
    ],
  },
})
```

::callout{type="info"}
Plugins registered here apply to both `.md` templates and the [`<Markdown>`](/docs/components/markdown) component.
::

Prefer `markdownUses` over `markdownSetup` for adding plugins. A `markdownSetup` function you provide replaces Maizzle's built-in setup (which wraps fenced code blocks for Outlook), while `markdownUses` adds to it.

Additional `markdown-it` options from `unplugin-vue-markdown` are passed through, including `headEnabled`, `wrapperDiv`, `wrapperClasses`, and `markdownOptions`.

## plaintext

Type: `boolean | PlaintextConfig`\
Default: `false`

Generate a plaintext version of your email templates.

Set to `true` to write a `.txt` file next to every HTML output:

```ts [maizzle.config.ts]
// Enable with defaults — writes .txt next to .html
export default defineConfig({
  plaintext: true,
})
```

Pass an object to customize the output directory, file extension, or strip-HTML options:

```ts [maizzle.config.ts]
export default defineConfig({
  plaintext: {
    destination: 'build_production/plaintext',
    extension: 'txt',
    options: {
      ignoreTags: ['br'],
    },
  },
})
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `destination` | `string` | HTML output dir | Output directory for plaintext files. Nested template paths are preserved. |
| `extension` | `string` | `'txt'` | File extension (without leading dot). |
| `options` | `object` | `{}` | Forwarded to [`string-strip-html`](https://codsen.com/os/string-strip-html). |

You can also opt individual templates into plaintext using the `usePlaintext()` composable in `<script setup>`. See the dedicated [Plaintext](/docs/development/plaintext) page for the full guide.

## filters

Type: `false | Record<string, (str: string, value: string) => string>`\
Default: `{}` (built-in defaults are always included)

Define content filters that transform text inside HTML elements. The attribute name is the filter name, and the attribute value is passed as the second argument.

```html
<div uppercase>hello world</div>
<!-- Result: HELLO WORLD -->

<div truncate="10">This is a longer sentence</div>
<!-- Result: This is a ... -->
```

Custom filters are merged with built-in defaults:

```ts [maizzle.config.ts]
export default defineConfig({
  filters: {
    'big-text': (str) => `<span style="font-size: 24px">${str}</span>`,
  },
})
```

Set to `false` to disable all filters.

### Built-in filters

| Filter | Description | Example |
|--------|-------------|---------|
| `uppercase` | Convert to uppercase | `<div uppercase>` |
| `lowercase` | Convert to lowercase | `<div lowercase>` |
| `capitalize` | Capitalize first letter | `<div capitalize>` |
| `trim` | Trim whitespace | `<div trim>` |
| `lstrip` | Trim leading whitespace | `<div lstrip>` |
| `rstrip` | Trim trailing whitespace | `<div rstrip>` |
| `escape` | HTML-escape special characters | `<div escape>` |
| `escape-once` | HTML-escape (decode first) | `<div escape-once>` |
| `append` | Append string | `<div append="!">hello</div>` → `hello!` |
| `prepend` | Prepend string | `<div prepend="hi ">world</div>` → `hi world` |
| `plus` | Add number | `<div plus="5">10</div>` → `15` |
| `minus` | Subtract number | `<div minus="3">10</div>` → `7` |
| `multiply` / `times` | Multiply | `<div multiply="2">5</div>` → `10` |
| `divide-by` / `divide` | Divide | `<div divide="2">10</div>` → `5` |
| `modulo` | Modulo | `<div modulo="3">10</div>` → `1` |
| `ceil` | Round up | `<div ceil>3.2</div>` → `4` |
| `floor` | Round down | `<div floor>3.8</div>` → `3` |
| `round` | Round | `<div round>3.5</div>` → `4` |
| `size` | String length | `<div size>hello</div>` → `5` |
| `slice` | Slice string | `<div slice="0,3">hello</div>` → `hel` |
| `truncate` | Truncate with ellipsis | `<div truncate="5">hello world</div>` → `hello...` |
| `truncate-words` | Truncate by word count | `<div truncate-words="2">hello big world</div>` → `hello big...` |
| `remove` | Remove all occurrences | `<div remove="l">hello</div>` → `heo` |
| `remove-first` | Remove first occurrence | `<div remove-first="l">hello</div>` → `helo` |
| `replace` | Replace all (pipe-separated) | `<div replace="l\|r">hello</div>` → `herro` |
| `replace-first` | Replace first | `<div replace-first="l\|r">hello</div>` → `herlo` |
| `newline-to-br` | Convert newlines to `<br>` | `<div newline-to-br>` |
| `strip-newlines` | Remove newlines | `<div strip-newlines>` |
| `url-decode` | URL decode | `<div url-decode>` |
| `url-encode` | URL encode | `<div url-encode>` |

Multiple filters can be applied to the same element — they run in attribute order.

## replaceStrings

Type: `Record<string, string>`\
Default: `undefined`

Find and replace strings in the final HTML output. Runs on the final HTML after all transformers, so it can match anything in the output including HTML tags and attributes.

```ts [maizzle.config.ts]
export default defineConfig({
  replaceStrings: {
    '{{ year }}': new Date().getFullYear().toString(),
    '{{ company }}': 'Acme Inc.',
  },
})
```

## useTransformers

Type: `boolean | object`\
Default: `true`

Controls whether the transformer pipeline runs after rendering. When set to `false`, you get the raw Vue SSR output with no CSS inlining, purging, or other transformations.

```ts [maizzle.config.ts]
export default defineConfig({
  useTransformers: false,
})
```

Pass an object to toggle individual transformers. Keys set to `false` disable that transformer; keys set to `true` force-enable it even if its own config key is disabled.

```ts [maizzle.config.ts]
export default defineConfig({
  useTransformers: {
    inlineCss: false,
    minify: true,
  },
})
```

Available keys: `inlineCss`, `purgeCss`, `safeSelectors`, `shorthandCss`, `sixHex`, `prettify`, `minify`, `addAttributes`, `removeAttributes`, `attributeToStyle`, `baseURL`, `urlQuery`, `entities`, `replaceStrings`, `filters`.

Force-enable (`true`) only applies to boolean-driven transformers. Data-driven ones (`filters`, `baseURL`, `urlQuery`, `addAttributes`, `removeAttributes`, `replaceStrings`, `attributeToStyle`) need actual config values — a bare `true` is a no-op for them.

You can also disable it per-template — either through `defineConfig()` or with the dedicated `useTransformers()` composable:

```vue [emails/raw.vue]
<script setup>
useTransformers(false)
// or: useTransformers({ inlineCss: false, minify: true })
</script>

<template>
  <Layout>
    <Container>
      <Text>Raw output, no transformers.</Text>
    </Container>
  </Layout>
</template>
```

`useTransformers(false)` is shorthand for `defineConfig({ useTransformers: false })` — pick whichever reads better in context.

## server

Configure the Maizzle development server.

### port

Type: `number`\
Default: `3000`

Port for the dev server.

```ts [maizzle.config.ts]
export default defineConfig({
  server: {
    port: 8080,
  },
})
```

### watch

Type: `string[]`\
Default: `[]`

Additional file paths to watch for changes. The dev server already watches your template and component files — use this for external files like config or data.

```ts [maizzle.config.ts]
export default defineConfig({
  server: {
    watch: ['./data/products.json'],
  },
})
```

### email

Type: `object`\
Default: `undefined`

Configuration for the "Send test" feature in the dev UI. When not configured, Maizzle uses Ethereal — a free fake SMTP service that captures emails for preview without actually delivering them.

#### email.to

Type: `string | string[]`\
Default: `undefined`

Default recipient(s) for test emails.

#### email.from

Type: `string`\
Default: `'Maizzle <maizzle@ethereal.email>'`

Sender address.

#### email.subject

Type: `string`\
Default: `undefined`

Default subject line for test emails.

#### email.transport

Type: `object`\
Default: `undefined`

Nodemailer transport options. Omit to use Ethereal.

```ts [maizzle.config.ts]
export default defineConfig({
  server: {
    email: {
      to: ['test@example.com'],
      from: 'dev@yourcompany.com',
      transport: {
        host: 'smtp.mailtrap.io',
        port: 587,
        auth: {
          user: 'your-user',
          pass: 'your-pass',
        },
      },
    },
  },
})
```

### checks

Type: `false | { clients?, level? }`\
Default: `{}` (all clients, all severities)

Configure the **Checks** tab in the [dev UI](/docs/development/local#checks). Set to `false` to hide the tab entirely.

```ts [maizzle.config.ts]
export default defineConfig({
  server: {
    checks: {
      clients: ['gmail', 'outlook', 'apple-mail'],
      level: 'error',
    },
  },
})
```

#### checks.clients

Type: `CaniemailClient[] | 'all'`\
Default: `['gmail', 'apple-mail', 'outlook', 'yahoo']`

Client families to check against (from the [caniemail](https://www.caniemail.com) dataset). Pass `'all'` to check every client.

Available client slugs: `gmail`, `outlook`, `yahoo`, `apple-mail`, `aol`, `thunderbird`, `microsoft`, `samsung-email`, `sfr`, `orange`, `protonmail`, `hey`, `mail-ru`, `fastmail`, `laposte`, `t-online-de`, `free-fr`, `gmx`, `web-de`, `ionos-1and1`, `rainloop`, `wp-pl`.

#### checks.level

Type: `'error' | 'warning' | 'lint'`\
Default: `undefined` (all severities shown)

Filter which severities are reported:

- `'error'` — only errors (unsupported features, hard lint errors)
- `'warning'` — only warnings (partial / unknown support, lint warnings)
- `'lint'` — only lint items (both severities, no compatibility items)

## vite

Type: `InlineConfig` (from Vite)\
Default: `undefined`

Vite configuration options merged into Maizzle's internal Vite SSR server. Use this to add custom Vite plugins or other options.

```ts [maizzle.config.ts]
import myPlugin from 'vite-plugin-example'

export default defineConfig({
  vite: {
    plugins: [myPlugin()],
  },
})
```

If a `vite.config.ts` (or `.js`) file exists in your project root, it takes precedence and is loaded automatically. The `vite` config option is used as a fallback when no config file exists.

## vue

Customize the Vue app instance used for SSR rendering.

### plugins

Type: `Plugin[] | (() => Plugin[])`\
Default: `undefined`

Vue plugins to register before rendering. Useful for i18n, form libraries, or other Vue plugins.

Pass a factory (`() => Plugin[]`) for stateful plugins like `vue-i18n` or Pinia so each template gets a fresh instance — otherwise state leaks between renders (e.g. one template setting `locale.value = 'fr'` affects the next).

```ts [maizzle.config.ts]
import { createI18n } from 'vue-i18n'

export default defineConfig({
  vue: {
    plugins: () => [
      createI18n({
        locale: 'en',
        messages: {
          en: { greeting: 'Hello' },
          fr: { greeting: 'Bonjour' },
        },
      }),
    ],
  },
})
```

### directives

Type: `Record<string, Directive>`\
Default: `undefined`

Custom Vue directives available in all templates.

```ts [maizzle.config.ts]
export default defineConfig({
  vue: {
    directives: {
      focus: {
        mounted(el) {
          el.focus()
        },
      },
    },
  },
})
```

### globalProperties

Type: `Record<string, unknown>`\
Default: `undefined`

Properties added to `app.config.globalProperties`, available as `$propertyName` in all templates.

```ts [maizzle.config.ts]
export default defineConfig({
  vue: {
    globalProperties: {
      $format: (date) => new Intl.DateTimeFormat('en').format(date),
    },
  },
})
```

Then in templates: `{{ $format(new Date()) }}`

## Events

Maizzle fires events at key points during the build process. You can register handlers directly in your config to modify templates, HTML output, or perform side effects. See the [Events page](/docs/development/events) for the full reference, including SFC-side registration via [`useEvent()`](/docs/api/composables#useevent).

Per-template events receive `template` as `{ source: string; path: ParsedPath }` where `path` is Node's [`path.parse(absolutePath)`](https://nodejs.org/api/path.html#pathparsepath) — `{ root, dir, base, ext, name }`.

### beforeCreate

Type: `(params: { config: MaizzleConfig }) => void | Promise<void>`

Called once before any templates are processed. Use it to modify the config or perform setup.

```ts [maizzle.config.ts]
export default defineConfig({
  beforeCreate({ config }) {
    config.replaceStrings = {
      '{{ year }}': new Date().getFullYear().toString(),
    }
  },
})
```

### beforeRender

Type: `(params: { config: MaizzleConfig; template: TemplateInfo }) => string | void | Promise<string | void>`

Called before each template is rendered. `config` is the per-template config (cloned, so mutations are scoped to this template) — inject data here for the template to read via `useConfig()`. Return a string to replace `template.source`.

```ts [maizzle.config.ts]
export default defineConfig({
  async beforeRender({ config, template }) {
    config.posts = await fetchLatestPosts()
    return template.source.replace('PLACEHOLDER', 'Actual content')
  },
})
```

### afterRender

Type: `(params: { config: MaizzleConfig; template: TemplateInfo; html: string }) => string | void | Promise<string | void>`

Called after each template is rendered but before transformers run. Return a string to replace the output HTML.

### afterTransform

Type: `(params: { config: MaizzleConfig; template: TemplateInfo; html: string }) => string | void | Promise<string | void>`

Called after transformers have run on each template. Return a string to replace the output HTML.

```ts [maizzle.config.ts]
export default defineConfig({
  afterTransform({ html }) {
    // Add a tracking pixel
    return html.replace('</body>', '<img src="https://track.example.com/pixel.gif" width="1" height="1" alt="">\n</body>')
  },
})
```

### afterBuild

Type: `(params: { files: string[]; config: MaizzleConfig }) => void | Promise<void>`

Called once after all templates have been built. Receives the list of output file paths.

```ts [maizzle.config.ts]
export default defineConfig({
  afterBuild({ files }) {
    console.log(`Built ${files.length} templates`)
  },
})
```

### Execution order

Handlers run in order: config handler first, then any SFC handlers registered via `useEvent()`.

For events that return a value (`beforeRender`, `afterRender`, `afterTransform`), the returned value replaces the input for the next handler in the chain.

You can also register event handlers in templates using the [`useEvent()` composable](/docs/api/composables#useevent).
