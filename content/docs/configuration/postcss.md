---
title: "PostCSS configuration"
description: "Configuring PostCSS options in Maizzle"
---

# PostCSS configuration

You may add extra PostCSS plugins to your config and Maizzle will use them when it compiles Tailwind CSS.

For example, install [Autoprefixer](https://github.com/postcss/autoprefixer):

<terminal show-copy>

  ```
  npm install autoprefixer
  ```

</terminal>

You can then add it to your `config.js`:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      postcss: {
        plugins: [
          require('autoprefixer')()
        ]
      }
    }
  }
  ```

</code-sample>

Any plugins added here will be registered at the end of the stack, _after_ Tailwind CSS.
