---
title: Overview
description: How Maizzle transforms rendered HTML into production-ready email code
section: Transformers
order: 1
---

# Transformers

After Vue SSR renders your template to HTML, Maizzle runs it through a pipeline of transformers that optimize the output for email clients.

Some of the Transformers help you automate tedious tasks that are required when developing HTML emails, like inlining CSS, automatically adding attributes for better accessibility, or generating plaintext versions of your emails.

## Defaults

The following transformers are enabled by default:

- `css.inline` inlines CSS into element `style` attributes
- `css.purge` removes unused CSS
- `css.shorthand` rewrites longhand `margin` / `padding` / `border` to shorthand
- `css.safe` escapes Tailwind class names with `:`, `/`, etc.
- `html.format` pretty-prints the output (auto-skipped when `html.minify` is enabled)
- `html.decodeEntities` decodes HTML entities

Pass `false` on any of these keys to opt out.

## Disabling transformers

Disable the entire pipeline globally:

```ts [maizzle.config.ts]
export default defineConfig({
  useTransformers: false,
})
```

Or per-template via the [`useTransformers()`](/docs/api/composables#usetransformers) composable inside `<script setup>`. Pass `false` to disable all transformers, or an object to toggle individual ones:

```vue [emails/raw.vue]
<script setup>
  useTransformers(false)
  // or: useTransformers({ inlineCss: false, purgeCss: false })
</script>
```

::callout{type="info"}
Keys set to `true` force-enable that transformer even if it is disabled in the global config.
::

## Individual configuration

Each transformer can be configured individually through your config file. For example, CSS inlining and purging are controlled under the `css` key:

```ts [maizzle.config.ts]
export default defineConfig({
  css: {
    inline: true,
    purge: true,
    safe: true,
    shorthand: true,
  },
})
```

See the individual transformer pages for all available options.
