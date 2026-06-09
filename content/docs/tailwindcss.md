---
title: Tailwind CSS
description: Learn how to use Tailwind CSS to style HTML email templates with CSS utility classes.
section: Core Concepts
order: 1
navTitle: Tailwind CSS
---

# Tailwind CSS

Maizzle uses Tailwind CSS 4, configured and optimized for email client compatibility.

You style your templates or components with Tailwind like you're used to, and the framework compiles and lowers the modern CSS syntax so that it works across all major email clients.

## Usage

Use the `<Tailwind>` component to wrap any part of your template:

```vue [emails/example.vue]
<template>
  <Html>
    <Head />
    <Body>
      <Tailwind> // [!code ++]
        <Container class="bg-slate-100 p-4">
          <Text class="text-lg text-slate-800">Hello!</Text>
        </Container>
      </Tailwind> // [!code ++]
    </Body>
  </Html>
</template>
```

::callout{type="warning"}
A `<Head>` component must be present in the template when using `<Tailwind>`.
::

If you prefer a more hands-on approach, you may pull `@maizzle/tailwindcss` into your template yourself, either inline in a `<style>` tag or from an external stylesheet via a `<link>` tag inside your template's `<Head>`:

::code-tabs
  :::code-tab{label="style tag"}
  ```vue [emails/example.vue]
  <template>
    <Html>
      <Head>
        <style>
          @import "@maizzle/tailwindcss";
        </style>
      </Head>
      <Body class="bg-slate-100">
        <Container>
          <Text class="text-lg text-slate-800">Hello!</Text>
        </Container>
      </Body>
    </Html>
  </template>
  ```
  :::
  :::code-tab{label="link tag"}
  ```vue [emails/example.vue]
  <template>
    <Html>
      <Head>
        <link rel="stylesheet" href="../tailwind.css">
      </Head>
      <Body class="bg-slate-100">
        <Container>
          <Text class="text-lg text-slate-800">Hello!</Text>
        </Container>
      </Body>
    </Html>
  </template>
  ```
  :::
::

::callout{type="info"}
With the `<link>` approach, point `href` at a CSS file that imports the preset using a path relative to the template file.
::

At build time the [inline-link transformer](/docs/transformers/inline-link) replaces the `<link>` with a `<style>` tag containing the file's contents, which then goes through normal CSS processing.

Or just use our [`<Layout>`](/docs/components/layout) component, it has everything set up for you:

```vue [emails/example.vue]
<template>
  <Layout>
    <Container class="bg-slate-100 p-4">
      <Text class="text-lg text-slate-800">Hello!</Text>
    </Container>
  </Layout>
</template>
```

## Web vs. email

Email clients have limited and inconsistent CSS support. Maizzle uses several strategies to bridge the gap between the modern Tailwind CSS and email client rendering engines.

| Feature | Web | Maizzle |
|---------|-----|-------|
| CSS variables | Supported | Supported (resolved at build time) |
| `oklch()` colors | Supported | Supported (lowered to HEX) |
| CSS nesting like in <br>`:hover` or `@media` queries | Supported | Supported (flattened) |
| Class names with `:` | Supported | Rewritten (`sm:block` → `sm-block`) |

### Modern syntax

Tailwind CSS 4 uses modern CSS features like `oklch()` colors, CSS nesting, and custom properties. Most email clients don't support these, but Maizzle uses [Lightning CSS](https://lightningcss.dev/) and a few custom tools to lower this modern syntax to simpler CSS that works everywhere.

### Safe class names

Some email clients (notably Gmail) strip class names that contain special characters like `:` or `/`. The [Safe Selectors](/docs/transformers/safe-selectors) transformer rewrites those cool-looking Tailwind selectors like `sm:text-lg` to `sm-text-lg` so they work everywhere.

### CSS inlining

Gmail Android with an IMAP email address (aka [GANGA](/docs/glossary#ganga)) ignores `<style>` tags. Other clients, like older Outlooks, only use the first class in a `class=""` attribute, ignoring the rest.

Maizzle inlines Tailwind CSS utilities into `style` attributes, so your styling stays consistent.

::code-tabs
  :::code-tab{label="Source"}
  ```vue [emails/welcome.vue]
  <template>
    <Html>
      <Head />
      <Body>
        <Tailwind>
          <Text class="text-lg hover:text-blue-600">Hello</Text>
        </Tailwind>
      </Body>
    </Html>
  </template>
  ```
  :::
  :::code-tab{label="Compiled"}
  ```html
  <head>
    <style>
      .hover-text-blue-600:hover {
        color: #2563eb !important;
      }
    </style>
  </head>
  <body>
    <p 
      class="hover-text-blue-600" 
      style="margin: 16px 0; font-size: 18px; line-height: 28px;"
    >Hello</p>
  </body>
  ```
  :::
::

## Custom CSS

If you really have to, you can combine Tailwind with your own custom or inline CSS:

```html [emails/example.vue]
<template>
  <Html>
    <Head>
      <style>
        @import "@maizzle/tailwindcss";

        .custom-border {
          @apply rounded-lg;
          border: 2px solid #e2e8f0;
        }
      </style>
    </Head>
    <Body>
      <Container class="custom-border p-4" style="background-color: #facade;">
        ...
      </Container>
    </Body>
  </Html>
</template>
```

## Raw styles

To prevent CSS inside a `<style>` tag from being compiled, use the `raw` attribute:

```html
<style raw>
  /* Tailwind compilation disabled here, but may still be inlined */
</style>
```

::callout{type="info"}
`<style raw>` doesn't prevent CSS inlining or purging, use `<style embed>` for that.
::

## Configuration

`@maizzle/tailwindcss` is the email-friendly Tailwind CSS 4 configuration that ships with Maizzle. Besides adjusting Tailwind's defaults, it adds prose styles for HTML content, MSO utilities for Outlook on Windows, and variants for targeting specific email clients.

### Prose

`@maizzle/tailwindcss` ships with email-safe typography styles, similar to the `@tailwindcss/typography` plugin but tuned for email rendering quirks (no margin collapse, table-friendly defaults, no descendant selectors that break in Outlook).

Wrap rendered HTML or Markdown content in `prose` to get nicely styled headings, paragraphs, lists, blockquotes, and more out of the box:

```vue [emails/article.vue]
<template>
  <Layout>
    <Container class="prose">
      <h1>Hello world</h1>
      <p>Body copy with a <a href="#">link</a>.</p>
      <ul>
        <li>Item one</li>
        <li>Item two</li>
      </ul>
    </Container>
  </Layout>
</template>
```

Style individual element types via `prose-*` variants:

```html 
// [!code word:prose-headings\:text-brand] 
// [!code word:prose-a\:underline]
<div class="prose prose-headings:text-brand prose-a:underline">
  <h2>Headings inherit brand color</h2>
  <a href="#">Links get an underline.</a>
</div>
```

Available variants:

::content-wrap{max-height="350"}
| Variant | Targets |
|---------|---------|
| `prose-headings` | `h1, h2, h3, h4, h5, h6` |
| `prose-h1` … `prose-h6` | `h1` … `h6` |
| `prose-lead` | `[class~="lead"]` |
| `prose-p` | `p` |
| `prose-a` | `a` |
| `prose-strong` | `strong` |
| `prose-em` | `em` |
| `prose-kbd` | `kbd` |
| `prose-code` | `:not(pre) > code` |
| `prose-pre` | `pre` |
| `prose-blockquote` | `blockquote` |
| `prose-ul` | `ul` |
| `prose-ol` | `ol` |
| `prose-li` | `li` |
| `prose-dl` | `dl` |
| `prose-dt` | `dt` |
| `prose-dd` | `dd` |
| `prose-table` | `table` |
| `prose-thead` | `thead` |
| `prose-tr` | `tr` |
| `prose-th` | `th` |
| `prose-td` | `td` |
| `prose-img` | `img` |
| `prose-picture` | `picture` |
| `prose-video` | `video` |
| `prose-figure` | `figure` |
| `prose-figcaption` | `figcaption` |
| `prose-hr` | `hr` |
::

### MSO utilities

Outlook on Windows uses Microsoft Word as its rendering engine and supports a family of `mso-*` CSS properties for fine-tuning spacing, fonts, and layout that other clients ignore.

`@maizzle/tailwindcss` exposes these as utilities:

```html
<!-- Font tweaks for Outlook only -->
<p class="mso-ansi-font-size-16 mso-ansi-font-weight-bold">
  Outlook only font styling
</p>

<!-- Control line-height in Outlook -->
<p class="leading-6 mso-line-height-rule-exactly mso-line-height-alt-8">
  Outlook uses a line-height of 8px instead of 24px here.
</p>

<!-- Force-hide content in Outlook -->
<div class="mso-hide-all">Hidden in Outlook</div>
```

A few of the most useful ones:

| Utility | Purpose |
|---------|---------|
| `mso-line-height-alt-*` | Set an alternate line-height that only Outlook reads |
| `mso-line-height-rule-exactly` | Make Outlook honor `line-height` precisely |
| `mso-text-raise-*` | Vertically nudge an element |
| `mso-hide-all` / `mso-hide-none` | Hide from / show in Outlook |
| `mso-padding-alt-*` | Padding that only Outlook reads |
| `mso-font-width-*` | Used by [`<Spacer>`](/docs/components/spacer) for horizontal spacing in Outlook |

::callout{type="info"}
See [`mso.css`](https://raw.githubusercontent.com/maizzle/tailwindcss/refs/heads/master/mso.css) for the full list of MSO utilities provided, or the [Microsoft Office HTML and XML Reference](https://stigmortenmyre.no/mso/) if you really want to go down this rabbit hole.
::

## Email client targeting

`@maizzle/tailwindcss` ships with variants for styling elements for specific email clients.

These are useful because email clients have various levels of CSS support and rendering quirks, so you can write client-specific fixes without affecting how it looks elsewhere.

```html
<!-- [!code word:gmail\:text-gray-600] -->
<p class="text-gray-950 gmail:text-gray-600">
  Dark text in most clients, but lighter in Gmail.
</p>

<!-- [!code word:ios\:text-2xl] -->
<p class="text-base ios:text-2xl">
  Bigger text in iOS Mail
</p>

<!-- Combine variants -->
<!-- [!code word:dark\:ios\:text-white] -->
<p class="dark:ios:text-white">
  White text in dark mode on iOS Mail
</p>
```

Available client variants:

::content-wrap{max-height="350"}
| Variant | Targets |
|---------|---------|
| `gmail:` | Gmail (web) |
| `gmail-android:` | Gmail on Android |
| `gmail-ipad:` | Gmail on iPad |
| `apple-mail:` | Apple Mail (recent versions) |
| `apple-mail-10:` | Apple Mail 10 (legacy) |
| `ios:` | iOS Mail |
| `ios-10:` / `ios-13:` | Specific iOS Mail versions |
| `outlook-mac:` | Outlook for Mac |
| `outlook-android:` | Outlook for Android |
| `yahoo:` | Yahoo! and AOL Mail |
| `airmail:` | Airmail |
| `comcast:` | Comcast |
| `edison:`, `edison-ios:`, `edison-android:` | Edison Mail |
| `freenet:` | Freenet |
| `notion:` | Notion Mail |
| `ogsc:` / `ogsb:` | Outlook.com dark mode (text / background) |
| `ox:` | Open-Xchange |
| `spark:` | Spark |
| `superhuman:` | Superhuman |
| `thunderbird:` | Thunderbird |
::

::callout{type="info"}
For targeting Outlook on Windows, use the [`<Outlook>`](/docs/components/outlook) component or the `mso-*` utilities.
::

### Escaped selectors

Yahoo and AOL will replace the `.&` with their wrapping ID name. To target it, the `yahoo:` variant compiles to a selector that contains the escape sequence `\&`:

```css
.\& .yahoo-text-2xl { font-size: 24px !important }
```

That backslash is a problem for Gmail, which drops the **entire `<style>` tag** the moment its CSS parser sees a `\` character. If you mix `yahoo:` utilities with regular Tailwind classes in the same `<Tailwind>` block, all of those styles end up in one `<style>` tag, and Gmail throws it away.

The fix is to isolate `yahoo:` utilities in their own `<Tailwind>` block so they compile into a separate `<style>` tag:

::code-tabs
  :::code-tab{label="Source"}
  ```vue [emails/welcome.vue]
  <template>
    <Html>
      <Head />
      <Body>
        <Tailwind>
          <Text class="yahoo:text-2xl">Limited-time offer.</Text>
        </Tailwind>

        <Tailwind>
          <Text class="text-2xl hover:text-blue-600">Limited-time offer.</Text>
        </Tailwind>
      </Body>
    </Html>
  </template>
  ```
  :::
  :::code-tab{label="Compiled"}
  ```html
  <head>
    <style>
      .\& .yahoo-text-2xl {
        font-size: 24px !important;
        line-height: 32px !important;
      }
    </style>
    <style>
      .hover-text-blue-600:hover {
        color: #2563eb !important;
      }
    </style>
  </head>
  <body>
    <p
      class="yahoo-text-2xl"
      style="font-size: 16px; line-height: 24px; margin-top: 16px;"
    >Limited-time offer.</p>
    <p
      class="hover-text-blue-600"
      style="margin-top: 16px; font-size: 24px; line-height: 32px;"
    >Limited-time offer.</p>
  </body>
  ```
  :::
::

This generates two separate `<style>` tags, Gmail will only discard the Yahoo-targeting one.

### Stacking with `dark:`

The `ios:` variant compiles to a `@supports` block, and Tailwind's `dark:` variant compiles to `@media (prefers-color-scheme: dark)`. Stacking them, for example `dark:ios:text-white`, produces nested at-rules:

```css
@media (prefers-color-scheme: dark) {
  @supports (-webkit-overflow-scrolling: touch) and (aspect-ratio: 1 / 1) {
    .dark-ios-text-white { color: #fff !important }
  }
}
```

Gmail's CSS parser does not handle nested at-rules and discards the entire `<style>` tag when it sees one. Use the same pattern as for Yahoo Mail: keep the stacked utilities in their own `<Tailwind>` block so they compile into a separate `<style>` tag.

```vue [emails/promo.vue]
<template>
  <Html>
    <Head />
    <Body>
      <Tailwind>
        <Text class="dark:ios:text-white">Dark mode on iOS</Text>
      </Tailwind>

      <Tailwind>
        <Text class="text-base">Everything else</Text>
      </Tailwind>
    </Body>
  </Html>
</template>
```

::callout{type="info"}
This applies to any client variant that compiles to an at-rule, like `ios-10:` or `gmail-ipad:`.
::

## Customization

Tailwind CSS 4 is configured in CSS, there's no `tailwind.config.js` anymore. You customize the theme directly inside the `<style>` tag or via the `#config` slot on the [`<Tailwind>`](/docs/components/tailwind) component.

### Theme tokens

Use `@theme` to add or override design tokens (colors, fonts, spacing, breakpoints, …):

```xml [emails/example.vue]
<template>
  <Layout>
    <Head>
      <style>
        @import "@maizzle/tailwindcss";

        @theme {
          --color-brand: #4f46e5;
          --color-brand-dark: #3730a3;
          --font-display: "Inter", sans-serif;
        }
      </style>
    </Head>
    <Container class="bg-brand-dark">
      <Text class="text-brand font-display">Hello!</Text>
    </Container>
  </Layout>
</template>
```

Anything declared under `@theme` becomes a utility (`text-brand`, `bg-brand-dark`, `font-display`…) and is available in your templates and components.

### Override defaults

Use the same token names as Tailwind's defaults to override them. For example, redefine the default `sans` font or the `slate` palette:

```postcss [css]
@theme {
  --font-sans: "Inter", "Helvetica Neue", Arial, sans-serif;
  --color-slate-50: #f8fafc;
  --color-slate-900: #0f172a;
}
```

### Custom variants

Define your own variants with `@custom-variant`. For example, here's an `any-hover:` variant that only applies hover styles in clients where the user has a pointing device:

::code-tabs
  :::code-tab{label="tailwind.css"}
  ```postcss
  @import "@maizzle/tailwindcss";

  @custom-variant any-hover {
    @media (any-hover: hover) {
      &:hover {
        @slot;
      }
    }
  }
  ```
  :::
  :::code-tab{label="emails/example.vue"}
  ```html 
  // [!code word:any-hover\:text-blue-700]
  <a href="#" class="text-blue-600 any-hover:text-blue-700">
    Read more
  </a>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html 
  <head>
    <style>
      @media (any-hover: hover) {
        .any-hover-text-blue-700:hover {
          color: #155dfc !important;
        }
      }
    </style>
  </head>
  <body>
    <a href="#" class="any-hover-text-blue-700" style="color: #155dfc;">
      Read more
    </a>
  </body>
  ```
  :::
::

### Per-template config

Pass a config slot to the [`<Tailwind>`](/docs/components/tailwind) component to scope tokens to one template:

```vue [emails/promo.vue]
<template>
  <Tailwind>
    <template #config>
      @import "@maizzle/tailwindcss";

      @theme {
        --color-brand: #f59e0b;
      }
    </template>

    <Body>
      <Text class="text-brand">Limited-time offer.</Text>
    </Body>
  </Tailwind>
</template>
```

## Intellisense

To get [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) working, you need an actual `.css` file that imports Tailwind in your project. For example, the official Maizzle starter includes a `tailwind.css` file:

```css [tailwind.css]
@import "@maizzle/tailwindcss";
```
