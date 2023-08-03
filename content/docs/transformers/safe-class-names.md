---
title: "Safe class names"
description: "Replace escaped characters in class names and CSS selectors for better email client compatibility."
---

# Safe class names

Some email clients don't support class names with escaped characters. Gmail in particular will discard the entire rule of such a class, so you can't safely use CSS class names like `w-1/2` or `sm:block`.

Maizzle normalizes escaped character class names like `\:` or `\/` by replacing them with email-safe alternatives, so you can keep using those fancy Tailwind CSS class names and not have to worry about it.

By default, it runs only when not developing locally. This means that it's disabled when you run `maizzle serve`, but it's enabled when running `maizzle build production`.

## Replacements

This is the default replacement strategy:

| Character | Replacement |
|-----------|-------------|
| :         | -           |
| /         | -           |
| %         | pc          |
| .         | _           |
| ,         | _           |
| #         | _           |
| [         | (removed)   |
| ]         | (removed)   |
| (         | (removed)   |
| )         | (removed)   |
| {         | {           |
| }         | }           |
| !         | important-  |
| &         | and-        |
| <         | lt-         |
| =         | eq-         |
| >         | gt-         |
| \|        | or-         |
| @         | at-         |
| ?         | q-          |
| \         | -           |
| "         | -           |
| $         | -           |
| '         | -           |
| *         | -           |
| +         | -           |
| ;         | -           |
| ^         | -           |
| `         | -           |
| ~         | -           |

## Customization

You may define new replacement mappings (or overwrite existing ones) by adding a `safeClassNames` key to your config.

For example:

```js [config.js]
module.exports = {
  safeClassNames: {
    ':': '__',
    '!': 'i-',
  }
}
```

That would turn `sm:w-full` into `sm__w-full` and `sm:!text-xl` into `sm__i-text-xl`.

## Disabling

You can prevent Maizzle from rewriting your class names with safe characters, by setting this option to `false`:

```js [config.js]
module.exports = {
  safeClassNames: false,
}
```

## API

You may use the `safeClassNames` Transformer in your application.

```js [app.js]
const {safeClassNames} = require('@maizzle/framework')

const html = await safeClassNames(
  '<div class="sm:text-left w-1.5">foo</div>', // html string
  {'.': 'dot'} // replacements object
)
```

Result:

```xml
<div class="sm-text-left w-1dot5">foo</div>
```
