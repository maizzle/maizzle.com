---
title: Dev Server
description: Preview your email templates while developing locally with HMR, compatibility checks, and test sending.
section: Development
order: 2
---

# Local development

Preview email templates in a modern browser interface as you develop.

## Starting the server

Run the `serve` command to start the dev server:

```bash
npx maizzle serve
```

The server starts on `http://localhost:3000` by default.

### Custom config

Use `-c` / `--config` to point to a custom config file:

```bash
npx maizzle serve -c maizzle.staging.ts
```

### Network access

To expose the dev server on your local network, use the `--host` flag:

```bash
npx maizzle serve --host
```

You can also pass an explicit address to bind to:

```bash
npx maizzle serve --host 0.0.0.0
```

::callout{type="info"}
When using the `--host` flag, a **QR code** that encodes the network URL is also displayed — scan it with a phone or tablet to open the dev UI on the device, no typing required. Useful for previewing emails on real mobile clients as you work.
::

## Interface

### Sidebar

The left sidebar lists every template discovered from your [`content`](/docs/development/configuration#content) paths, grouped by directory. The footer shows the total email count.

A search button in the sidebar header opens the [command palette](#command-palette) — `⌘K` on Mac, `Ctrl+K` elsewhere, or simply `/`.

### View modes

The toolbar at the top of the preview area has two view-mode toggles:

- **Preview** — renders the template in an iframe, exactly as an email client would.
- **Source** — shows the syntax-highlighted code. Three sub-views are available from a dropdown:
    - **Compiled HTML** (default) — the final HTML after the transformer pipeline.
    - **Vue source** — the original `.vue` or `.md` file.
    - **Plaintext** — the auto-generated plaintext version.

### Preview controls

When in Preview mode, the toolbar exposes:

- **Width / Height inputs** — the current iframe size in pixels. Type a value or use the device picker.
- **Device picker** — a dropdown with common phone and tablet presets (iPhone 17 Pro, iPad Pro, Galaxy S26 Ultra, Pixel 9 Pro, …). Pick one to snap the iframe to that size, or choose **Full size** to fill the panel.
- **Drag handles** on the iframe edges for free-form resizing.

You can also **emulate dark mode** to see how clients with dark-mode CSS render the template — open the command palette and select "Emulate dark mode" (or run it again to disable).

### Bottom panel

A collapsible panel at the bottom of the preview hosts three tabs:

#### Checks

Reports email-client compatibility issues (powered by the [caniemail](https://www.caniemail.com) dataset) and built-in lint warnings, grouped by category: **CSS**, **HTML**, **Image**, **Others**. Click a category to filter, click an issue to expand it for details and a link to the relevant `caniemail` page.

You may [configure or disable](#checks) the Checks tab in `maizzle.config.ts`.

#### Stats

Quick metrics on the compiled output:

- **Size** — compiled HTML byte size, with a warning at 51 KB and an error at 100 KB (Gmail clips emails larger than ~100 KB).
- **Images** — total `<img>` tags plus CSS background images.
- **Links** — total `<a>` tags with an `href` attribute.

#### Test

Send a test email of the current template directly from the UI:

- **To** — one or more recipient addresses (multi-tag input, paste-to-add, space to confirm).
- **Subject** — defaults to the template name. Optional **Prevent threading** checkbox appends a unique token so Gmail doesn't collapse repeat sends.
- **Send** — fires the email. If using [Ethereal](#ethereal), the result includes a preview URL.

See [Sending test emails](#sending-test-emails) below for transport configuration.

### Command palette

Press `⌘K` / `Ctrl+K` (or `/` when no input is focused) to open the command palette. 

Commands are grouped by context:

- **Preview** — includes "Emulate dark mode".
- **Copy to clipboard**
    - **HTML** — `⌘C` (Mac) / `Alt+C` (Win/Linux)
    - **Plaintext** — `⌘P` / `Alt+P`
    - **Vue source** — `⌘U` / `Alt+U`
- **Resources** — quick links out to the documentation and Can I Email.
- **Templates** — appears when you type a query. Tokens are matched against both the file name and its directory path, so `welcome flow` finds `emails/flow/welcome.vue`. The footer shows the result count.

Use `↑` / `↓` to navigate, `Enter` to select, `Esc` to close.

## Live reload

Changes are picked up automatically. When you save a `.vue` or `.md` template file, or update the `maizzle.config.ts`, the preview reflects changes instantly through HMR.

## Sending test emails

The **Test** tab in the [bottom panel](#test) of the dev server UI allows you to send test emails.

### Ethereal

By default, Maizzle uses [Ethereal](https://ethereal.email/) — a free fake SMTP service that captures emails without delivering them. No configuration is needed.

When you send a test email with Ethereal, you get a preview URL where you can view the rendered email in your browser and inspect its headers.

::callout{type="info"}
Ethereal does not show you how the email will look like in a real inbox, use a [render testing service](/docs/resources#testing) for that. Ethereal emails are not delivered to real inboxes.
::

### Custom SMTP

To send through a real SMTP server, configure a transport in your config:

```ts [maizzle.config.ts]
export default defineConfig({
  server: {
    email: {
      to: ['test@example.com'],
      from: 'dev@yourcompany.com',
      transport: {
        host: 'smtp.mailtrap.io',
        port: 587,
        auth: {
          user: 'your-user',
          pass: 'your-pass',
        },
      },
    },
  },
})
```

The `transport` object accepts any [Nodemailer transport options](https://nodemailer.com/smtp/), so you can use services like Mailtrap, Amazon SES, or any SMTP provider.

::callout{type="warning"}
Never commit SMTP credentials to git, use environment variables instead.
::

## Configuration

### port

Type: `number`\
Default: `3000`

The port the dev server runs on.

```ts [maizzle.config.ts]
export default defineConfig({
  server: {
    port: 8080,
  },
})
```

You may also set it from the CLI:

```bash
npx maizzle serve --port 8080
```

### watch

Type: `string[]`\
Default: `[]`

Additional file paths to watch for changes. Use this when your templates depend on external data files or other resources that Maizzle doesn't watch by default.

```ts [maizzle.config.ts]
export default defineConfig({
  server: {
    watch: ['./data/products.json'],
  },
})
```

### checks

Type: `false | { clients?, level? }`\
Default: `{}` (all clients, all severities)

Configure the **Checks** tab in the [bottom panel](#checks). Set to `false` to hide the tab entirely.

```ts [maizzle.config.ts]
export default defineConfig({
  server: {
    checks: {
      clients: ['gmail', 'outlook', 'apple-mail'],
      level: 'error',
    },
  },
})
```

- **`clients`** — caniemail client families to check against. Defaults to the four majors (Gmail, Apple Mail, Outlook, Yahoo). Pass `'all'` for the full dataset.
- **`level`** — filter severities: `'error'`, `'warning'`, or `'lint'`. Omit to show everything.

### email

Email-sending options for the [Test tab](#test).

#### email.to

Type: `string | string[]`\
Default: `undefined`

Default recipient(s) for test emails. You can also set this in the Test tab before sending.

#### email.from

Type: `string`\
Default: `'Maizzle <maizzle@ethereal.email>'`

Sender address for test emails.

#### email.subject

Type: `string`\
Default: `undefined`

Default subject line for test emails. If not set, Maizzle uses the template name.

#### email.transport

Type: `object`\
Default: `undefined` (Ethereal)

Nodemailer transport options. See [Custom SMTP](#custom-smtp) above for a full example.
