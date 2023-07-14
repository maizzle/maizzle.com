---
title: "Build process"
description: "See how the build process works and how Maizzle builds your emails"
---

# Build process

When you run `maizzle build`, your templates go through a series of events that compile them to plain HTML and apply various, email-specific transformations.

To get a better understanding of how Maizzle builds your emails, here's a step-by-step guide of what's going on under the hood:

## Environment config

First, a global configuration object is computed by merging your Environment config on top of the base `config.js`.

For example, running `maizzle build production` will tell Maizzle to look for the `config.production.js` Environment config at your current location, and merge it on top of `config.js`.

Otherwise, if you're simply running the `maizzle build` or `maizzle serve` commands, only the base `config.js` will be used.

## Compile Tailwind CSS

Tailwind CSS is compiled, and various [PostCSS](https://postcss.org/) plugins are enabled depending on the build environment and your config.

## Clean destination

The destination directories that you have defined under `destination.path` in your environment config are deleted.

<Alert type="warning">Be careful when customizing this path, so you don't end up deleting important directories and files on your machine.</Alert>

## Copy sources

All of your source Templates are copied over to the `destination.path` directories.

This is done so that we can then process the files in-place, which makes it easier to preserve your directory structure.

## beforeCreate()

The [beforeCreate](/docs/events#beforecreate) event (CLI-only) is triggered, giving you access to the config before Maizzle loops over your Templates to compile them.

## Compile templates

Each Template is parsed and compiled in-place, in your destination directory:

1. Maizzle reads the Template file

2. It extracts its Front Matter

3. A unique Template `config` is computed by merging the Template's Front Matter keys with the Environment `config`

4. [beforeRender](/docs/events#beforerender) event is triggered

5. PostHTML renders the template string

    Your Environment name, the compiled Tailwind CSS, and all `config` options (including any you defined in Front Matter) are exposed to all your templating parts as PostHTML expressions that you can use, under the `page` object.

6. [afterRender](/docs/events#afterrender) event is triggered

7. The compiled HTML is now passed on to a series of Transformers.

    The order of events is exactly as follows, and they all happen (or not) depending on how you've configured them in your Environment config or in the Template's Front Matter:

    - Escaped characters in `<head>` and `<body>` CSS classes are replaced with email-safe alternatives
    - `filters` are applied to the HTML. For example, `<style postcss|tailwindcss>` tags are compiled with PostCSS/Tailwind CSS. [posthtml-content](https://github.com/posthtml/posthtml-content) is used to transform content marked with those custom attributes.
    - Markdown is compiled with [posthtml-markdownit](https://github.com/posthtml/posthtml-markdownit)
    - [prevent-widows](https://github.com/bashaus/prevent-widows) looks for tags containing the `prevent-widows` attribute. When it finds one, it will replace the last space in your text with a `&nbsp;`.
    - [attributeToStyle](/docs/transformers/inline-css#attribute-to-style) translates HTML attributes to inline CSS
    - CSS is inlined with [Juice](https://github.com/Automattic/juice)
    - Longhand CSS in `style` attributes is converted to shorthand-form
    - Unused CSS is removed with [email-comb](https://www.npmjs.com/package/email-comb)
    - Inline CSS sizes are removed (`width=""` and `height=""` are preserved)
    - Inline background colors are removed (`bgcolor=""` is preserved)
    - Attributes are removed based on your config. By default, Maizzle cleans up any empty `style=""` and `class=""` attributes.
    - Any [extra attributes](/docs/transformers/add-attributes) defined are added to tags
    - [baseURL](/docs/transformers/base-url) is prepended to configured tags
    - [urlParameters](/docs/transformers/url-parameters) are added to links
    - Ensure six digit HEX color codes are used in `bgcolor` and `color` attributes
    - [`<outlook>` tags](/docs/tags#outlook) are replaced with the correct MSO comments
    - Code is prettified/indented for humans, with [pretty](https://www.npmjs.com/package/pretty)
    - Code is minified with [html-crush](https://www.npmjs.com/package/html-crush)
    - Strings are replaced based on your [`replaceStrings`](/docs/transformers/replace-strings) definitions

8. [afterTransformers](/docs/events#aftertransformers) event is triggered

9. The compiled email template is saved at the [configured location](/docs/configuration/templates#path), with the [configured extension](/docs/configuration/templates#extension).

    9.1 A plaintext version is created at the same location and with the same name, if `plaintext` was enabled

10. Your assets are copied to the destination folder. All files and folders in `templates.assets.source` are copied to `templates.assets.destination`

## afterBuild()

The [afterBuild](/docs/events#afterbuild) event is triggered (CLI-only).
