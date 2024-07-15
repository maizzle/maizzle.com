---
title: "Markdown"
description: "Using Markdown in HTML emails."
---

# Markdown

Maizzle makes it easy to use Markdown in your email templates.

[markdown-it](https://github.com/markdown-it/markdown-it) is used and you can configure it either globally from your Environment config, or through Front Matter for each Template.

## Tags

There are two tags that you can use to add Markdown to your emails:

```xml [src/templates/example.html]
<markdown>This Markdown will be **compiled** to HTML</markdown>
<md>A _shorter_ version of the `markdown` tag.</md>
```

Result:

```xml
<p>This Markdown will be <strong>compiled</strong> to HTML</p>
<p>A <em>shorter</em> version of the <code>markdown</code> tag.</p>
```

## Attributes

Use attributes if you need the element wrapping your Markdown to be preserved:

```xml [src/templates/example.html]
<div markdown>Using a `markdown` attribute</div>
<p md>You can also use the `md` attribute.</p>
```

Result:

```xml
<div>
  <p>Using a <code>markdown</code> attribute</p>
</div>
<p>You can also use the <code>md</code> attribute.</p>
```

### Wrapping tag

Use the `tag` attribute to specify a tag name to wrap your Markdown with:

```xml [src/templates/example.html]
<md tag="section">This Markdown will be _compiled_ to HTML</md>
```

Result:

```xml
<section>
  <p>This Markdown will be <em>compiled</em> to HTML</p>
</section>
```

## Importing files

Already have some Markdown in a file? Simply include it:

```xml [src/templates/example.html]
<md src="./README.md">
  # You'll see contents of README.md above this heading
</md>
```

Result:

```xml
<!-- contents of README.md here -->
<h1>You'll see contents of README.md above this heading</h1>
```

If you're including a file that will be used as an inline element and don't want the enclosing `<p>` tags, use the `inline` attribute:

```xml [src/templates/example.html]
<p class="example">
  <markdown src="./example.md" inline>
    _Imported_
  </markdown>
</p>
```

Result:

```xml
<p class="example">
  <!-- Contents of ./example.md rendered to HTML -->
  <em>Imported</em>
</p>
```

## GFM

[GitHub Flavored Markdown](https://github.github.com/gfm/) is supported and the [Tables](https://help.github.com/articles/organizing-information-with-tables/) and [Strikethrough](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) extensions are enabled by default.

### Tables

Create tables with pipes `|` and hyphens `-`. Use hyphens to define each column's header, and pipes to separate each column.

```xml [src/templates/example.html]
<markdown>
  | Markdown      | tables are    | cool  |
  | ------------- |:-------------:| -----:|
  | col 3 is      | right-aligned | $1600 |
  | col 2 is      | centered      |   $12 |
  | zebra stripes | are neat      |    $1 |
</markdown>
```

### Strikethrough

Use two tildes `~~` to ~~`~~strikethrough~~`~~ text.

## Configuration

You may configure how Markdown is rendered through the `markdown` config object:

```js [config.js]
export default {
  markdown: {
    root: './', // A path relative to which markdown files are imported
    encoding: 'utf8', // Encoding for imported Markdown files
    markdownit: {}, // Options passed to markdown-it
    plugins: [], // Plugins for markdown-it
  }
}
```

Checkout the options for [markdown-it](https://github.com/markdown-it/markdown-it#init-with-presets-and-options) and  [posthtml-markdownit](https://github.com/posthtml/posthtml-markdownit#options).

### Front Matter

You may override the global Markdown config from your Template's Front Matter.

```hbs [src/templates/example.html]
---
markdown:
  markdownit:
    linkify: true
---

<x-main>
  <md>
    https://example.com
  </md>
</x-main>
```

That will output:

```xml
<p><a href="https://example.com">https://example.com</a></p>
```

### Disabling

Disable the markdown Transformer by setting it to `false`:

```js [config.js]
export default {
  markdown: false
}
```

## Plugins

There are over 300 plugins for `markdown-it` available on NPM! To use a plugin, `npm install` it first and then add it to `config.js`.

For example, imagine we installed [markdown-it-emoji](https://www.npmjs.com/package/markdown-it-emoji):

```js [config.js]
import mdEmoji from 'markdown-it-emoji'

export default {
  markdown: {
    plugins: [
      {
        plugin: mdEmoji,
        options: {} // Options for markdown-it-emoji
      }
    ]
  }
}
```

We can now use emojis in markdown:

```xml [src/templates/example.html]
<md>
  You can use emojis :)
</md>
```

Result:

```xml
<p>You can use emojis 😃</p>
```

## Escaping variables

If you're using expressions to render markdown from a variable that you have defined in your config like this:

```js [config.js]
export default {
  data: {
    content: '> a markdown string'
  }
}
```

... you will need to use triple curly braces to output the unescaped content:

```hbs [src/templates/example.html]
<x-main>
  {{{ page.data.content }}}
</x-main>
```

This is required for things like blockquotes to work, otherwise `>` will be output as `&gt;` and the blockquote will be rendered as a paragraph.
