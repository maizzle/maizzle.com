---
title: "Netlify Identity"
repository: https://github.com/maizzle/starter-netlify-identity.git
description: "Netlify Identity HTML email templates."
image: https://res.cloudinary.com/maizzle/image/upload/v1587739921/starters/starter-netlify-identity.jpg
date: 2019-04-03
---

# Netlify Identity

Netlify Identity HTML email templates, re-built with Tailwind CSS in Maizzle.

[View on GitHub &rarr;](https://github.com/maizzle/starter-netlify-identity.git)

## Getting started

Scaffold a new project based on this starter:

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./netlify-emails`, select Custom Starter → Git, type in `maizzle/starter-netlify-identity` and confirm with Enter key. Then, choose Yes when prompted to Install dependencies.

Next, switch the current directory to `netlify-emails`:

```sh no-copy
cd netlify-emails
```

Start local development:

```sh
npm run dev
```

Build emails for production:

```sh
npm run build
```

## Templates

The following templates are included:

- Invitation
- Confirmation
- Email Change
- Password Recovery
