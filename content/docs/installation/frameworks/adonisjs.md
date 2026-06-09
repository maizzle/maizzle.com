---
title: "AdonisJS"
description: "How to use Maizzle with AdonisJS to build email templates alongside your web application."
section: Framework Guides
order: 5
---

# AdonisJS

Maizzle integrates with AdonisJS through a Vite plugin, allowing you to build and preview email templates alongside your web application.

During development, Maizzle runs its own dev server with a preview UI on a separate port. When you build for production, email templates are compiled to HTML alongside your AdonisJS app.

## Installation

Install Maizzle in your AdonisJS project:

```bash
npm install @maizzle/framework
```

## Setup

### Project structure

Create an `emails` directory in your AdonisJS project root for your email templates:

``` [your-adonisjs-app] {2-4}
├── app/
├── emails/
│   ├── welcome.vue
│   └── tsconfig.json
├── inertia/
├── resources/
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Vite config

Register the Maizzle Vite plugin in your `vite.config.ts`:

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/vite'
import { maizzle } from '@maizzle/framework' // [!code ++]

export default defineConfig({
  plugins: [
    vue(),
    inertia({ ssr: { enabled: false, entrypoint: 'inertia/ssr.ts' } }),
    adonisjs({ entrypoints: ['inertia/app.ts'], reload: ['resources/views/**/*.edge'] }),
    maizzle({ // [!code ++]
      root: 'emails', // [!code ++]
      content: ['./**/*.vue'], // [!code ++]
      output: { // [!code ++]
        path: 'build/emails', // [!code ++]
      }, // [!code ++]
    }), // [!code ++]
  ],
})
```

See [Configuration](/docs/development/configuration) for all available options.

### TypeScript

Maizzle generates type declarations for auto-imported components and composables in `emails/.maizzle/`. To enable type checking for your email templates, create a `tsconfig.json`:

```json [emails/tsconfig.json]
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

```json [tsconfig.json]
{
  "extends": "@adonisjs/tsconfig/tsconfig.app.json",
  "compilerOptions": {
    "rootDir": "./",
    "outDir": "./build"
  },
  "references": [
    { "path": "./tsconfig.inertia.json" },
    { "path": "./emails" } // [!code ++]
  ]
}
```

## Usage

Create Vue SFC email templates in your `emails` directory. Maizzle components like `Layout`, `Container`, `Button`, etc. are auto-imported:

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

### Development

Run `node ace serve --hmr` as usual. Maizzle starts its own dev server alongside AdonisJS:

```bash
npm run dev
```

- Your AdonisJS app runs on its default port (typically `3333`)
- The Maizzle email preview UI runs on the port you configured (default `3000`)

Changes to email templates are automatically reflected in the Maizzle preview UI.

### Production build

When you run `node ace build`, Maizzle compiles your email templates to static HTML files in the configured `output.path`, which in our example is `build/emails`:

```bash
npm run build
```

## Server API

You can also render email templates on-demand using Maizzle's `render` function in an AdonisJS controller or route. This is useful when you need to render emails dynamically, for example with user data from a database.

The `render` function accepts either a file path or an SFC string directly, and returns compiled HTML with CSS inlined, purged, and formatted.

### API route

Create a route that renders an email template. You can read a `.vue` file from disk:

```ts [start/routes.ts]
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'
import router from '@adonisjs/core/services/router'

router.post('/api/render', async () => {
  const { html } = await render(resolve('emails/welcome.vue'))

  return { html }
})
```

Or accept an SFC string in the request body:

```ts [start/routes.ts]
import { render } from '@maizzle/framework'
import router from '@adonisjs/core/services/router'

router.post('/api/render', async ({ request }) => {
  const { template } = request.only(['template'])

  const { html } = await render(template)

  return { html }
})
```

### Displaying the result

Since the rendered email is a full HTML document, use an iframe to display it in your Inertia/Vue page:

```vue [inertia/pages/preview.vue]
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const iframeRef = ref<HTMLIFrameElement>()

onMounted(async () => {
  const res = await fetch('/api/render', { method: 'POST' })
  const { html } = await res.json()

  if (iframeRef.value) {
    iframeRef.value.srcdoc = html
  }
})
</script>

<template>
  <iframe ref="iframeRef" style="width: 100%; height: 100vh; border: none;" />
</template>
```

### Sending emails

You can use the rendered HTML to send emails with AdonisJS Mail. Here's an example using the [AdonisJS mail package](https://docs.adonisjs.com/guides/digging-deeper/mail):

```ts [app/mails/welcome.ts]
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'
import { BaseMail } from '@adonisjs/mail'

export default class WelcomeMail extends BaseMail {
  from = 'no-reply@example.com'
  subject = 'Welcome!'

  constructor(private user: { email: string }) {
    super()
  }

  async prepare() {
    const { html } = await render(resolve('emails/welcome.vue'))

    this.message.to(this.user.email).html(html)
  }
}
```

Then send it from a controller or route:

```ts [app/controllers/users_controller.ts]
import mail from '@adonisjs/mail/services/main'
import WelcomeMail from '#mails/welcome'

await mail.send(new WelcomeMail(user))
```

Use `mail.sendLater(new WelcomeMail(user))` instead if you want the email to be queued for background delivery.

Or use Nodemailer directly:

```ts [start/routes.ts]
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'
import { createTransport } from 'nodemailer'
import router from '@adonisjs/core/services/router'

const transporter = createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

router.post('/api/send', async ({ request }) => {
  const { to } = request.only(['to'])

  const { html } = await render(resolve('emails/welcome.vue'))

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

To include images or other static files with your emails, configure the `static` option:

```ts [vite.config.ts]
// ...

export default defineConfig({
  plugins: [
    // ...
    maizzle({
      output: {
        path: 'build/emails',
      },
      static: { // [!code ++]
        source: ['emails/images'], // [!code ++]
      }, // [!code ++]
    }),
  ],
})
```

Static files are copied to the output directory during production builds.


## Other frameworks

Not using AdonisJS? Check out the other framework guides:

::framework-guides{:exclude="adonisjs"}
::
