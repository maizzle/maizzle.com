---
title: Composables
description: Maizzle composables for use inside a template's <script setup>.
section: API
order: 2
---

# Composables

Use composables inside your email templates to interact with the Maizzle config and transformer pipeline, to set the doctype, to register event handlers, and more.

## useConfig()

Access the resolved Maizzle configuration from inside any template or component.

```vue [emails/example.vue]
<script setup>
  const config = useConfig()
</script>

<template>
  <Html>
    <Head />
    <Body>
      <Container>
        <Text>Building to: {{ config.output?.path }}</Text>
      </Container>
    </Body>
  </Html>
</template>
```

The composable returns the fully resolved `MaizzleConfig` object — the result of merging the global config from `maizzle.config.ts` with any template-level overrides from `defineConfig()`.

If a parent component or template called `defineConfig()` with overrides, `useConfig()` in child components will reflect those merged values.

### Examples

Conditionally render content based on config:

```vue [emails/promo.vue]
<script setup>
  const config = useConfig()
  const isProduction = config.output?.path?.includes('production')
</script>

<template>
  <Html>
    <Head />
    <Tailwind>
      <Body>
        <Container>
          <Text v-if="!isProduction" class="text-red-500">PREVIEW</Text>
          <Text>Your promo content here.</Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
</template>
```

Access custom data passed through the config:

::code-tabs
  :::code-tab{label="maizzle.config.ts"}
  ```ts [maizzle.config.ts]
  import { defineConfig } from '@maizzle/framework'

  export default defineConfig({
    company: {
      name: 'Acme Inc.',
      url: 'https://example.com',
    },
  })
  ```
  :::
  :::code-tab{label="components/Footer.vue"}
  ```vue [components/Footer.vue]
  <script setup>
    const config = useConfig()
  </script>

  <template>
    <Text>
      &copy; 2026 {{ config.company?.name }}
    </Text>

    <Button :href="config.company?.url">
      Visit our website
    </Button>
  </template>
  ```
  :::
::

## useCurrentTemplate()

Read info about the template file currently being built. Returns the result of Node's [`path.parse(absolutePath)`](https://nodejs.org/api/path.html#pathparsepath) — `{ root, dir, base, ext, name }` — or `undefined` when called outside the per-template scope (e.g. from a `beforeCreate` / `afterBuild` handler, or outside a build entirely).

```vue [emails/welcome.vue]
<script setup>
  const file = useCurrentTemplate()

  // file.name === 'welcome'
  // file.ext  === '.vue'
  // file.base === 'welcome.vue'
  // file.dir  === '/abs/path/to/emails'
</script>
```

Handy when a layout or shared component needs to know which template it's being rendered for:

```vue [components/Footer.vue]
<script setup>
  const file = useCurrentTemplate()
  const isPromo = file?.name?.startsWith('promo-')
</script>

<template>
  <Text v-if="isPromo">Limited time offer — unsubscribe</Text>
  <Text v-else>Transactional message — manage preferences</Text>
</template>
```

The same value is also exposed to event handlers via `template.path` — prefer that inside config-level [`beforeRender`](/docs/development/events#beforerender) / [`afterRender`](/docs/development/events#afterrender) / [`afterTransform`](/docs/development/events#aftertransform) handlers, since it's the typed parameter you already receive. Reach for `useCurrentTemplate()` from `<script setup>` (or any component the template renders) where there are no event params to destructure.

## useTransformers()

Toggle the transformer pipeline for the current template.

```vue [emails/raw.vue]
<script setup>
  useTransformers(false)
</script>

<template>
  <Html>
    <Head />
    <Body>
      <Text>Raw output, no transformers.</Text>
    </Body>
  </Html>
</template>
```

::callout{type="info"}
This is the per-template counterpart of the global [`useTransformers`](/docs/development/configuration#usetransformers) config flag.
::

### Argument

Pass one of:

- `false` — skip the entire pipeline (CSS inlining, purging, shorthand, etc.)
- `true` (or no argument) — keep everything on
- `TransformerToggles` object — granular per-transformer overrides

```vue [emails/example.vue]
<script setup>
  // Disable specific transformers
  useTransformers({ inlineCss: false, minify: false })

  // Force-enable transformers that are disabled globally
  useTransformers({ prettify: true, minify: true })
</script>
```

### Force-enable

Setting a key to `true` force-enables that transformer for this template, even if disabled globally. Only meaningful for boolean-driven transformers (`inlineCss`, `purgeCss`, `prettify`, `minify`, `shorthandCss`, `sixHex`, `safeSelectors`, `entities`).

Data-driven transformers (`filters`, `baseURL`, `urlQuery`, `addAttributes`, `removeAttributes`, `replaceStrings`, `attributeToStyle`) need actual config values — a bare `true` is a no-op for them.

## useBaseUrl()

Sets the base URL for the current template. Same as `config.url.base`, scoped to SFC.

```vue [emails/example.vue]
<script setup>
  useBaseUrl('https://cdn.example.com/emails/')
</script>

<template>
  <Html>
    <Body>
      <Img src="logo.png" alt="Logo" />
      <!-- becomes <img src="https://cdn.example.com/emails/logo.png" ...> -->
    </Body>
  </Html>
</template>
```

Pass a string to prepend to all default tags/attributes, or an object for fine-grained control:

```vue [emails/example.vue]
<script setup>
  useBaseUrl({
    url: 'https://cdn.example.com/',
    styleTag: true,
  })
</script>
```

See [`url.base`](/docs/development/configuration#base-1) for the full options object.

## useUrlQuery()

Append query parameters to URLs in the current email template — same as `config.url.query`, scoped to one SFC. Common use: per-template UTM parameters or campaign tracking.

```vue [emails/newsletter.vue]
<script setup>
  useUrlQuery({
    utm_source: 'maizzle',
    utm_campaign: 'newsletter',
  })
</script>
```

Pass `_options` alongside the params to tweak which tags/attributes receive them. See [`url.query`](/docs/development/configuration#query) for the full options surface.

## useEvent()

Register event handlers from inside a template's `<script setup>` block.

```vue [emails/example.vue]
<script setup>
  useEvent('afterRender', ({ html }) => {
    return html.replace('</body>', '<img src="https://example.com/pixel.gif" width="1" height="1" alt="">\n</body>')
  })
</script>

<template>
  <Html>
    <Head />
    <Body>
      <Container>
        <Text>This template gets a tracking pixel.</Text>
      </Container>
    </Body>
  </Html>
</template>
```

### Available events

| Event | When it fires | Receives | Can return |
| --- | --- | --- | --- |
| `beforeCreate` | Before the build starts | `{ config }` | — |
| `beforeRender` | Before each template renders | `{ config, template }` | New `source` string |
| `afterRender` | After Vue, before transformers | `{ config, template, html }` | Modified `html` |
| `afterTransform` | After all transformers | `{ config, template, html }` | Modified `html` |
| `afterBuild` | When the build finishes | `{ files, config }` | — |

`template` is `{ source, path }` — the raw SFC and the result of Node's [`path.parse()`](https://nodejs.org/api/path.html#pathparsepath) (`{ root, dir, base, ext, name }`). To read just the path from anywhere inside an SFC, use [`useCurrentTemplate()`](#usecurrenttemplate).

Handlers can be sync or async. Where a return value is supported, returning a string replaces the value for subsequent handlers in the chain.

### Execution order

Config handlers run first, then SFC handlers in registration order. If multiple handlers return a value, the result from each handler becomes the input for the next one in the chain.

SFC handlers are automatically cleared between template renders, so they only apply to the template that registered them.

### Examples

Inject content after rendering but before transformers, so it still goes through CSS inlining and purging:

```vue [emails/welcome.vue]
<script setup>
  useEvent('afterRender', ({ html }) => {
    const banner = '<div class="bg-blue-500 text-white p-4 text-center">Limited time offer!</div>'

    return html.replace('<body', `<body>${banner}`)
  })
</script>
```

Add a tracking pixel after all transformers have run:

```vue [emails/newsletter.vue]
<script setup>
  useEvent('afterTransform', ({ html }) => {
    return html.replace(
      '</body>',
      '<img src="https://track.example.com/open.gif" width="1" height="1" alt="">\n</body>'
    )
  })
</script>
```

You can also register event handlers globally in your config file — see the [Events](/docs/development/events) page for the full reference.

## useDoctype()

Set a custom doctype for the current email template.

```vue [emails/example.vue]
<script setup>
  useDoctype('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">')
</script>

<template>
  <Html>
    <Head />
    <Body>
      <Text>This email uses an HTML 4.01 Transitional doctype.</Text>
    </Body>
  </Html>
</template>
```

The doctype string you pass is prepended to the final HTML output, replacing the default.

### Common doctypes

| Doctype | Value |
| --- | --- |
| HTML5 (default) | `<!DOCTYPE html>` |
| XHTML 1.0 Transitional | `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">` |
| HTML 4.01 Transitional | `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">` |

::callout{type="info"}
We recommend you just use the HTML5 doctype, it's easy to remember and is enough to trigger standards mode in clients that do support a doctype.
::

### Self-closing tags

Maizzle adapts how void elements (`<br>`, `<img>`, `<meta>`, `<link>`, `<hr>`, `<input>`, …) are serialized based on the active doctype:

| Doctype | Output |
|---------|--------|
| HTML5 (default) | `<br>`, `<img src="...">` |
| XHTML 1.0 / 1.1 | `<br />`, `<img src="..." />` |

You don't have to format these tags differently in your templates, just write them however you prefer and Maizzle normalizes them at build time. The detection is doctype-driven, so swapping doctype via `useDoctype()` automatically swaps the output style.

```vue [emails/example.vue]
<script setup>
  useDoctype('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">')
</script>

<template>
  <Html>
    <Head />
    <Body>
      <!-- emitted as <img src="/logo.png" alt="Logo" /> -->
      <Img src="/logo.png" alt="Logo">  
      
      <!-- emitted as <br /> -->
      <br>
    </Body>
  </Html>
</template>
```

## useOutputPath()

Override the output file path for the current email template.

```vue [emails/black-friday.vue]
<script setup>
  useOutputPath('dist/promos/black-friday.html')
</script>

<template>
  <Layout>
    <Container>
      <Text>Up to 50% off everything.</Text>
    </Container>
  </Layout>
</template>
```

By default, each template is written to the [output directory](/docs/development/configuration#output), mirroring its location in your content folder. `useOutputPath()` lets a single template define its own destination instead.

The path is relative to your project root, so it can point anywhere, including outside the output directory:

```vue [emails/example.vue]
<script setup>
  useOutputPath('../newsletters/2026/welcome.html')
</script>
```

If you omit the file extension, the configured [`output.extension`](/docs/development/configuration#extension) is appended:

```vue [emails/example.vue]
<script setup>
  // outputs dist/promos/welcome.html
  useOutputPath('dist/promos/welcome')
</script>
```

::callout{type="info"}
When the template also uses [`usePlaintext()`](#useplaintext), the `.txt` file is written next to the HTML output, unless you set an explicit `destination` on `usePlaintext()`.
::

### Markdown templates

To use in `.md` templates, call it in a `<script setup>` block:

```vue [emails/black-friday.md]
---
title: Black Friday
---

<script setup>
  useOutputPath('dist/promos/black-friday.html')
</script>

# Up to 50% off everything
```

::callout{type="info"}
Output path is read only from the composable in Markdown templates, `permalink` or `output.path` keys in frontmatter have no effect.
::

## usePlaintext()

Generate a plaintext version of the current email template.

```vue [emails/example.vue]
<script setup>
  usePlaintext()
</script>

<template>
  <Layout>
    <Container>
      <Text>Your email content here.</Text>
    </Container>
  </Layout>
</template>
```

During build, a `.txt` file is written alongside the HTML output. When using `render()`, `plaintext` is returned in the result object.

### Options

#### extension

Type: `string`\
Default: `'txt'`

File extension for the generated plaintext file.

```vue [emails/example.vue]
<script setup>
  usePlaintext({
    extension: 'rtxt',
  })
</script>
```

This outputs `example.text` instead of `example.txt`.

#### destination

Type: `string`

Custom output directory for the plaintext file.

```vue [emails/example.vue]
<script setup>
  usePlaintext({
    destination: 'dist/plaintext',
  })
</script>
```

#### options

Type: `Record<string, unknown>`

Options forwarded to [`string-strip-html`](https://codsen.com/os/string-strip-html).

```vue [emails/example.vue]
<script setup>
  usePlaintext({
    options: {
      ignoreTags: ['br'],
    },
  })
</script>
```

::callout{type="info"}
You may also enable plaintext globally through the [`plaintext`](/docs/development/configuration#plaintext) configuration option.
::

## usePreheader()

Set preheader/preview text for the current email template from `<script setup>`.

```vue [emails/example.vue]
<script setup>
  usePreheader('Check out our latest deals — up to 50% off everything.')
</script>

<template>
  <Layout>
    <Container>
      <Text>Email body content.</Text>
    </Container>
  </Layout>
</template>
```

### Options

#### spaces

Type: `number`\
Default: `150`

Number of invisible filler sequences (`&#8199;&#65279;&#847;`) rendered after the preview text. These push email body text out of the inbox preview area so it doesn't leak in next to your preheader.

```vue [emails/example.vue]
<script setup>
  usePreheader('Short preview.', {
    spaces: 200,
  })
</script>
```

### How it works

The composable injects a hidden `<div>` at the start of `<body>`, containing:

1. Your preview text
2. The filler sequence (`&#8199;&#65279;&#847;`) repeated `spaces` times
3. A non-breaking space at the end

### vs `<Preheader>`

This composable is the script-based alternative to the [`<Preheader>`](/docs/components/preheader) component. Use whichever approach fits your template — both produce the same output.

## useHead()

Manage `<head>` tags programmatically in your email templates.

```vue [emails/example.vue]
<script setup>
  useHead({
    title: 'Order Confirmation',
    meta: [
      { name: 'format-detection', content: 'telephone=no' },
    ],
  })
</script>

<template>
  <Layout>
    <Container>
      <Text>Your order has been confirmed.</Text>
    </Container>
  </Layout>
</template>
```

Maizzle re-exports `useHead()` from `@unhead/vue`. Tags are rendered server-side during SSR and injected into the HTML output.

### Common patterns

#### Title

Set the `<title>` tag — this shows in email client tabs and browser windows.

```vue [emails/example.vue]
<script setup>
  useHead({
    title: 'Weekly Newsletter',
  })
</script>
```

#### Meta tags

Add custom `<meta>` tags to `<head>`.

```vue [emails/example.vue]
<script setup>
  useHead({
    meta: [
      { name: 'color-scheme', content: 'light dark' },
      { name: 'supported-color-schemes', content: 'light dark' },
    ],
  })
</script>
```

#### Web font preconnect

Use `<link>` tags to preconnect to font servers.

```vue [emails/example.vue]
<script setup>
  useHead({
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap' },
    ],
  })
</script>
```

#### Custom styles

Add styles to `<head>` programmatically. A bit weird to do, but you can 🤷‍♂

```vue [emails/example.vue]
<script setup>
  useHead({
    style: [
      {
        innerHTML: `
          @media (prefers-color-scheme: dark) {
            .dark-bg { background-color: #1a1a1a !important; }
          }
        `,
      },
    ],
  })
</script>
```

#### HTML attributes

Set attributes on the `<html>` or `<body>` elements.

```vue [emails/example.vue]
<script setup>
  useHead({
    htmlAttrs: {
      lang: 'de',
      dir: 'ltr',
      xmlns: 'http://www.w3.org/1999/xhtml',
    },
    bodyAttrs: {
      class: 'bg-white',
    },
  })
</script>
```

### SSR rendering

All tags are rendered server-side — they are injected into the HTML during SSR, not at runtime in a browser. This means the full `<head>` content is present in the final HTML output. For the complete `useHead()` API, see the [@unhead/vue documentation](https://unhead.unjs.io/docs/head/api/composables/use-head).
