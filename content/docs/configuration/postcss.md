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

Register it in `config.js`:

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

Any plugins that you register here will be added at the end of the PostCSS plugins stack, which means they'll run _after_ Tailwind CSS.
