---
title: "Introduction"
description: "Getting started with the Maizzle Email Framework"
---

# What is Maizzle?

Maizzle is a framework for HTML email development.

It's powered by [Tailwind CSS](https://tailwindcss.com/) and a build system that includes features like templating, components, and various transformations necessary for HTML emails.

Unlike other email frameworks, Maizzle doesn't use any custom tags that expand into predefined table-based HTML markup.
Instead, you write your own HTML that you style with Tailwind's utility classes.

If you're looking for a framework that offers abstractions like `<row>` and `<column>`, then Maizzle might not be the right choice for you.

But if you need full control over your markup, you might want to [give it a try](/docs/installation) 😉

---

## Tailwind CSS

Maizzle uses the Tailwind CSS framework, enabling you to quickly style HTML email templates. There's never been a faster way to style your emails.

For most of the time, you won't need to write CSS anymore: just add classes to your markup.
When you build the production-ready emails, Maizzle automatically takes care of CSS inlining, as well as many other optimizations.

An email-tailored `tailwind.config.js` is provided in the [official Starter](https://github.com/maizzle/maizzle) - this configures Tailwind CSS for optimal email client support.

## Build System

The build system in Maizzle is based on what we call [Environments](/docs/environments).

These allow you to define distinct build scenarios for your email workflow.

Each environment is customized through a JavaScript config file, so you can even `require()` packages or programmatically set options.

[PostHTML](https://posthtml.org/) plugins are used for the templating logic, and you can use loops, partials, and even fetch remote content in your emails. Markdown with <abbr title="GitHub Flavored Markdown">GFM</abbr> is supported, too.

## BYOHTML

Maizzle doesn't include markup abstractions that expand to table-based structures, such as `<row>` or `<column>` in other frameworks.

You code your emails the way you want to with HTML you already know, there's no need to learn new tags or attributes.

Knowing that some email clients still need layouts coded with tables in order to ensure proper rendering, this might sound terrifying to some. However, depending on your audience, nowadays you can actually use modern HTML and CSS and have your layout look great in the majority of email clients.

Also, this way you don't need to worry about markup being locked into the framework core, or about not having full control over styling or accessibility.

You're free to code your emails however you like 💪

_Bring Your Own HTML_ <sup>&trade;</sup>

## Responsive

Because of the lack of standards and the wildly varying [CSS support in email clients](https://www.caniemail.com/), there are many techniques that email developers use to code responsive emails.

Maizzle doesn't have an opinion on how you should code your emails: from _spongy_ to _fluid_ and _responsive_ to _hybrid_, everything is supported, so you're free to use whatever technique you like or need.

Maizzle comes with Tailwind CSS screens configured for a _desktop-first responsive_ approach, which is the opposite of what you might be used to: utility classes will target desktop viewports while the [responsive variants](https://tailwindcss.com/docs/responsive-design) will override them for mobile clients:

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

Besides things like "_should inlining be enabled?_" or "_do we need to minify the HTML?_", you can even pass options to the Markdown renderer or choose where on your machine the compiled HTML should be output.

You can do even more advanced things, like pulling data from an API to use in a template, or `require()` some NPM package to further transform your emails.

Each config file represents a distinct [build environment](/docs/environments) that can be triggered with its own `maizzle build [environment]` command, so you can define settings for as many build scenarios as you need!
