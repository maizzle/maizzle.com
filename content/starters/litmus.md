---
title: "Litmus"
repository: https://github.com/maizzle/starter-litmus.git
description: "The free email templates by Litmus."
image: https://res.cloudinary.com/maizzle/image/upload/v1586366098/starters/litmus.jpg
date: 2019-11-26
---

# Litmus starter

The free email templates by Litmus, re-built with Tailwind CSS in Maizzle.

[View on GitHub &rarr;](https://github.com/maizzle/starter-litmus.git)

## Getting started

Scaffold a new project based on this starter:

```sh
npx create-maizzle
```

In the interactive setup wizard, specify the directory name to create the project in, i.e. `./litmus-emails`, select Custom Starter → Git, type in `maizzle/starter-litmus` and confirm with Enter key. Then, choose Yes when prompted to Install dependencies.

Next, switch the current directory to `litmus-emails`:

```sh no-copy
cd litmus-emails
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

### Slate

- Newsletter
- Product Update
- Receipt
- Simple Announcement
- Stationery

### Ceej

- Account Update
- Expired Card
- Password Reset
- New Account
- Closed Account

Each Ceej template comes in 3 versions:

- HTML
- MailChimp
- Campaign Monitor
