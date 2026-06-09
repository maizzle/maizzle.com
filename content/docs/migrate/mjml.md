---
title: MJML
description: How to migrate your email templates from MJML to Maizzle.
section: Migrate to Maizzle
order: 2
---

# Migrating from MJML

Coming from MJML, once you switch your mental model to the Vue syntax you'll find a lot of familiar concepts in Maizzle, but with more flexibility and power under the hood.

## Component map

| MJML | Maizzle |
|------|---------|
| `<mjml>` | [**Html**](/docs/components/html) |
| `<mj-head>` | [**Head**](/docs/components/head) |
| `<mj-title>` | [**useHead()**](/docs/api/composables#usehead) |
| `<mj-preview>` | [**Preheader**](/docs/components/preheader) |
| `<mj-body>` | [**Body**](/docs/components/body) |
| `<mj-section>` | [**Section**](/docs/components/section) |
| `<mj-group>` | [**Row**](/docs/components/row) |
| `<mj-column>` | [**Column**](/docs/components/column) |
| `<mj-text>` | [**Text**](/docs/components/text) |
| `<mj-button>` | [**Button**](/docs/components/button) |
| `<mj-image>` | [**Img**](/docs/components/img) |
| `<mj-divider>` | [**Hr**](/docs/components/hr) |
| `<mj-spacer>` | [**Spacer**](/docs/components/spacer) |
| `<mj-table>` | Plain `<table>` with Tailwind classes |
| `<mj-raw>` | [**Raw**](/docs/components/raw) |
| `<mj-html-attributes>` defaults | [`html.attributes.add`](/docs/development/configuration#html-attributes-add) |
| `<mj-style>` | `<style>` block in `<Head>` |
| `<mj-include>` | Custom Vue component |

### Maizzle components

These have no MJML equivalent, here's what you've been missing out on:

| Component | Purpose |
|-----------|---------|
| [**Layout**](/docs/components/layout) | Opinionated skeleton with email-safe defaults |
| [**Container**](/docs/components/container) | Centered content wrapper |
| [**Heading**](/docs/components/heading) | Headings with semantic markup |
| [**Link**](/docs/components/link) | Unstyled hyperlink |
| [**Tailwind**](/docs/components/tailwind) | Enables Tailwind CSS for styling |
| [**Markdown**](/docs/components/markdown) | Render markdown content |
| [**CodeBlock**](/docs/components/codeblock) / [**CodeInline**](/docs/components/codeinline) | Syntax-highlighted code / Inline code formatting |
| [**Font**](/docs/components/font) | Use custom fonts |
| [**Outlook**](/docs/components/outlook) | Render content only for Outlook |
| [**NotOutlook**](/docs/components/notoutlook) | Render content everywhere except Outlook |
| [**OutlookBg**](/docs/components/outlookbg) | Outlook background images with VML |
| [**NoWidows**](/docs/components/nowidows) | Prevent orphaned words |
| [**WithUrl**](/docs/components/withurl) | Add base URLs and tracking query params |
| [**Plaintext**](/docs/components/plaintext) | Render content only in the plaintext output |
| [**NotPlaintext**](/docs/components/notplaintext) | Render content everywhere except in the plaintext output |
| [**QrCode**](/docs/components/qrcode) | Generate inline QR codes using tables |

## Side-by-side

::code-tabs
  :::code-tab{label="MJML"}
  ```xml [emails/welcome.mjml]
  <mjml>
    <mj-head>
      <mj-title>Welcome to Acme</mj-title>
      <mj-preview>Let's get you set up.</mj-preview>
      <mj-attributes>
        <mj-all font-family="Helvetica, Arial, sans-serif" />
        <mj-text color="#475569" font-size="16px" />
      </mj-attributes>
    </mj-head>
    <mj-body background-color="#ffffff">
      <mj-section>
        <mj-column>
          <mj-text font-size="24px" color="#0f172a">Hi {{ name }}</mj-text>
          <mj-text>Thanks for signing up. Click below to verify your email.</mj-text>
          <mj-button href="https://example.com/verify" background-color="#2563eb">
            Verify email
          </mj-button>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
  ```
  :::
  :::code-tab{label="Maizzle"}
  ```vue [emails/welcome.vue]
  <script setup>
    defineProps({ name: String })

    useHead({ title: 'Welcome to Acme' })
  </script>

  <template>
    <Html>
      <Head />
      <Preheader>Let's get you set up.</Preheader>
      <Tailwind>
        <Body class="text-gray-600 text-base bg-white font-sans">
          <Container class="max-w-lg">
            <Text class="text-2xl text-gray-950">Hi {{ name }}</Text>
            <Text>Thanks for signing up. Click below to verify your email.</Text>
            <Button href="https://example.com/verify" class="bg-blue-600 text-white">
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

MJML uses tag attributes (`background-color`, `font-size`, `padding`) on every element. 

In Maizzle, you can use Tailwind utility classes or inline CSS.

## Includes and partials

`<mj-include path="./header.mjml" />` becomes a custom Vue component:

::code-tabs
  :::code-tab{label="components/Header.vue"}
  ```vue [components/Header.vue]
  <template>
    <Section class="py-4">
      <Img src="/logo.png" alt="Acme" width="120" />
    </Section>
  </template>
  ```
  :::
  :::code-tab{label="emails/welcome.vue"}
  ```vue [emails/welcome.vue]
  <template>
    <Html>
      <!-- ... -->
      <Body>
        <Header /> // [!code highlight]
        <!-- ... -->
      </Body>
    </Html>
  </template>
  ```
  :::
::

::callout{type="info"}
Components are auto-imported, no manual `import` statements needed. See [Components](/docs/components/overview).
::

## Compiling emails

Use the Maizzle CLI in place of the MJML one:

::code-tabs
  :::code-tab{label="MJML"}
  ```bash
  mjml file.mjml -o dist/file.html
  ```
  :::
  :::code-tab{label="Maizzle"}
  ```bash
  npx maizzle build
  ```
  :::
::

Or programmatically with [`build()`](/docs/api/utilities#build):

```ts [build.ts]
import { build } from '@maizzle/framework'

const { files } = await build({
  content: ['emails/**/*.vue'],
  output: { path: 'dist' },
})
```

Or, to render a single email template and get the compiled HTML string:

::code-tabs
  :::code-tab{label="MJML"}
  ```ts
  import mjml2html from 'mjml'

  const { html } = mjml2html('<mjml>...</mjml>')
  ```
  :::
  :::code-tab{label="Maizzle"}
  ```ts
  import { render } from '@maizzle/framework'

  // Render from file path (relative to project root)
  const { html } = await render('emails/welcome.vue')

  // Or from a SFC string
  const { html } = await render('<template>...</template>')
  ```
  :::
::
