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

AMP templates don't allow inline CSS, so we've set `important: false` in `tailwind.config.js`.
Because of this, this starter also uses an `md` screen and a mobile-first approach, instead of the usual desktop-first.

## AMP Components

For each component that you want to use in a template, you need to add its script to the `<head>`.
We do this with a `head` block, right in the Template:

<code-sample title="src/templates/accordion.html">

  ```xml
  <extends src="src/layouts/main.html">
    <block name="head">
      <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
    </block>
  </extends>
  ```

</code-sample>
