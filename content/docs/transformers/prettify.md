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
  rewriteSelfClosing: true,
  selfClosingTags: [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ]
}
```

## parser

Type: String\
Default: `html`

You may use any of `prettier`'s [supported parsers](https://prettier.io/docs/en/options.html#parser), though we recommend sticking with `html`.

## printWidth

Type: Number\
Default: `500`

The prettifier will wrap lines at `500` characters by default. It is recommended to keep this value under `998`, as per the [RFC 5322](https://datatracker.ietf.org/doc/html/rfc5322#section-2.1.1) standard.

Note that values under `500` can potentially break attributes on to new lines.

## htmlWhitespaceSensitivity

Type: String\
Default: `ignore`

The prettifier will consider all whitespace insignificant.

Possible values are:

- `css` - respect the default value of CSS display property
- `strict` - all whitespace is considered significant
- `ignore` - all whitespace is considered insignificant (default)

## xmlMode

Type: Boolean\
Default: `false`

The prettifier will remove the closing slash from self-closing tags, like `<br />`, if your HTML has an HTML 5 `doctype` (`<!doctype html>`) and `xmlMode` is set to `false`.

If you set `build.posthtml.options.xmlMode` to `true`, `prettify` will respect it and not remove the closing slash, but only if your HTML does not have an HTML 5 `doctype`.

## rewriteSelfClosing

Type: Boolean\
Default: `true`

Whether to rewrite self-closing tags and have their closing slash removed.

Although this is `true` by default, it will only work if your HTML has an HTML 5 `doctype` (`<!doctype html>`) and as long as `xmlMode` is set to `false`.

## selfClosingTags

Type: Array\
Default: `['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']`

A list of self-closing tags that will have their closing slash removed when `rewriteSelfClosing` is `true`.

Any tags that you specify here will be merged with the default list.

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
