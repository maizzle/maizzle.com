---
title: "Solid"
description: "How to use Maizzle with Solid to build email templates alongside your web application."
section: Framework Guides
order: 6
---

# Solid

Maizzle plugs into SolidStart as a Vite plugin. Run `npm start` and a sibling preview server starts alongside your app; run `npm run build` and email templates compile to static HTML.

## Installation

In this guide, we'll use [SolidStart](https://docs.solidjs.com/solid-start) as the framework. 

After setting up SolidStart, install Maizzle:

```bash
npm install @maizzle/framework
```

## Setup

### Project structure

Create an `emails` directory inside `src` for your email templates:

``` [your-solidstart-app] {2-4}
├── src/
│   ├── emails/
│   │   ├── welcome.vue
│   │   └── tsconfig.json
│   ├── routes/
├── app.config.ts
├── tsconfig.json
└── package.json
```


### App config

Register the Maizzle Vite plugin in the `vite.plugins` option in your `app.config.ts`:

```ts [app.config.ts]
import { defineConfig } from '@solidjs/start/config'
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  vite: {
    plugins: [
      maizzle({
        root: 'src/emails',
        content: ['**/*.vue'],
        output: {
          path: 'build/emails',
        },
      }),
    ],
  },
})
```

See [Configuration](/docs/development/configuration) for all available options.

### TypeScript

Maizzle generates type declarations for auto-imported components and composables post-installation. To enable type checking for your email templates, add a `tsconfig.json`:

```json [src/emails/tsconfig.json]
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "composite": true,
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

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "strict": true
  },
  "references": [
    { "path": "./src/emails" } // [!code ++]
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

Run your dev command as usual. Maizzle starts its own dev server alongside SolidStart:

```bash
npm run dev
```

- Your SolidStart app runs on its default port (typically `3000`)
- The Maizzle email preview UI runs on the next available port (normally `3001`)

Changes to email templates are automatically reflected in the Maizzle preview UI.

### Production build

When you build your app, Maizzle compiles your email templates to static HTML files in the configured `output.path`, which in our example is `build/emails`:

```bash
npm run build
```

## Server API

You can render email templates on-demand using Maizzle's `render` function in a SolidStart API route. This is useful when you need to render emails dynamically, for example with user data from a database.

The `render` function accepts either a file path or an SFC string directly, and returns compiled HTML with CSS inlined, purged, and formatted.

### API route

Create a server endpoint that renders an email template. You can read a `.vue` file from disk:

```ts [src/routes/api/render.ts]
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'

export async function GET() {
  const { html } = await render(resolve('src/emails/welcome.vue'))

  return Response.json({ html })
}
```

Or accept an SFC string in the request body:

```ts [src/routes/api/render.ts]
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'
import type { APIEvent } from '@solidjs/start/server'

export async function POST({ request }: APIEvent) {
  const { template } = await request.json()

  const { html } = await render(template)

  return Response.json({ html })
}
```

### Displaying the result

Since the rendered email is a full HTML document, use an iframe to display it in a SolidStart page:

```tsx [src/routes/preview.tsx]
import { onMount } from 'solid-js'

export default function Preview() {
  let iframeRef: HTMLIFrameElement | undefined

  onMount(async () => {
    const res = await fetch('/api/render')
    const { html } = await res.json()

    if (iframeRef) {
      iframeRef.srcdoc = html
    }
  })

  return <iframe ref={iframeRef} style={{ width: '100%', height: '100vh', border: 'none' }} />
}
```

### Sending emails

You can use the rendered HTML to send emails. Here's an example using [Nodemailer](https://nodemailer.com/):

```ts [src/routes/api/send.ts]
import type { APIEvent } from '@solidjs/start/server'
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

export async function POST({ request }: APIEvent) {
  const { to } = await request.json()

  const { html } = await render(resolve('src/emails/welcome.vue'))

  await transporter.sendMail({
    from: 'no-reply@example.com',
    to,
    subject: 'Welcome!',
    html,
  })

  return Response.json({ success: true })
}
```

## Static assets

To include images or other static files with your emails, configure the `static` option on the Maizzle plugin in `app.config.ts`:

```ts [app.config.ts]
import { defineConfig } from '@solidjs/start/config'
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  vite: {
    plugins: [
      maizzle({
        content: ['./src/emails/**/*.vue'],
        output: {
          path: 'build/emails',
        },
        static: { // [!code ++]
          source: ['src/emails/images'], // [!code ++]
        }, // [!code ++]
      }),
    ],
  },
})
```

Static files are copied to the output directory during production builds.


## Other frameworks

Not using Solid? Check out the other framework guides:

::framework-guides{:exclude="solid"}
::
