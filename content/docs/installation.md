---
title: "Getting Started"
description: "Installing the Maizzle Email Framework on your machine and creating a new project"
---

# Getting Started

You'll need [Node.js](https://nodejs.org/en/download/) installed first (comes with NPM included).

Use this command to check the version:

<terminal show-copy>

  ```
  node -v
  ```

</terminal>

<alert>Maizzle requires at least Node v14.0.0</alert>

## Create a project

The fastest way to get started is with the [official Starter](https://github.com/maizzle/maizzle):

<terminal show-copy>

  ```
  npx degit maizzle/maizzle my-project
  ```

</terminal>

That will clone the Starter repository into `my-project`.

Next, switch the current directory to `my-project` and install dependencies:

<terminal>

  ```
  cd my-project

  npm install
  ```

</terminal>

## Development

Maizzle includes different commands for developing locally on your machine and for building production-ready emails.

### Local

You can start a development server that watches for file changes and automatically refreshes a preview in the browser.

Start local email development by running the `dev` npm script:

<terminal show-copy>

  ```
  npm run dev
  ```

</terminal>

This will start the local server at _http://localhost:3000_

Try making a change to a template in your editor and save it: the browser tab will refresh to show the updated HTML.

### Production

Build production-ready emails that have inlined CSS and many other optimizations, by running the following command:

<terminal show-copy>

  ```
  npm run build
  ```

</terminal>

This will use settings in your project's `config.production.js` to compile email templates that you can use with your <abbr title="Email Service Provider">ESP</abbr> or in your application.

<alert>These npm scripts use the Maizzle CLI, check out the [CLI Tool docs](/docs/cli) for more details.</alert>

## Updating

Maizzle is listed as a dependency in your project's `package.json` file:

<code-sample title="package.json">

  ```json
  "dependencies": {
    "@maizzle/framework": "latest"
  }
  ```

</code-sample>

By default, the latest version will be installed. To use a specific release version, first change the value to the desired version:

<code-sample title="package.json">

  ```json
  "dependencies": {
    "@maizzle/framework": "v4.0.0"
  }
  ```

</code-sample>

Then, re-install dependencies by running `npm install` in your project's root folder.

<alert>Latest Maizzle release number is <latest-release as-link="true" /></alert>

### Clean update

If for some reason you're not getting the correct version or are running into installation issues, delete your `node_modules` folder and your `package-lock.json` file from the root of your project and then run `npm install` again.

This will do a fresh install of all dependencies.
