---
title: Vite Plugin
description: Running Maizzle inside an existing Vite app or in your favorite Vite-powered framework.
section: Core Concepts
order: 2
---

# Vite Plugin

Maizzle ships a Vite plugin so you can build email templates inside an existing Vite project or alongside your app's frontend code, without having to create a separate project.

## When to use it

Reach for the plugin when emails need to live in the same repository as a Vite-powered app and you'd rather not maintain a separate project. 

Most commonly, people use the Vite plugin inside:

- a standalone Vite app
- a Laravel/Nuxt/SvelteKit/Astro/other Vite-powered framework

If your emails live on their own, for example when you're building a suite of email templates for a client, use the CLI to [scaffold a standalone project](/docs/installation) instead.

## How it integrates

The plugin doesn't merge into your app's pipeline. It runs Maizzle in its own Vite dev server so that our Vue and Tailwind pipeline doesn't leak into your host app's transform graph.

- **`vite dev`** — Maizzle starts its own dev server on a separate port. Your app's dev server and Maizzle's dev server run side by side, each with their own HMR. You browse emails at the Maizzle URL while your app stays on its own.
- **`vite build`** — emails are compiled after Vite builds your app, so `npm run build` outputs them without you wiring up extra scripts.

## Configuration

The Vite plugin can be configured in two ways:

1. Inline, as the function argument:

    ```ts [vite.config.ts]
    import { defineConfig } from 'vite'
    import { maizzle } from '@maizzle/framework'

    export default defineConfig({
      plugins: [
        maizzle({
          output: { // [!code highlight]
            path: 'dist/emails', // [!code highlight]
          } // [!code highlight]
        }),
      ],
    })
    ```
2. A `maizzle.config.{ts,js}` file in your project root.

::callout{type="info"}
If both exist, they're merged with **inline options winning over the file**, which in turn wins over the framework defaults.
::

For the function signature and full option list, see [`maizzle()` in the API reference](/docs/api/utilities#maizzle-vite-plugin).

## Framework integrations

Check out our framework guides for step-by-step instructions on setting up the plugin in your favorite Vite-powered framework:

::framework-guides{:exclude="nextjs"}
::
