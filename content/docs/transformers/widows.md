---
title: "Prevent Widow Words"
description: "Prevent widow words in your HTML email content."
---

# Prevent Widow Words

Add a `prevent-widows` attribute on any HTML tag to prevent widow words by adding a `&nbsp;` between the last two words inside it.

```xml [src/templates/example.html]
<x-main>
  <div prevent-widows>
    <p>The quick brown fox jumped over the lazy dog.</p>
  </div>
</x-main>
```

The `prevent-widows` attribute will be removed and the HTML will be transformed to:

```xml
<div>
  <p>The quick brown fox jumped over the lazy&nbsp;dog.</p>
</div>
```

## Configuration

You may configure the transformer through the `widowWords` key in your `config.js`:

```js [config.js]
module.exports = {
  widowWords: {
    attrName: 'prevent-widows',
    // ...options for string-remove-widows
  },
}
```

### attrName

Type: String\
Default: `'prevent-widows'`

The attribute name to use.

Only tags that have this attribute will be processed by the transformer.

### removeWidowPreventionMeasures

Type: Boolean\
Default: `false`

Set this to `true` if you want the opposite of preventing widow words: it will replace all widow word `nbsp;` locations with a single space.

### convertEntities

Type: Boolean\
Default: `true`

Convert the space entity to the `targetLanguage`.

Set it to `false` to insert a raw non-breaking space.

### targetLanguage

Type: String\
Default: `'html'`

Language to encode non-breaking spaces in.

Available options:

- `'css'` - spaces will be encoded to `\00A0`
- `'js'` - spaces will be encoded to `\u00A0`

### hyphens

Type: Boolean\
Default: `true`

Whitespace in front of:

- dashes (`-`)
- n-dashes (`–`)
- or m-dashes (`—`)

...will be replaced with a `&nbsp;`.

### minWordCount

Type: Number\
Default: `3`

The minimum amount of words in a target string, in order to trigger the transformer.

You may set it to `0` or `false` to disable it.

### minCharCount

Type: Number\
Default: `20`

The minimum amount non-whitespace characters in a target string, in order to trigger the transformer.

You may set it to `0` or `false` to disable it.

### ignore

Type: Array|String\
Default: custom array

Start/end pairs of strings that will prevent the transformer from removing widow words inside them.

Maizzle defines common templating language start and end tags here, and also includes support for MSO comments.

Any new pairs that you add will be merged on top of the default ones.

```js [config.js]
module.exports = {
  widowWords: {
    ignore: [
      {
        heads: '{{',
        tails: '}}'
      },
    ],
  },
}
```

## Undo Widows

You can use the transformer the other way around, too.

```js [config.js]
module.exports = {
  widowWords: {
    attrName: 'create-widows',
    removeWidowPreventionMeasures: true,
  },
}
```

Input:

```xml [src/templates/example.html]
<x-main>
  <div create-widows>
    <p>The quick brown fox jumped over the lazy&nbsp;dog.</p>
  </div>
</x-main>
```

Output:

```xml [src/templates/example.html]
<div>
  <p>The quick brown fox jumped over the lazy dog.</p>
</div>
```

## API

```js [app.js]
const {preventWidows} = require('@maizzle/framework')

const html = await preventWidows('html string', options)
```
