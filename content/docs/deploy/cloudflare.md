---
title: Cloudflare
description: Send Maizzle-rendered emails from a Cloudflare Worker using Cloudflare Email Service.
section: Deploy
order: 7
---

# Cloudflare

Send compiled Maizzle templates from a [Cloudflare Worker](https://developers.cloudflare.com/workers/) through the [Cloudflare Email Service](https://developers.cloudflare.com/email-service/get-started/send-emails/).

Maizzle's `render()` runs on Node.js, so it can't execute inside a Worker. The pattern is to **render at build time** and ship the resulting HTML as a string the Worker imports.

## Prerequisites

- A Cloudflare account with your domain on Cloudflare DNS.
- Complete domain onboarding in the Email Sending dashboard — this adds the MX, SPF, DKIM, and DMARC records required to send.

## Build the templates

In your project, build the emails ahead of deployment:

```bash
npx maizzle build
```

This writes `.html` files to your output directory (`dist/` by default).

## Bundle the HTML into the Worker

Add a Wrangler rule so HTML files import as strings, and declare the email binding:

```toml [wrangler.toml]
[[rules]]
type = "Text"
globs = ["**/*.html"]
fallthrough = true

[[send_email]]
name = "EMAIL"
```

Or in `wrangler.jsonc`:

```jsonc [wrangler.jsonc]
{
  "rules": [
    { "type": "Text", "globs": ["**/*.html"], "fallthrough": true }
  ],
  "send_email": [
    { "name": "EMAIL" }
  ]
}
```

## Send from the Worker

```ts [src/worker.ts]
import welcomeHtml from '../dist/welcome.html'

export interface Env {
  EMAIL: {
    send(message: {
      to: string
      from: string
      subject: string
      html: string
      text?: string
    }): Promise<{ messageId: string }>
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { messageId } = await env.EMAIL.send({
      from: 'hello@yourdomain.com',
      to: 'user@example.com',
      subject: 'Welcome',
      html: welcomeHtml,
    })

    return new Response(`Sent: ${messageId}`)
  },
}
```

The `from` address must use a domain you've verified during email onboarding.

::callout{type="info"}
Run `npx maizzle build` as part of your Worker's build step so the bundled HTML always matches the latest template source.
::
