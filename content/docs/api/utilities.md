---
title: "Utilities"
description: "Reference of every utility function exported from @maizzle/framework."
section: API
order: 1
---

# Utilities

Use Maizzle functions for build scripts, programmatic renderers, dev workflows, and Vite-powered host apps.

## render()

Render a single template to production-ready HTML, with the full pipeline applied (SSR, transformers, doctype).

```ts [build.js]
import { render } from '@maizzle/framework'

const { html } = await render('emails/welcome.vue')
```

The function accepts a file path or a raw Vue SFC string. It resolves the config, compiles the template, applies all configured transformers, and returns the final HTML.

### Template input

You may pass different input types depending on your use case.

**File path** — a path to a `.vue` or `.md` template file:

```ts [build.js]
const { html } = await render('emails/welcome.vue')
```

**SFC string** — a raw Vue SFC string:

```ts [build.js]
const { html } = await render(`
<template>
  <Html>
    <Head />
    <Body>
      <Container>
        <Text>Hello world</Text>
      </Container>
    </Body>
  </Html>
</template>
`)
```

### Options

#### config

Type: `Partial<MaizzleConfig>`

A config object to merge with the resolved config from disk. Use this to override specific options for a single render.

```ts [build.js]
const { html } = await render('emails/welcome.vue', {
  minify: true,
})
```

### Return value

A `Promise` that resolves to:

- `html` (`string`) — the compiled HTML string with all transformers applied and doctype prepended
- `config` (`MaizzleConfig`) — the fully resolved config object that was used for rendering
- `plaintext` (`string | undefined`) — a plaintext version of the email, generated if plaintext is enabled in your config or via the `usePlaintext()` composable in the template

### Examples

Render a template and write it to disk:

```ts [build.js]
import { render } from '@maizzle/framework'
import { writeFile } from 'node:fs/promises'

const { html } = await render('emails/welcome.vue')

await writeFile('dist/welcome.html', html)
```

Render with config overrides:

```ts [build.js]
const { html, plaintext } = await render('emails/receipt.vue', {
  plaintext: true,
})
```

## build()

Build all email templates to HTML files, programmatically.

```ts [build.js]
import { build } from '@maizzle/framework'

const { files } = await build()
```

This resolves your config, globs templates from the configured `content` paths, compiles each one through the full rendering pipeline, and writes the output to disk. Events like `beforeRender`, `afterRender`, and `afterBuild` are fired at the appropriate stages.

### Config input

Type: `Partial<MaizzleConfig> | string | undefined`

Pass a config object to merge with the resolved config, a string path to a config file, or omit to load `maizzle.config` from the working directory.

**Config object** — merged with the resolved config:

```ts [build.js]
const { files } = await build({
  output: { path: 'build_production' },
})
```

**Path to config file** — loads config from a specific file:

```ts [build.js]
const { files } = await build('./maizzle.production.ts')
```

**No argument** — loads the default `maizzle.config.ts` from the working directory:

```ts [build.js]
const { files } = await build()
```

### Return value

A `Promise` that resolves to:

- `files` (`string[]`) — array of file paths that were written to disk
- `config` (`MaizzleConfig`) — the fully resolved config object that was used for the build

### Example

```ts [build.js]
import { build } from '@maizzle/framework'

const { files, config } = await build({
  content: ['src/emails/**/*.vue'],
  output: { path: 'dist' },
  minify: true,
})

console.log(`Built ${files.length} templates to ${config.output.path}`)
```

## serve()

Start the Maizzle dev server programmatically.

```ts [dev.js]
import { serve } from '@maizzle/framework'

const server = await serve()
```

This creates a Vite dev server with the Maizzle dev UI and an SSR renderer for compiling templates on the fly. The server starts on port 3000 by default, configurable through `config.server.port`.

### Options

#### config

Type: `Partial<MaizzleConfig> | string`

Pass a config object to merge with the resolved config, or a string path to a config file.

```ts [dev.js]
const server = await serve({
  config: {
    server: { port: 8080 },
  },
})
```

#### host

Type: `boolean | string`\
Default: `false`

Expose the server on the network. Pass `true` to listen on all addresses, or a specific address string.

```ts [dev.js]
const server = await serve({ host: true })
```

#### silent

Type: `boolean`\
Default: `false`

Suppress the startup banner output.

### Return value

Returns a `Promise<ViteDevServer>` — the underlying Vite dev server instance. You can use this to programmatically close the server or access its internals.

```ts [dev.js]
const server = await serve()

// Later, shut it down
await server.close()
```

## createRenderer()

Create a reusable Vite SSR renderer for compiling Vue SFC email templates to HTML.

Use this when you need to render multiple templates programmatically without writing to disk. For single templates, use [`render()`](#render). For building to files, use [`build()`](#build).

```ts [build.js]
import { createRenderer, resolveConfig } from '@maizzle/framework'

const config = await resolveConfig({
  minify: true,
})

const renderer = await createRenderer({
  root: 'emails',
})

const templates = ['emails/welcome.vue', 'emails/reset.vue', 'emails/invite.vue']

for (const template of templates) {
  const { html } = await renderer.render(template, config)
  console.log(`Rendered: ${template}`)
}

// Always close when done
await renderer.close()
```

### Options

#### root

Type: `string`\
Default: `process.cwd()`

Root directory for resolving component directories and `.d.ts` output.

#### componentDirs

Type: `NormalizedComponentSource[]`\
Default: `[]`

Additional component sources to scan for auto-imported components. Components from `@maizzle/framework/components` and `{root}/components` are always included.

Entries must be pre-normalized — pass your raw `ComponentSource[]` config through `normalizeComponentSources()` first:

```ts [build.js]
import { createRenderer, normalizeComponentSources } from '@maizzle/framework'

const renderer = await createRenderer({
  componentDirs: normalizeComponentSources([
    'src/components/email',
    { path: 'src/widgets', prefix: 'W' },
  ], process.cwd()),
})
```

When you go through `defineConfig({ components: { source: [...] } })` instead of calling `createRenderer` directly, Maizzle handles normalization for you. See [`components.source`](/docs/development/configuration#source) for the full type and the namespacing/prefix rules.

#### markdown

Type: `MarkdownConfig`\
Default: `undefined`

Options for Markdown template support, including `shikiTheme` for syntax highlighting.

#### dts

Type: `boolean`\
Default: `false`

Generate `.d.ts` files for auto-imports and components.

#### vite

Type: `InlineConfig`\
Default: `undefined`

Custom Vite config to merge into the internal SSR server.

### Renderer methods

#### render(input, config)

Renders a Vue SFC to an HTML string. Accepts a file path or an SFC source string.

```ts [build.js]
// File path
const result = await renderer.render('emails/welcome.vue', config)

// SFC string
const result = await renderer.render(`
<template>
  <Html>
    <Head />
    <Body>
      <Container>
        <Text>Hello world</Text>
      </Container>
    </Body>
  </Html>
</template>
`, config)
```

The returned object has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `html` | `string` | Rendered HTML (before transformers) |
| `doctype` | `string \| undefined` | Custom doctype set via `useDoctype()` |
| `templateConfig` | `MaizzleConfig` | Merged config (global + per-template) |
| `sfcEventHandlers` | `array` | Event handlers registered via `useEvent()` |
| `plaintext` | `object \| undefined` | Plaintext config set via `usePlaintext()` |

The renderer does **not** run the transformer pipeline — use the top-level `render()` function if you need the full pipeline (SSR + transformers + doctype).

#### invalidate(filePath)

Invalidates a module in the Vite module graph, forcing a re-load on the next render. Useful in watch or dev scenarios.

```ts [build.js]
await renderer.invalidate('emails/welcome.vue')
```

#### invalidateAll()

Invalidates all modules, forcing full re-compilation on next render.

#### close()

Shuts down the underlying Vite server. Always call this when you are done to release resources.

### When to use

| Scenario | Use |
|----------|-----|
| Render one template, full pipeline | `render()` |
| Build all templates to disk | `build()` |
| Render many templates without writing to disk | `createRenderer()` |
| Dev server with preview | `serve()` |

## createPlaintext()

Convert an HTML string to plaintext for email.

```ts [build.js]
import { createPlaintext } from '@maizzle/framework'

const html = '<p>Hello <a href="https://example.com">world</a></p>'

const text = createPlaintext(html)
// Hello world\n[https://example.com]
```

### Options

Type: `Record<string, unknown>`

You may pass any options supported by [`string-strip-html`](https://codsen.com/os/string-strip-html/).

```ts [build.js]
const text = createPlaintext(html, {
  dumpLinkHrefsNearby: {
    enabled: true,
    putOnNewLine: false,
    wrapHeads: '(',
    wrapTails: ')',
  },
})
```

### Defaults

By default, link `href` values are extracted and placed on a new line near the link text:

```ts
{
  dumpLinkHrefsNearby: {
    enabled: true,
    putOnNewLine: true,
  },
}
```

For example, this HTML:

```html
<p>Visit <a href="https://maizzle.com">our website</a> for more info.</p>
```

Produces:

```
Visit our website
[https://maizzle.com] for more info.
```

## defineConfig()

Define your Maizzle configuration with type safety and autocompletion.

```ts
function defineConfig(data?: Partial<MaizzleConfig>): MaizzleConfig
```

### In config file

Use `defineConfig()` in `maizzle.config.ts` for type-checked configuration:

```ts [maizzle.config.ts]
import { defineConfig } from '@maizzle/framework'

export default defineConfig({
  minify: true,
})
```

In this context it acts as an identity function — it returns the config object as-is while providing autocomplete and type checking in your editor.

### In templates

Use `defineConfig()` in a template's `<script setup>` to override global config options for that specific template:

```vue [emails/plain.vue]
<script setup>
  defineConfig({
    css: {
      inline: false,
    },
  })
</script>

<template>
  <Html>
    <Head />
    <Tailwind>
      <Body>
        <Container class="bg-gray-100 p-4 max-w-xl">
          <Text>This template won't have its CSS inlined.</Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
</template>
```

### How merging works

Template-level config is deep-merged with the global config using [defu](https://github.com/unjs/defu), with one difference: arrays are replaced, not appended.

For example, if your global config sets `content: ['emails/**/*.vue']` and your template calls `defineConfig({ content: ['other/**/*.vue'] })`, the result will be `['other/**/*.vue']` — not both arrays combined.

All other values are deep-merged, so you only need to specify the options you want to change. Template overrides take priority over global config.

## maizzle()

Use Maizzle inside an existing Vite project to build email templates alongside your app.

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  plugins: [
    // ...your app's plugins
    maizzle(),
  ],
})
```

The function returns a Vite plugin array and accepts an optional config object:

```ts
function maizzle(config?: Partial<MaizzleConfig>): Plugin[]
```

### How it works

Maizzle runs in its own process — it does not inject Vue, Tailwind CSS, or any other plugins into your host app's pipeline.

**During development**, `vite dev` starts a separate Maizzle dev server on its own port. Your app's dev server and Maizzle's dev server run side by side.

**During production builds**, `vite build` compiles your email templates alongside the host app in the `closeBundle` hook.

### Configuration

You may pass config options directly to the plugin:

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  plugins: [
    maizzle({
      root: 'emails',
      content: ['./**/*.vue'],
      output: {
        path: 'build/emails',
      },
    }),
  ],
})
```

You may also use a `maizzle.config.ts` file in your project root instead. If both are provided, inline options and the config file are merged.

### Framework integrations

The Vite plugin works with any Vite-powered framework, just add `maizzle()` to the plugins array in the framework's Vite config.

See our framework guides:

::framework-guides{:exclude="nextjs"}
::
