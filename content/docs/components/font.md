---
title: Font
description: Loads a web font in your email and registers a Tailwind utility class for it.
section: Components
order: 11
---

# Font

`<Font>` makes it trivial to use web fonts in emails by loading the CSS for it from the provider you specify and automatically registering a Tailwind utility class for it.

::callout{type="info"}
Web font support in email clients is limited, use this as a progressive enhancement.
::

## Usage

Drop the component anywhere in your template:

```vue [emails/example.vue]
<template>
  <Layout>
    <Font family="Roboto" /> // [!code ++]
    <Container>
      <h1 class="font-roboto">Hello</h1>
    </Container>
  </Layout>
</template>
```

With the above example, Maizzle will inject a stylesheet `<link>` into `<head>` and will configure a `--font-roboto` in Tailwind so that the `font-roboto` utility just works.

Result:

```html
<head>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
    rel="stylesheet"
    media="screen"
  >
  <style>
    @import "@maizzle/tailwindcss";

    @theme {
      --font-roboto: Roboto, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    }
  </style>
</head>
```

::callout{type="info"}
The `--font-{slug}` variable is merged into the same `<style>` block that imports Tailwind, so the `font-{slug}` utility is generated in the same compilation pass. Without a Tailwind import, Maizzle emits a plain `.font-{slug} { font-family: ... }` rule instead, so the class still works.
::

You may also use the `useFont` composable directly in `<script setup>`:

```vue [emails/example.vue]
<script setup>
  useFont({ family: 'Roboto', weights: [400, 600] })
</script>
```

### Weights

Pass an array of weights to the `weights` prop:

```vue [emails/example.vue]
<template>
  <Font family="Roboto" :weights="[400, 600, 700]" />
</template>
```

### Italic

Use the `styles` prop to load italic variants alongside (or instead of) the regular weight:

```vue [emails/example.vue]
<template>
  <!-- Both normal and italic for each weight -->
  <Font family="Roboto" :weights="[400, 700]" :styles="['normal', 'italic']" />

  <!-- Italic only -->
  <Font family="Roboto" :styles="['italic']" />
</template>
```

### Multiple fonts

Of course, you may register more than one font:

```vue [emails/example.vue]
<template>
  <Font family="Inter" :weights="[400, 700]" />
  <Font family="JetBrains Mono" :weights="[400]" />
</template>
```

### font-display

Set the `font-display` strategy with the `display` prop:

```vue [emails/example.vue]
<template>
  // [!code word:display="optional"]
  <Font family="Roboto" display="optional" />
</template>
```

`font-display` controls how the browser handles text while a custom font is loading. 

Values like `swap` show fallback text immediately and swap in the custom font when it arrives, while `optional` lets the browser skip the custom font on slow connections to avoid layout shift. See the [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) for the full list of strategies.

### Bunny Fonts

Use the `provider` prop to load fonts from [Bunny Fonts](https://fonts.bunny.net), a privacy-friendly Google Fonts alternative:

```vue [emails/example.vue]
<template>
  // [!code word:provider="bunny"]
  <Font family="Open Sans" provider="bunny" :weights="[400, 700]" />
</template>
```

### Custom URL

If you self-host or use a provider that builds its own URLs, pass it through the `url` prop:

```vue [emails/example.vue]
<template>
  <Font
    family="Acme Sans"
    url="https://cdn.example.com/fonts/acme-sans.css"
  />
</template>
```

::callout{type="warning"}
When `url` is set, the `provider`, `weights`, `display`, and `styles` props are ignored — encode them in the URL yourself.
::

### Fallbacks

Multi-word family names are automatically wrapped in double quotes, and a category-aware fallback stack is appended. For example, `<Font family="Open Sans" />` produces:

```css
--font-open-sans: "Open Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
```

Maizzle picks the fallback stack based on the family name:

| Category | Default fallback |
| --- | --- |
| Sans-serif | `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` |
| Serif | `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif` |
| Monospace | `ui-monospace, Menlo, Consolas, monospace` |
| Display | `Impact, "Arial Black", system-ui, sans-serif` |
| Handwriting | `"Segoe Script", "Brush Script MT", cursive` |

For unknown family names, the sans-serif stack is used.

You may override the fallback with the `fallback` prop:

```vue [emails/example.vue]
<template>
  <Font family="Roboto" fallback="Verdana, sans-serif" />
</template>
```

## Props

### family

Type: `String`\
Default: _required_

A single font family name, e.g. `"Roboto"` or `"Open Sans"`. Your IDE will suggest names from a list of 25 popular Google Fonts.

For fallback fonts, use the `fallback` prop instead of a comma-separated list here.

### weights

Type: `Number[]`\
Default: `[400]`

Font weights to load. Sorted ascending before the URL is built. Ignored when `url` is set.

### styles

Type: `Array<'normal' | 'italic'>`\
Default: `['normal']`

Font styles to load. Including `'italic'` switches the URL to the `ital,wght` axis. Ignored when `url` is set.

### display

Type: `'auto' | 'block' | 'swap' | 'fallback' | 'optional'`\
Default: `'swap'`

The `font-display` value appended to the stylesheet URL. Ignored when `url` is set.

### fallback

Type: `String`\
Default: _category default_

Custom font-family fallback stack for the `--font-{slug}` declaration. When omitted, a category-aware stack is chosen automatically — see [Fallbacks](#fallbacks) for the table.

### provider

Type: `'google' | 'bunny'`\
Default: `'google'`

Which font provider to build the stylesheet URL for. Ignored when `url` is set.

### url

Type: `String`\
Default: `''`

A pre-built stylesheet URL. When set, it's used as-is for the `<link href>` and the `provider`, `weights`, `display`, and `styles` props are ignored.

::callout{type="info"}
Fonts are deduplicated by family name. If you register the same family more than once, only the first registration wins.
::
