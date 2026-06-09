---
title: Resend
description: Send Maizzle-rendered emails with the Resend API.
section: Deploy
order: 5
---

# Resend

Send a compiled Maizzle template through the [Resend](https://resend.com/) HTTP API.

## Install

```bash
npm install resend @maizzle/framework
```

## Render and send

```ts
import { Resend } from 'resend'
import { render } from '@maizzle/framework'

const resend = new Resend(process.env.RESEND_API_KEY)

const { html, plaintext } = await render('emails/welcome.vue')

await resend.emails.send({
  from: 'hello@yourdomain.com',
  to: 'user@example.com',
  subject: 'Welcome',
  html,
  text: plaintext,
})
```

To send from your own domain, verify it first in the Resend dashboard.
