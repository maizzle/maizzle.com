---
title: "CLI Tool"
description: "Using the Maizzle CLI tool to scaffold projects and build emails."
---

# Maizzle CLI

You can use the Maizzle CLI to:

- create new projects
- generate config files
- build your HTML emails
- scaffold Templates or Layouts

## Installation

Install the CLI tool globally, so the `maizzle` executable gets added to your `$PATH` :

```sh
npm install -g @maizzle/cli
```

## Creating a project

Scaffold a Maizzle project by opening a Terminal and running:

```sh
maizzle new
```

This will bring up an interactive prompt that will guide you through the process.

## Development

The CLI tool provides commands for developing HTML emails with Maizzle.

### serve

```sh
maizzle serve [env]
```

| Argument | Required | Default | Description
| --- | --- | --- | --- |
| `[env]` | no |  `local` | An [Environment](/docs/environments) name to use

When you run this command, a local development server will be started, which you can access in your browser at _http://localhost:3000_.

`[env]` is optional, you can simply run `maizzle serve` and a local development server will be started using the settings from your project's `config.js`.

You can edit a Template or Component in your code editor, save it, and the changes will instantly be reflected in the browser.

#### serve [env]

You may specify which environment config file to use by passing an `[env]` argument:

```sh
maizzle serve production
```

In this example, a local development server will be started using the settings from your project's `config.production.js`.
You can use this to start a dev server that uses settings from a different Environment config file.

### build

```sh
maizzle build [env]
```

`maizzle build` is used to compile your Templates and output them to the destination directory. If `[env]` is specified, Maizzle will try to compute an Environment config by merging `config.[env].js` on top of the default `config.js`.

| Argument | Required | Default | Description
| --- | --- | --- | --- |
| `[env]` | no |  `local` | An environment name to use

| Option | Short | Description
| --- | --- | --- |
| `--bin` | `-b` | Path to the Maizzle executable
| `--config` | `-c` | Path to a config file to use
| `--summary` | `-s` | Show a summary of the build process

<Alert>If no `[env]` is specified, Maizzle will use `config.js` from the current working directory.</Alert>

#### --bin

If needed, you may specify the path to Maizzle's executable by passing the `--bin` flag:

```sh
maizzle build --bin /path/to/@maizzle/framework/src
```

#### --config

You may specify the path to a config file by passing the `--config` flag:

```sh
maizzle build --config /path/to/custom-config.js
```

Specifying a config file path takes precedence over the `[env]` argument.

So for example the `custom-config.js` file will be used even if `production` is passed:

```sh
maizzle build production --config /path/to/custom-config.js
```

#### --summary

You may pass the `--summary` flag to show a summary of the build process.

This will output a list of all the Templates that were built, their file size, and how long it took to build each one.

```sh no-root no-copy
$ maizzle build production --summary

┌────────────────────────┬───────────┬────────────┐
│ File name              │ File size │ Build time │
├────────────────────────┼───────────┼────────────┤
│ confirmation.html      │ 5.07 KB   │ 432 ms     │
├────────────────────────┼───────────┼────────────┤
│ email-change.html      │ 5.07 KB   │ 79 ms      │
├────────────────────────┼───────────┼────────────┤
│ invitation.html        │ 5.08 KB   │ 81 ms      │
├────────────────────────┼───────────┼────────────┤
│ password-recovery.html │ 4.99 KB   │ 65 ms      │
└────────────────────────┴───────────┴────────────┘

✔ Build completed in 698 ms
```

## Scaffolding

CLI commands for creating new projects and scaffolding Templates or config files.

### make:config

```sh
maizzle make:config
```

This will start an interactive prompt that will guide you through the process of creating a new Maizzle config file.

You may skip the prompt by passing in arguments:

```sh
maizzle make:config [env] --full?
```

| Argument | Description
| --- | --- |
| `[env]` | Environment name to use for the config.

| Option | Shorthand | Description
| --- | --- | --- |
| `--full` | `-f` |  Scaffold a full config.

The `[env]` argument is an Environment name, like `preview`.

For example, let's scaffold `config.preview.js`:

```sh
maizzle make:config preview
```

By default, a minimal config will be output:

```js [config.preview.js]
/** @type {import('@maizzle/framework').Config} */
export default {
  build: {
    content: ['src/templates/**/*.html'],
    output: {
      path: 'build_preview',
    },
  },
}
```

If you want a full config, use the `--full` option:

```sh
maizzle make:config preview --full
```

### make:layout

```sh
maizzle make:layout
```

Scaffolds a new Layout.

Running it with no arguments will present an interactive prompt.

The same Layout structure from the Starter will be output.

You may skip the prompt by passing in arguments:

| Argument | Description
| --- | --- |
| `filepath` | Full path of the file to create, including file name

```sh
maizzle make:layout src/layouts/layout.html
```

<Alert type="warning">If the file already exists, an error will be thrown. The file will _not_ be overwritten.</Alert>

Paths may be relative to the project root:

```sh
maizzle make:layout ../global-emails/layouts/layout.html
```

### make:template

```sh
maizzle make:template
```

Scaffolds a new Template.

Running it with no arguments will present an interactive prompt.

A minimal Template structure will be output:

```hbs [src/templates/my-template.html]
---
preheader: "Sample preheader text"
---

<x-main>
  <!-- your HTML... -->
</x-main>
```

You may skip the prompt by passing in arguments:

| Argument | Description
| --- | --- |
| `filepath` | Full path of the file to create, including file name

```sh
maizzle make:template src/templates/my-template.html
```

<Alert type="warning">If the file already exists, an error will be thrown. The file will _not_ be overwritten.</Alert>

Paths may be relative to the project root:

```sh
maizzle make:template ../global-emails/my-template.html
```

### make:component

```sh
maizzle make:component
```

Scaffolds a new Component.

Running it with no arguments will present an interactive prompt.

You may skip the prompt by passing in arguments:

| Argument | Description
| --- | --- |
| `filepath` | Full path of the file to create, including file name

```sh
maizzle make:component src/components/my-component.html
```

A minimal Component structure will be output:

```hbs [src/components/my-component.html]
<script props>
  module.exports = {
    greeting: props.greeting || 'Hello, World!',
  }
</script>

{{ greeting }}

<yield />
```

<Alert type="warning">If the file already exists, an error will be thrown. The file will _not_ be overwritten.</Alert>

Paths may be relative to the project root:

```sh
maizzle make:component ../global-emails/components/my-component.html
```

### make:tailwind

```sh
maizzle make:tailwind [filepath]
```

Scaffolds a new Tailwind CSS config based on the one in the [Starter](https://github.com/maizzle/maizzle/blob/master/tailwind.config.js).

Running it with no arguments will present an interactive prompt.

A minimal Tailwind config will be output:

```js [tailwind.config.js]
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('tailwindcss-preset-email'),
  ],
}
```

You can skip the prompt by passing in arguments:

| Argument | Description
| --- | --- |
| `filepath` | Full path of the file to create, including file name

```sh
maizzle make:tailwind configs/tailwind.config.js
```

<Alert type="warning">If the file already exists, an error will be thrown. The file will _not_ be overwritten.</Alert>
