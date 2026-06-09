---
title: React Email
description: How to migrate your email templates from React Email to Maizzle.
section: Migrate to Maizzle
order: 1
---

# Migrating from React Email

If you're coming from React Email, Maizzle's API and component model will feel familiar.

## Component map

Maizzle has almost 100% parity with React Email's core components, making it very easy to migrate: keep using the same component names, just switch to Vue SFCs instead of JSX.

Here's a quick reference for how React Email components map to Maizzle equivalents:

| React Email | Maizzle |
|-------------|---------|
| `<Html>` | [**Html**](/docs/components/html) |
| `<Head>` | [**Head**](/docs/components/head) |
| `<Body>` | [**Body**](/docs/components/body) |
| `<Container>` | [**Container**](/docs/components/container) |
| `<Section>` | [**Section**](/docs/components/section) |
| `<Row>` | [**Row**](/docs/components/row) |
| `<Column>` | [**Column**](/docs/components/column) |
| `<Heading>` | [**Heading**](/docs/components/heading) |
| `<Text>` | [**Text**](/docs/components/text) |
| `<Link>` | [**Link**](/docs/components/link) |
| `<Button>` | [**Button**](/docs/components/button) |
| `<Img>` | [**Img**](/docs/components/img) |
| `<Hr>` | [**Hr**](/docs/components/hr) |
| `<Preview>` | [**Preheader**](/docs/components/preheader) |
| `<CodeBlock>` | [**CodeBlock**](/docs/components/codeblock) |
| `<CodeInline>` | [**CodeInline**](/docs/components/codeinline) |
| `<Markdown>` | [**Markdown**](/docs/components/markdown) |
| `<Font>` | [**Font**](/docs/components/font) |
| `<Tailwind>` | [**Tailwind**](/docs/components/tailwind) |

Most components can do even more than what you're used to in React Email: the `<Button>` supports VML fallback for Outlook on Windows, `<Img>` has built-in support for dark mode fallbacks and [a11y](/docs/glossary#a11y), and layout components like `<Container>` or `<Column>` work  everywhere even when sizing them with Tailwind.

### Maizzle components

These have no React Email equivalent, here's some stuff you've been missing out on:

| Component | Purpose |
|-----------|---------|
| [**Layout**](/docs/components/layout) | Opinionated skeleton with email-safe defaults |
| [**Outlook**](/docs/components/outlook) | Render content only for Outlook |
| [**NotOutlook**](/docs/components/notoutlook) | Render content everywhere except Outlook |
| [**OutlookBg**](/docs/components/outlookbg) | Outlook background images with VML |
| [**Spacer**](/docs/components/spacer) | Vertical and horizontal spacing |
| [**NoWidows**](/docs/components/nowidows) | Prevent orphaned words |
| [**Raw**](/docs/components/raw) | Emit content verbatim, bypassing Vue parsing |
| [**WithUrl**](/docs/components/withurl) | Add base URLs and tracking query params |
| [**Plaintext**](/docs/components/plaintext) | Render content only in the plaintext output |
| [**NotPlaintext**](/docs/components/notplaintext) | Render content everywhere except in the plaintext output |
| [**QrCode**](/docs/components/qrcode) | Generate inline QR codes using tables |

## Side-by-side

::code-tabs
  :::code-tab{label="React Email"}
  ```tsx [emails/welcome.tsx]
  import {
    Html,
    Head,
    Body,
    Container,
    Heading,
    Text,
    Button,
    Preview,
    Tailwind,
    pixelBasedPreset,
  } from 'react-email'

  interface WelcomeEmailProps {
    name: string
  }

  export function WelcomeEmail({ name }: WelcomeEmailProps) {
    return (
      <Html lang="en">
        <Head />
        <Tailwind config={{ presets: [pixelBasedPreset] }}>
          <Body className="bg-white font-sans">
            <Preview>Welcome to Acme — let's get started.</Preview>
            <Container className="p-6">
              <Heading className="text-2xl">Hi {name}</Heading>
              <Text className="text-slate-600">
                Thanks for signing up. Click below to verify your email.
              </Text>
              <Button
                href="https://example.com/verify"
                className="bg-blue-600 text-white px-5 py-3 box-border"
              >
                Verify email
              </Button>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    )
  }

  WelcomeEmail.PreviewProps = {
    name: 'Alex',
  } satisfies WelcomeEmailProps
  ```
  :::
  :::code-tab{label="Maizzle"}
  ```vue [emails/welcome.vue]
  <script setup>
    defineProps({ name: String })
  </script>

  <template>
    <Html>
      <Head />
      <Preheader>Welcome to Acme — let's get started.</Preheader>
      <Tailwind>
        <Body class="bg-white font-sans">
          <Container class="max-w-xl p-6">
            <Heading class="text-2xl">Hi {{ name }}</Heading>
            <Text class="text-slate-600">
              Thanks for signing up. Click below to verify your email.
            </Text>
            <Button 
              href="https://example.com/verify" 
              class="bg-blue-600 text-white px-5 py-3"
            >
              Verify email
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  </template>
  ```
  :::
::

## Styling

React Email docs suggest using inline style objects. With Maizzle, you typically use Tailwind, but can also use style objects or inline CSS. 

We recommend using Tailwind as it's more powerful, easier to maintain, and our CSS pipeline optimizes it for email clients compatibility.

::code-tabs
  :::code-tab{label="React Email"}
  ```tsx [emails/welcome.tsx]
  <Button
    href="https://example.com"
    style={{
      backgroundColor: '#2563eb',
      color: '#ffffff',
      padding: '12px 20px',
      borderRadius: '6px',
    }}
  >
    Verify email
  </Button>
  ```
  :::
  :::code-tab{label="Maizzle"}
  ```vue [emails/welcome.vue]
  <Button
    href="https://example.com"
    class="bg-blue-600 text-white px-5 py-3 rounded-md"
  >
    Verify email
  </Button>
  ```
  :::
::

If you'd rather stick to object syntax you can, but with Vue syntax:

```vue {3,8}
<Button
  href="https://example.com"
  :style="{ 
    backgroundColor: '#2563eb', 
    color: '#ffffff', 
    padding: '12px 20px', 
    borderRadius: '6px' 
  }"
>
  Verify email
</Button>
```

### Tailwind CSS

Both frameworks expose a `<Tailwind>` wrapper, but configuration is passed differently.

In React Email, you pass a JS config object via the `config` prop, which combines their `pixelBasedPreset` with theme extensions:

```tsx [emails/welcome.tsx]
import { Body, Tailwind, pixelBasedPreset } from 'react-email'

export function WelcomeEmail() {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: { brand: '#6366f1' },
          },
        },
      }}
    >
      <Body className="bg-brand">...</Body>
    </Tailwind>
  )
}
```

In Maizzle, you pass the config to a slot as CSS, just like you'd expect in Tailwind CSS 4:  

```vue [emails/welcome.vue] {3-9}
<template>
  <Tailwind>
    <template #config>
      @import "@maizzle/tailwindcss";
  
      @theme {
        --color-brand: #6366f1;
      }
    </template>
  
    <Body>...</Body>
  </Tailwind>
</template>
```

`@maizzle/tailwindcss` is Maizzle's official Tailwind CSS 4 config for email and it's included by default, no need to install or import it manually.

It gives you the email-safe defaults like a `px` scale instead of `rem`, HEX colors instead of `oklch()`, prose typography styles for HTML emails, and even email client targeting variants like `gmail:` and `ios:`.

::callout{type="info"}
You can safely omit the `#config` slot and Tailwind CSS will work just fine in Maizzle. Use it only if you need to customize the default configuration: to add custom colors, extend the spacing scale, or define new variants.
::

## Rendering

React Email's `render()` becomes Maizzle's [`render()`](/docs/api/utilities#render):

::code-tabs
  :::code-tab{label="React Email"}
  ```ts [build.ts]
  import { render } from 'react-email'
  import { WelcomeEmail } from './emails/welcome'

  const html = await render(<WelcomeEmail name="Alex" />)
  ```
  :::
  :::code-tab{label="Maizzle"}
  ```ts [build.ts]
  import { render } from '@maizzle/framework'

  const { html } = await render('emails/welcome.vue', config?)
  ```
  :::
::

::callout{type="info"}
In Maizzle, `render` accepts a template path or raw SFC string and an optional config object, instead of an imported component like in React Email. 
::

To get per-render data into a template, pass it in the `config` and read it with [`useConfig()`](/docs/api/composables#useconfig):

::code-tabs
  :::code-tab{label="build.ts"}
  ```ts [build.ts]
  const { html } = await render('emails/welcome.vue', {
    recipient: { name: 'Alex' },
  })
  ```
  :::
  :::code-tab{label="emails/welcome.vue"}
  ```vue [emails/welcome.vue]
  <script setup>
    const { recipient } = useConfig()
  </script>

  <template>
    <Text>Hi {{ recipient.name }}</Text>
  </template>
  ```
  :::
::

`render()` runs the full pipeline — SSR, CSS inlining, transformers, doctype — and returns `html` plus (optionally) `plaintext`. 

See the [API Reference](/docs/api/utilities) for build, dev server, and per-template options.

## Sending emails

Sending doesn't change, the only swap is the `render()` import.

### Resend

::code-tabs
  :::code-tab{label="React Email"}
  ```ts [send.ts]
  import { render } from 'react-email'
  import { Resend } from 'resend'
  import { WelcomeEmail } from './emails/welcome'

  const resend = new Resend(process.env.RESEND_API_KEY)

  const html = await render(<WelcomeEmail name="Alex" />)

  await resend.emails.send({
    from: 'no-reply@example.com',
    to: 'alex@example.com',
    subject: 'Welcome!',
    html,
  })
  ```
  :::
  :::code-tab{label="Maizzle"}
  ```ts [send.ts]
  import { render } from '@maizzle/framework'
  import { Resend } from 'resend'

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { html, plaintext } = await render('emails/welcome.vue', {
    recipient: { name: 'Alex' },
    plaintext: true,
  })

  await resend.emails.send({
    from: 'no-reply@example.com',
    to: 'alex@example.com',
    subject: 'Welcome!',
    html,
    text: plaintext,
  })
  ```
  :::
::

### Nodemailer (SMTP)

::code-tabs
  :::code-tab{label="React Email"}
  ```ts [send.ts]
  import { render } from 'react-email'
  import { createTransport } from 'nodemailer'
  import { WelcomeEmail } from './emails/welcome'

  const transporter = createTransport({
    host: 'smtp.example.com',
    port: 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  const html = await render(<WelcomeEmail name="Alex" />)

  await transporter.sendMail({
    from: 'no-reply@example.com',
    to: 'alex@example.com',
    subject: 'Welcome!',
    html,
  })
  ```
  :::
  :::code-tab{label="Maizzle"}
  ```ts [send.ts]
  import { render } from '@maizzle/framework'
  import { createTransport } from 'nodemailer'

  const transporter = createTransport({
    host: 'smtp.example.com',
    port: 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  const { html, plaintext } = await render('emails/welcome.vue', {
    recipient: { name: 'Alex' },
    plaintext: true,
  })

  await transporter.sendMail({
    from: 'no-reply@example.com',
    to: 'alex@example.com',
    subject: 'Welcome!',
    html,
    text: plaintext,
  })
  ```
  :::
::
