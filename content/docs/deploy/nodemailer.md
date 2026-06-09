---
title: Nodemailer
description: Send Maizzle-rendered emails with Nodemailer over SMTP.
section: Deploy
order: 1
---

# Nodemailer

Send a compiled Maizzle template through any SMTP server using [Nodemailer](https://nodemailer.com/).

## Install

```bash
npm install nodemailer @maizzle/framework
```

## Render and send

```ts
import { render } from '@maizzle/framework'
import nodemailer from 'nodemailer'

const { html, plaintext } = await render('emails/welcome.vue')

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

await transporter.sendMail({
  from: 'hello@yourcompany.com',
  to: 'user@example.com',
  subject: 'Welcome',
  html,
  text: plaintext,
})
```

To generate a plaintext version automatically, enable [`plaintext`](/docs/development/configuration#plaintext) in your config or in the template's `<script setup>` block.
