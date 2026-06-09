---
title: "Next.js"
description: "How to use Maizzle with Next.js to render email templates from Route Handlers and Server Actions."
section: Framework Guides
order: 8
---

# Next.js

You can use Maizzle in a Next.js app to render email templates from Route Handlers and Server Actions with the `render()` utility.

::callout{type="info"}
Maizzle does not support using JSX or React syntax. This guide shows how to author email templates as Vue SFCs and render them in a Next.js app.
::

## Installation

Install Maizzle in your Next.js project:

```bash
npm install @maizzle/framework
```

## Setup

### Project structure

Create an `emails` directory in your Next.js project root for your email templates:

``` [nextjs-app] {2-3}
├── app/
├── emails/
│   ├── welcome.vue
├── next.config.ts
├── tsconfig.json
└── package.json
```

### TypeScript

For type checking inside `.vue` templates, add the extension to your `tsconfig.json`. Also, exclude the `emails` folder from the Next.js compiler so it doesn't try to parse Vue SFCs:

```json [emails/tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.vue"], // [!code highlight]
  "exclude": ["node_modules", "emails"] // [!code highlight]
}
```

## Usage

Author email templates as Vue SFCs in `emails/`. Maizzle's components (`Layout`, `Container`, `Button`, etc.) are auto-imported inside templates:

```vue [emails/welcome.vue]
<template>
  <Html>
    <Head />
    <Body>
      <Tailwind>
        <Container class="bg-slate-100 p-4">
          <Text class="text-lg text-slate-800">Hello!</Text>
        </Container>
      </Tailwind>
    </Body>
  </Html>
</template>

```

## Route Handler

Render an email on demand from an App Router Route Handler. Pass the template's file path directly to `render()`:

```ts [app/api/render/route.ts]
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'

export const runtime = 'nodejs'

export async function POST() {
  const { html } = await render(resolve('emails/welcome.vue'))

  return Response.json({ html })
}
```

You can also pass an SFC string sent from the client — useful when you have a UI that lets users edit a template:

```ts [app/api/render/route.ts]
import { render } from '@maizzle/framework'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const { template } = await request.json()

  const { html } = await render(template)

  return Response.json({ html })
}
```

### Node.js runtime

`render()` reads files and runs Vue's SSR engine, so it must run on Node — not the Edge runtime. Force the Node runtime explicitly:

```ts [app/api/render/route.ts]
export const runtime = 'nodejs'
```

### Server Action

The same call works inside a Server Action when you'd rather avoid an API round-trip:

```ts [app/actions/render.ts]
'use server'

import { resolve } from 'node:path'
import { render } from '@maizzle/framework'

export async function renderWelcome() {
  const { html } = await render(resolve('emails/welcome.vue'))
  return html
}
```

## Reusing a renderer

`render()` spins up a fresh Vite SSR server for every call and tears it down afterwards. That's fine for one-off scripts, but slow if you're rendering on every request.

For repeated renders — a dev preview, a UI that lets users edit templates, a queue worker — use `createRenderer()` once and reuse it:

::code-tabs
  :::code-tab{label="lib/maizzle.ts"}
  ```ts [lib/maizzle.ts]
  import { resolve } from 'node:path'
  import { createRenderer, resolveConfig, type Renderer, type MaizzleConfig } from '@maizzle/framework'

  let cached: Promise<{ renderer: Renderer; config: MaizzleConfig }> | null = null

  export function getRenderer() {
    if (!cached) {
      cached = (async () => {
        const config = await resolveConfig()
        const renderer = await createRenderer({ root: resolve(config.root ?? 'emails') })
        return { renderer, config }
      })()
    }

    return cached
  }
  ```
  :::
  :::code-tab{label="app/api/render/route.ts"}
  ```ts [app/api/render/route.ts]
  import { resolve } from 'node:path'
  import { getRenderer } from '@/lib/maizzle'

  export const runtime = 'nodejs'

  export async function POST() {
    const { renderer, config } = await getRenderer()
    const { html } = await renderer.render(resolve('emails/welcome.vue'), config)

    return Response.json({ html })
  }
  ```
  :::
::

`renderer.render()` only runs the SSR step — it skips the transformer pipeline that `render()` runs after SSR (CSS inlining, unused-CSS purging, HTML formatting, doctype prepending). It is faster, but the HTML you get back is not the same HTML you'd send to subscribers.

A reasonable split:

- **Previewing in the browser** — `createRenderer()` is enough. Email clients aren't viewing your iframe, so skipping inlining/purging is fine, and reusing the renderer makes the preview snappy on every keystroke or save.
- **Sending the email** — use `render()`. You want CSS inlined and unused styles purged before the message hits an inbox. The cold-start cost is paid once per send, not once per preview.

When you do need the full pipeline on top of a reusable renderer (for example, a queue worker rendering hundreds of emails), call the individual transformers yourself — see [`createRenderer()`](/docs/api/utilities#createrenderer) in the API reference.

## Displaying the result

The compiled email is a full HTML document, so you may render it inside an `<iframe>`:

```tsx [app/preview/page.tsx]
'use client'

import { useEffect, useState } from 'react'

export default function PreviewPage() {
  const [html, setHtml] = useState('')

  useEffect(() => {
    const load = () => {
      fetch('/api/render', { method: 'POST' })
        .then(r => r.json())
        .then(d => setHtml(d.html))
    }

    load()
  }, [])

  return (
    <iframe srcDoc={html} style={{ width: '100%', height: '100vh', border: 'none' }} />
  )
}
```

## Sending emails

Send the rendered HTML from a Route Handler. Example with [Resend](https://resend.com/):

```ts [app/api/send/route.ts]
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { to } = await request.json()

  const { html } = await render(resolve('emails/welcome.vue'))

  await resend.emails.send({
    from: 'no-reply@example.com',
    to,
    subject: 'Welcome!',
    html,
  })

  return Response.json({ success: true })
}
```

Or via [Nodemailer](https://nodemailer.com/) over SMTP:

```ts [app/api/send/route.ts]
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'
import { createTransport } from 'nodemailer'

export const runtime = 'nodejs'

const transporter = createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: Request) {
  const { to } = await request.json()

  const { html } = await render(resolve('emails/welcome.vue'))

  await transporter.sendMail({
    from: 'no-reply@example.com',
    to,
    subject: 'Welcome!',
    html,
  })

  return Response.json({ success: true })
}
```

## Standalone preview UI

Next.js doesn't run Vite, so you don't get the in-app Maizzle preview UI you'd get in Laravel or Nuxt. To use the full preview UI while authoring templates, start the Maizzle dev server from the `emails/` directory:

```bash [nextjs-app/emails]
npx maizzle dev
```

::callout{type="info"}
This starts the Maizzle dev server with live preview and HMR on its own port, so it can run alongside `next dev`.
::

## Pages Router

The same patterns work in the Pages Router — use an API route under `pages/api/` instead of a Route Handler:

```ts [pages/api/render.ts]
import type { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'node:path'
import { render } from '@maizzle/framework'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { html } = await render(resolve('emails/welcome.vue'))
  res.status(200).json({ html })
}
```


## Other frameworks

Not using Next.js? Check out the other framework guides:

::framework-guides{:exclude="nextjs"}
::
