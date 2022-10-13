---
title: "Safe class names"
description: "Replace escaped characters in class names and CSS selectors for better email client compatibility"
---

# Safe class names

Some email clients don't support class names with escaped characters. Gmail in particular will discard the entire rule of such a class, so you can't safely use CSS class names like `w-1/2` or `sm:block`.

Maizzle normalizes escaped character class names like `\:` or `\/` by replacing them with email-safe alternatives, so you can keep using those fancy Tailwind CSS class names and not have to worry about it.

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

<code-sample title="config.js">

  ```js
  module.exports = {
    safeClassNames: {
      ':': '__',
      '!': 'i-',
    }
  }
  ```

</code-sample>

That would turn `sm:w-full` into `sm__w-full` and `sm:!text-xl` into `sm__i-text-xl`.

## Disabling

You can prevent Maizzle from rewriting your class names with safe characters, by setting this option to `false`:

<code-sample title="config.js">

  ```js
  module.exports = {
    safeClassNames: false,
  }
  ```

</code-sample>

## API

You may use the `safeClassNames` Transformer in your application.

<code-sample title="app.js">

  ```js
  const {safeClassNames} = require('@maizzle/framework')

  const html = await safeClassNames(
    '<div class="sm:text-left w-1.5">foo</div>', // html string
    {'.': 'dot'} // replacements object
  )
  ```

</code-sample>

Result:

```xml
<div class="sm-text-left w-1dot5">foo</div>
```
