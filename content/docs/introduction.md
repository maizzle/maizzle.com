---
title: "Introduction"
description: "Getting started with the Maizzle Email Framework"
---

# What is Maizzle?

Maizzle is a framework for HTML email development.

It's powered by [Tailwind CSS](https://tailwindcss.com/) and comes with features such as templating, components, and various transformations that are necessary for HTML emails.

Maizzle doesn't rely on custom tags that expand into predefined, `<table>`-based HTML markup.
Instead, you write your own HTML that you style with Tailwind CSS.

This means that you're in complete control over your email code: no need to worry about things like component markup being locked into the framework core or not having full control over styling or accessibility.

## Tailwind CSS

Maizzle uses the Tailwind CSS framework, enabling you to quickly style HTML emails.

Using utility classes to style your emails makes you faster and more productive by eliminating the constant context switching present in a traditional approach where you write CSS separately from your HTML markup.

An email-tailored `tailwind.config.js` is provided in the [official Starter](https://github.com/maizzle/maizzle) - this configures Tailwind CSS for optimal email client support.

When you build the production-ready emails, Maizzle can automatically take care of CSS inlining, as well as many other optimizations.

## Build System

The build system in Maizzle is based on what we call [Environments](/docs/environments).

These allow you to define distinct build scenarios for your email workflow.

Each environment is customized through a JavaScript config file, so you can even `require()` packages or programmatically set options.

[PostHTML](https://posthtml.org/) plugins are used for the templating logic, and you can use loops, partials, and even fetch remote content in your emails. Markdown with <abbr title="GitHub Flavored Markdown">GFM</abbr> is supported, too.

## BYOHTML

Maizzle doesn't include markup abstractions that expand to `<table>`-based structures, such as `<row>` or `<column>` seen in other frameworks &ndash; you code your emails the way you want to, with HTML you already know.

Knowing that some email clients still require the use of tables in order to ensure proper layout rendering, this might sound terrifying to some.

However, through progressive enhancement, you can actually use modern HTML and CSS in many email clients while providing a fallback for the more archaic ones.

You're free to code your emails however you like 💪

_Bring Your Own HTML_ <sup>&trade;</sup>

## Responsive

Because of the lack of standards and the wildly varying [CSS support in email clients](https://www.caniemail.com/), there are many techniques that email developers use to code responsive emails.

Maizzle doesn't have an opinion on how you should code your emails: from _spongy_ to _fluid_ and _responsive_ to _hybrid_, everything is supported, so you're free to use whatever technique you like (or need).

Tailwind CSS screens are configured for a _desktop-first responsive_ approach, which is the opposite of what you might be used to in web development.

Utility classes will target desktop viewports by default and the [responsive variants](https://tailwindcss.com/docs/responsive-design) will override them for small screen sizes:

<code-sample title="tailwind.config.js">

```js
module.exports = {
  screens: {
    xs: {max: '425px'},
    sm: {max: '600px'},
  },
}
```

</code-sample>

## Configure It Out!

Maizzle is configured in JavaScript.

Besides things like "_should inlining be enabled?_" or "_do we need to minify the HTML?_", you can even pass options to the Markdown renderer or choose where on your machine the compiled HTML file should be saved.

You can do even more advanced things, like pulling data from an API to use in a template, or `require()` some NPM package to further transform your emails.

Each config file represents a distinct [build environment](/docs/environments) that can be triggered with its own `maizzle build [environment]` command, so you can define settings for as many build scenarios as you need!
