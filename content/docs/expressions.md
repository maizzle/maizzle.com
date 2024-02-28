---
title: "Expressions"
description: "Learn how to create HTML emails with template inheritance in Maizzle."
---

# Expressions

Handlebars-like, curly brace expression syntax is supported, allowing you to access variables from your [Environment config](/docs/environments) or from a Template's Front Matter:

```hbs [src/templates/example.html]
---
title: Example
---

<x-main>
  The title is: {{ page.title }}

  You ran the `maizzle build {{ page.env }}` command.
</x-main>
```

Running `maizzle build production` would render this HTML:

```xml
The title is: Example

You ran the `maizzle build production` command.
```

You may use basic JavaScript expressions within curly braces:

```hbs [src/templates/example.html]
<x-main>
  doctype is {{ page.doctype || 'not set' }}
  this email {{ page.env === 'production' ? "is" : "isn't" }} production ready!
</x-main>
```

Running `maizzle build`, we would get:

```
doctype is not set
this email isn't production ready!
```

## Unescaping

By default, special characters are escaped when using two curly braces:

```hbs [src/templates/example.html]
---
markup: '<strong>Bold</strong>'
---

<x-main>
  {{ page.markup }}
  <!-- Result: &lt;strong&gt;Bold&lt;strong&gt; -->
</x-main>
```

If you need to render values exactly as they are, use triple curly braces:

```hbs [src/templates/example.html]
---
markup: '<strong>Bold</strong>'
---

<x-main>
  {{{ page.markup }}}
  <!-- Result: <strong>Bold</strong> -->
</x-main>
```

## Ignoring

Other templating engines and many <abbr title="Email Service Provider">ESP</abbr>s also use the `{{ }}` syntax.

By default, Maizzle will output the original reference like `{{ unsubscribe }}` for any value is not [defined in your config](/docs/environments#config-variables).

For other cases, like `{{ 1 + 2 }}` or if had to change how [`missingLocal`](/docs/configuration/expressions#missinglocal) is handled, you have several options for preventing expression compilation:

### Ignore inline

The [Laravel Blade](https://laravel.com/docs/blade)-inspired `@{{ }}` syntax is useful for one-offs, where you need to ignore a single expression. The compiled HTML will render `{{ }}` without the `@`.

```hbs [src/templates/example.html]
<div>
  @{{ 1 + 2 }}
</div>
```

Result:

```hbs [build_production/example.html]
<div>
  {{ 1 + 2 }}
</div>
```

### Ignore in Front Matter

You may also use `@{{ }}` to prevent expressions in Front Matter from being evaluated.

```hbs [src/templates/example.html]
---
title: "Weekly newsletter no. @{{ 1 + 2 }}"
---

<x-main>
  {{ page.title }}
</x-main>
```

Result:

```hbs [build_production/example.html]
Weekly newsletter no. {{ 1 + 2 }}
```

### Ignore with `<raw>`

This is useful if you want to ignore multiple expressions in one go:

```hbs [src/templates/example.html]
<raw>
  <p>The quick brown {{ 1 + 2 }} jumps over the lazy {{ 3 + 4 }}.</p>
</raw>
```

`<raw>` will be removed in the final output, but the curly braces will be left untouched:

```hbs [build_production/example.html]
<p>The quick brown {{ 1 + 2 }} jumps over the lazy {{ 3 + 4 }}.</p>
```

### Change delimiters

You can change the delimiters to something else, like `[[ ]]`:

```js [config.js]
module.exports = {
  build: {
    posthtml: {
      expressions: {
        delimiters: ['[[', ']]'],
        unescapeDelimiters: ['[[[', ']]]']
      }
    }
  }
}
```

Then you can safely use `{{ }}` and its contents will not be evaluated:

```hbs [src/templates/example.html]
<x-main>
  <!-- This will be evaluated -->
  [[ page.title ]]

  <!-- But this won't be -->
  Hi, {{ user.name }}.
</x-main>
```
