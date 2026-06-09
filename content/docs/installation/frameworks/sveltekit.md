---
title: "SvelteKit"
description: "How to use Maizzle with SvelteKit to build email templates alongside your web application."
section: Framework Guides
order: 4
---

# SvelteKit

Add email templating to your SvelteKit project with Maizzle's Vite plugin. Author templates as Vue SFCs and preview them in dedicated dev server; on build, they compile to static HTML.

## Installation

Install Maizzle in your SvelteKit project:

```bash
npm install @maizzle/framework
```

## Setup

### Project structure

Create an `emails` directory inside `src` for your email templates:

``` [your-sveltekit-app] {2-4}
├── src/
│   ├── emails/
│   │   ├── welcome.vue
│   │   └── tsconfig.json
│   ├── routes/
│   └── app.html
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Vite config

Register the Maizzle Vite plugin in your `vite.config.ts`:

```ts [vite.config.ts]
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { maizzle } from '@maizzle/framework' // [!code ++]

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    maizzle({ // [!code ++]
      root: 'src/emails', // [!code ++]
      content: ['**/*.vue'], // [!code ++]
      output: { // [!code ++]
        path: 'dist/emails', // [!code ++]
      }, // [!code ++]
    }), // [!code ++]
  ],
})
```

See [Configuration](/docs/development/configuration) for all available options.

### TypeScript

Maizzle generates type declarations for auto-imported components and composables in `src/emails/.maizzle/`. To enable type checking for your email templates, add a config:

```json [src/emails/tsconfig.json]
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

## Usage

Create Vue SFC email templates in your `src/emails` directory. Maizzle components like `Layout`, `Container`, `Button`, etc. are auto-imported:

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

Run `vite dev` as usual. Maizzle starts its own dev server alongside SvelteKit:

```bash
npm run dev
```

- Your SvelteKit app runs on its default port (typically `5173`)
- The Maizzle email preview UI runs on the port you configured (default `3000`)

Changes to email templates are automatically reflected in the Maizzle preview UI.

### Production build

When you run `vite build`, Maizzle compiles your email templates to static HTML files in the configured `output.path`, which in our example is `dist/emails`:

```bash
npm run build
```

## Server API

You can render email templates on-demand using Maizzle's `render` function in a SvelteKit server route. This is useful when you need to render emails dynamically, for example with user data from a database.

### API route

Create a server route that reads and renders an email template:

```ts [src/routes/api/render/+server.ts]
import { resolve } from 'node:path'
import { json } from '@sveltejs/kit'
import { render } from '@maizzle/framework'

export async function POST() {
  const { html } = await render(resolve('src/emails/welcome.vue'))

  return json({ html })
}
```

Or accept an SFC string in the request body:

```ts [src/routes/api/render/+server.ts]
import { json } from '@sveltejs/kit'
import { render } from '@maizzle/framework'

export async function POST({ request }) {
  const { template } = await request.json()

  const { html } = await render(template)

  return json({ html })
}
```

### Displaying the result

Since the rendered email is a full HTML document, use an iframe to display it in your SvelteKit app:

```html [src/routes/+page.svelte]
<script lang="ts">
  import { onMount } from 'svelte'

  let iframeEl: HTMLIFrameElement

  onMount(async () => {
    const res = await fetch('/api/render', { method: 'POST' })
    const { html } = await res.json()
    iframeEl.srcdoc = html
  })
</script>

<iframe bind:this={iframeEl} style="width: 100%; height: 100vh; border: none;"></iframe>
```

### Sending emails

You can use the rendered HTML to send emails directly from a server route. Here's an example using [Nodemailer](https://nodemailer.com/):

```ts [src/routes/api/send/+server.ts]
import { resolve } from 'node:path'
import { json } from '@sveltejs/kit'
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

export async function POST({ request }) {
  const { to } = await request.json()

  const { html } = await render(resolve('src/emails/welcome.vue'))

  await transporter.sendMail({
    from: 'no-reply@example.com',
    to,
    subject: 'Welcome!',
    html,
  })

  return json({ success: true })
}
```

## Static assets

To include images or other static files with your emails, configure the `static` option:

```ts [vite.config.ts]
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    maizzle({
      content: ['./src/emails/**/*.vue'],
      output: {
        path: 'dist/emails',
      },
      static: { // [!code ++]
        source: ['src/emails/images'], // [!code ++]
      }, // [!code ++]
    }),
  ],
})
```

Static files are copied to the output directory during production builds.


## Other frameworks

Not using SvelteKit? Check out the other framework guides:

::framework-guides{:exclude="sveltekit"}
::
