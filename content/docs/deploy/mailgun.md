---
title: Mailgun
description: Send Maizzle-rendered emails with the Mailgun API.
section: Deploy
order: 3
---

# Mailgun

Send a compiled Maizzle template through the [Mailgun](https://www.mailgun.com/) HTTP API using the official Node.js SDK.

## Install

```bash
npm install mailgun.js form-data @maizzle/framework
```

## Render and send

```ts
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { render } from '@maizzle/framework'

const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
})

const { html, plaintext } = await render('emails/welcome.vue')

await mg.messages.create('your-domain.com', {
  from: 'hello@yourdomain.com',
  to: ['user@example.com'],
  subject: 'Welcome',
  html,
  text: plaintext,
})
```

The first argument to `messages.create()` is your verified Mailgun sending domain (or a sandbox domain like `sandbox-xxx.mailgun.org` while testing). The `form-data` peer dependency is required for cross-platform compatibility.
