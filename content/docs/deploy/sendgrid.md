---
title: SendGrid
description: Send Maizzle-rendered emails with the SendGrid API.
section: Deploy
order: 2
---

# SendGrid

Send a compiled Maizzle template through the [SendGrid](https://sendgrid.com/) HTTP API.

## Install

```bash
npm install @sendgrid/mail @maizzle/framework
```

## Render and send

```ts
import { render } from '@maizzle/framework'
import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const { html, plaintext } = await render('emails/welcome.vue')

await sendgrid.send({
  from: 'hello@yourcompany.com',
  to: 'user@example.com',
  subject: 'Welcome',
  html,
  text: plaintext,
})
```

Both `html` and `text` are accepted by SendGrid — provide both to maximise deliverability and to support clients that don't render HTML.
