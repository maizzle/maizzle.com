---
title: "Getting Started"
description: "Installing the Maizzle Email Framework on your machine and creating a new project"
---

# Getting Started

You'll need [Node.js](https://nodejs.org/en/download/) installed first (comes with NPM included).

Use this command to check the version:

```sh
node -v
```

<Alert>Maizzle requires at least Node v14.0.0</Alert>

## Create a project

The fastest way to get started is with the [official Starter](https://github.com/maizzle/maizzle):

```sh
npx degit maizzle/maizzle my-project
```

That will clone the Starter repository into `my-project`.

Next, switch the current directory to `my-project`:

```sh
cd my-project
```

... and install dependencies:

```sh
npm install
```

## Development

Maizzle includes different commands for developing locally on your machine and for building production-ready emails.

### Local

You can start a development server that watches for file changes and automatically refreshes a preview in the browser.

Start local email development by running the `dev` npm script:

```sh
npm run dev
```

This will start the local server at _http://localhost:3000_

Try making a change to a template in your editor and save it: the browser tab will refresh to show the updated HTML.

### Production

Build production-ready emails that have inlined CSS and many other optimizations, by running the following command:

```sh
npm run build
```

This will use settings in your project's `config.production.js` to compile email templates that you can use with your <abbr title="Email Service Provider">ESP</abbr> or in your application.

<Alert>These npm scripts use the Maizzle CLI, check out the [CLI Tool docs](/docs/cli) for more details.</Alert>

## Updating

Maizzle is listed as a dependency in your project's `package.json` file:

```json [package.json]
"dependencies": {
  "@maizzle/framework": "latest",
}
```

By default, the latest version will be installed. To use a specific version, first change the value to the desired release number:

```json [package.json] diff no-copy
"dependencies": {
-  "@maizzle/framework": "latest",
+  "@maizzle/framework": "4.4.6",
}
```

Then, re-install dependencies by running `npm install` in your project's root folder.

<Alert>Latest stable Maizzle release is <LatestRelease></LatestRelease></Alert>

### Clean update

If for some reason you're not getting the correct version or are running into installation issues, delete your `node_modules` folder and your `package-lock.json` file from the root of your project and then run `npm install` again.

This will do a fresh install of all dependencies.
