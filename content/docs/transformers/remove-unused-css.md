---
title: "Remove unused CSS"
description: "Optimize your HTML email file size by removing unused CSS and rewriting CSS selectors to be as short as possible"
---

# Remove unused CSS

Cleaning up your HTML email results in smaller file sizes, which translates to faster email sendouts, faster opens (think slow 3G), and snappier paint times.

Gmail will clip your email [around 102KB](https://github.com/hteumeuleu/email-bugs/issues/41), so anything past that mark won't even be in the DOM (which can lead to unexpected results like tracking pixel not loaded or, worse, hidden unsubscribe links). You might also want to consider the [environmental impact](https://github.com/email-markup-consortium/email-markup-consortium/discussions/39) of sending large, unoptimized emails.

This Transformer will remove any unused CSS styles and corresponding classes in your HTML, helping you reduce your file size.

## Usage

Enable it in your Environment config:

```js [config.js]
module.exports = {
  removeUnusedCSS: true,
}
```

## Customization

You may configure this Transformer through the `removeUnusedCSS` key in your `config.js`.

### whitelist

Type: Array\
Default: `[]`

Array of classes or id's that you don't want removed.

You may use any [matcher](https://www.npmjs.com/package/matcher) patterns, for example:

```js [config.js]
module.exports = {
  removeUnusedCSS: {
    whitelist: ['.External*', '.ReadMsgBody', '.yshortcuts', '.Mso*', '#*'],
  }
}
```

Resetting email client styles is often done through CSS selectors that do not exist in your email's code. Maizzle uses the `tailwindcss-email-variants` plugin to do this, so to ensure works as expected `whitelist` automatically preserves the following selectors:

```js
[
  '*body*', // Gmail
  '.gmail*', // Gmail
  '.apple*', // Apple Mail
  '.ios*', // Mail on iOS
  '.ox-*', // Open-Xchange
  '.outlook*', // Outlook.com
  '[data-ogs*', // Outlook.com
  '.bloop_container', // Airmail
  '.Singleton', // Apple Mail 10
  '.unused', // Notes 8
  '.moz-text-html', // Thunderbird
  '.mail-detail-content', // Comcast, Libero webmail
  '*edo*', // Edison (all)
  '#*', // Freenet uses #msgBody
  '.lang*' // Fenced code blocks
]
```

### backend

Type: Array\
Default: `[{heads: '{{', tails: '}}'}, {heads: '{%', tails: '%}'}]`

If you use computed class names, like for example `class="{{ computedRed }} text-sm"`, the library will normally treat `{{` and `}}` as class names and will remove them, since there will be no corresponding CSS selectors defined.

To prevent this from happening, use the `backend` option to define the delimiters:

```js [config.js]
module.exports = {
  removeUnusedCSS: {
    backend: [
      { heads: '[[', tails: ']]' },
    ]
  }
}
```

By default, Maizzle preserves `{{ }}` and `{% %}`.

### removeHTMLComments

Type: Boolean\
Default: `true`

Set to `false` to prevent `email-comb` from removing `<!-- HTML comments -->`.

```js [config.js]
module.exports = {
  removeUnusedCSS: {
    removeHTMLComments: false
  }
}
```

### removeCSSComments

Type: Boolean\
Default: `true`

Set to `false` to prevent `email-comb` from removing `/* CSS comments */`.

```js [config.js]
module.exports = {
  removeUnusedCSS: {
    removeCSSComments: false
  }
}
```

#### Preserving CSS comments when inlining

If you have [CSS inlining](/docs/transformers/inline-css) enabled, CSS comments will still be removed, even with `removeCSSComments` disabled.

You may use the `data-embed` attribute on a `<style>` tag to disable inlining for CSS inside it, if you need to preserve CSS comments.

For example, MailChimp uses CSS comments to define styles that are editable in their email editor. Here's how you can preserve them:

1. Set `removeCSSComments: false` in your config, as above
2. Write your CSS with comments in a separate `<style>` tag:

```html
<style data-embed>
  /*
    @tab Page
    @section Body Background
    @tip Set the background colour for the email body.
  */
  .wrapper {
    /*@editable*/background-color: #EEEEEE !important;
  }
</style>
```

### removeInlinedSelectors

Type: Boolean\
Default: `undefined`

By default, classes are removed from the `class` attribute of a tag, after they have been successfully inlined.

Set this option to `false` to prevent that from happening:

```js [config.production.js]
module.exports = {
  removeUnusedCSS: {
    removeInlinedSelectors: false,
  }
}
```

<Alert>This has no effect if [inlineCss](/docs/transformers/inline-css) is not enabled.</Alert>


### doNotRemoveHTMLCommentsWhoseOpeningTagContains

Type: Array\
Default: `['[if', '[endif']`

HTML email code often includes Outlook or IE conditional comments, which you probably want to preserve. If the opening tag of a conditional includes any of the strings you list here, the Transformer will not remove that comment.

```js [config.js]
module.exports = {
  removeUnusedCSS: {
    doNotRemoveHTMLCommentsWhoseOpeningTagContains: ['[if', '[endif']
  }
}
```

### uglify

Type: Boolean\
Default: `false`

Enable this to rename all classes and id's in both your `<style>` tags and your body HTML elements, to be as few characters as possible.

Used in production, it will help trim down your HTML size.

```js [config.js]
module.exports = {
  removeUnusedCSS: {
    uglify: true
  }
}
```

## API

The Transformer uses the email-comb library, see all available options [here](https://www.npmjs.com/package/email-comb).

```js [app.js]
const {removeUnusedCSS} = require('@maizzle/framework')
const config = {/* email-comb options */}

const html = await removeUnusedCSS(`<div class="unused">test</div>`, config)
```
