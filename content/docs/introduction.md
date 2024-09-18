---
title: "Introduction"
description: "Getting started with the Maizzle Email Framework."
---

# What is Maizzle?

Maizzle is a framework for HTML email development.

It's powered by [Tailwind CSS](https://tailwindcss.com/) and comes with features such as components, expressions, and various automations that make coding HTML emails easier.

Maizzle doesn't rely on custom tags that expand into predefined, `<table>`-based HTML markup. We do provide some abstractions for things like components or templating tags, but you don't _have_ to use them if you don't want to.

This means that you're in complete control over your email code: no need to worry about things like component markup being locked into the framework core or not having full control over styling or accessibility.

## Tailwind CSS

Maizzle uses the Tailwind CSS framework, enabling you to quickly style HTML emails.

Using utility classes to style emails makes you more productive by eliminating the tiring context switching that is common in a traditional email coding approach, where you keep moving back and forward between your responsive CSS and your HTML markup.

And since you no longer need to come up with names for your CSS classes, you can focus on coding your emails at warp speed.

We use [`tailwindcss-preset-email`](https://github.com/maizzle/tailwindcss-preset-email), a custom preset that configures Tailwind CSS for better email client support: `rem` values are replaced with `px`, HEX values are preferred over CSS vars, there are custom screens and an extended spacing scale etc.

When you build the production-ready emails, Maizzle can automatically take care of CSS inlining, as well as many other HTML and CSS optimizations.

## Build System

The build system in Maizzle is based on what we call [Environments](/docs/environments).

These allow you to define distinct build scenarios for your email workflow.

Each environment is customized through a JavaScript config file, so you can even `import()` packages or programmatically set options.

[PostHTML](https://posthtml.org/) plugins are used for the templating logic, and you can use components, loops, if statements - even fetch remote content. Markdown with <abbr title="GitHub Flavored Markdown">GFM</abbr> is supported, too.

## BYOHTML

Maizzle doesn't include markup abstractions that expand to `<table>`-based structures, such as `<row>` or `<column>` seen in other frameworks &ndash; you code your emails the way you want to, with HTML you already know.

Knowing that some email clients still require the use of tables in order to ensure proper layout rendering, this might sound terrifying to some.

However, through progressive enhancement, you can actually use modern HTML and CSS in many email clients while providing a fallback for the more archaic ones.

You're free to code your emails however you like 💪

_Bring Your Own HTML_ <sup>&trade;</sup>

## Responsive

Because of the lack of standards and the wildly varying [CSS support in email clients](https://www.caniemail.com/), there are many techniques that email developers use to code responsive emails.

Maizzle doesn't have an opinion on how you should code your emails: from _spongy_ to _fluid_ and _responsive_ to _hybrid_, everything is supported, so you're free to use whatever technique you like (or need).

Tailwind CSS screens in Maizzle are configured for a _desktop-first responsive_ approach by default, which is the opposite of what you might be used to in web development. We currently do this because of Outlook/Office 365 on Windows and a few other email clients that don't support media queries.

Utility classes will target desktop viewports by default, and the [responsive variants](https://tailwindcss.com/docs/responsive-design) will override them for small screen sizes:

```js [tailwind.config.js] no-copy
module.exports = {
  screens: {
    sm: {max: '600px'},
    xs: {max: '425px'},
  },
}
```

## Configure It Out!

Maizzle is configured in JavaScript.

Besides things like "_should inlining be enabled?_" or "_do we need to minify the HTML?_", you can even pass options to the Markdown renderer or choose where on your machine the compiled HTML file should be saved.

You can do even more advanced things, like pulling data from an API to use in a template, or `import()` some NPM package to further transform your emails.

Each config file represents a distinct [build Environment](/docs/environments) that can be triggered with its own `maizzle build [environment]` command, so you can create as many build scenarios as you need, each with their own settings!
