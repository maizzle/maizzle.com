---
title: "AMP4Email"
repository: https://github.com/maizzle/starter-amp4email.git
description: "Original, free ⚡4email templates."
image: https://res.cloudinary.com/maizzle/image/upload/q_auto:best/starters/amp4email.jpg
htmlPreview: https://raw.githubusercontent.com/maizzle/starter-amp4email/master/build_production/carousel.html
date: 2020-02-20
---

# ⚡4email templates

Original, free ⚡4email templates built with Tailwind CSS in Maizzle.

[View on GitHub &rarr;](https://github.com/maizzle/starter-amp4email.git)

## Templates

The following templates are included:

- Accordion
- Carousel

## Tailwind CSS

AMP templates don't allow inline CSS, so `important` is set to `false`  in `tailwind.config.js`. Because of that, this Starter also uses an `md` screen and a mobile-first strategy instead of the default desktop-first approach from Maizzle.

## AMP Components

For each component that you want to use in a template, you need to add its script to the `<head>`. We can push to the `head` stack from the Template:

```xml [src/templates/accordion.html]
<x-main>
  <push name="head">
    <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
  </push>

  <!-- ...  -->
</x-main>
```
