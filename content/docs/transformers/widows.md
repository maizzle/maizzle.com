---
title: "Prevent Widow Words"
description: "Preventing widow words in your HTML email content."
---

# Prevent Widow Words

Add a `prevent-widows` attribute on any HTML tag to prevent widow words by adding a `&nbsp;` between the last two words inside it.

```html [src/templates/example.html]
<x-main>
  <div prevent-widows>
    <p>The quick brown fox jumped over the lazy dog.</p>
  </div>
</x-main>
```

The `prevent-widows` attribute will be removed and the HTML will be transformed to:

```html
<div>
  <p>The quick brown fox jumped over the lazy&nbsp;dog.</p>
</div>
```

## Configuration

You may configure the transformer through the `widowWords` key in your `config.js`:

```js [config.js]
export default {
  widowWords: {
    attributes: ['fix-widows'],
    // ...options for string-remove-widows
  },
}
```

### attrName

Type: `String`\
Default: `['prevent-widows', 'no-widows']`

A list of attribute names that will trigger the transformer.

Only tags that have this attribute will be processed.

### minWords

Type: `Number`\
Default: `3`

The minimum amount of words in a target string, in order to trigger the transformer.

You may set it to `0` or `false` to disable it.

### createWidows

Type: `Boolean`\
Default: `false`

Set this to `true` if you want the opposite of preventing widow words: it will replace all widow word `nbsp;` locations with a single space.


### ignore

Type: `Array<Record<string, string>>`\
Default: custom array

Start/end pairs of strings that will prevent the transformer from removing widow words inside of them. Maizzle will ignore the following  common templating language start and end delimiters:

- `{{ }}` -  Handlebars, Liquid, Nunjucks, Twig, Jinja2, Mustache
- `{% %}` -  Liquid, Nunjucks, Twig, Jinja2
- `<%= %>` - EJS, ERB
- `<% %>` -  EJS, ERB
- `{$ }` - Smarty
- `<?php ?>` - PHP
- `<?= ?>` - PHP
- `#{ }` - Pug

Any new pairs that you add will be merged on top of the default ones.

```js [config.js]
export default {
  widowWords: {
    ignore: [
      {
        start: '[[',
        end: ']]'
      },
    ],
  },
}
```

## Undo Widows

You can use the transformer the other way around, too.

```js [config.js]
export default {
  widowWords: {
    createWidows: true,
    attributes: ['create-widows'],
  },
}
```

Input:

```html [src/templates/example.html]
<x-main>
  <div create-widows>
    <p>The quick brown fox jumped over the lazy&nbsp;dog.</p>
  </div>
</x-main>
```

Output:

```html [src/templates/example.html]
<div>
  <p>The quick brown fox jumped over the lazy dog.</p>
</div>
```

## API

```js [app.js]
import { preventWidows } from '@maizzle/framework'

const html = await preventWidows(
  '<p prevent-widows>the quick brown fox</p>',
  {
    minWords: 4,
  }
)
```
