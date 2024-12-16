---
title: "Build process"
description: "See how the build process works and how Maizzle builds your emails."
---

# Build process

When you run `maizzle build`, your Templates go through a series of events that compile them to plain HTML and apply various, email-specific transformations.

To get a better understanding of how Maizzle builds your emails, here's a step-by-step guide of what's going on under the hood.

## Environment config

First, a global configuration object is computed by merging your Environment config on top of the base `config.js`.

For example, running `maizzle build production` will tell Maizzle to look for the `config.production.js` file at your current location, and merge it on top of `config.js`.

When running `maizzle build` or `maizzle serve`, only the base `config.js` will be used.

## beforeCreate()

The [beforeCreate](/docs/events#beforecreate) event (CLI-only) is triggered, giving you access to the config before Maizzle loops over your Templates to compile them.

## Clean destination

The destination directories that you have defined under `build.output.path` in your environment config are deleted.

<Alert type="warning">Be careful when customizing this path, so you don't end up deleting important directories and files on your machine.</Alert>


## Compile templates

Each Template file is parsed and compiled:

1. Maizzle reads the Template file
1. It extracts its Front Matter
1. A unique Template `config` is computed by merging the Template's Front Matter keys with the Environment `config`
1. [beforeRender()](/docs/events#beforerender) event is triggered
1. The HTML is rendered with PostHTML
    <br><br>
    Your Environment name and all `config` options (including any you defined in Front Matter) are exposed under the `page` object, which you can access through [expressions](/docs/expressions).
    <br><br>
    PostHTML plugins that are used as part of the rendering process:
    - envTags - core plugin that enables [`<env:?>`](/docs/tags#env) tags
    - envAttributes - core plugin that enables attributes like `src-{env}`
    - expandLinkTags - core plugin that expands local [`<link>` tags](/docs/layouts#link-tag) into `<style>` tags
    - postcssPlugin - this is where the Tailwind CSS magic happens
    - fetchPlugin - enables the [`<fetch>`](/docs/tags#fetch) tag
    - [`posthtml-component`](https://github.com/posthtml/posthtml-components) - the PostHTML plugin that powers Maizzle's components
1. [afterRender()](/docs/events#afterrender) event is triggered

## Transformers

The compiled HTML is now passed on to a series of Transformers. Most of them are enabled by default, but some need to be explicitly enabled in your `config.js`.

The order in which they're executed is exactly as follows:

1. coreTransformers - remove `<plaintext>` tags when developing locally, enable `no-inline` attribute for `<style>` tags
1. [safeClassNames](/docs/transformers/safe-class-names) - escaped characters in `<head>` and `<body>` CSS classes are replaced with email-safe alternatives
1. [filters](/docs/transformers/filters) - Liquid-like filters are applied to the HTML
1. [markdown](/docs/markdown) is compiled
1. [widowWords](/docs/transformers/widows) - widow words are prevented in tags with the `prevent-widows` attribute
1. [attributeToStyle](/docs/transformers/inline-css#attributetostyle) - translates HTML attributes to inline CSS
1. [inlineCSS](/docs/transformers/inline-css) - CSS is inlined
1. [removeAttributes](/docs/transformers/remove-attributes) - HTML attribute removal based on your config
1. [shorthandCSS] - longhand CSS in `style` attributes is converted to shorthand-form
1. [addAttributes](/docs/transformers/add-attributes) - user-configured attributes are added to tags
1. [baseURL](/docs/transformers/base-url) - a base URL is prepended to configured attribute values
1. [urlParameters](/docs/transformers/url-parameters) - configured parameters are added to URLs
1. [sixHex](/docs/transformers/six-hex) - ensures six digit HEX color codes are used in `bgcolor` and `color` attributes
1. [posthtmlMSO](/docs/tags#outlook) - `<outlook>` tags are replaced with the correct MSO comments
1. [purgeCSS](/docs/transformers/purge-css) - unused CSS is removed from `<style>` tags and HTML attributes
1. [templateTag](/docs/tags#template) - `<template>` tags are replaced with their content
1. [replaceStrings](/docs/transformers/replace-strings) - strings are replaced based on your config
1. [prettify](/docs/transformers/prettify) - HTML is prettified
1. [minify](/docs/transformers/minify) - HTML is minified

## afterTransformers()

The [afterTransformers](/docs/events#aftertransformers) event is triggered.

## Plaintext

A plaintext version is created at the [configured location](/docs/plaintext#custom-path), if `plaintext` was enabled.

## Write to disk

The compiled HTML is saved at the [configured location](/docs/configuration/build#path), with the [configured extension](/docs/configuration/build#extension).

## Copy static files

All files and folders in `build.static.source` are copied to `build.static.destination`.

## afterBuild()

The [afterBuild](/docs/events#afterbuild) event is triggered (CLI-only).
