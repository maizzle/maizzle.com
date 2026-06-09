---
title: Editor Setup
description: Configure your editor for the best Maizzle development experience.
section: Getting Started
order: 3
---

# Editor Setup

Configuring your editor can help speed up your development workflow and ensures consistency when working in a team.

## VS Code

### Vue - Official (Volar)

Install the [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension for Vue SFC support. This gives you syntax highlighting, IntelliSense, and type checking in `.vue` files.

### Tailwind CSS IntelliSense

Install the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension for class name autocomplete, hover previews, and linting.

## JetBrains IDEs

WebStorm, PhpStorm, and other JetBrains IDEs have built-in Vue support. Make sure the Vue plugin is enabled in **Settings → Plugins**.

For Tailwind CSS support, install the [Tailwind CSS](https://plugins.jetbrains.com/plugin/15321-tailwind-css) plugin.

## Type declarations

After installing dependencies or when you run `maizzle serve`, type declarations are generated in `.maizzle/`:

```
.maizzle/
├── auto-imports.d.ts  ← composables like defineConfig, useHead etc.
└── components.d.ts    ← built-in components like Button, Container etc.
```

These provide autocomplete and type checking for all auto-imported components and composables. Make sure your `tsconfig.json` includes them:

```json [tsconfig.json]
{
  "include": ["**/*.vue", ".maizzle/*.d.ts"]
}
```

::callout{type="info"}
If you're using Maizzle inside a framework like Nuxt or SvelteKit, you may need a separate `tsconfig.json` in your emails directory. See the [framework guides](/docs/installation/frameworks/nuxt) for details.
::

## pnpm

If you use pnpm, transitive dependencies aren't hoisted to the project's top-level `node_modules` by default. Editor tooling (Volar, ESLint, etc.) may then fail to resolve types from packages Maizzle pulls in indirectly — autocomplete for components, composables, and Tailwind classes can stop working even when builds succeed.

Fix it by enabling `shamefully-hoist` in an `.npmrc` at the project root:

```ini [.npmrc]
shamefully-hoist=true
```

Then reinstall:

```bash
pnpm install
```

This flattens transitive deps into the top-level `node_modules` so editors and type checkers can find them — the same layout npm and yarn produce by default.

## PostCSS syntax

Tailwind CSS includes some custom at-rules, like `@apply` or `@layer`, which may trigger warnings in your editor. This is handled automatically by the Tailwind CSS IntelliSense extension if you're using VS Code. For other editors, or if you need full PostCSS language support, you might need to install an extension.
