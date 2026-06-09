---
title: Filters
description: Transform text content inside HTML elements using filter attributes.
section: Transformers
order: 12
---

# Filters

Apply text transformations by adding filter attributes to HTML elements.

## Usage

Add a filter attribute to any HTML element to transform its text content. The attribute name is the filter, and its value is the argument.

```html
<div uppercase>hello world</div>
```

**Result:**

```html
<div>HELLO WORLD</div>
```

You may use multiple filters on one element — they run in attribute order:

```html
<div append="!" prepend="Hey, ">world</div>
```

**Result:**

```html
<div>Hey, world!</div>
```

More examples:

```html
<div truncate="10">This is a longer sentence</div>
<!-- Result: This is a ... -->

<div replace="old|new">This is old text</div>
<!-- Result: This is new text -->
```

Nested filter elements are processed children-first.

## Customization

### Disabling filters

You may disable all filters by setting `filters` to `false`:

```ts [maizzle.config.ts]
export default defineConfig({
  filters: false,
})
```

### Custom filters

Define your own filters in the `filters` config. They are merged with the built-in defaults.

```ts [maizzle.config.ts]
export default defineConfig({
  filters: {
    'big-text': (str) => `<span style="font-size: 24px">${str}</span>`,
  },
})
```

Usage:

```html
<div big-text>Hello</div>
```

**Result:**

```html
<div><span style="font-size: 24px">Hello</span></div>
```

### Built-in filters

| Filter | Description | Example |
|--------|-------------|---------|
| `uppercase` | Convert to uppercase | `<div uppercase>` |
| `lowercase` | Convert to lowercase | `<div lowercase>` |
| `capitalize` | Capitalize first letter | `<div capitalize>` |
| `trim` | Trim whitespace | `<div trim>` |
| `lstrip` | Trim leading whitespace | `<div lstrip>` |
| `rstrip` | Trim trailing whitespace | `<div rstrip>` |
| `escape` | HTML-escape characters | `<div escape>` |
| `escape-once` | Decode then escape | `<div escape-once>` |
| `append` | Append string | `<div append="!">` |
| `prepend` | Prepend string | `<div prepend="hi ">` |
| `plus` | Add number | `<div plus="5">10</div>` → `15` |
| `minus` | Subtract | `<div minus="3">10</div>` → `7` |
| `multiply` / `times` | Multiply | `<div multiply="2">5</div>` → `10` |
| `divide-by` / `divide` | Divide | `<div divide="2">10</div>` → `5` |
| `modulo` | Modulo | `<div modulo="3">10</div>` → `1` |
| `ceil` | Round up | `<div ceil>3.2</div>` → `4` |
| `floor` | Round down | `<div floor>3.8</div>` → `3` |
| `round` | Round | `<div round>3.5</div>` → `4` |
| `size` | String length | `<div size>hello</div>` → `5` |
| `slice` | Slice string | `<div slice="0,3">hello</div>` → `hel` |
| `truncate` | Truncate with ellipsis | `<div truncate="5">hello world</div>` → `hello...` |
| `truncate-words` | Truncate by words | `<div truncate-words="2">a b c</div>` → `a b...` |
| `remove` | Remove all occurrences | `<div remove="l">hello</div>` → `heo` |
| `remove-first` | Remove first match | `<div remove-first="l">hello</div>` → `helo` |
| `replace` | Replace all (pipe-sep) | `<div replace="l\|r">hello</div>` → `herro` |
| `replace-first` | Replace first | `<div replace-first="l\|r">hello</div>` → `herlo` |
| `newline-to-br` | `\n` → `<br>` | `<div newline-to-br>` |
| `strip-newlines` | Remove newlines | `<div strip-newlines>` |
| `url-decode` | URL decode | `<div url-decode>` |
| `url-encode` | URL encode | `<div url-encode>` |

## API

```ts
import { filters } from '@maizzle/framework'

// Built-in filters only
const out = filters('<p uppercase>foo</p>')
// → '<p>FOO</p>'

// Add your own filter (merged with the defaults)
const custom = filters('<p suffix=" world">hello</p>', {
  suffix: (str, value) => str + value,
})

// Disable every filter (including the defaults)
const raw = filters('<p uppercase>foo</p>', false)
```

The first argument is an HTML string. The second is an optional `FiltersConfig` — an object whose keys are attribute names and values are `(content, attrValue) => string` functions, or `false` to disable all filters. Returns the transformed HTML string.
