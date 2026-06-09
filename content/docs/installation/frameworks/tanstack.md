---
title: "TanStack Start"
description: "How to use Maizzle with TanStack Start to build email templates alongside your React application."
section: Framework Guides
order: 9
---

# TanStack Start

Build and preview email templates right inside your [TanStack Start](https://tanstack.com/start) React application.

::callout{type="info"}
Maizzle does not support using JSX or React syntax.
::

## Installation

For this guide we'll be using the [`start-basic`](https://github.com/TanStack/router/tree/main/examples/react/start-basic) TanStack Start example. Clone the repo and add Maizzle to the project:

```bash
npm install @maizzle/framework
```

## Setup

### Project structure

Create an `emails` directory inside `src` for your email templates:

``` [your-app] {3-4}
├── src/
│   ├── routes/
│   ├── emails/
│   │   ├── welcome.vue
│   └── router.tsx
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Vite config

Register the Maizzle Vite plugin in your `vite.config.ts`:

```ts [vite.config.ts]
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import { maizzle } from '@maizzle/framework' // [!code ++]

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'src',
    }),
    viteReact(),
    nitro(),
    maizzle({ // [!code ++]
      root: 'src/emails', // [!code ++]
      content: ['./**/*.vue'], // [!code ++]
      output: { // [!code ++]
        path: 'build/emails', // [!code ++]
      }, // [!code ++]
    }), // [!code ++]
  ],
})
```

See [Configuration](/docs/development/configuration) for all available options.

::callout{type="warning"}
The `root` option is **required** with TanStack Start. Without it, the dev server will not start.
::

### TypeScript

Maizzle generates type declarations for auto-imported components and composables in `src/emails/.maizzle/`. To enable type checking for your email templates, add the paths to your root `tsconfig.json`:

```json [tsconfig.json]
{
  "include": [
    "**/*.ts", 
    "**/*.tsx", 
    "**/*.vue", // [!code ++]
    "./**/.maizzle/*.d.ts", // [!code ++]
    "**/*.d.ts"
  ],
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["DOM", "DOM.Iterable", "ES2024"],
    "isolatedModules": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "target": "ES2024",
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "~/*": ["./src/*"]
    },
    "noEmit": true
  }
}

```

## Usage

Create Vue SFC email templates in your `src/emails` directory. Maizzle components like `Layout`, `Container`, `Button`, etc. are auto-imported:

```vue [src/emails/welcome.vue]
<script setup>
  const name = 'World'
</script>

<template>
  <Html>
    <Head />
    <Body>
      <Tailwind>
        <Container class="max-w-xl p-6">
          <Heading class="text-2xl">Hello, {{ name }}!</Heading>
          <Button
            href="https://example.com"
            class="bg-slate-950 hover:bg-slate-800"
          >Get Started</Button>
        </Container>
      </Tailwind>
    </Body>
  </Html>
</template>
```

### Development

Run your dev command as usual. Maizzle starts its own dev server alongside TanStack Start:

```bash
npm run dev
```

- Your TanStack Start app runs on its default Vite port (typically `3000`)
- The Maizzle email preview UI runs on the next port available (i.e. `3001`)

Changes to email templates are automatically reflected in the Maizzle preview UI.

### Production build

When you run `vite build`, Maizzle compiles your email templates to static HTML files in the configured `output.path`, which in our example is `build/emails`:

```bash
npm run build
```

## Server API

You can render email templates on-demand using Maizzle's `render` function in a TanStack Start API route. This is useful when you need to render emails dynamically, for example with user data from a database.

The `render` function accepts either a file path or an SFC string directly, and returns compiled HTML with CSS inlined, purged, and formatted.

### API route

TanStack Start uses file-based routing with server handlers defined via `createFileRoute`. Create a `src/routes/api/render.ts` API endpoint that renders an email template:

::code-tabs
  :::code-tab{label="File path"}
  ```ts [src/routes/api/render.ts]
  import { createFileRoute } from '@tanstack/react-router'
  import { resolve } from 'node:path'
  import { render } from '@maizzle/framework'

  export const Route = createFileRoute('/api/render')({
    server: {
      handlers: {
        GET: async () => {
          const { html } = await render(resolve('src/emails/welcome.vue'))

          return Response.json({ html })
        },
      },
    },
  })
  ```
  :::
  :::code-tab{label="SFC string"}
  ```ts [src/routes/api/render.ts]
  import { createFileRoute } from '@tanstack/react-router'
  import { render } from '@maizzle/framework'

  export const Route = createFileRoute('/api/render')({
    server: {
      handlers: {
        POST: async ({ request }) => {
          const { template } = await request.json()

          const { html } = await render(template)

          return Response.json({ html })
        },
      },
    },
  })
  ```
  :::
::

::callout{type="warning"}
Because TanStack uses Vite 8.x, for the time being you'll need to exclude `@tailwindcss/oxide` from Vite's dependency optimization. Add this to your `vite.config.ts`:

```ts [vite.config.ts]
export default defineConfig({
  // ...
  optimizeDeps: {
    exclude: ['@tailwindcss/oxide'],
  },
})
```
::

### Displaying the result

You can use an iframe to display the rendered email inside a TanStack Router page:

```tsx [src/routes/preview.tsx]
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/preview')({
  component: PreviewPage,
})

function PreviewPage() {
  const [html, setHtml] = useState('')

  useEffect(() => {
    fetch('/api/render')
      .then(r => r.json())
      .then(d => setHtml(d.html))
  }, [])

  return (
    <iframe
      srcDoc={html}
      style={{ width: '100%', height: '100vh', border: 'none' }}
    />
  )
}
```

### Sending emails

You can use the rendered HTML to send emails. Here's an example [Nodemailer](https://nodemailer.com/) over SMTP:

```ts [src/routes/api/send.ts]
import { createFileRoute } from '@tanstack/react-router'
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

export const Route = createFileRoute('/api/send')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { to } = await request.json()

        const { html } = await render(resolve('src/emails/welcome.vue'))

        await transporter.sendMail({
          from: 'no-reply@example.com',
          to,
          subject: 'Welcome!',
          html,
        })

        return Response.json({ success: true })
      },
    },
  },
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
      root: 'src/emails',
      content: ['./**/*.vue'],
      output: {
        path: 'build/emails',
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

Not using TanStack Start? Check out the other framework guides:

::framework-guides{:exclude="tanstack"}
::
