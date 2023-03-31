---
title: "Expressions"
description: "Learn how to create HTML emails with template inheritance in Maizzle"
---

# Expressions

Handlebars-like, curly brace expression syntax is supported, allowing you to access variables from your [Environment config](/docs/environments) or from a Template's Front Matter:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  title: Example
  ---

  <x-main>
    The title is: {{ page.title }}

    You ran the `maizzle build {{ page.env }}` command.
  </x-main>
  ```

</code-sample>

Running `maizzle build production` would render this:

```xml
The title is: Example

You ran the `maizzle build production` command.
```

You may use basic JavaScript expressions within curly braces:

<code-sample title="src/templates/example.html">

  ```xml
  <x-main>
    doctype is {{ page.doctype || 'not set' }}
    this email {{ page.env === 'production' ? "is" : "isn't" }} production ready!
  </x-main>
  ```

</code-sample>

Running `maizzle build`, we would get:

```xml
doctype is not set
this email isn't production ready!
```

## Unescaping

By default, special characters are escaped when using two curly braces:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  markup: '<strong>Bold</strong>'
  ---

  <x-main>
    {{ page.markup }}
    <!-- Result: &lt;strong&gt;Bold&lt;strong&gt; -->
  </x-main>
  ```

</code-sample>

If you need to render values exactly as they are, use triple curly braces:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  markup: '<strong>Bold</strong>'
  ---

  <x-main>
    {{{ page.markup }}}
    <!-- Result: <strong>Bold</strong> -->
  </x-main>
  ```

</code-sample>

## Ignoring

Other templating engines and many <abbr title="Email Service Provider">ESP</abbr>s also use the `{{ }}` syntax.

If you want to prevent expression compilation and actually render the curly braces so you can evaluate them at a later stage, you have several options:

### Ignore inline

The [Blade](https://laravel.com/docs/blade)-inspired `@{{ }}` syntax is useful for one-offs, where you need to ignore a single expression.
The compiled email will render `{{ }}` without the `@`.

<code-sample title="src/templates/example.html">

  ```xml
  <x-main>
    @{{ page.markup }}
    <!-- Result: {{ page.markup }} -->
  </x-main>
  ```

</code-sample>

### Ignore in Front Matter

You may also use `@{{ }}` to prevent expressions in Front Matter from being evaluated.

<code-sample title="src/templates/example.html">

  ```xml
  ---
  title: "Weekly newsletter no. @{{ edition_count }}"
  ---

  <x-main>
    {{ page.title }}
  </x-main>
  ```

</code-sample>

Result:

<code-sample title="build_production/example.html">

  ```
  Weekly newsletter no. {{ edition_count }}
  ```

</code-sample>

### Ignore with &lt;raw&gt;

This is useful if you want to ignore multiple expressions in one go:

<code-sample title="src/templates/example.html">

  ```xml
  <raw>
    <p>The quick brown {{ animals[0] }} jumps over the lazy {{ animals[1] }}.</p>
  </raw>
  ```

</code-sample>

`<raw>` will be removed in the final output, but the curly braces will be left untouched:

<code-sample title="build_production/example.html">

  ```
  <p>The quick brown {{ animals[0] }} jumps over the lazy {{ animals[1] }}.</p>
  ```

</code-sample>

### Change delimiters

You can change the delimiters to something else, like `[[ ]]`:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        delimiters: ['[[', ']]']
        unescapeDelimiters: ['[[[', ']]]']
      }
    }
  }
}
```

</code-sample>

Then you can safely use `{{ }}` and its contents will not be evaluated:

<code-sample title="src/templates/example.html">

  ```xml
  <x-main>
    <!-- This will be evaluated -->
    [[ page.title ]]

    <!-- But this won't be -->
    Hi, {{ user.name }}.
  </x-main>
  ```

</code-sample>
