---
title: Manual Installation
description: How to manually set up a new Maizzle project.
section: Getting Started
order: 3
sidebar: false
---

# Installation

Maizzle works as a standalone project, as part of your monorepo setup, or as a Vite plugin in your existing app or in your favorite Vite-powered framework.

::install-tabs
::

Install manually to have more control over your project structure, or to add Maizzle to an existing codebase.

### 1. Scaffold a project

Create a new directory and install the framework:

```bash
mkdir project-name
cd project-name
npm init -y
npm install @maizzle/framework
```

### 2. Add configuration

Add scripts to your `package.json`:

```json [package.json]
{
  "type": "module",
  "scripts": { // [!code ++]
    "dev": "maizzle serve", // [!code ++]
    "build": "maizzle build" // [!code ++]
  }
}
```

For TypeScript support, like type checking and editor autocompletion, add a `tsconfig.json` file to the root of your project:

```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["**/*.vue", ".maizzle/*.d.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. Create a template

Add a template in the `emails` directory:

```vue [emails/welcome.vue]
<template>
  <Html>
    <Head />
    <Body>
      <Tailwind>
        <Container class="bg-gray-100">
          <Text class="text-lg text-gray-800">
            Hello!
          </Text>
        </Container>
      </Tailwind>
    </Body>
  </Html>
</template>
```

### 4. Start development

Start the dev server:

```bash
npm run dev
```

Build emails for production:

```bash
npm run build
```
