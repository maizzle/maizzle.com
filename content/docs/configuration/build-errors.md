---
title: "Build errors configuration"
description: "Configuration options for displaying build errors in Maizzle"
---

# Build errors

Maizzle will throw an error when a build error occurs.

You may configure how build errors are handled when developing with the CLI commands, by adding a `build.fail` key to your config:

<code-sample title="config.js">

  ```js
  module.exports = {
    build : {
      fail: 'silent' // or 'verbose'
    }
  }
  ```

</code-sample>

<alert>Omitting it or using any other value will throw an error (log stack trace and exit script).</alert>

## silent

`silent` will just log the paths to the files it failed build.

## verbose

`verbose` will additionally log the error stack trace.
