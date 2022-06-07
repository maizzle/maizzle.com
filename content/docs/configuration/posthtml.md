---
title: "PostHTML configuration"
description: "Configuring PostHTML options in Maizzle"
---

# PostHTML configuration

Maizzle uses PostHTML as its templating engine, and you can customize options or register plugins that can further transform your HTML emails.

### options

Configure PostHTML options.

For example, you may tell it to ignore `<?php ?>` tags:

<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        options: {
          directives: [
            { name: '?php', start: '<', end: '>' }
          ]
        }
      }
    }
  }
  ```

</code-sample>

Checkout the [PostHTML documentation](https://posthtml.org/) for all available options.

### plugins

Register any PostHTML plugins you would like to use:


<code-sample title="config.js">

  ```js
  module.exports = {
    build: {
      posthtml: {
        plugins: [
          require('posthtml-spaceless')()
        ]
      }
    }
  }
  ```

</code-sample>

Maizzle already uses the following plugins, no need to add them:

- [posthtml-extend](https://github.com/posthtml/posthtml-extend)
- [posthtml-modules](https://github.com/posthtml/posthtml-modules)
- [posthtml-expressions](https://github.com/posthtml/posthtml-expressions)
- [posthtml-fetch](https://github.com/posthtml/posthtml-fetch)
- [posthtml-mso](https://github.com/posthtml/posthtml-mso)
- [posthtml-base-url](https://github.com/posthtml/posthtml-base-url)
- [posthtml-content](https://github.com/posthtml/posthtml-content)
- [posthtml-extra-attributes](https://github.com/posthtml/posthtml-extra-attributes)
- [posthtml-markdownit](https://github.com/posthtml/posthtml-markdownit)
- [posthtml-postcss-merge-longhand](https://github.com/posthtml/posthtml-postcss-merge-longhand)
- [posthtml-remove-attributes](https://github.com/princed/posthtml-remove-attributes)
- [posthtml-safe-class-names](https://github.com/posthtml/posthtml-safe-class-names)
- [posthtml-url-parameters](https://github.com/posthtml/posthtml-url-parameters)
