---
title: Safe Selectors
description: Rewrite CSS selectors without escaped characters for safe use in email clients.
section: Transformers
order: 5
---

# Safe Selectors

Some email clients don't support class names with escaped characters. Gmail in particular will discard the entire `<style>` tag where such a rule is found, so you can't safely use CSS class names like `w-1/2` or `sm:block`.

Maizzle normalizes escaped character class names like `\:` or `\/` by replacing them with email-safe alternatives, so you can keep using those fancy Tailwind CSS class names and not have to worry about it.

## Usage

Safe selectors are enabled by default. You can explicitly set it in your config:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    safe: true,
  },
})
```

Both CSS selectors in `<style>` tags and `class` attributes in the rendered HTML are processed, so they stay in sync.

Given this template:

```vue [emails/example.vue]
<template>
  <Html>
    <Head />
    <Body>
      <Tailwind>
        <Container>
          <Text class="sm:text-sm hover:bg-blue-500 w-1/2">
            Hello
          </Text>
        </Container>
      </Tailwind>
    </Body>
  </Html>
</template>
```

The compiled output is rewritten to email-safe selectors — the escaped `:` and `/` in the original utilities get replaced with `-`:

```html
<style>
  .hover-bg-blue-500:hover { 
    background-color: #3b82f6; 
  }
  .w-1-2 { 
    width: 50%; 
  }
  @media (max-width: 600px) {
    .sm-text-sm { 
      font-size: 14px; 
      line-height: 20px; 
    }
  }
</style>
<p class="sm-text-sm hover-bg-blue-500 w-1-2">Hello</p>
```

## Default replacements

| Character | Replacement |
|-----------|-------------|
| `:` | `-` |
| `/` | `-` |
| `%` | `pc` |
| `.` | `_` |
| `,` | `_` |
| `#` | `_` |
| `[` | (removed) |
| `]` | (removed) |
| `(` | (removed) |
| `)` | (removed) |
| `{` | (removed) |
| `}` | (removed) |
| `!` | `-i` |
| `&` | `and-` |
| `<` | `lt-` |
| `=` | `eq-` |
| `>` | `gt-` |
| `\|` | `or-` |
| `@` | `at-` |
| `?` | `q-` |
| `\` | `-` |
| `"` | `-` |
| `'` | `-` |
| `*` | `-` |
| `+` | `-` |
| `;` | `-` |
| `^` | `-` |
| `` ` `` | `-` |
| `~` | `-` |
| `$` | `-` |

## Customization

You may define custom replacements. Your replacements are merged with the defaults:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    safe: {
      ':': '__',
      '/': '_',
    },
  },
})
```

With this config, `sm:text-base` becomes `sm__text-base` and `w-1/2` becomes `w-1_2`.

## Disabling

To disable safe class name rewriting:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    safe: false,
  },
})
```

## API

```ts
import { safeSelectors } from '@maizzle/framework'

const out = safeSelectors('<div class="sm:text-base"></div>', { safe: { ':': '__' } })
```
