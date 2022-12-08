---
title: "Components"
description: "Import components into your HTML email templates and render them with custom slot content and data"
---

# Components

Components help you organize blocks of markup that you use often by extracting them to a file, so you can reuse them in multiple templates.

<alert class="lg:hidden">We're testing a new components system for v4.4.0 - [give it a try](https://github.com/maizzle/framework/releases/tag/v4.4.0-beta.1)!</alert>

## Usage

To create a Component, simply create an HTML file with a `<content>` tag:

<code-sample title="src/components/example.html">

  ```xml
  <content></content>
  ```

</code-sample>

The `<content>` tag will be replaced with the content passed to the Component.

<alert type="info">You can safely omit the `<content>` tag if you want to use Components as includes, and don't actually need to pass any content to them.</alert>

You may use the `<component>` tag to insert a Component in a Template:

<code-sample title="src/templates/example.html">

  ```xml
  <component src="src/components/example.html">
    This text will replace the `<content>` tag in the Component.
  </component>
  ```

</code-sample>

## Example

Let's create a basic alert Component.

<code-sample title="src/components/alert.html">

  ```xml
  <table class="w-full">
    <tr>
      <td class="px-4 py-2">
        <content></content>
      </td>
    </tr>
  </table>
  ```

</code-sample>

We could use it like this:

<code-sample title="src/templates/example.html">

  ```xml
  <component
    src="src/components/alert.html"
    class="bg-red-100 text-red-700 rounded"
    role="alert"
  >
    This is an alert!
  </component>
  ```

</code-sample>

Result:

<code-sample title="src/templates/example.html">

  ```xml
  <table class="w-full bg-red-100 text-red-700 rounded" role="alert">
    <tr>
      <td class="px-4 py-2">
        This is an alert!
      </td>
    </tr>
  </table>
  ```

</code-sample>

As you can see, the Component's attributes are passed to the root tag (in our case the `<table>` tag), and the `<content>` tag is replaced with our content.

## Variables

When creating a Component, you have access to global variables:

<code-sample title="src/components/example.html">

  ```xml
  <div>
    Building for: {{ page.env }}
  </div>
  ```

</code-sample>

You can also manually provide data to the Component through attributes:

<code-sample title="src/templates/example.html">

  ```xml
  <component
    src="src/components/example.html"
    env="{{ page.env }}"
    role="user"
  >
    Building for: {{ env }}
    Role is: {{ role }}
  </component>
  ```

</code-sample>

### Undefined variables

Sometimes you may need to use a Component without passing it the variables it uses. However, if you try to use an undefined variable in a Component, the build will fail.

For example, if you have this Component:

<code-sample title="src/components/example.html">

  ```xml
  <div>
    Category: {{ category }}
  </div>
  ```

</code-sample>

... and try to use it like this:

<code-sample title="src/templates/example.html">

  ```xml
  <component
    src="src/components/example.html"
  ></component>
  ```

</code-sample>

... the build will fail.

To work around it, you can do a type check when using the variable:

<code-sample title="src/components/example.html">

  ```xml
  <div>
    Category: {{ typeof category !== 'undefined' ? category : 'Uncategorized' }}
  </div>
  ```

</code-sample>

If you're using an `<if>` tag, you may check the type like this:

<code-sample title="src/components/example.html">

```xml
<if condition="typeof category !== 'undefined'">
  <div>
    Category: {{ category }}
  </div>
</if>
```

</code-sample>

## Ignoring expressions

Ignoring expressions inside a Component works as you'd expect:

<code-sample title="src/components/example.html">

  ```xml
  Hello @{{ name | fallback: 'friend' }}!

  <content></content>
  ```

</code-sample>

Of course, you can ignore expressions when passing data or content to the Component:

<code-sample title="src/templates/example.html">

  ```xml
  <component
    src="src/components/example.html"
    role="@{{ user.role }}"
  >
    Hello @{{ name | fallback: 'friend' }}!
  </component>
  ```

</code-sample>

#### Ignoring raw blocks

Ignoring expressions inside `<raw>` blocks that you pass inside a Component currently doesn't work, you'd still need to use the `@{{ }}` syntax.

This will be fixed with the new Components system in v4.4.0.
