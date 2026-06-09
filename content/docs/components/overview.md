---
title: Overview
description: "How components work in Maizzle: auto-imports, built-in email components, creating your own."
section: Components
order: 0
---

# Components

Maizzle includes 30+ Vue components that produce email-client-compatible HTML. 

They make it easy to create layouts that render well across email clients without needing to write complex tables or inline styles. You can also create your own components to encapsulate reusable patterns and custom logic.

## Auto-import

All built-in components are automatically available in your templates, there is no need to manually import them. Also, any components that you add to paths defined in [`components.source`](/docs/development/configuration#componentssource) are auto-imported as well.

::callout{type="info"}
If your editor isn't picking up auto-imported components, make sure to [update your editor setup](/docs/editor-setup#type-declarations), or simply restart its TS server/extension host.
::

## Built-in components

The built-in components cover the most common HTML email design patterns in a modern workflow, from basic structures or content elements to special components that enable Tailwind support or render Markdown.

### Structure

| Component | Description |
|-----------|-------------|
| [Html](/docs/components/html) | Document root with `lang`, `dir`, and VML namespace attributes |
| [Head](/docs/components/head) | Email `<head>` with essential meta tags |
| [Body](/docs/components/body) | `<body>` element with resets |
| [Container](/docs/components/container) | Centered content wrapper |
| [Section](/docs/components/section) | Full-width content block |
| [Row](/docs/components/row) | Container for columns |
| [Column](/docs/components/column) | Individual column within a Row |
| [Layout](/docs/components/layout) | Opinionated email layout wrapper |

### Content

| Component | Description |
|-----------|-------------|
| [Button](/docs/components/button) | CTA button element |
| [Img](/docs/components/img) | Responsive image with dark mode support |
| [Spacer](/docs/components/spacer) | Vertical and horizontal spacing |
| [Hr](/docs/components/hr) | Horizontal line separator |
| [Preheader](/docs/components/preheader) | Hidden inbox preview text |
| [Heading](/docs/components/heading) | Headings with semantic markup |
| [Text](/docs/components/text) | Semantic text wrapper |
| [Link](/docs/components/link) | Unstyled hyperlink |

### Special

| Component | Description |
|-----------|-------------|
| [Tailwind](/docs/components/tailwind) | Enables Tailwind CSS for styling |
| [Markdown](/docs/components/markdown) | Render markdown content |
| [Font](/docs/components/font) | Use custom fonts |
| [CodeBlock](/docs/components/codeblock) | Syntax-highlighted code blocks |
| [CodeInline](/docs/components/codeinline) | Inline code formatting |
| [Outlook](/docs/components/outlook) | Show content only in Outlook |
| [NotOutlook](/docs/components/notoutlook) | Hide content from Outlook |
| [Plaintext](/docs/components/plaintext) | Show content in plaintext only |
| [NotPlaintext](/docs/components/plaintext) | Strip content from plaintext output |
| [QrCode](/docs/components/qrcode) | Generate inline QR codes using tables |
| [OutlookBg](/docs/components/outlookbg) | Outlook background images with VML |
| [NoWidows](/docs/components/nowidows) | Prevent orphaned words |
| [WithUrl](/docs/components/withurl) | Add base URLs and tracking query params |
| [Raw](/docs/components/raw) | Emit content verbatim, bypassing Vue parsing |

## Creating components

To define your own component, start by creating a `.vue` <abbr title="Single File Component">SFC</abbr> in your project's `components` directory. For example, here's an `Alert` component that wraps content in a styled box:

```vue [components/Alert.vue]
<script setup>
  // Component logic goes here
</script>

<template>
  <div class="p-4 border-l-4 border-yellow-500 bg-yellow-100 text-yellow-700">
    <slot />
  </div>
</template>
```

Save the file and use it in any template:

```vue [emails/welcome.vue] {3-5}
<template>
  <Layout>
    <Alert>
      Hurry while stocks last!
    </Alert>
  </Layout>
</template>
```

### Props

Most built-in components accept props to customize their behavior and appearance.

Your editor should pick up props for both built-in and custom components, showing you type hints and autocompletion as you work. If not, make sure to [update your editor setup](/docs/editor-setup#type-declarations), or simply restart its TS server/extension host.

If you're not familiar with Vue, props are custom attributes that you can pass to components to configure them. For example, let's add a `type` prop to the `Alert` component:

```vue [components/Alert.vue]
<script setup>
  defineProps({
    type: {
      type: String,
      default: 'warning',
    },
  })
</script>

<template>
  <div :class="[
    'p-4 border-l-4',
    type === 'warning' ? 'border-yellow-500 bg-yellow-100 text-yellow-700' : '',
    type === 'error' ? 'border-red-500 bg-red-100 text-red-700' : '',
    type === 'info' ? 'border-blue-500 bg-blue-100 text-blue-700' : '',
  ]">
    <slot />
  </div>
</template>
```

```vue [emails/welcome.vue]
<template>
  <Layout>
    <Alert type="error">
      Now you really screwed up.
    </Alert>
  </Layout>
</template>
```

### Slots

Use slots to pass content into your components:

```vue [components/Card.vue]
<template>
  <div class="bg-white rounded-lg p-6">
    <slot /> // [!code ++]
  </div>
</template>
```

Named slots work too:

::code-tabs
  :::code-tab{label="components/Card.vue"}
  ```vue [components/Card.vue]
  <template>
    <div class="bg-white rounded-lg p-6">
      <div class="mb-4">
        <slot name="header" />
      </div>
      <slot />
      <div class="mt-4">
        <slot name="footer" />
      </div>
    </div>
  </template>
  ```
  :::
  :::code-tab{label="emails/promo.vue"}
  ```vue [emails/promo.vue]
  <template>
    <Card>
      <template #header>
        <Heading tag="h2">Special Offer</Heading>
      </template>
      <Text>Get 50% off your first order.</Text>
      <template #footer>
        <Button href="https://example.com">Shop Now</Button>
      </template>
    </Card>
  </template>
  ```
  :::
::

### Markdown

Components can also be authored as `.md` files. Drop one into your `components` directory and Maizzle auto-registers it under its PascalCased filename, just like a `.vue` component:

```md [components/Promo.md]
## Big Sale

Get **50% off** your first order this weekend only.

<Button href="https://example.com">Shop now</Button>
```

```vue [emails/welcome.vue]
<template>
  <Layout>
    <Container class="max-w-xl">
      <Promo /> // [!code ++]
    </Container>
  </Layout>
</template>
```

You can mix Vue components freely inside the markdown — `<Button>`, `<Img>`, your own components, anything auto-imported.

::callout{type="info"}
Unlike `.md` files used as entry-point templates (which are auto-wrapped in [`MarkdownLayout`](/docs/development/templates#default-layout)), `.md` files inside a `components/` directory are treated as plain fragments, meaning they render exactly what their content produces, with no wrapping shell added.
::

To accept props or use logic, add a `<script setup>` block at the top:

```md [components/Promo.md]
<script setup>
defineProps({
  discount: { type: Number, default: 50 },
})
</script>

## Big Sale

Get **{{ discount }}% off** your first order this weekend only.

<Button href="https://example.com">Shop now</Button>
```

```vue [emails/welcome.vue]
<template>
  <Layout>
    <Container class="max-w-xl">
      <Promo :discount="25" />
    </Container>
  </Layout>
</template>
```

Slots work the same as in `.vue` components — drop a `<slot />` anywhere in the markdown body to receive content from the parent template.

## Locations

By default, Maizzle looks for custom components in the `components` directory at the root of your project. You may configure additional directories:

```ts [maizzle.config.ts]
export default defineConfig({
  components: {
    source: ['components', 'src/shared/email-components'],
  },
})
```

### Folder namespacing

Subfolder names automatically become a prefix on the component name. This means you can have multiple components with the same filename across different folders without conflicts:

```
components/
├── card/
│   └── Header.vue   ← <CardHeader />
└── alert/
    └── Header.vue   ← <AlertHeader />
```

::callout{type="info"}
If a filename already begins with the folder name (e.g. `card/CardFooter.vue`), the prefix is not duplicated — you'd still use `<CardFooter />`, not `<CardCardFooter />`.
::

### Custom prefixes

For finer control, pass an object with a `prefix` instead of a string. Useful when you want a recognizable namespace that doesn't match the folder name:

```ts [maizzle.config.ts]
export default defineConfig({
  components: {
    source: [
      { path: 'src/widgets', prefix: 'W' },
    ],
  },
})
```

Result: `src/widgets/Button.vue` is used as `<WButton />`.

### Flattening nested folders

Set `pathPrefix: false` to skip intermediate folder names. The `prefix` is still applied, but subfolder structure is ignored — handy for icon sets or design-system primitives where folders are organizational only:

```ts [maizzle.config.ts]
export default defineConfig({
  components: {
    source: [
      { path: 'src/icons', prefix: 'Icon', pathPrefix: false },
    ],
  },
})
```

| File path | Resolved name |
| --- | --- |
| `src/icons/social/Twitter.vue` | `<IconTwitter />` |
| `src/icons/ui/Chevron.vue`     | `<IconChevron />` |

::callout{type="warning"}
With `pathPrefix: false`, two files with the same basename in different folders will collide on the same component name. Maizzle throws an error at startup pointing at both files — rename one or split them into separate sources.
::

### Overriding built-in components

You can override any [built-in component](#built-in-components) by creating a file with the same name in your `components/` directory (or any directory listed in `components.source`). For example, `components/Layout.vue` in your project will override the built-in `<Layout />`.

```
components/
└── Layout.vue   ← replaces the built-in <Layout />
emails/
└── welcome.vue  ← will use your custom <Layout />
```

::callout{type="warning"}
Shadow detection runs once when the dev server starts. If you **add** or **delete** a top-level component that shadows a built-in while `maizzle serve` is running, restart the dev server so the change takes effect.
::
