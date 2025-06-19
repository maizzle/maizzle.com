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

Before continuing, make sure that you have [Git](https://help.github.com/en/articles/set-up-git#setting-up-git) installed:

```sh
git --version
```

## Installation

Install the CLI tool globally, so the `maizzle` executable gets added to your `$PATH` :

```sh
npm install -g @maizzle/cli@1.5.9
```

Note that we install the last v1.x version for use with Maizzle 4.x, as CLI v2.x will not work with it.

## Creating a project

Scaffold a Maizzle project by opening a Terminal and running:

```sh
maizzle new <starter> [path] --no-deps?
```

As you can see, the arguments are similar to those of the `git clone` command.

| Argument | Required | Description
| --- | --- | --- |
| `starter` | Yes | Starter name or a Git repository URL.
| `path` | No | Directory path to create the project into.

| Flag | Shorthand | Description
| --- | --- | --- |
| `--no-deps` | `-d` | Don't install NPM dependencies.

Simply running `maizzle new` without any arguments will bring up an interactive prompt which will guide you through the setup:

<MaizzleNew></MaizzleNew>

#### Create project immediately

You may skip the prompt and scaffold a project with dependencies installed:

```sh
maizzle new https://github.com/maizzle/maizzle.git
```

#### Create project immediately (no dependencies)

If you prefer to install dependencies manually, you can do so by running:

```sh
maizzle new https://github.com/maizzle/maizzle.git --no-deps
```

#### Create project from a Starter

With `maizzle new` you may clone any repo into any system path, which means you can use any starter project - not just ours - as long as you can clone it with Git.

Use one of the [official Starters](/starters):

```sh
maizzle new amp4email
```

Create from any GitHub repo:

```sh
maizzle new user/repo
```

Create from any Git repo:

```sh
maizzle new https://example.com/some-repo.git
```

Use a custom folder name:

```sh
maizzle new maizzle/starter-litmus folder-name
```

<Alert>If the destination directory already exists, scaffolding will be aborted.</Alert>

<Alert type="warning">`[repo]` must be a valid Git repository URL (.git extension included).</Alert>

## Development

The CLI tool provides commands for developing HTML emails with Maizzle.

### serve

```sh
maizzle serve [env] --no-clear?
```

| Argument | Required | Default | Description
| --- | --- | --- | --- |
| `[env]` | no |  `local` | An [environment](/docs/environments) name to use

| Flag | Short | Description
| --- | --- | --- |
| `--no-clear` | `-nc` | Do not clear the console log

When you run this command:

1. a local development server will be started
2. `maizzle build [env]` will be called to compile your templates

`[env]` is optional, you can simply run `maizzle serve` and a local development server will be started using the settings from your project's `config.js`.

You can preview your templates by visiting _http://localhost:3000_ in a browser.

You can edit a Template in your code editor, save it, and the browser tab will automatically be refreshed. This is done with [Browsersync](/docs/configuration/browsersync), which you can fully configure.

#### serve [env]

You may specify which environment config file to use by passing an `[env]` argument:

```sh
maizzle serve production
```

In this example, a local development server will be started using the settings from your project's `config.production.js`.

Template rebuilds are fast: Maizzle will only re-compile _that_ Template, so changes are usually reflected in under a second.

When making changes to files that have a global impact however, like Layouts, Components, or your Tailwind config, Maizzle will rebuild _all_ Templates.

### build

```sh
maizzle build [env] --bin?
```

`maizzle build` is used to compile your templates and output them to the destination directory. If `[env]` is specified, Maizzle will try to compute an environment config by merging `config.[env].js` on top of the default `config.js`.

| Argument | Required | Default | Description
| --- | --- | --- | --- |
| `[env]` | no |  `local` | An environment name to use

| Flag | Short | Description
| --- | --- | --- |
| `--bin` | `-b` | Path to the Maizzle executable

<Alert>If no `[env]` is specified, Maizzle will default to `local` and use `config.js`.</Alert>

#### --bin flag

If needed, you may specify the path to Maizzle's executable by passing the `--bin` flag:

```sh
maizzle build --bin /path/to/@maizzle/framework/src
```

## Scaffolding

CLI commands for creating new projects and scaffolding templates or configs.

### make:config

```sh
maizzle make:config [env] --full?
```

Scaffolds a new `config.[env].js` in the project root.

Simply running `maizzle make:config` will bring up an interactive prompt:

<MaizzleMakeConfig></MaizzleMakeConfig>

Of course, you can skip the prompt by passing in arguments:

```sh
maizzle make:config [env] --full?
```

| Argument | Description
| --- | --- |
| `[env]` | Environment name to use for the config.

| Flag | Shorthand | Description
| --- | --- | --- |
| `--full` | `-f` |  Scaffold a full config.

The `[env]` argument is an environment name, i.e. `preview`.

For example, let's scaffold `config.preview.js`:

```sh
maizzle make:config preview
```

By default, a minimal config will be output:

```js [config.preview.js]
module.exports = {
  build: {
    templates: {
      destination: {
        path: 'build_preview'
      }
    }
  }
}
```

If you want a full config, use the `--full` option:

```sh
maizzle make:config preview --full
```

### make:template

```sh
maizzle make:template --directory?
```

Scaffolds a new Template.

Running it with no arguments will present an interactive prompt:

<MaizzleMakeTemplate></MaizzleMakeTemplate>

You may skip the prompt by passing in arguments:

| Argument | Description
| --- | --- |
| `filename` | Name of the file to create, including extension, i.e. `template.html`

| Flag | Shorthand | Description
| --- | --- | --- |
| `--directory` | `-d` |  Directory where Template file should be output.

<Alert>If the `--directory` path does not exist, it will be created.</Alert>

<Alert type="warning">If the file already exists, an error will be thrown. The file will _not_ be overwritten.</Alert>

Scaffold a Template in `src/templates`:

```sh
maizzle make:template my-template.html
```

Use a custom directory:

```sh
maizzle make:template amp-template.html --directory=src/templates/amp
```

The above is the same as:

```sh
maizzle make:template amp-template.html -d=src/templates/amp
```

Paths can be relative to project root, i.e. one level above:

```sh
maizzle make:template example.html -d=../parent-directory
```

### make:tailwind

```sh
maizzle make:tailwind --directory?
```

Scaffolds a new Tailwind CSS config based on the one in the [Starter](https://github.com/maizzle/maizzle/blob/master/tailwind.config.js).

Running it with no arguments will present an interactive prompt that lets you specify the file name and destination directory:

<MaizzleMakeTailwind></MaizzleMakeTailwind>

You can skip the prompt by passing in arguments:

| Argument | Description
| --- | --- |
| `filename` | Name of the file to create, including extension, i.e. `twcustom.js`

| Flag | Shorthand | Description
| --- | --- | --- |
| `--directory` | `-d` |  Directory where the config file should be output.

<Alert>If the `--directory` path does not exist, it will be created.</Alert>

<Alert type="warning">If the file already exists, an error will be thrown. The file will _not_ be overwritten.</Alert>


Scaffold with a custom file name:

```sh
maizzle make:tailwind twconfig.js
```

Use a custom directory (relative to project root):

```sh
maizzle make:tailwind twconfig.js --directory=config
```

The above is the same as:

```sh
maizzle make:tailwind twconfig.js -d=config
```

Place config one level above project root:

```sh
maizzle make:tailwind twconfig.js -d=../global-configs
```
