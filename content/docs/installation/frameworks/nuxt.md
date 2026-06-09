---
title: "Nuxt"
description: "How to use Maizzle with Nuxt to build email templates alongside your web application."
section: Framework Guides
order: 2
---

# Nuxt

The official [`@maizzle/nuxt`](https://github.com/maizzle/nuxt) module integrates Maizzle into your Nuxt project. Email templates are authored as Vue SFCs alongside your app, previewed in a separate dev server, and bundled into your Nitro server output on build.

## Installation

Install the module:

```bash
npm install -D @maizzle/nuxt
```

Maizzle is pulled in automatically as a peer dependency.

## Setup

### Nuxt config

Register the module in your `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@maizzle/nuxt'],
})
```

That's it. The module ships with sensible defaults:

| Option        | Default                          |
| ------------- | -------------------------------- |
| `content`     | `<srcDir>/emails/**/*.{vue,md}`  |
| `output.path` | `server/assets/emails`           |
| `server.port` | `4321`                           |

Override any config option under the `maizzle` key:

```ts [nuxt.config.ts] {3-6}
export default defineNuxtConfig({
  modules: ['@maizzle/nuxt'],
  maizzle: {
    server: { port: 5173 },
    static: { source: ['emails/images'] },
  },
})
```

### Project structure

Where you store the email templates depends on your Nuxt version:

::code-tabs
  :::code-tab{label="Nuxt 4"}
  ``` [~/code] {3-5}
  your-nuxt-app/
  ├── app/
  │   └── emails/
  │       ├── welcome.vue
  │       └── tsconfig.json
  ├── nuxt.config.ts
  ├── tsconfig.json
  └── package.json
  ```
  :::
  :::code-tab{label="Nuxt 3"}
  ``` [~/code] {2-4}
  your-nuxt-app/
  ├── emails/
  │   ├── welcome.vue
  │   └── tsconfig.json
  ├── nuxt.config.ts
  ├── tsconfig.json
  └── package.json
  ```
  :::
::

### TypeScript

Maizzle generates type declarations for auto-imported components and composables in `<emailsDir>/.maizzle/`. To enable type checking for your email templates, create a `tsconfig.json` next to them. For example, in Nuxt 4 with the `app` directory:

```json [app/emails/tsconfig.json]
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": [
    "./**/*.vue",
    "./.maizzle/*.d.ts"
  ]
}
```

Then add it as a project reference in your root `tsconfig.json`:

```json [tsconfig.json]
{
  "files": [],
  "references": [
    { "path": "./.nuxt/tsconfig.app.json" },
    { "path": "./.nuxt/tsconfig.server.json" },
    { "path": "./.nuxt/tsconfig.shared.json" },
    { "path": "./.nuxt/tsconfig.node.json" },
    { "path": "./app/emails" } // [!code highlight]
  ]
}
```

::callout{type="info"}
In Nuxt 3, replace `{ "path": "./app/emails" }` with `{ "path": "./emails" }`.
::

## Usage

Create Vue SFC email templates in your emails directory. Maizzle components like `Layout`, `Container`, `Button`, etc. are auto-imported, you don't need to import them manually:

```vue
<script setup>
  defineConfig({
    user: 'world',
  })
</script>

<template>
  <Layout>
    <Container class="max-w-xl">
      <Heading>
        Hello, {{ user }}!
      </Heading>
      <Text>
        Welcome aboard!
      </Text>
      <Button href="https://example.com">
        Verify email
      </Button>
    </Container>
  </Layout>
</template>
```

## Development

Run `nuxt dev` — the Maizzle dev server starts alongside Nuxt:

```bash
npm run dev
```

- Your Nuxt app runs on its default port (typically `http://localhost:3000`)
- The Maizzle email preview UI runs on `http://localhost:4321`

Changes to email templates are automatically reflected in the Maizzle preview UI.

## Production build

`nuxt build` writes compiled HTML to `server/assets/emails/`, which Nitro bundles into the server output:

```bash
npm run build
```

The compiled emails are not visible as files in `.output/server/` — Nitro inlines them as JS chunks under `.output/server/chunks/raw/`. 

Read them at runtime via Nitro's storage API:

```ts [server/api/send.post.ts]
const html = await useStorage('assets:server').getItem('emails:welcome.html')
```

## Server API

For emails that need to be rendered on demand (with database data, runtime variables, etc.), use Maizzle's `render` function in a Nuxt server route.

The `render` function accepts either a file path or an SFC string directly, and returns compiled HTML with CSS inlined, purged, and formatted.

### API route

Create a server route that renders an email template. You can read a `.vue` file from disk:

```ts [server/api/render.post.ts]
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'

export default defineEventHandler(async (event) => {
  const { html } = await render(resolve('app/emails/welcome.vue'))

  return { html }
})
```

Or pass an SFC string directly:

```ts [server/api/render.post.ts]
import { render } from '@maizzle/framework'

export default defineEventHandler(async (event) => {
  const { template } = await readBody(event)

  const { html } = await render(template)

  return { html }
})
```

For example, you could send a template string from your frontend:

```ts
const { data } = await useFetch('/api/render', {
  method: 'POST',
  body: {
    template: `<template>
  <Layout>
    <Container class="max-w-xl">
      <Heading level="1">Hello!</Heading>
    </Container>
  </Layout>
</template>`,
  },
})
```

### Displaying the result

Since the rendered email is a full HTML document, use an iframe to display it in your app:

```vue [components/EmailPreview.vue]
<script setup lang="ts">
const { data: result, refresh } = await useFetch('/api/render', {
  method: 'POST',
})

if (import.meta.dev) {
  onMounted(() => setInterval(() => refresh(), 2000))
}

const iframeRef = ref<HTMLIFrameElement>()

watch(() => result.value?.html, (html) => {
  if (html && iframeRef.value) {
    iframeRef.value.srcdoc = html
  }
})

onMounted(() => {
  if (result.value?.html && iframeRef.value) {
    iframeRef.value.srcdoc = result.value.html
  }
})
</script>

<template>
  <iframe ref="iframeRef" style="width: 100%; height: 100vh; border: none;" />
</template>
```

### Sending emails

You can use the rendered HTML to send emails directly from a server route. Here's an example using [Nodemailer](https://nodemailer.com/):

```ts [server/api/send.post.ts]
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'
import { createTransport } from 'nodemailer'

const transporter = createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export default defineEventHandler(async (event) => {
  const { to } = await readBody(event)

  const { html } = await render(resolve('app/emails/welcome.vue'))

  await transporter.sendMail({
    from: 'no-reply@example.com',
    to,
    subject: 'Welcome!',
    html,
  })

  return { success: true }
})
```

## Static assets

To include images or other static files with your emails, configure the `static` option under the `maizzle` key:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@maizzle/nuxt'],

  maizzle: {
    static: {
      source: ['emails/images'],
    },
  },
})
```

Static files are copied to the output directory during production builds.


## Other frameworks

Not using Nuxt? Check out the other framework guides:

::framework-guides{:exclude="nuxt"}
::
