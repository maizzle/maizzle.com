---
title: Upgrade Guide
description: How to upgrade your Maizzle projects from v5 to v6.
section: Getting Started
order: 5
---

# Upgrade Guide

Upgrading your Maizzle projects from v5.x to v6.

Maizzle 6 is a complete rewrite. It is powered by [Vite](https://vite.dev), uses Vue for templating and Tailwind CSS 4 for styling HTML emails.

Because of this, we recommend starting fresh with the v6 starter and porting templates over rather than upgrading in place. Skim this guide first so you know what changed, then start a new project with `npx maizzle new` and copy your templates and config over.

## Install

Start a new project with the official starter:

```bash
npx maizzle new
```

Or install into an existing project:

```bash
npm install @maizzle/framework
```

::callout{type="info"}
Maizzle 6 works as a standalone project, in a monorepo, or as a Vite plugin inside an existing Vite-powered framework (Laravel, Nuxt, SvelteKit, Astro etc.). See the [framework guides](/docs/installation/frameworks).
::

## Templates

Templates are now Vue SFCs (`.vue` files) instead of HTML files with PostHTML expressions. This means you can use Vue's full templating syntax, including components, directives, and JavaScript expressions. The frontmatter config is replaced by `defineConfig()` inside `<script setup>`.

### File extension

```diff
- emails/welcome.html
+ emails/welcome.vue
```

### Structure

Here's a side-by-side of how you'd code the same email in v5 vs. v6:

::code-tabs
  :::code-tab{label="Maizzle 5"}
  ```html [emails/welcome.html]
  ---
  title: World
  ---

  <x-main>
    <table align="center" class="m-0 mx-auto">
      <tr>
        <td class="w-[552px] max-w-full">
          <h1 class="text-2xl">Hello, {{ name }}!</h1>
          <x-button
            href="https://maizzle.com"
            class="bg-slate-950 hover:bg-slate-800"
          >
            Get Started
          </x-button>
        </td>
      </tr>
    </table>
  </x-main>
  ```
  :::
  :::code-tab{label="Maizzle 6"}
  ```vue [emails/welcome.vue]
  <script setup>
    const name = 'World'
  </script>

  <template>
    <Layout>
      <Container class="max-w-xl">
        <Heading class="text-2xl">Hello, {{ name }}!</Heading>
        <Button
          href="https://example.com"
          class="bg-slate-950 hover:bg-slate-800"
        >Get Started</Button>
      </Container>
    </Layout>
  </template>
  ```
  :::
::

Notice:
- No frontmatter — config goes inside `<script setup>` via `defineConfig()`
- Built-in Vue components available (`<Layout>`, `<Container>`, `<Heading>`, `<Button>`)
- Vue's `{{ }}` interpolation replaces PostHTML expressions

### Expressions

PostHTML expressions are gone. Use Vue's template syntax:

| PostHTML<br><span style="font-weight:normal;">Maizzle 5</span> | Vue<br><span style="font-weight:normal">Maizzle 6</span> |
| --- | --- |
| `{{ page.name }}` | `{{ name }}` |
| `{{{ unsafe }}}` | `<span v-html="unsafe" />` |
| `@{{ keep }}` | `<span v-pre>{{ keep }}</span>` <br>or `<Raw>{{ keep }}</Raw>` |
| `<if condition="x">` | `<div v-if="x">` |
| `<elseif condition="y">` | `<div v-else-if="y">` |
| `<else>` | `<div v-else>` |
| `<each loop="item in items">` | `<div v-for="item in items" :key="item.id">` |
| `<switch>`/`<case>` | use `v-if`/`v-else-if` chains |
| `<scope with="...">` | use a child component or destructure in `<script setup>` |

### Layouts

The `<x-main>` pattern is replaced by Vue's component composition. Use the built-in [`<Layout>`](/docs/components/layout) component, or wrap your own:

```vue [emails/welcome.vue]
<template>
  <Layout>
    <Container>
      <Text>Your content here.</Text>
    </Container>
  </Layout>
</template>
```

### yield → slot

`<yield />` is replaced by Vue's `<slot />`:

```vue [components/MyLayout.vue]
<template>
  <Layout>
    <yield /> // [!code --]
    <slot />  // [!code ++]
  </Layout>
</template>
```

### Markdown templates

`.md` files are now first-class entry templates with frontmatter, `<script setup>`, and a default layout wrapped around the content.

```md [emails/update.md]
---
title: Product Update
---

<script setup>
  usePreheader('We shipped some new features')
</script>

# Hello

Some **markdown** content with a Vue component:

<Button href="https://example.com">Read more</Button>
```

See [Markdown templates](/docs/development/templates#markdown-templates) for the full feature set.

## Tailwind CSS 4

We have finally added support for Tailwind CSS 4 🥳

### Bundled config

We now ship [`@maizzle/tailwindcss`](/docs/tailwindcss), our email-friendly Tailwind CSS 4 configuration. 

Delete `tailwind.config.js`, you now configure Tailwind CSS 4 inside `<style>` tags:

```xml [emails/welcome.vue]
<template>
  <Layout>
    <Head>
      <style>
        @import "@maizzle/tailwindcss";

        @theme {
          --color-brand: #4f46e5;
          --font-display: "Inter", sans-serif;
        }
      </style>
    </Head>
    <Body>
      <Text class="text-brand font-display">Hello!</Text>
    </Body>
  </Layout>
</template>
```

See our [Tailwind CSS docs](/docs/tailwindcss) for more details and examples.

### Email preset replaced

| Maizzle 5 | Maizzle 6 |
| --- | --- |
| [`tailwindcss-preset-email`](https://www.npmjs.com/package/tailwindcss-preset-email) | [`@maizzle/tailwindcss`](https://www.npmjs.com/package/@maizzle/tailwindcss) |

## Components

### New syntax

PostHTML components become Vue components.

Here's a side-by-side comparison of how you'd define the same component in v5 vs. v6:

::code-tabs
  :::code-tab{label="v5/components/card.html"}
  ```html [components/card.html]
  <table align="center" class="mx-auto bg-indigo-100">
    <tr>
      <td class="p-6">
        <yield />
      </td>
    </tr>
  </table>
  ```
  :::
  :::code-tab{label="v6/components/Card.vue"}
  ```vue [components/Card.vue]
  <template>
    <table align="center" class="mx-auto bg-indigo-100">
      <tr>
        <td class="p-6">
          <slot />
        </td>
      </tr>
    </table>
  </template>
  ```
  :::
::

Usage comparison:

::code-tabs
  :::code-tab{label="v5/emails/welcome.html"}
  ```html [emails/promo.html]
  <x-card>Limited time offer!</x-card>
  ```
  :::
  :::code-tab{label="v6/emails/welcome.vue"}
  ```vue [emails/promo.vue]
  <Card>Limited time offer!</Card>
  ```
  :::
::

### Tailwind-first sizing

Most components are now styled and sized with Tailwind. For example, here are the new [`<Hr>`](/docs/components/hr) divider and the vertical [`<Spacer>`](/docs/components/spacer):

::code-tabs
  :::code-tab{label="x-divider (v5)"}
  ```html
  <x-divider height="2px" space-y="32px" color="#e2e8f0" />
  ```
  :::
  :::code-tab{label="Hr (v6)"}
  ```vue
  <Hr class="h-0.5 my-8 bg-slate-200" />
  ```
  :::
::

::code-tabs
  :::code-tab{label="x-spacer (v5)"}
  ```html
  <x-spacer height="32px" />
  ```
  :::
  :::code-tab{label="Spacer (v6)"}
  ```vue
  <Spacer class="h-8" />
  ```
  :::
::

::callout{type="info"}
For Outlook fine-tuning, you can use the `mso-line-height-alt-*` utility.
::

## Configuration

`config.js` becomes `maizzle.config.ts`, and it uses the composition API with `defineConfig()` for type safety and better editor support.

::code-tabs
  :::code-tab{label="~/code/project"}
  ```ts
  - config.js // [!code --]
  - config.production.js // [!code --]
  + maizzle.config.ts // [!code ++]
  ```
  :::
  :::code-tab{label="maizzle.config.ts"}
  ```ts [maizzle.config.ts]
  import { defineConfig } from '@maizzle/framework'

  export default defineConfig({
    css: {
      minify: true,
    },
  })
  ```
  :::
::

::callout{type="info"}
You don't _need_ a `maizzle.config.ts` in your project, Maizzle 6 now has sensible defaults so you can get started without any config file at all.
::

### `build` key flattened

The whole `build: { ... }` wrapper is gone. Move its children to the root:

::code-tabs
  :::code-tab{label="Maizzle 5"}
  ```ts [maizzle.config.ts]
  export default {
    build: {
      content: ['emails/**/*.html'],
      output: { path: 'build_production' },
    },
  }
  ```
  :::
  :::code-tab{label="Maizzle 6"}
  ```ts [maizzle.config.ts]
  export default defineConfig({
    content: ['emails/**/*.{vue,md}'],
    output: { path: 'dist' },
  })
  ```
  :::
::

### CSS defaults flipped

`css.inline`, `css.purge`, `css.shorthand`, and `html.format` (former `prettify`) are now **on by default**. If your v5 project depended on them being off, disable them explicitly:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: false,
    purge: false,
    shorthand: false,
  },
  html: {
    format: false,
  },
})
```

### Remove PostHTML config

PostHTML is no longer used, so you can remove any related config keys like `posthtml.*`, `expressions.*`, and `components.*` from your config.

```ts [maizzle.config.ts]
export default defineConfig({
  posthtml: { ... },     // [!code --]
  expressions: { ... },      // [!code --]
  components: { 
    source: ['custom-components'],  // [!code ++]
    folders: ['custom-components'], // [!code --]
    // everything else removed // [!code --]
  },
}
```

### Fetch tag removed

The PostHTML `<fetch>` tag has been removed, use `fetch()` (or any HTTP client) inside `<script setup>` and bind the result:

```vue [emails/news.vue]
<script setup>
  const items = await fetch('https://api.example.com/news').then(r => r.json())
</script>

<template>
  <Layout>
    <Container>
      <Text v-for="item in items" :key="item.id">{{ item.title }}</Text>
    </Container>
  </Layout>
</template>
```

### Outlook config

The `outlook` config key has been removed. Use the built-in [`<Outlook>`](/docs/components/outlook) component instead:

```vue [emails/example.vue]
<template>
  <Outlook>
    <Text>Visible only in Outlook.</Text>
  </Outlook>
</template>
```

### Other renamed keys

Some other config keys have been renamed for clarity. Here's a quick reference:

| Maizzle 5.x | Maizzle 6 |
| --- | --- |
| `attributes.add` | [`html.attributes.add`](/docs/transformers/add-attributes) |
| `attributes.remove` | [`html.attributes.remove`](/docs/transformers/remove-attributes) |
| `prettify` | [`html.format`](/docs/transformers/format) |
| `minify` | [`html.minify`](/docs/transformers/minify) |

### Plaintext config

The `plaintext` config shape changed in v6. The string shorthand and the nested `output` key are gone — destination, extension, and strip-HTML options are now flat keys on a single object.

String shorthand → `destination`:

::code-tabs
  :::code-tab{label="v5"}
  ```js [config.js]
  export default {
    plaintext: 'dist/brand/plaintext',
  }
  ```
  :::
  :::code-tab{label="v6"}
  ```ts [maizzle.config.ts]
  export default defineConfig({
    plaintext: {
      destination: 'dist/brand/plaintext',
    },
  })
  ```
  :::
::

`output.path` and `output.extension` → flat `destination` and `extension`:

::code-tabs
  :::code-tab{label="v5"}
  ```js [config.js]
  export default {
    plaintext: {
      output: {
        path: 'dist/brand/plaintext',
        extension: 'rtxt',
      },
    },
  }
  ```
  :::
  :::code-tab{label="v6"}
  ```ts [maizzle.config.ts]
  export default defineConfig({
    plaintext: {
      destination: 'dist/brand/plaintext',
      extension: 'rtxt',
    },
  })
  ```
  :::
::

Strip-HTML options now live under a dedicated `options` key:

```ts [maizzle.config.ts]
export default defineConfig({
  plaintext: {
    options: { ignoreTags: ['br'] },
  },
})
```

To enable plaintext for a single template, use the [`usePlaintext()`](/docs/api/composables#useplaintext) composable instead of frontmatter:

::code-tabs
  :::code-tab{label="v5"}
  ```hbs [emails/welcome.html]
  ---
  plaintext: true
  ---

  <x-main>
    <!-- ... -->
  </x-main>
  ```
  :::
  :::code-tab{label="v6"}
  ```vue [emails/welcome.vue]
  <script setup>
    usePlaintext()
  </script>

  <template>
    <Layout>
      <!-- ... -->
    </Layout>
  </template>
  ```
  :::
::

See the [Plaintext docs](/docs/development/plaintext) for the full guide.

### `permalink` → `useOutputPath()`

The `permalink` frontmatter key, which sent a template to a custom output path, is now the [`useOutputPath()`](/docs/api/composables#useoutputpath) composable:

::code-tabs
  :::code-tab{label="v5"}
  ```xml [emails/black-friday.html]
  ---
  permalink: out/promos/black-friday.html
  ---

  <x-main>
    <!-- ... -->
  </x-main>
  ```
  :::
  :::code-tab{label="v6"}
  ```vue [emails/black-friday.vue]
  <script setup>
    useOutputPath('out/promos/black-friday.html')
  </script>

  <template>
    <Layout>
      <!-- ... -->
    </Layout>
  </template>
  ```
  :::
::

The path is still relative to your project root and behaves the same as in v5.

### Per-template config

In v5, you'd set per-template config via frontmatter. In v6, call `defineConfig()` inside `<script setup>`:

```vue [emails/plain.vue]
<script setup>
  defineConfig({
    css: { inline: false },
  })
</script>
```

Or use the dedicated composables for common cases: 

- [`useTransformers()`](/docs/api/composables#usetransformers) 
- [`useBaseUrl()`](/docs/api/composables#usebaseurl)
- [`useUrlQuery()`](/docs/api/composables#useurlquery)
- [`useDoctype()`](/docs/api/composables#usedoctype)
- [`useOutputPath()`](/docs/api/composables#useoutputpath)
- [`usePlaintext()`](/docs/api/composables#useplaintext)
- [`usePreheader()`](/docs/api/composables#usepreheader)

## Events

Events still register at the root of the config, but the signatures have changed.

### `afterTransformers` renamed to `afterTransform`

::code-tabs
  :::code-tab{label="Maizzle 5"}
  ```ts
  afterTransformers({ html, matter, config }) {
    return html.replace('</body>', '<img src="..." />\n</body>')
  }
  ```
  :::
  :::code-tab{label="Maizzle 6"}
  ```ts
  afterTransform({ html, template, config }) {
    return html.replace('</body>', '<img src="..." />\n</body>')
  }
  ```
  :::
::

### `matter` is gone

v5 handlers received `matter` (the frontmatter object). v6 has no frontmatter — config lives inside `<script setup>` via `defineConfig()`, and template-level config is on the resolved `config` argument that handlers already receive.

### `beforeRender` now operates on the SFC source

In v5, `beforeRender({ html, ... })` received the pre-rendered HTML and you returned a modified HTML string. In v6, the renderer is Vue SSR, so `beforeRender({ template, config })` receives the raw `.vue` SFC source instead — return a string to replace `template.source` before it's handed to the renderer.

::code-tabs
  :::code-tab{label="Maizzle 5"}
  ```ts
  beforeRender({ html }) {
    return html.replace('FOO', 'BAR')
  }
  ```
  :::
  :::code-tab{label="Maizzle 6"}
  ```ts
  beforeRender({ template }) {
    return template.source.replace('FOO', 'BAR')
  }
  ```
  :::
::

### `template` argument

`afterRender` and `afterTransform` now also receive a `template` argument — same shape as the one passed to `beforeRender`:

```ts
interface TemplateInfo {
  source: string         // raw Vue SFC source
  path: ParsedPath       // result of path.parse(absolutePath)
}
```

### `config.build.current` is gone

v5 exposed the currently-building template path on `config.build.current.path` (also a [`path.parse()`](https://nodejs.org/api/path.html#pathparsepath) result, mutated onto the shared config). v6 drops that and surfaces the same info two ways:

- In event handlers, via `template.path` (e.g. `template.path.name === 'newsletter'`).
- Anywhere inside an SFC, via the new [`useCurrentTemplate()`](/docs/api/composables#usecurrenttemplate) composable.

::code-tabs
  :::code-tab{label="Maizzle 5"}
  ```ts
  beforeRender({ config }) {
    if (config.build.current.path.name === 'newsletter') {
      // ...
    }
  }
  ```
  :::
  :::code-tab{label="Maizzle 6"}
  ```ts
  beforeRender({ template }) {
    if (template.path.name === 'newsletter') {
      // ...
    }
  }
  ```
  :::
::

See [Events](/docs/development/events) for the full list and signatures.

## CLI commands

| v5 | v6 |
| --- | --- |
| `maizzle build` | `maizzle build` (or programmatic [`build()`](/docs/api/utilities#build)) |
| `maizzle build production` | `maizzle build -c production.config.ts` |
| `maizzle serve` | `maizzle serve` or `maizzle dev` |
| `maizzle make:template name` | `maizzle make:template [filepath]` |

## Optional but recommended

### Use built-in components

Maizzle 6 ships polished, render-tested email building blocks: [`<Button>`](/docs/components/button), [`<Container>`](/docs/components/container), [`<Heading>`](/docs/components/heading), [`<Hr>`](/docs/components/hr), [`<Img>`](/docs/components/img), [`<Spacer>`](/docs/components/spacer), [`<Text>`](/docs/components/text), and more. 

Replace your hand-coded tables with these where you can — they're heavily tested (we've been using them in production for years), they handle Outlook quirks for you, and LLMs can understand them better when asked to generate emails.

### Vite plugin

If your project already uses Vite (Laravel, Nuxt, SvelteKit, Astro etc.), you can run Maizzle as a plugin alongside your app instead of as a standalone project. See [Framework Guides](/docs/installation/frameworks).
