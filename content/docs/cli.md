---
title: "CLI Tool"
description: "Using the Maizzle CLI tool to scaffold projects and build emails"
---

# Maizzle CLI

You can use the Maizzle CLI to:

- create new projects
- generate config files
- build your HTML emails
- scaffold templates or layouts

Before continuing, make sure that you have [Git](https://help.github.com/en/articles/set-up-git#setting-up-git) installed:

<terminal show-copy>

  ```
  git --version
  ```

</terminal>

## Installation

Install the CLI tool globally, so the `maizzle` executable gets added to your `$PATH` :

<terminal show-copy>

  ```
  npm install -g @maizzle/cli
  ```

</terminal>

## Creating a project

Scaffold a Maizzle project by opening a Terminal and running:

<terminal>

  ```
  maizzle new <starter> [path] --no-deps?
  ```

</terminal>

As you can see, the arguments are similar to those of the `git clone` command.

| Argument | Required | Description
| --- | --- | --- |
| `starter` | Yes | Starter name or a Git repository URL.
| `path` | No | Directory path to create the project into.

| Flag | Shorthand | Description
| --- | --- | --- |
| `--no-deps` | `-d` | Don't install NPM dependencies.

Simply running `maizzle new` without any arguments will bring up an interactive prompt which will guide you through the setup:

<maizzle-new></maizzle-new>

#### Create project immediately

You may skip the prompt and scaffold a project with dependencies installed:

<terminal show-copy>

  ```
  maizzle new https://github.com/maizzle/maizzle.git
  ```

</terminal>

#### Create project immediately (no dependencies)

If you prefer to install dependencies manually, you can do so by running:

<terminal show-copy>

  ```
  maizzle new https://github.com/maizzle/maizzle.git --no-deps
  ```

</terminal>

#### Create project from a Starter

With `maizzle new` you may clone any repo into any system path, which means you can use any starter project - not just ours - as long as you can clone it with Git.

Use one of the [original Starters](/starters):

<terminal show-copy>

  ```
  maizzle new amp4email
  ```

</terminal>

Create from any GitHub repo:

<terminal show-copy>

  ```
  maizzle new user/repo
  ```

</terminal>

Create from any Git repo:

<terminal show-copy>

  ```
  maizzle new https://example.com/some-repo.git
  ```

</terminal>

Use a custom folder name:

<terminal show-copy>

  ```
  maizzle new maizzle/starter-litmus folder-name
  ```

</terminal>

<alert>If the destination directory already exists, scaffolding will be aborted.</alert>

<alert type="warning">`[repo]` must be a valid Git repository URL (.git extension included).</alert>

## Development

The CLI tool provides commands for developing HTML emails with Maizzle.

### serve

<terminal>

  ```
  maizzle serve [env] --no-clear?
  ```

</terminal>

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

<terminal show-copy>

  ```
  maizzle serve production
  ```

</terminal>

In this example, a local development server will be started using the settings from your project's `config.production.js`.

Template rebuilds are fast: Maizzle will only re-compile _that_ Template, so changes are usually reflected in under a second.

When making changes to files that have a global impact however, like Layouts, Components, or your Tailwind config, Maizzle will rebuild _all_ Templates.

### build

<terminal>

  ```
  maizzle build [env] --bin?
  ```

</terminal>

`maizzle build` is used to compile your templates and output them to the destination directory. If `[env]` is specified, Maizzle will try to compute an environment config by merging `config.[env].js` on top of the default `config.js`.

| Argument | Required | Default | Description
| --- | --- | --- | --- |
| `[env]` | no |  `local` | An environment name to use

| Flag | Short | Description
| --- | --- | --- |
| `--bin` | `-b` | Path to the Maizzle executable

<alert>If no `[env]` is specified, Maizzle will default to `local` and use `config.js`.</alert>

#### --bin flag

If needed, you may specify the path to Maizzle's executable by passing the `--bin` flag:

<terminal show-copy>

  ```
  maizzle build --bin /path/to/@maizzle/framework/src
  ```

</terminal>

## Scaffolding

CLI commands for creating new projects and scaffolding templates or configs.

### make:config

<terminal>

  ```text
  maizzle make:config [env] --full?
  ```

</terminal>

Scaffolds a new `config.[env].js` in the project root.

Simply running `maizzle make:config` will bring up an interactive prompt:

<maizzle-make-config></maizzle-make-config>

Of course, you can skip the prompt by passing in arguments:

<terminal>

  ```text
  maizzle make:config [env] --full?
  ```

</terminal>

| Argument | Description
| --- | --- |
| `[env]` | Environment name to use for the config.

| Flag | Shorthand | Description
| --- | --- | --- |
| `--full` | `-f` |  Scaffold a full config.

The `[env]` argument is an environment name, i.e. `preview`.

For example, let's scaffold `config.preview.js`:

<terminal show-copy>

  ```
  maizzle make:config preview
  ```

</terminal>

By default, a minimal config will be output:

<code-sample title="config.preview.js">

  ```js
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

</code-sample>

If you want a full config, use the `--full` option:

<terminal show-copy>

  ```
  maizzle make:config preview --full
  ```

</terminal>

### make:template

<terminal show-copy>

  ```
  maizzle make:template --directory?
  ```

</terminal>

Scaffolds a new Template.

Running it with no arguments will present an interactive prompt:

<maizzle-make-template></maizzle-make-template>

You may skip the prompt by passing in arguments:

| Argument | Description
| --- | --- |
| `filename` | Name of the file to create, including extension, i.e. `template.html`

| Flag | Shorthand | Description
| --- | --- | --- |
| `--directory` | `-d` |  Directory where Template file should be output.

<alert>If the `--directory` path does not exist, it will be created.</alert>

<alert type="warning">If the file already exists, an error will be thrown. The file will _not_ be overwritten.</alert>

Scaffold a Template in `src/templates`:

<terminal show-copy>

  ```
  maizzle make:template my-template.html
  ```

</terminal>

Use a custom directory:

<terminal show-copy>

  ```
  maizzle make:template amp-template.html --directory=src/templates/amp
  ```

</terminal>

The above is the same as:

<terminal show-copy>

  ```
  maizzle make:template amp-template.html -d=src/templates/amp
  ```

</terminal>

Paths can be relative to project root, i.e. one level above:

<terminal show-copy>

  ```
  maizzle make:template example.html -d=../parent-directory
  ```

</terminal>

### make:tailwind

<terminal show-copy>

  ```
  maizzle make:tailwind --directory?
  ```

</terminal>

Scaffolds a new Tailwind CSS config based on the one in the [Starter](https://github.com/maizzle/maizzle/blob/master/tailwind.config.js).

Running it with no arguments will present an interactive prompt that lets you specify the file name and destination directory:

<maizzle-make-tailwind></maizzle-make-tailwind>

You can skip the prompt by passing in arguments:

| Argument | Description
| --- | --- |
| `filename` | Name of the file to create, including extension, i.e. `twcustom.js`

| Flag | Shorthand | Description
| --- | --- | --- |
| `--directory` | `-d` |  Directory where the config file should be output.

<alert>If the `--directory` path does not exist, it will be created.</alert>

<alert type="warning">If the file already exists, an error will be thrown. The file will _not_ be overwritten.</alert>


Scaffold with a custom file name:

<terminal show-copy>

  ```
  maizzle make:tailwind twconfig.js
  ```

</terminal>

Use a custom directory (relative to project root):

<terminal show-copy>

  ```
  maizzle make:tailwind twconfig.js --directory=config
  ```

</terminal>

The above is the same as:

<terminal show-copy>

  ```
  maizzle make:tailwind twconfig.js -d=config
  ```

</terminal>

Place config one level above project root:

<terminal show-copy>

  ```
  maizzle make:tailwind twconfig.js -d=../global-configs
  ```

</terminal>
