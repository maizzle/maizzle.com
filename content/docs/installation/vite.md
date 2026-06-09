---
title: Vite Plugin
description: How to add Maizzle as a Vite plugin to your existing app.
section: Getting Started
order: 5
sidebar: false
---

# Installation

Maizzle works as a standalone project, as part of your monorepo setup, or as a Vite plugin in your existing app or in your favorite Vite-powered framework.

::install-tabs
::

Add Maizzle as a plugin to your existing Vite project.

### 1. Install dependencies

Install the framework in your app:

```bash
npm install @maizzle/framework
```

### 2. Configure Vite

Add the Maizzle plugin to your Vite config, alongside your app's own plugins:

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import { maizzle } from '@maizzle/framework'

export default defineConfig({
  plugins: [
    // ...your app's plugins
    maizzle({
      content: ['src/emails/**/*.vue'],
      output: {
        path: 'build/emails',
      },
    }),
  ],
})
```

::callout{type="info"}
Read more about the available plugin options in the [Configuration](/docs/development/configuration#vite-plugin) documentation.
::

During development, Maizzle starts its own dev server alongside your app's. When you build, email templates are compiled together with the rest of your app.

If you're using TypeScript, add `.maizzle/*.d.ts` to your `include` paths for auto-imported component and composable type definitions:

```json [tsconfig.json]
{
  "include": ["src/**/*", ".maizzle/*.d.ts"]
}
```

::callout{type="info"}
Using a meta-framework? Check out our [Framework Guides](/docs/installation/frameworks) for step-by-step setup instructions.
::
