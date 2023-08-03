---
title: "Markdown"
description: "Transform markdown in your HTML emails."
---

# Markdown

The same Transformer that enables Markdown in Maizzle can be used on its own to compile Markdown without using Maizzle.

## API

You may use the Markdown Transformer in your application

```js [app.js]
const {markdown} = require('@maizzle/framework')
const options = {/* markdown-it options */}

const html = await markdown('<md>### Heading 3</md>', options)
```
