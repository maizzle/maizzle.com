---
title: CLI
description: Using the Maizzle CLI tool to scaffold projects and build emails.
section: Getting Started
order: 9
---

# CLI

The Maizzle CLI provides commands for creating projects, starting the dev server, building templates, and scaffolding files.

## new

Use `npx maizzle new` to create a new Maizzle project.

Run it with no arguments to launch an interactive wizard that walks you through choosing a directory, picking a starter, and installing dependencies:

::maizzle-new
::

### Arguments

You may skip the wizard by passing arguments directly:

```bash
npx maizzle new [starter] [directory]
```

| Argument | Description |
|----------|-------------|
| `[starter]` | A `user/repo` GitHub path or full Git URL. Defaults to `maizzle/maizzle`. |
| `[directory]` | Target directory. Defaults to the starter's repo name. |

### Options

| Option | Description |
|--------|-------------|
| `-i, --install` | Install dependencies after cloning the repo |
| `--pm <manager>` | Package manager to use (npm, pnpm, yarn, bun) |

### Examples

Use the default starter to create a `my-emails` directory and install dependencies:

```bash
npx maizzle new maizzle/maizzle my-emails --install
```

Use a custom GitHub repo as a starter, without installing dependencies:

```bash
npx maizzle new user/repo my-emails
```

## serve

Start the dev server with live preview and HMR.

```bash
npx maizzle serve
```

::callout{type="info"}
You may also use `maizzle dev`, it is an alias for `maizzle serve`.
::

### Options

| Option | Description |
|--------|-------------|
| `-c, --config <path>` | Path to config file |
| `-p, --port <number>` | Dev server port |
| `--host` | Expose on network |

### Examples

Start the dev server on port 4000:

```bash
npx maizzle serve --port 4000
```

Start the dev server and expose it on the local network:

```bash
npx maizzle serve --host
```

::callout{type="info"}
Using `--host` will print a QR code in the terminal that you can scan with your phone.
::

## build

Build email templates to HTML files.

```bash
npx maizzle build
```

### Options

| Option | Description |
|--------|-------------|
| `-c, --config <path>` | Path to config file |
| `-o, --output <path>` | Output directory |
| `--dir <path>` | Source directory for email templates |
| `--ext <extension>` | Output file extension |
| `--pretty` | Pretty-print HTML output |
| `--minify` | Minify HTML output |
| `--plaintext` | Generate plaintext versions alongside HTML |

::callout{type="info"}
When `--config` is set, the override flags (`-o`, `--dir`, `--ext`, `--pretty`, `--minify`, `--plaintext`) are ignored — your config file is used as-is.
::

### Examples

Output to a custom directory:

```bash
npx maizzle build --output production/emails
```

Pretty-print and generate plaintext versions:

```bash
npx maizzle build --pretty --plaintext
```

Custom source directory and output extension:

```bash
npx maizzle build --dir templates --ext blade.php
```

Use a specific config file:

```bash
npx maizzle build --config maizzle.production.ts
```

## prepare

Generate IDE type definitions in the `.maizzle/` directory. Run this when you add new components or composables and want auto-import types to update without starting the dev server.

```bash
npx maizzle prepare
```

::callout{type="info"}
The official starter runs this automatically after installing dependencies.
::

### Options

| Option | Description |
|--------|-------------|
| `-c, --config <path>` | Path to config file |

## make:template

Scaffold a new email template file.

```bash
npx maizzle make:template [filepath]
```

Creates a `.vue` file with a basic email template structure. If no filepath is provided, you'll be prompted for one.

## make:layout

Scaffold a new layout file using our official `<Layout>` component.

```bash
npx maizzle make:layout [filepath]
```

## make:component

Scaffold a new component file.

```bash
npx maizzle make:component [filepath]
```

## make:config

Scaffold a new config file.

```bash
npx maizzle make:config [name]
```

Pass a name to create an environment-specific config — `npx maizzle make:config production` writes `production.config.ts`. When no name is given, you'll be prompted for one.
