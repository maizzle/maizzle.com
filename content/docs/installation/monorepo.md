---
title: Monorepo Installation
description: How to set up Maizzle in a monorepo.
section: Getting Started
order: 4
sidebar: false
---

# Installation

Maizzle works as a standalone project, as part of your monorepo setup, or as a Vite plugin in your existing app or in your favorite Vite-powered framework.

::install-tabs
::

Maizzle works in monorepo setups with npm, pnpm, yarn, and bun.

### 1. Configure workspaces

In your monorepo root `package.json`:

```json [package.json]
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

If using pnpm, also create a `pnpm-workspace.yaml`:

```yaml [pnpm-workspace.yaml]
packages:
  - packages/*
```

### 2. Add to a workspace

Create a workspace `package.json`:

```json [packages/emails/package.json]
{
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "maizzle serve",
    "build": "maizzle build"
  },
  "dependencies": {
    "@maizzle/framework": "latest"
  }
}
```

### 3. Install and run

```bash
# From monorepo root
npm install

# From the workspace
cd packages/emails
npm run dev
```
