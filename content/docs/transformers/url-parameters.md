---
title: URL Parameters
description: Append query parameters to URLs in your HTML emails for click tracking or analytics.
section: Transformers
order: 14
---

# URL Parameters

Automatically add query parameters to URLs in your emails.

## Usage

Configure it with `url.query` in your config:

```ts [maizzle.config.ts]
export default defineConfig({
  url: {
    query: {
      utm_source: 'maizzle',
      utm_medium: 'email',
    },
  },
})
```

Before:

```html
<a href="https://example.com">Visit</a>
```

**Result:**

```html
<a href="https://example.com?utm_source=maizzle&utm_medium=email">Visit</a>
```

By default, only `<a>` tags are processed and only absolute URLs receive the parameters.

Pre-existing query strings are preserved — new params are merged onto the URL rather than overwriting it:

```html
<!-- Before -->
<a href="https://example.com?ref=footer">Visit</a>

<!-- After -->
<a href="https://example.com?ref=footer&utm_source=maizzle&utm_medium=email">Visit</a>
```

## Customization

Configure options via the `_options` key inside `url.query`:

```ts [maizzle.config.ts]
export default defineConfig({
  url: {
    query: {
      utm_source: 'newsletter',
      _options: {
        tags: ['a', 'img'],
        strict: false,
      },
    },
  },
})
```

### tags

Type: `string[]`\
Default: `['a']`

CSS selectors for elements to process. Element names work, but you can also use attribute selectors to target specific URLs:

```ts [maizzle.config.ts]
export default defineConfig({
  url: {
    query: {
      utm_source: 'maizzle',
      _options: {
        // Only links pointing at example.com
        tags: ['a[href*="example.com"]'],
      },
    },
  },
})
```

Supported matchers include `[attr]`, `[attr=value]`, `[attr*=value]` (contains), `[attr^=value]` (starts with), and `[attr$=value]` (ends with).

### attributes

Type: `string[]`\
Default: `['src', 'href', 'poster', 'srcset', 'background']`

URL attributes to append parameters to.

### strict

Type: `boolean`\
Default: `true`

When `true`, parameters are only appended to absolute URLs. Set to `false` to also process relative URLs.

### qs

Type: `object`\
Default: `{ encode: false }`

Options passed to the query-string library for serialization.

## Per-template

Use the `useUrlQuery` composable in `<script setup>` to scope params to a single template.

```vue [emails/launch.vue]
<script setup>
  useUrlQuery({
    utm_campaign: 'launch',
    _options: { tags: ['a', 'img'] },
  })
</script>
```

Merges with any global `url.query` defined in `maizzle.config.ts`.

## API

Use `urlQuery` programmatically to append query parameters to URLs in an HTML string.

```ts
import { urlQuery } from '@maizzle/framework'

// Just params — defaults to <a> tags, absolute URLs only
const out = urlQuery(
  '<a href="https://example.com">x</a>',
  { utm_source: 'newsletter' },
)

// Override behaviour with a third options arg
const wide = urlQuery(html, { ref: 'email' }, {
  tags: ['a', 'img'],
  attributes: ['href', 'src'],
  strict: false,
})
```

The first argument is an HTML string. The second is the params bag (`Record<string, unknown>`). The third is an optional `UrlQueryOptions` object — `tags`, `attributes`, `strict`, `qs`. Returns the transformed HTML string.
