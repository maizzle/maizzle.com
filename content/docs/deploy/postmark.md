---
title: Postmark
description: Send Maizzle-rendered emails with the Postmark API.
section: Deploy
order: 4
---

# Postmark

Send a compiled Maizzle template through the [Postmark](https://postmarkapp.com/) HTTP API.

## Install

```bash
npm install postmark @maizzle/framework
```

## Render and send

```ts
import { render } from '@maizzle/framework'
import { ServerClient } from 'postmark'

const client = new ServerClient(process.env.POSTMARK_TOKEN)

const { html, plaintext } = await render('emails/welcome.vue')

await client.sendEmail({
  From: 'hello@yourcompany.com',
  To: 'user@example.com',
  Subject: 'Welcome',
  HtmlBody: html,
  TextBody: plaintext,
  MessageStream: 'outbound',
})
```

Postmark requires verified sender signatures and uses separate streams for transactional vs. broadcast mail — set `MessageStream` accordingly.
