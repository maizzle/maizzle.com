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

Templates can define new variables and even override existing ones from your config, through an optional YAML-style Front Matter block:

<code-sample title="template.html">

```xml
---
title: "Please confirm your email address"
---
```

</code-sample>

Front Matter variables are accessible through the `page` object.

To output them in your Template, use the `{{ }}` [expression](#expressions) syntax:

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

Your emails will generally use the same 'boilerplate', like the `<!doctype>`, the `<head>` with all the `<meta>` tags, or the `<body>` tag.

Although you're free to do it, it would be very inefficient to always have to write this boilerplate every time you create a new Template.

In Maizzle, you can re-use a [Layout](/docs/layouts) by having a Template extend it:

<code-sample title="src/templates/example.html">

```xml
<extends src="src/layouts/main.html">
  <block name="template">
    <!-- ... -->
  </block>
</extends>
```

</code-sample>

<alert type="warning">The path provided in the `src=""` attribute must be relative to the path in [`build.layouts.root`](/docs/configuration/layouts#root) from your config. If there is no file at that path, the build will fail with a `Template render error`.</alert>

### How Extending Works

When a Template `<extends>` a Layout, Maizzle will look for matching `<block>` tags in both the Template and the Layout. The matching is done via the `name=""` attribute.

Each matching `<block>` in the Layout will be replaced with the contents of its corresponding `<block>` tag from the Template.

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
        <td>
          <p>...</p>
        </td>
      </tr>
    </table>
  </block>
</extends>
```

</code-sample>

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
