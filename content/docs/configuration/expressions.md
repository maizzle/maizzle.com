---
title: "Expressions configuration"
description: "Configuring expressions in Maizzle."
---

# Expressions configuration

Expressions may be configured in your project's `config.js`:

```js [config.js]
export default {
  expressions: {
    // ...
  }
}
```

## delimiters

Type: `Array`\
Default: `['{{', '}}']`

Array containing beginning and ending delimiters for expressions.

It's common for templating engines (like those used by email service providers) to use `{{` and `}}` as delimiters. You may change the ones Maizzle uses in order to avoid conflicts:

```js [config.js]
export default {
  expressions: {
    delimiters: ['[[', ']]'],
  }
}
```

## unescapeDelimiters

Type: `Array`\
Default: `['{{{', '}}}']`

Array containing beginning and ending delimiters for unescaped locals.

You'd normally use these when you want to output HTML from a variable without escaping it:

```hbs
{{ '<span>escaped</span>' }}
{{{ '<span>unescaped</span>' }}}
```

Result:

```html
&lt;span&gt;escaped&lt;/span&gt;
<span>unescaped</span>
```

## locals

Type: `Object`\
Default: `{}`

Variables defined here will be available 'locally', meaning you won't need to use the `page` object when accessing them.

For example, if you set this to something like `{foo: 'bar'}`, you can access it in your templates through `{{ foo }}` instead of `{{ page.foo }}`.

## localsAttr

Type: `String`\
Default: `locals`

Attribute name for `<script>` tags that contain locals.

Imagine you'd write `<script vars>` instead of `<script locals>` to define variables in your templates. You can change the attribute name like this:

```js [config.js]
export default {
  expressions: {
    localsAttr: 'vars',
  }
}
```

Then, you'd use it like this:

```hbs [example.html]
<script vars>
  module.exports = {
    foo: "bar"
  }
</script>

{{ foo }}
```

## removeScriptLocals

Type: `Boolean`\
Default: `false`

Whether to remove `<script>` tags that contain locals.

## conditionalTags

Type: `Array`\
Default: `['if', 'elseif', 'else']`

Array containing tag names to be used for [if/else statements](/docs/tags/#conditionals).

## switchTags

Type: `Array`\
Default: `['switch', 'case', 'default']`

Array containing tag names to be used for [switch statements](/docs/tags/#switch).

## loopTags

Type: `Array`\
Default: `['each', 'for']`

Array containing tag names to be used for [loops](/docs/tags/#loops).

## scopeTags

Type: `Array`\
Default: `['scope']`

Array containing tag names to be used for [scopes](/docs/tags/#scope).

## ignoredTag

Type: `String`\
Default: `raw`

Name of tag inside of which expression parsing is disabled.

Besides `{{ }}` expressions, the following tags will be ignored and output as-is:

- conditional tags (if/elseif/else)
- switch tags (switch/case/default)
- loop tags (each/for)
- scope tags (scope)

## strictMode

Type: `Boolean`\
Default: `false`

Maizzle disables `strictMode` so that if you have an error inside an expression, it will be rendered as `undefined` and the email will still be compiled, instead of the build failing.

## missingLocal

Type: `undefined|String`\
Default: `{local}`

Define what to render when referencing a value that is not defined in `locals`.

| missingLocal |   strictMode   | Output                              |
|:------------:|:--------------:|:------------------------------------|
| `undefined`  |     `true`     | Error is thrown                     |
| `undefined`  |    `false`     | `undefined` (string)                |
|     `''`     | `false`/`true` | `''` (empty string)                 |
|  `{local}`   | `false`/`true` | Original reference like `{{ foo }}` |

By default, Maizzle will output the string the original reference as a string, i.e. `{{ foo }}`, when a value is not defined.
