---
title: "Using custom web fonts in Maizzle email templates"
description: "Learn how to include custom web fonts in your email templates and use them efficiently through Tailwind CSS utilities."
date: 2020-01-31
---

# Using custom web fonts in Maizzle email templates

<p class="text-sm">Last updated: May 30, 2022</p>

It's super easy to [use Google Fonts in your Maizzle email templates](/docs/examples/google-fonts), but what if you need to use a custom web font?

Maybe your brand uses a custom font that isn't available through Google Fonts, or maybe you're just developing Shopify notification email templates (where the usual `@import` and `<link>` techniques aren't supported).

In this tutorial, you'll learn how to add your own custom fonts to emails in Maizzle.

## Initial setup

First, let's scaffold a new project:

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./example-font-face`, and select the Default Starter.

Choose Yes when prompted to Install dependencies.

Once it finishes installing dependencies, open the project folder in your favorite editor.

## Register @font-face

Imagine we have a display font called Barosan, which we're hosting on our website.

We'll use `@font-face` to register our custom font family - we can do this in the Template or in the Layout that we extend.

### Add in Template

Open `emails/transactional.html` and add this before the `<x-main>` tag:

```html [emails/transactional.html]
<push name="head">
  <style>
    @font-face {
      font-family: 'Barosan';
      font-style: normal;
      font-weight: 400;
      src: local('Barosan Regular'), local('Barosan-Regular'), url(https://example.com/fonts/barosan.woff2) format('woff2');
    }
  </style>
</push>
```

This adds a separate `<style>` tag in the compiled email HTML, right after the main one.

### Add in Layout

If you prefer a single `<style>` tag in your email template, you can register the font in the Layout instead. Open `layouts/main.html` and update the `<style>` tag:

```css [layouts/main.html] no-copy {2-7}
   <style>
     @font-face { /* [!code ++] */
       font-family: 'Barosan'; /* [!code ++] */
       font-style: normal; /* [!code ++] */
       font-weight: 400; /* [!code ++] */
       src: local('Barosan Regular'), local('Barosan-Regular'), url(https://example.com/fonts/barosan.woff2) format('woff2'); /* [!code ++] */
     } /* [!code ++] */

     @tailwind components;
     @tailwind utilities;
   </style>
```

<Alert>
You can use the same technique to load font files from Google Fonts - it's currently the only way to get them working in Shopify notifications. To find out the URL of a Google Font (and actually, its entire `@font-face` CSS) simply access the URL they give you, in a new browser tab.
</Alert>

## Tailwind CSS utility

Now that we're importing the font, we should register a Tailwind CSS utility for it.

Open `tailwind.config.js`, scroll down to `fontFamily`, and add a new font:

```js [tailwind.config.js] {5}
export default {
  theme: {
    extend: {
      fontFamily: {
        barosan: ['Barosan', '-apple-system', '"Segoe UI"', 'sans-serif'], /* [!code ++] */
      }
    },
  },
}
```

Of course, you can change the other fonts in the stack. For example, display fonts often fallback to `cursive`.

Great! We're now ready to use the utility class in our email template.

## Quick use

Add the `font-barosan` class on elements that you want to use your custom font.

For example, you can add it on a heading:

```html
<h2 class="font-barosan">An article title</h2>
```

With [CSS inlining](/docs/transformers/inline-css) enabled, that would result in:

```html
<h2 style="font-family: Barosan, -apple-system, 'Segoe UI', sans-serif;">An article title</h2>
```

## Advanced use

Repeatedly writing that `font-barosan` class on all elements isn't just impractical, it also increases HTML file size (especially when inlining), which then leads to [Gmail clipping](https://github.com/hteumeuleu/email-bugs/issues/41).

`font-family` is inherited, which means you can just add the utility to the top element:

```html [emails/transactional.html]
<x-main>
  <table class="font-barosan">
    <!-- your email HTML... -->
  </table>
</x-main>
```

However, that could trigger [Outlook's Times New Roman bug](https://www.caniemail.com/search/?s=font#font-face-cite-note-5).

We can work around that by making use of Tailwind's `screen` variants and an Outlook `font-family` fallback to reduce bloat and write less code 👌

First, let's register a new `@media` query - we will call it `screen`:

```js [tailwind.config.js] {6}
export default {
  theme: {
    screens: {
      sm: {max: '600px'},
      xs: {max: '425px'},
      screen: {raw: 'screen'}, // [!code ++]
    }
  }
}
```

We can now use it on the outermost<sup>1</sup> element:

```html [emails/transactional.html]
<x-main>
  <table class="screen:font-barosan">
    <!-- your email HTML... -->
  </table>
</x-main>
```

<Alert><sup>1</sup> Don't add it to the `<body>` - some email clients remove or replace this tag.</Alert>

This will tuck the `font-family` away in an `@media` query:

```css
/* Compiled CSS. Maizzle replaces escaped \: with - */
@media screen {
  .screen-font-barosan {
    font-family: Barosan, -apple-system, "Segoe UI", sans-serif !important;
  }
}
```

Since Outlook on Windows doesn't read `@media` queries, define a fallback<sup>2</sup> for it in the `<head>` of your Layout:

```html [layouts/main.html]
<!--[if mso]>
<style>
  td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif;}
</style>
<![endif]-->
```

<Alert><sup>2</sup> The Maizzle Starter includes this fallback in the `main.html` Layout by default.</Alert>

## Outlook bugs

Custom fonts aren't supported in Outlook 2007-2019 on Windows - most of these email clients will fallback to Times New Roman if you try to use one.

To avoid this, you can wrap the `@font-face` declaration in a `@media` query, so that Outlook will ignore it:

```css
@media screen {
  @font-face {
    font-family: 'Barosan';
    font-style: normal;
    font-weight: 400;
    src: local('Barosan Regular'), local('Barosan-Regular'), url(https://example.com/fonts/barosan.woff2) format('woff2');
  }
}
```

Also, note that `font-family` isn't inherited on child elements in Outlook.

## Extra weights

If your font comes with dedicated files for other weights, don't just slap `font-bold` on an element.

Instead, import both the regular and bold versions of your font:

```css
@font-face {
  font-family: 'Barosan';
  font-style: normal;
  font-weight: 400;
  src: local('Barosan Regular'), local('Barosan-Regular'), url(https://example.com/fonts/barosan.woff2) format('woff2');
}

@font-face {
  font-family: 'Barosan';
  font-style: normal;
  font-weight: 700;
  src: local('Barosan Bold'), local('Barosan-Bold'), url(https://example.com/fonts/barosan-bold.woff2) format('woff2');
}
```

## Resources

- [The Ultimate Guide to Web Fonts](https://litmus.com/blog/the-ultimate-guide-to-web-fonts) on Litmus
- [@font-face support in email](https://www.caniemail.com/features/css-at-font-face/)
