---
title: "Markdown"
repository: https://github.com/maizzle/starter-markdown.git
description: "Create emails from markdown files."
image: https://res.cloudinary.com/maizzle/image/upload/starters/markdown.jpg
date: 2022-12-05
---

# Markdown starter

This starter allows you to create emails from markdown files.

Simply add your markdown files to `content`, run the build command, and they will be converted to HTML emails using a predefined layout.

[View on GitHub &rarr;](https://github.com/maizzle/starter-markdown.git)

## Getting started

Scaffold a new project based on this starter:

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./my-project`, select Custom Starter → Markdown, and choose Yes when prompted to Install dependencies.

Next, switch the current directory to `my-project`:

```sh no-copy
cd my-project
```

Start local development:

```sh
npm run dev
```

Build emails for production:

```sh
npm run build
```

## Custom layouts

The starter supports custom layouts, which you can add to `layouts`.

The default layout is `layouts/main.html`, but if you want to use a different layout for a specific markdown file, you can add a `layout` property to its front matter:

```md [content/example.md]
---
layout: secondary
---

## Custom layout

This email uses a custom layout, defined in `layouts/secondary.html`.
```

## Customization

See the detailed guide for the Markdown starter [here](/guides/markdown-emails/).
