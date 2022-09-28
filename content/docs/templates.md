---
title: "Templates"
description: "Learn how to create HTML emails with template inheritance in Maizzle"
---

# Templates

Templates in Maizzle typically contain the body of your email templates.

They're made up of two distinct sections:

1. Front Matter
2. Your HTML

## Front Matter

Templates can define new variables and even override existing ones in your config through an optional YAML-style Front Matter block:

<code-sample title="template.html">

```xml
---
title: "Please confirm your email address"
---
```

</code-sample>

Any Front Matter variables that you define in a Template are available under the `page` object, which means you can render them like this:

<code-sample title="template.html">

```xml
---
title: "Please confirm your email address"
---

<p>{{ page.title }}</p>
```

</code-sample>

<alert type="warning">Front Matter must be defined at the very top of your Template, starting on the first line.</alert>

## Extending Layouts

A Template can extend a Layout using the `<extends>` tag:

<code-sample title="template.html">

```xml
---
preheader: The Weekly Newsletter
---

<extends src="src/layouts/main.html">
  <!-- Add <block> tags here -->
</extends>
```

</code-sample>

The path provided in the `src=""` attribute must be relative to the path in `build.layouts.root` from your config.

<alert type="warning">If there is no file at that path, the build will fail with a `Template render error`</alert>

### How Extending Works

When a Template `<extends>` a Layout, a `<block>` tag with an identical `name=""` attribute is searched for in the Layout that is being extended.

Each matching tag will be replaced with the contents of its corresponding `<block>` tag from the Template.

### Extending Templates

A Template can also extend another Template.

For example, imagine `src/templates/first.html` :

<code-sample title="first.html">

```xml
<extends src="src/layouts/main.html">
  <block name="template">
    Parent
    <block name="button">Child in first.html</block>
  </block>
</extends>
```

</code-sample>

We could then extend it in `src/templates/second.html` :

<code-sample title="second.html">

```xml
<extends src="src/templates/first.html">
  <block name="button">Child in second.html</block>
</extends>
```

</code-sample>

After compilation, the body of `second.html` would be:

<code-sample title="second.html" no-copy>

```xml
Parent
Child in second.html
```

</code-sample>

Of course, if we use a `template` block in `second.html`, then we overwrite everything in `first.html`:

<code-sample title="second.html">

```xml
<extends src="src/templates/first.html">
  <block name="template">
    Second
    <block name="button">Child in second.html</block>
  </block>
</extends>
```

</code-sample>

Result:

<code-sample title="second.html" no-copy>

```xml
Second
Child in second.html
```

</code-sample>

### Multiple Extends

Multiple `<extends>` tags in a Template are not supported.

Only blocks from the last `<extends>` tag will be parsed.

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/header.html">
    <block name="template">
      stuff to put in header.html
    </block>
  </extends>

  <extends src="src/layouts/footer.html">
    <block name="template">
      stuff to put in footer.html
    </block>
  </extends>
  ```

</code-sample>

Result:

<code-sample title="build_production/example.html">

  ```xml
  <block name="template">
    stuff to put in header.html
  </block>

  stuff to put in footer.html
  ```

</code-sample>

## Blocks

For a Layout to render a Template's body, that body must be wrapped in a `<block>` that has the same `name=""` attribute in both the Template and the Layout.

In the Starter, we named it `template`:

<code-sample title="src/templates/promotional.html">

```xml
<block name="template">
  <!-- email body -->
</block>
```

</code-sample>

Everything inside that `<block>` will be output into the Layout that the Template extends, wherever a `<block name="template"></block>` is found.

### Multiple Blocks

Your Templates can use as many blocks as you need.

For example, the [Starter](https://github.com/maizzle/maizzle) uses a `head` block in its main Layout, allowing you to inject additional code into the `<head>` of you HTML email, right from the Template.

## Basic Example

Here's a very basic Template example:

<code-sample title="example.html">

```xml
<extends src="src/layouts/main.html">
  <block name="template">
    <table>
      <tr>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
      </tr>
    </table>
  </block>
</extends>
```

</code-sample>

## Expressions

Handlebars-like curly brace expression syntax is supported, allowing you to access variables from your [Environment config](/docs/environments) or from the Template's Front Matter:

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="template">
      You ran the `maizzle build {{ page.env }}` command
    </block>
  </extends>
  ```

</code-sample>

Running `maizzle build production` would render this:

```xml
You ran the `maizzle build production` command
```

You may use basic JavaScript expressions within curly braces:

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="template">
      doctype is {{ page.doctype || 'not set' }}
      this email {{ page.env === 'production' ? "is" : "isn't" }} production ready!
    </block>
  </extends>
  ```

</code-sample>

### Unescaping variables

Special characters are escaped when using two curly braces:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  markup: '<strong>Bold</strong>'
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      {{ page.markup }}
      <!-- &lt;strong&gt;Bold&lt;strong&gt; -->
    </block>
  </extends>
  ```

</code-sample>

If you need to render values exactly as they are, use triple curly braces:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  markup: '<strong>Bold</strong>'
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      {{{ page.markup }}}
      <!-- <strong>Bold</strong> -->
    </block>
  </extends>
  ```

</code-sample>

### Ignoring expressions

Other templating engines, as well as many <abbr title="Email Service Provider">ESP</abbr>s  also use the `{{ }}` syntax.

If you want to prevent expression compilation and render the curly braces so you can evaluate them at a later stage, you have two options:

#### Ignore expressions inline

The [Blade](https://laravel.com/docs/blade)-inspired `@{{ }}` syntax is useful for one-offs, where you need to ignore a single expression.
The compiled email will render `{{ }}` without the `@`.

<code-sample title="src/templates/example.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="template">
      @{{ page.markup }}
      <!-- {{ page.markup }} -->
    </block>
  </extends>
  ```

</code-sample>

#### Ignore expressions using the &lt;raw&gt; tag

This is useful if you have a block with multiple lines containing `{{ }}` and want to ignore them all in one go:

<code-sample title="src/templates/example.html">

  ```xml
  <raw>
    Nostrud laboris sunt Lorem {{ var1 }} cupidatat fugiat tempor ad tempor anim.
    Veniam non sit {{ var2 }} ipsum ad qui.
  </raw>
  ```

</code-sample>

The `<raw>` tag will be removed in the final output, but the curly braces will be left untouched.

#### Ignoring expressions inside Front Matter

You may use `@{{ }}` to prevent expressions in Front Matter from being evaluated.

<code-sample title="src/templates/example.html">

  ```xml
  ---
  title: "Weekly newsletter no. @{{ edition_count }}"
  ---

  <extends src="src/layouts/main.html">
    <block name="template">
      {{ page.title }}
    </block>
  </extends>
  ```

</code-sample>

Result:

<code-sample title="build_production/example.html">

  ```
  Weekly newsletter no. {{ edition_count }}
  ```

</code-sample>

## Expressions Options

Expressions may be configured in your project's `config.js`:

<code-sample title="config.js">

```js
module.exports = {
  build: {
    posthtml: {
      expressions: {
        // posthtml-expressions options
      }
    }
  }
}
```

</code-sample>

See all available [expressions options](https://github.com/posthtml/posthtml-expressions#options).

## Current template

Information about the Template file that is currently being processed is available under `build.current` in the config.

It's an object containing a parsed path of the destination file name, for example:

```js
build: {
  current: {
    path: {
      root: '',
      dir: 'build_production',
      base: 'transactional.html',
      ext: '.html',
      name: 'transactional'
    }
  }
}
```

Can be used in Events like `beforeRender` if you need the current file name or extension.

## Archiving

Maizzle will only compile templates found in path(s) that you have defined in `build.templates.source`, which have the same extension as the one defined in `build.templates.filetypes` (`html` by default).

If you create a lot of emails, your builds may start to slow down, since all templates are rebuilt every time you initially run the `build <env>` command or when developing locally and making changes to a Layout or Component.

You can archive Templates in two ways:

1. Move them to a directory outside the one defined in `build.templates.source`, so they don't get copied over to the destination directory (recommended).
2. Change their file extension to something that is not defined in `build.templates.filetypes`. They'll just be copied over to the destination, Maizzle will not try to compile them.
