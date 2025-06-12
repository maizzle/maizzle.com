---
title: "Expressions"
description: "Syntax for using basic JavaScript to manipulate data in HTML emails."
---

# Expressions

Handlebars-like, curly brace expression syntax is supported, allowing you to access variables from your [Environment config](/docs/environments) or from a Template's Front Matter:

```hbs [emails/example.html]
---
title: Example
---

<x-main>
  The title is: {{ page.title }}

  You ran the `maizzle build {{ page.env }}` command.
</x-main>
```

Running `maizzle build production` would render this HTML:

```html
The title is: Example

You ran the `maizzle build production` command.
```

You may use basic JavaScript expressions within curly braces:

```hbs [emails/example.html]
<x-main>
  doctype is {{ page.doctype || 'not set' }}
  this email {{ page.env === 'production' ? "is" : "isn't" }} production ready!
</x-main>
```

Running `maizzle build`, we would get:

```html
doctype is not set
this email isn't production ready!
```

## Unescaping

By default, special characters are escaped when using two curly braces:

```hbs [emails/example.html]
---
markup: '<strong>Bold</strong>'
---

<x-main>
  {{ page.markup }}
  <!-- Result: &lt;strong&gt;Bold&lt;strong&gt; -->
</x-main>
```

If you need to render values exactly as they are, use triple curly braces:

```hbs [emails/example.html]
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

If you want to prevent expression compilation and actually render the curly braces so you can evaluate them at a later stage, you have several options.

### Undefined variables

First, it's important to note that any undefined variable will simply be output as-is, so you don't need to do anything special if you want to ignore an expression containing a variable that doesn't exist in your Environment config or Front Matter:

```hbs [emails/example.html]
<x-main>
  {{ undefinedVariable }}
</x-main>
```

Result:

```hbs [build_production/example.html]
{{ undefinedVariable }}
```

### Ignore inline

The [Blade](https://laravel.com/docs/blade)-inspired `@{{ }}` syntax is useful for one-offs, where you need to ignore a single expression which contains variables that you also have defined in your Maizzle project. The compiled email will render `{{ }}` without the `@`.

For example, if you actually want to render `{{ page.title }}` instead of evaluating it:

```hbs [emails/example.html]
---
title: 'Weekly newsletter'
---

<x-main>
  @{{ page.title }}
  <!-- Result: {{ page.title }} -->
</x-main>
```

This can also be used to avoid encoding entities inside the expression:

```hbs [emails/example.html]
<x-main>
  {{ $foo->bar }}
  <!-- Result: {{ $foo-&gt;bar }} -->

  @{{ $foo->bar }}
  <!-- Result: {{ $foo->bar }} -->
</x-main>
```

### Ignore in Front Matter

You may also use `@{{ }}` to ignore expressions in Front Matter.

```hbs [emails/example.html]
---
title: "Weekly newsletter no. @{{ 1 + 1 }}"
---
<x-main>
  {{ page.title }}
</x-main>
```

Result:

```hbs [build_production/example.html]
Weekly newsletter no. {{ 1 + 1 }}
```

Again, this is just to avoid Maizzle from evaluating the expression - you don't need the `@` if your expression contains a variable that doesn't exist in your Environment config or Front Matter:

```hbs [emails/example.html]
---
title: "Weekly newsletter no. {{ user.name }}"
---

<x-main>
  {{ page.title }}
</x-main>
```

Result:

```hbs [build_production/example.html]
Weekly newsletter no. {{ user.name }}
```

### Ignore with &lt;raw&gt;

Use `<raw>` to ignore expressions or any PostHTML tags in a block of HTML:

```hbs [emails/example.html]
<raw>
  <p>The quick brown {{ 1 + 2 }} jumps over the lazy {{ 3 + 4 }}.</p>
  <each loop="i in [1,2]">Test</each>
</raw>
```

`<raw>` will be removed in the final output, but the curly braces will be left untouched:

```hbs [build_production/example.html]
<p>The quick brown {{ 1 + 2 }} jumps over the lazy {{ 3 + 4 }}.</p>
<each loop="i in [1,2]">Test</each>
```

<Alert type="warning">Maizzle components, like `<x-button>`, are not ignored inside `<raw>` and will be compiled as usual.</Alert>

### Change delimiters

You can change the delimiters to something else, like `[[ ]]`:

```js [config.js]
export default {
  posthtml: {
    expressions: {
      delimiters: ['[[', ']]'],
      unescapeDelimiters: ['[[[', ']]]']
    }
  }
}
```

Then you can safely use `{{ }}` and its contents will not be evaluated:

```hbs [emails/example.html]
<x-main>
  <!-- This will be evaluated -->
  [[ page.title ]]

  <!-- But this won't be -->
  Hi, {{ user.name }}.
</x-main>
```
