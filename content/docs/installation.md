---
title: "Getting Started"
description: "Installing Maizzle on your machine and creating a new project."
---

# Getting Started

## Maizzle 5 Beta

The next version of Maizzle is here! 🥳

Try it out now by running `npx create-maizzle` and selecting the `5.0.0-beta` Starter:

```sh example no-root no-copy
$ npx create-maizzle

┌   create-maizzle
│
◇  Where should we create your project?
│  ./maizzle-5
│
◆  Select a Starter
│  ● 5.0.0-beta
│  ○ Default
│  ○ Custom
└
```

Or, if you'd like to try it out on an existing v4 project, check out the [upgrade guide](/docs/upgrade-guide) - upgrading to v5 takes less than 10 minutes for most projects.

We would greatly appreciate it if you could test it out and provide feedback through [GitHub Discussions](https://github.com/orgs/maizzle/discussions) or by [opening an issue](https://github.com/maizzle/framework/issues/new). Thanks!

---

You'll need [Node.js](https://nodejs.org/en/download/) installed first (comes with NPM included).

Use this command to check the version:

```sh
node -v
```

<Alert>Maizzle requires at least Node v18.0.0</Alert>

## Create a project

The fastest way to get started is with the [official Starter](https://github.com/maizzle/maizzle).

Run this command in your terminal to create a new Maizzle project:

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./my-project`, select the Default Starter, and choose Yes to Install dependencies.

Installing the dependencies will take a while, but usually under a minute.

Next, switch the current directory to `my-project`:

```sh
cd my-project
```

If you didn't install dependencies in the interactive setup, do so now:

```sh
npm install
```

### Manual setup

Alternatively, you may create a new project manually.

First, you'll need to download a Starter project - the following command will create a new project using the official Starter in a directory called `my-project`:

```sh
npx degit maizzle/maizzle my-project
```

Next, change the current directory to `my-project`:

```sh
cd my-project
```

Finally, install the project's dependencies:

```sh
npm install
```

## Development

Maizzle includes different commands for developing locally on your machine and for building production-ready emails.

### Local

You can start a development server that watches for file changes and automatically updates a preview in the browser.

Start local email development by running the `dev` npm script:

```sh
npm run dev
```

This will start the local server at _http://localhost:3000_

Navigate to one of the Templates there, make a change to it in your editor and save it: your changes will be injected and the page will reflect them almost instantly.

### Production

Build production-ready emails that have inlined CSS and many other optimizations, by running the following command:

```sh
npm run build
```

This will use settings in your project's `config.production.js` to compile email templates that you can use with your <abbr title="Email Service Provider">ESP</abbr> or in your application.

<Alert>These NPM scripts use the Maizzle CLI, check out the [CLI Tool docs](/docs/cli) for more details.</Alert>

## Updating

Maizzle is listed as a dependency in your project's `package.json` file:

```json [package.json]
"dependencies": {
  "@maizzle/framework": "next",
}
```

With the v5 Beta Starter, the `next` version will be installed. To use a specific version, first change the value to the desired release number:

```json [package.json] diff no-copy
"dependencies": {
-  "@maizzle/framework": "next",
+  "@maizzle/framework": "5.0.0-beta.10",
}
```

Then, re-install dependencies by running `npm install` in your project's root folder.

<Alert>Latest stable Maizzle release is <LatestRelease></LatestRelease></Alert>

### Clean update

If for some reason you're not getting the correct version or are running into installation issues, delete your `node_modules` folder and your `package-lock.json` file from the root of your project and then run `npm install` again.

This will do a fresh install of all dependencies.
