---
title: "Qwik"
description: "How to use Maizzle with Qwik City to build email templates alongside your web application."
section: Framework Guides
order: 7
---

# Qwik

Qwik City supports email templating through Maizzle's Vite plugin. Author templates as Vue SFCs, preview them in a dedicated dev server, and get compiled HTML output when you build.

## Installation

After scaffolding a [Qwik](https://qwik.dev/docs/getting-started/) project with `npm create qwik@latest`, install Maizzle:

```bash
npm install @maizzle/framework
```

## Setup

### Project structure

Create an `emails` directory inside `src` for your email templates:

``` [your-qwik-app] {2-4}
├── src/
│   ├── emails/
│   │   ├── welcome.vue
│   │   └── tsconfig.json
│   ├── routes/
│   └── root.tsx
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Vite config

Register the Maizzle Vite plugin in your `vite.config.ts`:

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { maizzle } from '@maizzle/framework' // [!code ++]

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths({ root: '.' }),
      maizzle({ // [!code ++]
        root: 'src/emails', // [!code ++]
        content: ['**/*.vue'], // [!code ++]
        output: { // [!code ++]
          path: 'build/emails', // [!code ++]
        }, // [!code ++]
      }), // [!code ++]
    ],
  }
})
```

See [Configuration](/docs/development/configuration) for all available options.

### TypeScript

Maizzle generates type declarations for auto-imported components and composables in `src/emails/.maizzle/` after installation. Create a `tsconfig.json` to enable type checking for your email templates:

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

Then, add it as a project reference in your root `tsconfig.json`:

```json [tsconfig.json]
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@builder.io/qwik",
    "target": "ES2020",
    "module": "ES2022",
    "moduleResolution": "Bundler",
    "strict": true
  },
  "include": ["src", "./*.d.ts", "./*.config.ts"],
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

Run your dev command as usual. Maizzle starts its own dev server alongside Qwik:

```bash
npm run start
```

- Your Qwik app runs on its default port (typically `5173`)
- The Maizzle email preview UI runs on the port you configured (default `3000`)

Changes to email templates are automatically reflected in the Maizzle preview UI.

### Production build

When you run `qwik build`, Maizzle compiles your email templates to static HTML files in the configured `output.path`, which in our example is `build/emails`:

```bash
npm run build
```

## Server API

You can render email templates on-demand using Maizzle's `render` function in a Qwik City API route. This is useful when you need to render emails dynamically, for example with user data from a database.

The `render` function accepts either a file path or an SFC string directly, and returns compiled HTML with CSS inlined, purged, and formatted.

### API route

Qwik City uses directory-based routing. Create an API endpoint that reads and renders an email template:

```tsx [src/routes/api/render/index.tsx]
import type { RequestHandler } from '@builder.io/qwik-city'
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'

export const onGet: RequestHandler = async ({ json }) => {
  const { html } = await render(resolve('src/emails/welcome.vue'))

  json(200, { html })
}
```

Or accept an SFC string in the request body:

```tsx [src/routes/api/render/index.tsx]
import type { RequestHandler } from '@builder.io/qwik-city'
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'

export const onPost: RequestHandler = async ({ json, request }) => {
  const { template } = await request.json()

  const { html } = await render(template)

  json(200, { html })
}
```

### Displaying the result

You can use an iframe to display it in a Qwik City page:

```tsx [src/routes/preview/index.tsx]
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'

export default component$(() => {
  const iframeRef = useSignal<HTMLIFrameElement>()

  useVisibleTask$(async () => {
    const res = await fetch('/api/render')
    const { html } = await res.json()

    if (iframeRef.value) {
      iframeRef.value.srcdoc = html
    }
  })

  return <iframe ref={iframeRef} style={{ width: '100%', height: '100vh', border: 'none' }} />
})
```

### Sending emails

You can use the rendered HTML to send emails. Here's an example using [Nodemailer](https://nodemailer.com/):

```tsx [src/routes/api/send/index.tsx]
import type { RequestHandler } from '@builder.io/qwik-city'
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

export const onPost: RequestHandler = async ({ json, request }) => {
  const { to } = await request.json()

  const { html } = await render(resolve('src/emails/welcome.vue'))

  await transporter.sendMail({
    from: 'no-reply@example.com',
    to,
    subject: 'Welcome!',
    html,
  })

  json(200, { success: true })
}
```

## Static assets

To include images or other static files with your emails, configure the `static` option:

```ts [vite.config.ts]
// ...

export default defineConfig(() => {
  return {
    plugins: [
      // ...
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
  }
})
```

Static files are copied to the output directory during production builds.


## Other frameworks

Not using Qwik? Check out the other framework guides:

::framework-guides{:exclude="qwik"}
::
