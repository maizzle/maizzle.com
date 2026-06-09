---
title: AWS SES
description: Send Maizzle-rendered emails with Amazon SES.
section: Deploy
order: 6
---

# AWS SES

Send a compiled Maizzle template through [Amazon SES](https://aws.amazon.com/ses/) using the AWS SDK v3.

## Install

```bash
npm install @aws-sdk/client-sesv2 @maizzle/framework
```

## Render and send

```ts
import { render } from '@maizzle/framework'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

const ses = new SESv2Client({ region: 'us-east-1' })

const { html, plaintext } = await render('emails/welcome.vue')

await ses.send(new SendEmailCommand({
  FromEmailAddress: 'hello@yourcompany.com',
  Destination: {
    ToAddresses: ['user@example.com'],
  },
  Content: {
    Simple: {
      Subject: { Data: 'Welcome' },
      Body: {
        Html: { Data: html },
        Text: { Data: plaintext },
      },
    },
  },
}))
```

Credentials are picked up from the standard AWS chain (env vars, shared config file, IAM role, etc.). For high-volume sending, switch to `SendBulkEmailCommand` with SES templates.
