---
title: Compatibility
description: Email client compatibility and what Maizzle does to help improve email rendering.
section: Getting Started
order: 4
---

# Compatibility

What the framework does to help you build emails that render well across popular email clients, plus tips for testing and troubleshooting your templates.

## Tailwind CSS

We created `@maizzle/tailwindcss`, a custom Tailwind CSS 4 configuration that is optimized for styling HTML emails:

- `px` spacing scale instead of `rem`
- HEX color palette instead of CSS variables
- `mso-` utilities for Outlook-specific styles
- email client targeting variants like `gmail:` or `ios:`
- prose typography styles optimized for email content
- email-safe defaults for things like `box-shadow`, `border-radius`, and more

### Syntax lowering

The framework lowers modern Tailwind CSS 4 syntax like nesting, calc() or oklch, so you can safely use `sm:`, `hover:`, `dark:` or even advanced utilities like `space-y-*` or `*:` without worrying about email client support.

## Components

Maizzle includes many built-in components for building HTML emails, from layout primitives like `Container`, `Row` and `Column`, to visual elements like `Button`, `Img`, `Heading`, `CodeBlock` and more.

All components have been render-tested in the most popular email clients:

<div class="not-prose my-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
  <div class="flex flex-col items-center gap-3 rounded-lg border border-border p-6 text-center">
    <img src="/logo/apple-mail.svg" alt="" class="size-10" />
    <div>
      <div class="text-sm font-medium">Apple Mail</div>
      <div class="text-xs text-muted-foreground">macOS and iOS</div>
    </div>
  </div>
  <div class="flex flex-col items-center gap-3 rounded-lg border border-border p-6 text-center">
    <img src="/logo/gmail.svg" alt="" class="size-10" />
    <div>
      <div class="text-sm font-medium">Gmail</div>
      <div class="text-xs text-muted-foreground">Web, Android, iOS</div>
    </div>
  </div>
  <div class="flex flex-col items-center gap-3 rounded-lg border border-border p-6 text-center">
    <img src="/logo/yahoo.svg" alt="" class="size-10" />
    <div>
      <div class="text-sm font-medium">Yahoo! Mail</div>
      <div class="text-xs text-muted-foreground">Web, Android, iOS</div>
    </div>
  </div>
  <div class="flex flex-col items-center gap-3 rounded-lg border border-border p-6 text-center">
    <img src="/logo/outlook-new.svg" alt="" class="size-10" />
    <div>
      <div class="text-sm font-medium">Outlook</div>
      <div class="text-xs text-muted-foreground">Windows, macOS, iOS, Android, web</div>
    </div>
  </div>
</div>

Getting these to render correctly covers most other clients too (like Thunderbird, Samsung Email...), which translates to compatibility with over 95% of email clients used worldwide.

## Checks

When developing locally, the [dev server](/docs/development/local) scans your template (and every component it imports) for things that may not render well across email clients. 

Warnings will show up in the **Checks** tab of the bottom panel, and you can click the line number on the right to jump to that location in your editor:

::checks-panel
::

There are two kinds of checks:

- **Compatibility** uses data from [caniemail.com](https://www.caniemail.com/) to flag CSS or HTML features that are unsupported or partially supported in your target clients.
- **Lint** are basic structural checks, like missing required tags, a [`Button`](/docs/components/button) without an `href`, or an image missing an `alt` attribute.

By default, checks target the four most popular client families (Gmail, Apple Mail, Outlook and Yahoo!), but you may configure or disable them:

::code-tabs
  :::code-tab{label="maizzle.config.js"}
  ```ts [maizzle.config.ts]
  export default {
    server: {
      // `checks: false` to turn off entirely
      checks: {
        // `clients: 'all'` to check every client in caniemail's database
        clients: ['gmail', 'apple-mail', 'outlook'],
        // Filter by severity: 'error', 'warning', or 'lint'
        level: 'error',
      },
    },
  }
  ```
  :::
  :::code-tab{label="emails/welcome.vue"}
  ```vue [emails/welcome.vue]
  <script setup>
    defineConfig({
      server: {
        checks: {
          clients: ['gmail', 'apple-mail'],
          level: 'error',
        },
      },
    })
  </script>

  <template>
    <!-- ... -->
  </template>
  ```
  :::
::

::callout{type="info"}
Set `server.checks: false` to completely turn off checks. The tab will be hidden and no scanning willl be performed.
::

## Testing

You should always run render tests in popular email clients before sending to your subscribers. Tools like Testi@, Email on Acid or Litmus can help with that.

Another good practice is to send yourself a test email from the same system you'll use in production, be it your email service provider or your application.

You may also send test emails using the [Test panel](/docs/development/local#sending-test-emails) when developing locally.
