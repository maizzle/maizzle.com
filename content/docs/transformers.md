---
title: "Transformers"
description: "What are Maizzle Transformers and how to use them to transform your HTML emails."
---

# What are Transformers?

Transformers in Maizzle are functions that basically take a string of HTML, do something with it, and then return it for further processing.

They run after your Template has been compiled and allow you to manipulate the HTML in various ways, like prepending a base URL to all `<img>` tags or preventing widow words.

Some of the Transformers help you automate tedious tasks that are required when developing HTML emails, like inlining CSS, automatically adding attributes for better accessibility, or generating plaintext versions of your emails.

## Transformers list

Most Transformers are enabled by default:

- [Safe Class Names](/docs/transformers/safe-class-names) - rewrites Tailwind CSS class names to email-safe alternatives
- [Filters](/docs/transformers/filters) - Liquid-like filters as HTML attributes
- [Markdown](/docs/markdown) - converts Markdown to HTML
- [Prevent Widows](/docs/transformers/widows) - enables an HTML attribute that prevents widow words
- [Add Attributes](/docs/transformers/add-attributes) - improves accessibility by adding `alt` and `role` attributes
- [Remove Attributes](/docs/transformers/remove-attributes) - removes empty `style` and `class` attributes
- [Six-digit HEX](/docs/transformers/six-hex) - converts 3-digit HEX colors to 6-digit
- [Outlook Tags](/docs/tags#outlook) - simplifies writing MSO conditionals for Outlook
- [resolveProps](/docs/configuration/css#resolveprops) - resolves CSS variables to their static values
- [resolveCalc](/docs/configuration/css#resolvecalc) - resolves CSS `calc()` functions to their static values

However, some are opt-in and need to be explicitly enabled in your `config.js`:

- [Inline CSS](/docs/transformers/inline-css) - inlines CSS styles into the HTML
- [Purge CSS](/docs/transformers/purge-css) - removes unused CSS classes from your HTML
- [Shorthand CSS](/docs/transformers/shorthand-css) - converts long-hand CSS to shorthand in `style` attributes
- [Base URL](/docs/transformers/base-url) - prepends a string to configured attributes in HTML
- [URL parameters](/docs/transformers/url-parameters) - adds URL parameters to configured HTML tags
- [Replace strings](/docs/transformers/replace-strings) - replaces strings through regular expressions
- [Prettify](/docs/transformers/prettify) - pretty-prints the HTML
- [Minify](/docs/transformers/minify) - minifies the HTML

## Disabling

You may disable all Transformers by setting `useTransformers` to `false`:

```js [config.js] {2} diff
export default {
+  useTransformers: false,
}
```

## Execution order

Transformers in Maizzle need to run in a specific order, see it on the [build process](/docs/build-process#compile-templates) page.

## API

Maizzle Transformers can also be used programmatically in your application. You can inline some CSS or minify HTML even without using Maizzle to build your emails.

See the documentation of each Transformer for usage examples.
