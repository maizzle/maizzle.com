---
title: "Postmark"
repository: https://github.com/maizzle/starter-postmark.git
description: "Postmark's transactional email templates."
image: https://res.cloudinary.com/maizzle/image/upload/v1587739736/starters/starter-postmark.jpg
date: 2019-11-21
---

# Postmark starter

Postmark's transactional email templates, re-built with Tailwind CSS in Maizzle.

[View on GitHub &rarr;](https://github.com/maizzle/starter-postmark.git)

## Getting started

Scaffold a new project based on this starter:

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./postmark-emails`, select Custom Starter → Git, type in `maizzle/starter-postmark` and confirm with Enter key. Then, choose Yes when prompted to Install dependencies.

Next, switch the current directory to `postmark-emails`:

```sh no-copy
cd postmark-emails
```

Start local development:

```sh
npm run dev
```

Build emails for production:

```sh
npm run build
```

## Variations

Each template comes in three layout variations: Basic, Basic full, and Plain. This gives you a starting point to customize them to match your brand.

## Dark Mode

The templates support dark mode where available.

## Customization

This starter defines a `company` object in `config.js`, so you can quickly update company info in one place:

```js [config.js]
module.exports = {
  company: {
    name: '[Company Name, LLC]',
    address: `
    <br>1234 Street Rd.
    <br>Suite 1234
    `,
    product: '[Product Name]',
    sender: '[Sender Name]',
  },
}
```

You can preserve the `{{ }}` curly braces to use with Postmark variables by writing them as `@{{ }}` in Maizzle - see the [ignoring expressions docs](/docs/templates#ignoring-expressions).
