---
title: "Remove unused CSS"
description: "Optimize your HTML email file size by removing unused CSS and rewriting CSS selectors to be as short as possible"
---

# Remove unused CSS

Cleaning up your HTML email results in smaller file sizes, which translates to faster email sendouts, faster opens (think slow 3G), and snappier paint times.

Gmail will clip your email [around 102KB](https://github.com/hteumeuleu/email-bugs/issues/41), so anything past that mark won't even be in the DOM (which can lead to unexpected results like tracking pixel not loaded or, worse, hidden unsubscribe links).
You might also want to consider the [environmental impact](https://github.com/email-markup-consortium/email-markup-consortium/discussions/39) of sending large, unoptimized emails.

This Transformer will remove any unused CSS styles and corresponding classes in your HTML, helping you reduce your file size.

## Usage

Enable it in your Environment config:

<code-sample title="config.js">

  ```js
  module.exports = {
    removeUnusedCSS: true,
  }
  ```

</code-sample>

## Customization

You may configure this Transformer through the `removeUnusedCSS` key in your `config.js`.

### whitelist

Array of classes or id's that you don't want removed. You may use any [matcher](https://www.npmjs.com/package/matcher) patterns.

<code-sample title="config.js">

  ```js
  module.exports = {
    removeUnusedCSS: {
      whitelist: ['.External*', '.ReadMsgBody', '.yshortcuts', '.Mso*', '#*']
    }
  }
  ```

</code-sample>

<alert>Resetting email client styles is often done through CSS selectors that do not exist in your email's code - `whitelist` ensures these selectors are preserved.</alert>

### backend

If you use computed class names, like for example `class="{{ computedRed }} text-sm"`, the library will normally treat `{{` and `}}` as class names and will remove them.

To prevent this from happening, use the `backend` option to define the delimiters:

<code-sample title="config.js">

  ```js
  module.exports = {
    removeUnusedCSS: {
      backend: [
        { heads: '[[', tails: ']]' },
      ]
    }
  }
  ```

</code-sample>

By default, Maizzle preserves `{{ }}` and `{% %}`, so there's no need to add them.

### removeHTMLComments

Set to `false` to prevent `email-comb` from removing `<!-- HTML comments -->`.

<code-sample title="config.js">

  ```js
  module.exports = {
    removeUnusedCSS: {
      removeHTMLComments: false
    }
  }
  ```

</code-sample>

### removeCSSComments

Set to `false` to prevent `email-comb` from removing `/* CSS comments */`.

<code-sample title="config.js">

  ```js
  module.exports = {
    removeUnusedCSS: {
      removeCSSComments: false
    }
  }
  ```

</code-sample>

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

### doNotRemoveHTMLCommentsWhoseOpeningTagContains

HTML email code often includes Outlook or IE conditional comments, which you probably want to preserve. If the opening tag of a conditional includes any of the strings you list here, the Transformer will not remove that comment.

<code-sample title="config.js">

  ```js
  module.exports = {
    removeUnusedCSS: {
      doNotRemoveHTMLCommentsWhoseOpeningTagContains: ['[if', '[endif']
    }
  }
  ```

</code-sample>

### uglify

Enable this to rename all classes and id's in both your `<style>` tags and your body HTML elements, to be as few characters as possible.

Used in production, it will help trim down your HTML size.

<code-sample title="config.js">

  ```js
  module.exports = {
    removeUnusedCSS: {
      uglify: true
    }
  }
  ```

</code-sample>

## API

The Transformer uses the email-comb library, see all available options [here](https://www.npmjs.com/package/email-comb).

<code-sample title="app.js">

  ```js
  const {removeUnusedCSS} = require('@maizzle/framework')
  const config = {/* email-comb options */}

  const html = await removeUnusedCSS(`<div class="unused">test</div>`, config)
  ```

</code-sample>
