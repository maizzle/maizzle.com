---
title: "Email Code Minification"
description: "Minify your HTML email code so that your production emails weigh even less and you avoid Gmail clipping."
---

# Minify Email Code

Use the `minify` option to trim down the HTML size of your production emails.

Minified email code weighs less in KB, resulting in faster sendouts, faster opens, and bandwidth savings on limited mobile data plans. Every little bit helps 🙂

Additionally, it reduces the risk of [Gmail clipping](https://github.com/hteumeuleu/email-bugs/issues/41).

## Usage

<code-sample title="config.js">

  ```js
  module.exports = {
    minify: true,
  }
  ```

</code-sample>

## Customization

You may configure the underlying `html-crush` library:

<code-sample title="config.js">

  ```js
  module.exports = {
    minify: {
      lineLengthLimit: 500,
    }
  }
  ```

</code-sample>

Checkout the full list of [html-crush options](https://codsen.com/os/html-crush/#optional-options-object).

<alert type="warning">Minifying email code can lead to unexpected results if not done properly. Make sure you know what you're doing, and always test your emails!</alert>

## Options

These are the options that can be passed inside `minify`:

### lineLengthLimit

Type: `number`\
Default: `500`

Maximum line length. Works only when `removeLineBreaks` is `true`.

Lines should be no longer than 998 characters, as per [RFC 2822](https://www.rfc-editor.org/rfc/rfc2822#section-2.1.1).

### removeIndentations

Type: `boolean`\
Default: `true`

By default, code indentation is removed.

### removeLineBreaks

Type: `boolean`\
Default: `true`

Should line breaks be removed? Maizzle defaults this option to `true`.

### removeHTMLComments

Type: `boolean` or `Number`\
Default: `false`

When set to a number, these are the available options:

  - `0` - don't remove any HTML comments
  - `1` - remove all comments except Outlook conditional comments
  - `2` - remove all comments, including Outlook conditional comments

### removeCSSComments

Type: `boolean`\
Default: `true`

CSS comments are removed by default, both in `<style>` tags and in `style=""` attributes.

### breakToTheLeftOf

Type: `array`\
Default: `['</td', '<html', '</html', '<head', '</head', '<meta', '<link', '<table', '<script', '</script', '<!DOCTYPE', '<style', '</style', '<title', '<body', '@media', '</body', '<!--[if', '<!--<![endif', '<![endif]']`

When any of given strings are encountered and `removeLineBreaks` is `true`, current line will be terminated.

Set to `false` or `null` or an empty array to disable.

### mindTheInlineTags

Type: `array`\
Default: `['a', 'abbr', 'acronym', 'audio', 'b', 'bdi', 'bdo', 'big', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'map', 'mark', 'meter', 'noscript', 'object', 'output', 'picture', 'progress', 'q', 'ruby', 's', 'samp', 'script', 'select', 'slot', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'tt', 'var', 'video', 'wbr']`

Some inline tags can accidentally introduce extra text. The minifier will take extra precaution when minifying around these tags.

Set to `false` or `null` or an empty array to disable.

## API

<code-sample title="app.js">

  ```js
  const {minify} = require('@maizzle/framework')
  const options = {/* html-crush options */}

  const html = await minify('html string', options)
  ```

</code-sample>
