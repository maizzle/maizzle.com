---
title: "Prettify Email Code"
description: "Pretty print your HTML email template code before sending it to a colleague or a client."
---

# Prettify Code

Maizzle can pretty print your HTML email code so that it's nicely indented.

Need to send HTML to a human? Enable `prettify` in your config:

## Usage

```js [config.js]
module.exports = {
  prettify: true,
}
```

Enabling it will use this default configuration:

```js
{
  parser: 'html',
  printWidth: 500,
  htmlWhitespaceSensitivity: 'ignore',
  xmlMode: false,
}
```

## xmlMode

The prettifier will remove the closing slash from self-closing tags, like `<br />`, if your HTML has an HTML 5 `doctype` (`<!doctype html>`) and `xmlMode` is set to `false`.

If you set `build.posthtml.options.xmlMode` to `true`, `prettify` will respect it and not remove the closing slash, but only if your HTML does not have an HTML 5 `doctype`.

## Customization

You may configure [prettier options](https://prettier.io/docs/en/options).

Maybe you prefer tabs for indentation?

```js [config.js]
module.exports = {
  prettify: {
    useTabs: true,
  }
}
```

## API

```js [app.js]
const {prettify} = require('@maizzle/framework')
const options = {/* prettier options */}

const html = await prettify('html string', options)
```
