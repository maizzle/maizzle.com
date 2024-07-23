---
title: "Templates"
description: "Learn how to create HTML emails with template inheritance in Maizzle."
---

# Templates

A Template in Maizzle is a file that typically contains the body of your email: the HTML markup that defines the design and content.

It's made up of two distinct sections:

1. Front Matter
2. Your HTML

Templates may include a Front Matter block, which is a YAML-style block of variables that you may define at the top of the file.

Maizzle knows to parse this block's variables and makes them available to all other Components that you add to this Template, as well as to the Layout it uses.

## Front Matter

Templates can define new variables and even override existing ones from your config, through the optional YAML-style Front Matter block:

```hbs [src/templates/example.html]
---
title: "Please confirm your email address"
---
```

Front Matter variables are accessible through the `page` object.

To output them in a Template, use the `{{ }}` [expression syntax](/docs/expressions):

```hbs [src/templates/example.html]
---
title: "Please confirm your email address"
---

<p>{{ page.title }}</p>
```

<Alert type="warning">Front Matter must be defined at the very top of a Template, starting on the first line.</Alert>

### Expressions

Expressions in Front Matter can be ignored with a `@` symbol when they're used in the Template they're defined in:

```hbs [src/templates/example.html]
---
greeting: "Hello @{{ user.name }}, please confirm your email address"
---

<h1>{{ page.greeting }}</h1>
```

That will render as:

```hbs [build_production/example.html]
<h1>Hello {{ user.name }}, please confirm your email address</h1>
```

Also, if the variable being referenced in an expression is not defined, Maizzle will ignore it and output it as-is.

## Using Layouts

Your emails will likely share the same boilerplate, like the `<!doctype>`, the `<head>` with all the `<meta>` tags, or the `<body>` tag - code that rarely needs to change.

Although you're free to do it, it would be very inefficient to always have to write this boilerplate every time you create a new Template.

To reuse this code in Maizzle, you may create a [Layout](/docs/layouts):

```hbs [src/layouts/main.html]
<!doctype html>
<html>
<head>
  <style>
    @tailwind components;
    @tailwind utilities;
  </style>
</head>
<body>
  <yield />
</body>
```

When creating a Template, you can wrap it with this Layout:

```xml [src/templates/example.html]
<x-main>
  <!-- your email HTML... -->
</x-main>
```

In the example above, we use the `<x-main>` Component tag to say that we want to use the `main.html` Layout. At build time, the `<yield />` tag in the Layout file is replaced with what's inside the `<x-main>` tag in our Template.

Learn more about how these x-tags work, in the [Components docs](/docs/components#x-tag).

## Current template

Information about the Template file that is currently being processed will be available under `page.build.current`:

```js
build: {
  current: {
    path: {
      root: 'src',
      dir: 'src/templates',
      base: 'transactional.html',
      ext: '.html',
      name: 'transactional'
    },
  }
}
```

It can be used in Events like `beforeRender` if you need the file name or extension of the Template file currently being processed.

<Alert>Current template file information is not available when using the [API](/docs/api).</Alert>

## Archiving

Maizzle will only compile Templates found at paths defined in `build.content`.

If your project has _a lot_ of emails, your builds may start to slow down since all Templates are rebuilt on cold start (every time you run the `maizzle build <env>` command).

You can archive Templates in a few ways.

1. Move them to a directory outside the ones defined in `build.content`
2. Change their file extension so that it's not covered by paths from `build.content`
3. Use negated glob patterns in `build.content` to exclude them.
    <br><br>
    For example, if you have a `src/templates/archive` directory, you can exclude it from builds like this:
    <br><br>
    ```js [config.js]
    export default {
      build: {
        content: [
          'src/templates/**/*.html',
          '!src/templates/archive/**/*'
        ]
      }
    }
    ```
