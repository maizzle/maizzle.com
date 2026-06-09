---
title: Installation
description: Create a new Maizzle project by using the interactive CLI or by adding the plugin to your existing Vite app.
section: Getting Started
order: 2
---

# Installation

Maizzle works as a standalone project, as part of your monorepo setup, or as a Vite plugin in your existing app or in your favorite Vite-powered framework.

::install-tabs
::

### Scaffold a project

The quickest way to get started is with the interactive CLI:

```bash
npx maizzle new
```

Follow the prompts to give your project a name, choose a starter template, and to install dependencies.

You may also scaffold a project immediately by passing arguments:

```bash
npx maizzle new maizzle/maizzle project-name --install
```

### Start the dev server

Once done, start the dev server:

```bash
cd project-name
npx maizzle serve
```
