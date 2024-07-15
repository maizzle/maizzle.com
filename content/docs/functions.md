---
title: "Functions"
description: "Define functions in the config and use their output in your email templates."
---

# Config Functions

Maizzle is fully configured in JavaScript, so you can programmatically set config options or process and make data available to your Templates.

## Defining functions

When defining a function, you need to make sure that:

1. it returns something
2. you invoke it

```js [config.js]
import imaginaryLib from 'imaginary-lib'

const foo = function() {
  return 'manchu'
}

export default {
  foo: foo(), // invoke function defined above
  bar: function() {
    // do stuff and return
    return 'baz'
  }(), // invoke function
  wha: () => imaginaryLib.render('implicit return 👌')
}
```

You would access those variables under the `page` object:

```hbs [src/templates/example.html]
<x-main>
  {{ page.foo }}
  {{ page.bar }}
  {{ page.wha }}
</x-main>
```

Result:

```html [build_production/example.html]
manchu baz implicit return 👌
```
