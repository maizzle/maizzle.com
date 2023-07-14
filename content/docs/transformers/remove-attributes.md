---
title: "Remove attributes"
description: "Automatically remove attributes from your HTML email."
---

# Remove attributes

Maizzle can automatically remove attributes from your HTML.

By default, it removes empty `style` and `class` attributes that are sometimes left over after the CSS inlining process.

## Usage

You may configure which attributes to remove through the `removeAttributes` array.

### Empty values

To remove attributes with no values, specify the attribute name as a string:

```js [config.js]
module.exports = {
  removeAttributes: ['data-src']
}
```

Input:

```xml [src/templates/example.html]
<img src="example.jpg" data-src alt="">
```

Output:

```xml
<img src="example.jpg" alt="">
```

<Alert>Maizzle automatically removes empty `style` and `class` attributes, no need to add them yourself.</Alert>

### By name and value

If you know the exact name and value, you may pass them to the array as an object:

```js [config.js]
module.exports = {
  removeAttributes: [
    {name: 'id', value: 'test'}
  ]
}
```

Input:

```xml
<div style="color: #000" id="test">Test</div>
```

Output:

```xml
<div style="color: #000">Test</div>
```

### With a RegExp

You may also use a regular expression for the `value`.

All attributes with a value matching the regex will be removed:

```js [config.js]
module.exports = {
  removeAttributes: [
    {name: 'data-id', value: /\d/}
  ]
}
```

Input:

```xml
<div data-id="test"></div>
<div data-id="99"></div>
```

Output:

```xml
<div data-id="test"></div>
<div></div>
```

## API

```js [app.js]
const {removeAttributes} = require('@maizzle/framework')
const options = [
  'id',
  {name: 'role', value: 'article'}
]

const html = await removeAttributes(`<div id="" style="" role="article"></div>`, options)
```
