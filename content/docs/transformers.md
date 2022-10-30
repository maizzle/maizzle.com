---
title: "Transformers"
description: "What are Maizzle Transformers and how to use them to transform your HTML emails"
---

# What are Transformers?

Transformers in Maizzle are functions that basically take a string of HTML, do something with it, and then return it for further processing.

They run after your template has been compiled and allow you to manipulate the HTML in various ways, like prepending a base URL to all `<img>` tags, or preventing widow words.

Some of the Transformers help you automate tedious tasks that are required when developing HTML emails, like inlining CSS, automatically adding attributes for better accessibility, or generating plaintext versions of your emails.

## Opt-in by default

Transformers are opt-in by default, you need to explicitly enable them in your `config.js`.

## Execution order

Because some operations need to happen before others, Transformers in Maizzle run in a very specific order. You can see this order on the [build process](/docs/build-process#compile-templates) page and even in the navigation menu - they're listed in the exact order that they run.

## Disabling

You may disable all Transformers by setting `applyTransformers` to `false`:

<code-sample title="config.js">

  ```js
  module.exports = {
    applyTransformers: false,
  }
  ```

</code-sample>

## API

Maizzle Transformers can also be used programmatically in your application. You can inline some CSS or minify HTML even without using Maizzle to build your emails.

See the documentation of each Transformer for usage examples.
