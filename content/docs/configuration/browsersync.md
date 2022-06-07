---
title: "Browsersync configuration"
description: "Configuring Browsersync to watch files when developing locally in a Maizzle project"
---

# Browsersync configuration

When you run the `maizzle serve` command, Maizzle uses Browsersync to start a local development server and open a directory listing of your emails in your default browser.

You can then make changes to your emails, save them, and watch the browser automatically refresh the tab for you.

You can use any of the [Browsersync options](https://browsersync.io/docs/options) in your config, and Maizzle comes with a few defaults that you may customize.

### directory

Type: `boolean`
<br>
Default: `true`

When running `maizzle serve` with this setting enabled, Browsersync will open a file explorer in your default browser, showing root of the `build_local` directory.

If you set this to `false`, the page opened by Browsersync will be blank, and you'll need to manually navigate to your emails directory.

<alert>Use `directory: false` together with the `tunnel` option for a client demo, so they can't freely browse all of your emails by going to the root directory URL.</alert>

### notify

Type: `boolean`
<br>
Default: `false`

Toggle Browsersync's annoying pop-over notifications. Off by default ✌

### open

Type: `boolean`
<br>
Default: `false`

Decide which URL to open automatically when Browsersync starts.

Can be `true`, `local`, `external`, `ui`, `ui-external`, `tunnel` or `false`

See [Browsersync docs](https://browsersync.io/docs/options#option-open) for details.

### port

Type: `integer`
<br>
Default: `3000`

Set a custom server port number - by default, your local development server will be available at http://localhost:3000

### tunnel

Type: `boolean|string`
<br>
Default: `false`

When set to `true`, Maizzle will enable localhost tunneling in Browsersync, so you can live-share a URL to an email that you're working on right now, with a colleague or a client. Under the hood, [localtunnel.me](https://localtunnel.me) will be used.

Both parties see the same thing, and scrolling is synced, too.

You can also use a string instead of a boolean - for example `tunnel: 'mybrand'`. In this case, Browsersync will attempt to use a custom subdomain for the URL, i.e. `https://mybrand.localtunnel.me`.
If that subdomain is unavailable, you will be allocated a random name as usual.

### ui

Type: `object|boolean`
<br>
Default: `{port: 3001}`

Browsersync includes a user interface that is accessed via a separate port, and which allows control over all devices, push sync updates and much more.

You can disable it by setting it to `false`.

### watch

Array of additional paths for Browsersync to watch. By default, the following paths are watched for file changes:

- all files in your project's `src` folder
- `tailwind.config.js`
- `config.*.js`

You may define additional file and folder paths to watch when developing locally:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      browsersync: {
        watch: [
          './some/folder',
          'some-file.js'
        ]
      }
    }
  }
  ```

</code-sample>

When a file in any of these watch paths is updated, Browsersync will trigger a rebuild and changes will be reflected in the browser.
