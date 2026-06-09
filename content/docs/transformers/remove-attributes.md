---
title: Remove Attributes
description: Remove HTML attributes from elements based on name and value.
section: Transformers
order: 10
---

# Remove Attributes

Removes specified attributes from your HTML.

## Usage

By default, empty `style` and `class` attributes are always removed. You may specify additional attributes to remove through the `html.attributes.remove` option:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: {
      remove: [
        'data-test',
        { name: 'class', value: /^js-/ },
      ],
    },
  },
})
```

## Customization

There are three ways to specify which attributes to remove.

### String

Passing a string removes the attribute when its value is empty.

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: {
      remove: ['data-src'],
    },
  },
})
```

This removes `data-src=""` but leaves `data-src="value"` untouched.

### Object with exact value

You may remove an attribute only when it matches a specific value:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: {
      remove: [
        { name: 'id', value: 'test' },
      ],
    },
  },
})
```

This removes `id="test"` but leaves `id="other"` untouched.

### Object with RegExp

You may use a regular expression to match attribute values:

```ts [maizzle.config.ts]
export default defineConfig({
  html: {
    attributes: {
      remove: [
        { name: 'data-id', value: /\d/ },
      ],
    },
  },
})
```

This removes `data-id` when its value contains a digit, such as `data-id="item-3"`.

## API

Use `removeAttributes` programmatically to strip attributes from an HTML string.

```ts
import { removeAttributes } from '@maizzle/framework'

const out = removeAttributes('<p style="" data-x="">x</p>', [
  'data-x',
  { name: 'role', value: 'none' },
  { name: 'data-id', value: /\d/ },
])
```

The first argument is your HTML string. 

The second is an optional `RemoveAttributeOption[]` — bare strings remove the attribute when its value is empty, objects with `value: 'literal'` match exactly, and objects with `value: /regex/` match a pattern. 

Empty `style` and `class` attributes are always stripped, regardless of what you pass. 

Returns the transformed HTML string.
