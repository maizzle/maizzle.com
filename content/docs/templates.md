---
title: "Templates"
description: "Learn how to create HTML emails with template inheritance in Maizzle"
---

# Templates

**👋 New syntax**

You are viewing the documentation for Templates using the new Components syntax introduced in `v4.4.0`.
Not ready to switch yet? See the [legacy Templates docs](https://v43x.maizzle.com/docs/templates).

---

A Template in Maizzle is a special kind of Component that typically contains the body of your email: the HTML that defines the design and content.

It's made up of two distinct sections:

1. Front Matter
2. Your HTML

Unlike other Components, a Template may include a Front Matter block, which is a YAML-style block of variables that you may define at the top of the file.

Maizzle knows to parse this block's variables and makes them available to all other Components - including Layouts - so you can use them throughout your project.

## Front Matter

Templates can define new variables and even override existing ones from your config, through the optional YAML-style Front Matter block:

<code-sample title="src/templates/example.html">

```xml
---
title: "Please confirm your email address"
---
```

</code-sample>

Front Matter variables are accessible through the `page` object.

To output them in a Template, use the `{{ }}` [expression](#expressions) syntax:

<code-sample title="src/templates/example.html">

```xml
---
title: "Please confirm your email address"
---

<p>{{ page.title }}</p>
```

</code-sample>

<alert type="warning">Front Matter must be defined at the very top of a Template, starting on the first line.</alert>

## Using Layouts

Your emails will generally use the same 'boilerplate', like the `<!doctype>`, the `<head>` with all the `<meta>` tags, the `<body>` tag - stuff that rarely needs to change.

Although you're free to do it, it would be very inefficient to always have to write this boilerplate every time you create a new Template.

In Maizzle, you can define a [Layout](/docs/layouts) that has a slot:

<code-sample title="src/layouts/main.html">

  ```xml
  <!doctype html>
  <html>
  <head>
    <style>{{{ page.css }}}</style>
  </head>
  <body>
    <slot:template />
  </body>
  ```

</code-sample>

.. and then fill that slot with your Template's HTML:

<code-sample title="src/templates/example.html">

```xml
<x-main>
  <fill:template>
    <!-- your email HTML... -->
  </fill:template>
</x-main>
```

</code-sample>

In the example above, we use the `<x-main>` Component tag to say we want to use the `main.html` Layout, replacing its `<slot:template />` tag with our Template's HTML.

## Current template

Information about the Template file that is currently being processed is available under `build.current` in the config.

It's an object containing a parsed path of the destination file name:

<code-sample>

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

</code-sample>

It can be used in Events like `beforeRender` if you need the file name or extension of the Template file currently being processed.

## Archiving

Maizzle will only compile templates found in path(s) that you have defined in `build.templates.source`, which have the same extension as the one defined in `build.templates.filetypes` (`html` by default).

If your project has _a lot_ of emails, your builds may start to slow down since all templates are rebuilt every time you initially run the `build <env>` command or when developing locally and making changes to a Layout or Component.

You can archive Templates in a few ways:

1. Move them to a directory outside the one defined in `build.templates.source`, so they don't get copied over to the destination directory (recommended).
2. Change their file extension to something that is not defined in `build.templates.filetypes`. They'll just be copied over to the destination, Maizzle will not try to compile them.
3. Use the [`omit` option](/docs/configuration/templates#omit)
