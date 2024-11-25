---
title: "Remove attributes"
description: "Automatically remove attributes when building your HTML email."
---

# Remove attributes

Maizzle can automatically remove attributes from your HTML.

By default, it removes empty `style` and `class` attributes that are sometimes left over after the CSS inlining process.

## Usage

You may configure which attributes to remove through the `removeAttributes` array.

### Empty values

To remove attributes with no values, specify the attribute name as a string:

```js [config.js]
export default {
  attributes: {
    remove: ['data-src'],
  }
}
```

Input:

```html [emails/example.html]
<img src="example.jpg" data-src alt="">
```

Output:

```html
<img src="example.jpg" alt="">
```

<Alert>Maizzle automatically removes empty `style` and `class` attributes, no need to add them yourself.</Alert>

### By name and value

If you know the exact name and value, you may pass them to the array as an object:

```js [config.js]
export default {
  attributes: {
    remove: [
      {name: 'id', value: 'test'},
    ],
  }
}
```

Input:

```html
<div style="color: #000" id="test">Test</div>
```

Output:

```html
<div style="color: #000">Test</div>
```

### With a RegExp

You may also use a regular expression for the `value`.

All attributes with a value matching the regex will be removed:

```js [config.js]
export default {
  attributes: {
    remove: [
      {name: 'data-id', value: /\d/},
    ],
  }
}
```

Input:

```html
<div data-id="test"></div>
<div data-id="99"></div>
```

Output:

```html
<div data-id="test"></div>
<div></div>
```

## API

```js [app.js]
import { removeAttributes } from '@maizzle/framework'

const options = [
  'id',
  {name: 'role', value: 'article'},
]

const html = await removeAttributes(`<div id="" style="" role="article"></div>`, options)
```
