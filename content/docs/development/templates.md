---
title: Templates
description: How to create HTML email templates in Maizzle using Vue SFCs.
section: Development
order: 1
---

# Templates

Templates in Maizzle are Vue Single-File Components (SFCs).

You code emails using Vue syntax with the built-in components or your own HTML, style them with Tailwind CSS, and optionally use `<script setup>` for logic or configuration. 

Each template is rendered with Vue's SSR engine, goes through a pipeline of email-optimized transformers, and is output as production-ready HTML.

## Creating a template {#create}

Create a `.vue` file in your `emails` directory:

```vue [emails/welcome.vue]
<template>
  <Html>
    <Head />
    <Body>
      <Tailwind>
        <Container class="p-4 bg-gray-100">
          <Text class="text-lg text-gray-800">
            Hello!
          </Text>
        </Container>
      </Tailwind>
    </Body>
  </Html>
</template>
```

::callout{type="info"}
All built-in components like `Html`, `Head`, `Body`, `Container`, `Text`, and `Button` are auto-imported, you don't need to import them manually.
::

## Template discovery {#discovery}

By default, Maizzle looks for templates matching `emails/**/*.{vue,md}` in your project's root. You may customize this with the `content` option in your config:

```ts [maizzle.config.ts]
export default defineConfig({
  content: ['emails/**/*.{vue,md}', 'src/emails/**/*.vue'],
})
```

The glob patterns determine which files are shown in the dev UI and compiled when you do `npm run build`. The directory structure in your content paths is preserved in the output.

Alternatively, you may pass a source directory directly to the `build` command:

```bash
npx maizzle build --dir src/templates/email
```

::callout{type="info"}
Only `.vue` and `.md` files are treated as templates. Other file types (e.g. `.html`) are ignored even if they match the glob patterns.
::

## Using logic

Add a `<script setup>` block to use logic or per-template configuration:

```vue [emails/order.vue]
<script setup>
  const items = [
    { name: 'Widget', price: '$9.99' },
    { name: 'Gadget', price: '$14.99' },
  ]
</script>

<template>
  <Html>
    <Head />
    <Body>
      <Tailwind>
        <Container>
          <Heading level="2" class="text-2xl">Your Order</Heading>
          <div v-for="item in items" :key="item.name">
            <Text>{{ item.name }} — {{ item.price }}</Text>
          </div>
        </Container>
      </Tailwind>
    </Body>
  </Html>
</template>
```

You have full access to Vue's Composition API: `ref`, `computed`, `v-for`, `v-if`, conditional rendering — it all works and you don't need to import them manually.

## Configuration

Use `defineConfig()` to override the global config for a specific template:

```vue [emails/modern.vue]
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
    <Body>
      <Tailwind>
        <Container class="max-w-xl">
          <Text>CSS inlining will be disabled for this template alone.</Text>
        </Container>
      </Tailwind>
    </Body>
  </Html>
</template>
```

The config you define in a template is merged with the framework defaults and the global config from your `maizzle.config.ts` (should you have one), so you only need to specify the options that you want to change.

## Layout component

Use the `Layout` component to wrap a template with our opinionated skeleton that has built-in Tailwind CSS support, Inter font, meta tags and some Outlook (classic) resets.

For most projects, this is the recommended approach:

```vue [emails/welcome.vue]
<template>
  <Layout> // [!code ++]
    <Container class="max-w-xl">
      <Heading class="text-2xl">Welcome!</Heading>
      <Text>Thanks for signing up.</Text>
      <Button href="https://example.com">Get Started</Button>
    </Container>
  </Layout> // [!code ++]
</template>
```

## Prose typography

We use `@maizzle/tailwindcss` which ships a `prose` utility that you can use for email-safe typography (vertical rhythm, text sizes etc.). It's inspired by [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography) and fine-tuned for email clients.

Drop `prose` on any wrapping element to style the content inside it:

```vue [emails/article.vue]
<template>
  <Layout>
    // [!code word:prose]
    <Container class="max-w-xl prose">
      <h1>Product Update</h1>
      <p>We've shipped some exciting <a href="https://example.com">new features</a>.</p>
      <blockquote>
        <p>"This is a game-changer."</p>
      </blockquote>
    </Container>
  </Layout>
</template>
```

Works great with the [`<Markdown>`](/docs/components/markdown) component when you need to style rendered Markdown:

```vue [emails/newsletter.vue]
<template>
  <Layout>
    <Container class="max-w-xl">
      <Markdown wrapper class="prose">
        # Welcome aboard

        Some _markdown_ content with a [link](https://example.com).
      </Markdown>
    </Container>
  </Layout>
</template>
```

Size presets (`prose-sm`, `prose-base`, `prose-lg`, `prose-xl`) scale the typographic and spacing scale together. Element modifiers like `prose-a:text-blue-600` or `prose-h1:text-4xl` override individual elements without ejecting from the preset.

## Teleporting content

You may use Vue's [`<Teleport>`](https://vuejs.org/guide/built-ins/teleport.html) to move a chunk of markup somewhere else in the rendered HTML. Useful for things like injecting a `<style>` block into `<head>` from deep inside a component or adding some meta tags when some condition is met.

### Targets {#teleport-targets}

Use the `to` prop to specify where the teleported content should land.

| `to` value | Where it lands |
|------------|----------------|
| `head` | Appended at the end of `<head>` |
| `body` | Appended at the end of `<body>` |
| `body:start` | Prepended at the start of `<body>` |
| `#some-id` | Appended inside the matching element |
| `#some-id:start` | Prepended inside the matching element |
| `.some-class` | Appended inside the first matching element |
| `.some-class:start` | Prepended inside the first matching element |

::callout{type="info"}
The `:start` suffix is Maizzle-specific, vanilla Vue Teleport always appends. Use it whenever order matters like in preheaders or structural overrides.
::

### Example {#teleport-example}

```vue [emails/welcome.vue]
<template>
  <Layout>
    <Teleport to="head">
      <style embed>
        .custom { color: #facade; }
      </style>
    </Teleport>

    <Teleport to="body:start">
      <div style="display: none">Welcome to Acme — let's get started.</div>
    </Teleport>

    <Container>
      <Text>Body content here.</Text>
    </Container>

    <Teleport to="body">
      <img src="https://example.com/pixel.gif" width="1" height="1">
    </Teleport>
  </Layout>
</template>
```

::callout{type="info"}
`<Preheader>` already uses `<Teleport to="body:start">` under the hood, so reach for it instead of writing the boilerplate by hand for inbox preview text.
::

## Markdown templates {#markdown}

You may also write email templates as `.md` files, and they can even use Vue components:

```vue [emails/update.md]
# Product Update

We've shipped some exciting new features.

<Button href="https://example.com">See What's New</Button>
```

Code blocks in Markdown are automatically syntax-highlighted with [Shiki](https://shiki.style/).

### Using `<script setup>` {#markdown-script}

`.md` templates support a `<script setup>` block at the top, just like `.vue` templates. 

Bindings declared there are available in the markdown body via `{{ }}` interpolation, and you can use our composables too:

```vue [emails/order.md]
<script setup>
  usePreheader('Your order has shipped')

  const items = [
    { name: 'Widget', price: '$9.99' },
    { name: 'Gadget', price: '$14.99' },
  ]
</script>

# Your Order

<div v-for="item in items" :key="item.name">
  {{ item.name }} — {{ item.price }}
</div>
```

### Frontmatter {#markdown-frontmatter}

YAML frontmatter at the top of a `.md` template is parsed automatically. Recognized head keys (`title`, `description`, `meta` etc.) are injected into the `<head>` via [`@unhead/vue`](https://unhead.unjs.io/):

```md [emails/update.md]
---
title: Product Update
description: New features just shipped
---

# Hello
```

The rendered output gets `<title>Product Update</title>` plus the corresponding Open Graph and Twitter meta tags in `<head>`, which are useful for the webversion of an email.

### Default layout {#markdown-layout}

`.md` templates are wrapped in the built-in `MarkdownLayout` component automatically. 

You get a complete email document (`<html>`, `<head>`, MSO/VML fallback, body shell, plus a centered `<Container class="max-w-xl">`) without writing any boilerplate.

`MarkdownLayout` is a thin shell around [`<Layout>`](/docs/components/layout) that adds the constrained-width `Container` so prose-style markdown reads well out of the box.

::callout{type="info"}
This auto-wrap only applies to `.md` files used as templates. `.md` files placed in a `components/` directory (or any directory listed in [`components.source`](/docs/development/configuration#componentssource)) are treated as regular components, so you can use them in templates like you would any component.
::

### Choosing a different layout {#markdown-custom-layout}

Set the `layout` frontmatter key to wrap the markdown with a different component:

```md [emails/update.md]
---
layout: MyCustomLayout
---

# Product Update

...
```

The value must be the PascalCase name of a component, so in our example above `MyCustomLayout` would reference `components/MyCustomLayout.vue`.

To opt out of any wrapping entirely, set `layout: false`:

```md [emails/raw.md]
---
layout: false
---

# Just the markdown, no wrapper
```

### Frontmatter as layout props {#markdown-layout-props}

The whole frontmatter object is passed to the wrapping layout as the `frontmatter` prop. 

`MarkdownLayout` uses it to populate `Layout`'s props (`lang`, `dir`, `ariaLabel` etc.) when the corresponding key is set:

::code-tabs
  :::code-tab{label="emails/welcome.md"}
    ```md
    ---
    lang: fr
    ariaLabel: Bienvenue à bord
    ---

    # Bienvenue
    ```
  :::
  :::code-tab{label="dist/welcome.html"}
    ```html 
    <!DOCTYPE html>
    <!-- [!code word:lang="fr"] -->
    <html lang="fr" ...>
      <!-- ... -->
      <body>
        <!-- [!code word:aria-label="Bienvenue à bord"] -->
        <div ... aria-label="Bienvenue à bord">
          <h1>Bienvenue</h1>
        </div>
      </body>
    </html>
    ```
  :::
::

To consume frontmatter inside a custom layout, declare a `frontmatter` prop:

```vue [components/MarketingLayout.vue]
<script setup>
const props = defineProps({
  frontmatter: { type: Object, default: () => ({}) },
})
</script>

<template>
  <Layout :aria-label="props.frontmatter.title">
    <h1>{{ props.frontmatter.title }}</h1>
    <slot />
  </Layout>
</template>
```

Then, use it in the markdown template:

```md [emails/promo.md]
---
layout: MarketingLayout
title: Big Sale
---

# 50% off everything
```

### Overriding the default globally {#markdown-global-layout}

To replace `MarkdownLayout` as the default wrap for every `.md` template at once, configure `markdown.wrapperComponent` in your config:

```ts [maizzle.config.ts]
export default defineConfig({
  markdown: {
    wrapperComponent: 'MarketingLayout',
  },
})
```

The value can also be a function `(id, raw) => string | null` for conditional logic. 

When you set your own `wrapperComponent`, it takes precedence over both the default and the `layout` frontmatter key.

## AMP4Email

You can author AMP4Email templates in Maizzle without extra setup.

::code-tabs
  :::code-tab{label="emails/promo.vue"}
  ```vue
  <template>
    <Html amp4email>
      <Head>
        <style amp-custom>
          @reference "@maizzle/tailwindcss";

          amp-carousel {
            @apply border border-gray-300 p-4;
          }
        </style>
      </Head>
      <Body>
        <amp-carousel layout="responsive" width="600" height="300" type="slides">
          <amp-img src="https://example.com/a.jpg" width="600" height="300" />
          <amp-img src="https://example.com/b.jpg" width="600" height="300" />
        </amp-carousel>
      </Body>
    </Html>
  </template>
  ```
  :::
  :::code-tab{label="dist/promo.html"}
  ```html
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" amp4email>
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style amp-custom>
        amp-carousel {
          border: 1px solid #d1d5dc;
          padding: 16px;
        }
      </style>
    </head>
    <body xml:lang="en" dir="ltr" style="margin: 0; padding: 0; width: 100%; height: 100%; word-break: break-word;">
      <div role="article" aria-roledescription="email" lang="en" dir="ltr" style="font-size: medium; font-size: max(16px, 1rem)">
        <amp-carousel layout="responsive" width="600" height="300" type="slides">
          <amp-img src="https://example.com/a.jpg" width="600" height="300"></amp-img>
          <amp-img src="https://example.com/b.jpg" width="600" height="300"></amp-img>
        </amp-carousel>
      </div>
    </body>
  </html>
  ```
  :::
::

`<amp-*>` tags render as-is, so `<amp-carousel>`, `<amp-img>`, `<amp-list>` etc. pass through to the rendered HTML untouched.

::callout{type="info"}
If you want a Vue wrapper around an AMP tag, register it under a PascalCase name (e.g. `components/AmpCarousel.vue` → `<AmpCarousel>`). The kebab form `<amp-carousel>` always stays native, so the two never collide.
::

#### AMP4Email and Tailwind CSS {#amp-tailwind}

Use `@reference "@maizzle/tailwindcss"` instead of `@import` if you need Tailwind utilities or theme variables inside `<style amp-custom>`.

This helps avoid emitting duplicate CSS in templates where you're already using Tailwind, like when using the `Layout` component or `<Tailwind>` wrapper

#### amp4email vs ⚡4email {#amp-attribute}

Use `amp4email` instead of `⚡4email`. The two are interchangeable per the AMP spec, but the ⚡ form trips Vue's template compiler and won't work.

```vue
<template>
  <Html ⚡4email> // [!code --]
  <Html amp4email> // [!code ++]
    <!-- ... -->
  </Html>
</template>
```

## Output

Built templates are output to the `dist` directory as `.html` files. 

You may customize this:

```ts [maizzle.config.ts]
export default defineConfig({
  output: {
    path: 'resources/views/emails',
    extension: 'blade.php',
  },
})
```

Directory structure from your content path is preserved: `emails/app/welcome.vue` will be output to `dist/app/welcome.html`.

## Archiving

Maizzle only compiles templates that match the [`content`](#template-discovery) glob patterns. If a project accumulates a lot of old emails, you might consider "archiving" them by keeping them in the repo but excluding them from the build.

You could:

1. **Move it outside the `content` paths.** Anything that doesn't match the glob is ignored.

2. **Change the extension** so the glob no longer matches it. For example, rename `welcome.vue` → `welcome.vue.bak`.

3. **Use a negated glob pattern** to exclude a directory or file from `content`:

    <br>
    <br>

    ```ts [maizzle.config.ts]
    export default defineConfig({
      content: [
        'emails/**/*.{vue,md}',
        '!emails/archive/**/*',
      ],
    })
    ```

    Now templates under `emails/archive/` stay in the repo but are skipped at build time.
