---
title: "Astro"
description: "How to use Maizzle with Astro to build email templates alongside your web application."
section: Framework Guides
order: 3
---

# Astro

Maizzle plugs into Astro as a Vite plugin: edit, preview, and build email templates inside your existing project. Run `astro dev` and Maizzle starts a sibling dev server with its preview UI; run `astro build` and emails compile to HTML next to your site.

## Installation

Install Maizzle in your Astro project:

```bash
npm install @maizzle/framework
```

## Setup

### Project structure

Create an `emails` directory inside `src` for your email templates:

``` [your-astro-app] {2,3}
├── src/
│   ├── emails/
│   │   └── welcome.vue
│   ├── pages/
│   ├── components/
│   └── layouts/
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

### Astro config

Register the Maizzle Vite plugin in your `astro.config.mjs`:

```js [astro.config.mjs]
import { defineConfig } from 'astro/config'
import { maizzle } from '@maizzle/framework' // [!code ++]

export default defineConfig({
  vite: {
    plugins: [
      maizzle({ // [!code ++]
        root: 'src/emails', // [!code ++]
        content: ['**/*.vue'], // [!code ++]
        output: { // [!code ++]
          path: 'dist/emails', // [!code ++]
        }, // [!code ++]
      }), // [!code ++]
    ]
  }
})
```

See [Configuration](/docs/development/configuration) for all available options.

### TypeScript

Add the Maizzle type declarations to your `tsconfig.json`, these will be generated automatically when you run the dev server for the first time:

```json [tsconfig.json]
{
  "extends": "astro/tsconfigs/strict",
  "include": [
    ".astro/types.d.ts",
    "**/*",
    "**/.maizzle/**/*.d.ts" // [!code ++]
  ],
  "exclude": ["dist"]
}
```

## Usage

Create an email template in your `src/emails` directory:

```vue [src/emails/welcome.vue]
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

### Development

Run `astro dev` as usual:

```bash
npm run dev
```

- Your Astro site runs on its default port (typically `4321`)
- The Maizzle email preview UI runs on the port you configured (default `3000`)

Changes to email templates are automatically reflected in the Maizzle preview UI.

### Production build

When you run `astro build`, Maizzle compiles your email templates to static HTML files and outputs them to the configured `output.path`, which in our example is `dist/emails`.

```bash
npm run build
```

## Server API

You can render email templates on-demand using Maizzle's `render` function in an Astro server endpoint. This is useful when you need to render emails dynamically, for example with user data from a database.

Since Astro is a static site builder by default, you need to add a server adapter and opt out of prerendering for your API routes.

Install the Node adapter (or whichever [adapter](https://docs.astro.build/en/guides/on-demand-rendering/#server-adapters) matches your deploy target):

```bash
npm install @astrojs/node
```

Then add it to your `astro.config.mjs`:

```js [astro.config.mjs]
import { defineConfig } from 'astro/config'
import node from '@astrojs/node' // [!code ++]
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  adapter: node({ mode: 'standalone' }), // [!code ++]
  vite: {
    plugins: [
      maizzle({ /* ... */ }),
    ]
  }
})
```

### API route

Create a `src/pages/api/render.ts` server endpoint that reads and renders an email template. Use `prerender = false` to ensure the route is server-rendered:

::code-tabs
  :::code-tab{label="File path"}
  ```ts [src/pages/api/render.ts]
  import type { APIRoute } from 'astro'
  import { resolve } from 'node:path'
  import { render } from '@maizzle/framework'

  export const prerender = false

  export const POST: APIRoute = async () => {
    const { html } = await render(resolve('src/emails/welcome.vue'))

    return new Response(JSON.stringify({ html }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
  ```
  :::
  :::code-tab{label="SFC string"}
  ```ts [src/pages/api/render.ts]
  import type { APIRoute } from 'astro'
  import { render } from '@maizzle/framework'

  export const prerender = false

  export const POST: APIRoute = async ({ request }) => {
    const { template } = await request.json()

    const { html } = await render(template)

    return new Response(JSON.stringify({ html }), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
  ```
  :::
::

### Displaying the result

Display it on a page:

```html [pages/preview.astro]
<iframe id="preview" style="width: 100%; height: 100vh; border: none;"></iframe>

<script>
  const res = await fetch('/api/render', { method: 'POST' })
  const { html } = await res.json()
  document.getElementById('preview').srcdoc = html
</script>
```

### Sending emails

You can use the rendered HTML to send emails directly from a server endpoint. Here's an example using Nodemailer:

```ts [src/pages/api/send.ts]
import type { APIRoute } from 'astro'
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'
import { createTransport } from 'nodemailer'

export const prerender = false

const transporter = createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
  },
})

export const POST: APIRoute = async ({ request }) => {
  const { to } = await request.json()

  const { html } = await render(resolve('src/emails/welcome.vue'))

  await transporter.sendMail({
    from: 'no-reply@example.com',
    to,
    subject: 'Welcome!',
    html,
  })

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
```

## Static assets

To include images or other static files with your emails, configure the `static` option:

```js [astro.config.mjs]
import { defineConfig } from 'astro/config'
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  vite: {
    plugins: [
      maizzle({
        content: ['./src/emails/**/*.vue'],
        output: {
          path: 'dist/emails',
        },
        static: { // [!code ++]
          source: ['src/emails/images'], // [!code ++]
        }, // [!code ++]
      }),
    ]
  }
})
```

Static files are copied to the output directory during production builds.


## Other frameworks

Not using Astro? Check out the other framework guides:

::framework-guides{:exclude="astro"}
::
