---
title: "Mailchimp"
repository: https://github.com/maizzle/starter-mailchimp.git
description: "Create ready-to-upload .zip template archives for Mailchimp."
image: https://res.cloudinary.com/maizzle/image/upload/starters/mailchimp.jpg
date: 2023-08-04
---

# Mailchimp starter

This starter shows how to use events in Maizzle to automate the creation of ready-to-upload template .zip files for Mailchimp.

[View on GitHub &rarr;](https://github.com/maizzle/starter-mailchimp.git)

See our guide for more information:

[Automating Mailchimp template zip packaging with Maizzle](https://maizzle.com/guides/mailchimp-package)

## Getting started

Scaffold a new project based on this starter:

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./mailchimp-project`, select Custom Starter → Mailchimp, and choose Yes when prompted to Install dependencies.

Next, switch the current directory to `mailchimp-project`:

```sh no-copy
cd mailchimp-project
```

Start local development:

```sh
npm run dev
```

Build emails for production:

```sh
npm run build
```
