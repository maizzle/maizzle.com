---
title: "PostCSS configuration"
description: "Configuring PostCSS options in Maizzle."
---

# PostCSS configuration

You may add extra PostCSS plugins to your config and Maizzle will use them when it compiles Tailwind CSS.

## Usage

For example, here's how you'd use [Autoprefixer](https://github.com/postcss/autoprefixer).

First, install the plugin:

```sh
npm install autoprefixer
```

Then register it in `config.js`:

```js [config.js] {3-7}
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

Any plugins that you register in the `plugins` array will be added at the end of the PostCSS plugins stack, which means they'll run _after_ Tailwind CSS.
