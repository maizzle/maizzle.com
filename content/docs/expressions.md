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

If you want to prevent expression compilation and actually render the curly braces so you can evaluate them at a later stage, you have several options:

### Ignore inline

The [Blade](https://laravel.com/docs/blade)-inspired `@{{ }}` syntax is useful for one-offs, where you need to ignore a single expression. The compiled email will render `{{ }}` without the `@`.

```hbs [emails/example.html]
<x-main>
  @{{ page.markup }}
  <!-- Result: {{ page.markup }} -->
</x-main>
```

<Alert type="info">Undefined variables don't need to be ignored, they will just be output as you wrote them. You might want to use inline ignoring if your expression contains quotes `'`, i.e. `{{ foo: 'Bar' }}`, to prevent Maizzle from escaping them.</Alert>

### Ignore in Front Matter

You may also use `@{{ }}` to prevent expressions in Front Matter.

```hbs [emails/example.html]
---
title: "Weekly newsletter no. @{{ user: 'Arthur Morgan'  }}"
---
<x-main>
  {{ page.title }}
</x-main>
```

Result:

```hbs [build_production/example.html]
Weekly newsletter no. {{ user: 'Arthur Morgan' }}
```

Again, this is just to avoid Maizzle from evaluating the expression - you don't need the `@` if your expression doesn't contain any quotes:

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

```hbs [emails/example.html]
<x-main>
  <!-- This will be evaluated -->
  [[ page.title ]]

  <!-- But this won't be -->
  Hi, {{ user.name }}.
</x-main>
```

### Undefined variables

Any variable that is not defined will be output as-is:

```hbs [emails/example.html]
<x-main>
  {{ undefinedVariable }}
</x-main>
```

Result:

```hbs [build_production/example.html]
{{ undefinedVariable }}
```
