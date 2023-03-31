---
title: "How to use CSS background gradients in HTML emails"
description: "Learn how to add CSS background image gradients with Outlook VML fallback to your HTML email templates in Maizzle."
date: 2020-02-21
---

# How to use CSS background gradients in HTML emails

<p class="text-sm">Last updated: May 30, 2022</p>

Many email clients [support CSS background gradients](https://www.caniemail.com/features/css-linear-gradient/).

In this tutorial, you will learn how to use the [tailwindcss-gradients](https://www.npmjs.com/package/tailwindcss-gradients) plugin to add colorful gradients to your HTML email templates.
We will also cover how to add a <abbr title="Vector Markup Language">VML</abbr> fallback for Outlook on Windows.

## Getting started

Let's start by creating a new Maizzle project.

<terminal show-copy>

  ```
  npx degit maizzle/maizzle example-gradients
  ```

</terminal>

Install dependencies:

<terminal show-copy>

  ```
  cd example-gradients

  npm install
  ```

</terminal>

Next, install the gradients plugin:

<terminal show-copy>

  ```
  npm install tailwindcss-gradients
  ```

</terminal>

Once it finishes, open the `example-gradients` folder in your editor.

## CSS Gradients

Let's configure and use `tailwindcss-gradients` with Tailwind CSS.

### Tailwind CSS config

We need to tell Tailwind to use the plugin. Edit `tailwind.config.js` and `require()` the plugin inside the `plugins: []` array:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    plugins: [
      // ...,
      require('tailwindcss-gradients'),
    ]
  }
  ```

</code-sample>

Next, we need to define what kind of gradients we want to generate, based on which colors.
We do that in the `theme: {}` key from `tailwind.config.js`.

For example, let's register linear gradients based on the existing color palette:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    theme: {
      linearGradientColors: theme => theme('colors'),
    }
  }
  ```

</code-sample>

<alert>`tailwindcss-gradients` can generate many other types of gradients (although not all are supported in email). See all <a href="https://github.com/benface/tailwindcss-gradients">configuration options</a>.</alert>

### Use in HTML

Simply add the utility class on an element that supports `background-image` CSS.

We also specify a background color first, so that email clients that don't support CSS background-image gradients can display a fallback:

<code-sample title="src/templates/example.html">

  ```xml
  <x-main>
    <table class="w-full">
      <tr>
        <td class="bg-gray-200 bg-gradient-b-black">
          <!-- ... -->
        </td>
      </tr>
    </table>
  </x-main>
  ```

</code-sample>

## Outlook VML

Outlook for Windows doesn't support CSS gradients, but we can use <abbr title="Vector Markup Language">VML</abbr>.

You need to add it right after the element with the CSS gradient class:

<code-sample title="src/templates/example.html">

  ```xml
  <x-main>
    <table class="w-full">
      <tr>
        <td class="bg-blue-500 bg-gradient-b-black-transparent">
          <!--[if gte mso 9]>
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;">
          <v:fill type="gradient" color="#0072FF" color2="#00C6FF" angle="90" />
          <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
          <div><![endif]-->
          [your overlayed HTML here]
          <!--[if gte mso 9]></div></v:textbox></v:rect><![endif]-->
        </td>
      </tr>
    </table>
  </x-main>
  ```

</code-sample>

As you can see, you need to set a fixed width on the `<v:rect>` element - it is recommended instead of using `mso-width-percent: 1000;`, as that is pretty buggy (especially in Outlook 2013).

<alert>The width of the `<v:rect>` element needs to match the width of its parent element.</alert>

### Body gradient

We can also add a VML gradient to the body of the email.

To achieve this, we:

1. create a `<div>` that wraps our template: this will be used as the solid background color fallback
2. place the VML code immediately inside that div, basically wrapping our entire template.
    Note how we're using `mso-width-percent: 1000;` instead of a fixed width on the `<v:rect>`

Here's an example:

<code-sample title="src/templates/example.html">

  ```xml
  <x-main>
    <div class="bg-gray-200">
      <!--[if gte mso 9]>
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="mso-width-percent:1000;">
      <v:fill type="gradient" color="#edf2f7" color2="#cbd5e0" />
      <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
      <div><![endif]-->
      <table class="w-full font-sans">
        <tr>
          <td align="center" class="bg-gradient-t-gray-400">
            <!-- your content here... -->
          </td>
        </tr>
      </table>
      <!--[if gte mso 9]></div></v:textbox></v:rect><![endif]-->
    </div>
  </x-main>
  ```

</code-sample>

You can see both examples in the [project repository](https://github.com/maizzle/example-gradients).

## Avoid inlining

Most email clients that support CSS gradients also support `@media` queries.

We can register a `screen` breakpoint to prevent Juice from inlining our gradient:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    theme: {
      screens: {
        screen: {raw: 'screen'},
        // ...
      }
    }
  }
  ```

</code-sample>

We can then write the utility class like this:

<code-sample title="src/templates/example.html">

  ```xml
  <x-main>
    <table class="w-full">
      <tr>
        <td class="bg-gray-200 screen:bg-gradient-b-black">
          <!-- ... -->
        </td>
      </tr>
    </table>
  </x-main>
  ```

</code-sample>

## Resources

- [tailwindcss-gradients](https://www.npmjs.com/package/tailwindcss-gradients) plugin
- [GitHub repo](https://github.com/maizzle/starter-gradients) for this tutorial
