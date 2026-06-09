---
title: QrCode
description: Renders a scannable QR code as a Tailwind-styled, email-safe table.
section: Components
order: 30
---

# QrCode

Renders a scannable QR code as a `<table>` of colored cells. No SVG, no PNG, no images — just rows of `<tr>`/`<td>` that every email client can render.

## Usage

```vue [emails/example.vue]
<template>
  <Layout>
    <Container>
      <QrCode value="https://maizzle.com" /> // [!code highlight]
    </Container>
  </Layout>
</template>
```

QR codes don't make much sense on mobile since you can't use your phone to scan a code on the same phone's screen. Instead of hiding it, you could link the QR code to the same URL in the `value` prop, so mobile users can tap it as a fallback:

```vue [emails/example.vue]
<template>
  <Layout>
    <Container>
      <a href="https://maizzle.com"> // [!code highlight]
        <QrCode value="https://maizzle.com" />
      </a> // [!code highlight]
    </Container>
  </Layout>
</template>
```

::callout{type="warning"}
Outlook (classic) on Windows does not support wrapping tables in `<a>` tags, so the QR won't be clickable there. Consider adding a text link as a fallback for Outlook users.
::

## Sizing

Sizing is done via Tailwind utilities. By default, QR codes are 120px (`size-30`):

```vue
<!-- Set width and height together -->
<QrCode value="https://maizzle.com" class="size-40" />

<!-- Or just use width, height is proportional -->
<QrCode value="https://maizzle.com" class="w-40" />
<QrCode value="https://maizzle.com" class="w-[200px]" />
```

The component picks an integer pixel size for each cell that fits the requested table size, then sizes the outer table to match exactly — there's never an empty stripe between the cells and the table edge. The actual rendered width may therefore be a few pixels under the requested value.

::callout{type="info"}
If your project customizes Tailwind's `--spacing` token, pass an arbitrary value like `size-[200px]` so the cell math doesn't depend on the default 4 px-per-unit scale.
::

## Colors

### Background

Use any Tailwind `bg-*` or `dark:bg-*` utility on the component to change the QR's background color from the default white:

```vue
<QrCode value="https://maizzle.com" class="bg-teal-300 dark:bg-teal-700" />
```

The class lands on the `<table>` element. Light cells are transparent, so the table's background fills them.

### Foreground

Use the `qr:` variant to paint the data modules, the actual shapes that make up the QR. It composes with `dark:` like any other variant:

```vue
<QrCode
  value="https://maizzle.com"
  class="qr:bg-blue-900 dark:qr:bg-blue-100"
/>
```

::callout{type="info"}
The `qr:` variant is provided by [`@maizzle/tailwindcss`](https://github.com/maizzle/tailwindcss). If for some reason you are not using it in your project, register the variant yourself with `@custom-variant qr (& td.qd);`.
::

### Combined

Background and foreground colors can be set together:

```vue
<QrCode
  value="https://maizzle.com"
  class="bg-red-600 qr:bg-white dark:bg-gray-950 dark:qr:bg-amber-300"
/>
```

## Error correction

Higher levels of error correction add redundancy that lets the code stay scannable when partially obscured (a logo overlay, print smudge, etc.), at the cost of a larger matrix and smaller cells at a given size.

| Level | Recovery |
|-------|----------|
| `L` | ~7% |
| `M` | ~15% (default) |
| `Q` | ~25% |
| `H` | ~30% |

```vue {3}
<QrCode 
  value="https://maizzle.com" 
  ecc="H" 
/>
```

For on-screen email QR codes with no occlusion, `M` is plenty. Bump it up if you composite a logo over the center of the code, or if you expect the code to be printed.

## Quiet zone

The `border` prop controls the width of the light "quiet zone" around the code, expressed in modules. The QR spec recommends ≥ 4; the default of 1 is enough when the code sits in a clean content card with surrounding whitespace.

```vue
<QrCode value="https://maizzle.com" :border="4" />
```

Increase it when the code sits flush against colored backgrounds, photos, or other visual elements that could muddy the contrast boundary scanners rely on.

::callout{type="warning"}
Increasing the quiet zone also increases the HTML size of the code, since more cells are added around the edges. If you need a larger quiet zone but are tight on email size, try reducing the overall code size or error correction level to compensate.
::

## Accessibility

Use `alt` to set an `aria-label` on the QR's `<table>`, which is rendered with `role="img"`:

```vue
<QrCode value="https://maizzle.com" alt="Scan to visit Maizzle" />
```

Screen readers announce the table as an image with the provided label instead of attempting to read individual cells.

## Outlook dark mode

Dark mode in QR codes works via `prefers-color-scheme: dark`. 

Outlook desktop on Windows does not support media queries, so QR codes there always render with their light-mode colors. Default black/white colors get inverted in Outlook's auto dark-mode, so the code is still scannable.

## Props

### value

Type: `String`\
Default: _required_

The data to encode in the QR code. Can be any string — a URL, plain text, contact info, a Wi-Fi config, etc.

### ecc

Type: `'L' | 'M' | 'Q' | 'H'`\
Default: `'M'`

Error correction level. See [Error correction](#error-correction) above.

### border

Type: `Number`\
Default: `1`

Width of the quiet zone around the code, in modules. See [Quiet zone](#quiet-zone) above.

### alt

Type: `String`\
Default: `''`

Accessible label exposed via `aria-label` on the table.

## HTML size

This component may output tens or even hundreds of KB-worth of HTML for large or complex QR codes, severely increasing the risk of [Gmail clipping](/docs/glossary#gmail-clipping).

Knowing this, you should avoid rendering the same QR code multiple times in the same email, for example showing a linked QR code for mobile and a regular QR code for desktop, because of Outlook's lack of support for `<a>` around tables.

In such cases, consider using an image-based QR code instead.

## Examples

The component just encodes whatever string you pass to `value`. The conventions below are standard QR data formats that phone camera apps recognize natively — no app required on the recipient's side.

### Contact info

For compact contacts, **MECARD** fits in a small matrix:

```vue [emails/signature.vue]
<QrCode
  value="MECARD:N:Doe,Jane;TEL:+15551234567;EMAIL:jane@example.com;ORG:Acme Inc.;URL:https://example.com;;"
  alt="Save Jane Doe's contact"
/>
```

Grammar:

- `N:Last,First`
- `TEL:` phone (E.164 format recommended)
- `EMAIL:` address
- `ORG:` organization
- `URL:` website
- `ADR:,,Street,City,State,Postal,Country`
- `NOTE:` free-form text

For richer fields (photo, multiple phones, birthday, etc.), use **vCard 3.0**. The matrix is larger, so bump `ecc` to `Q` for reliable scanning:

```vue [emails/signature.vue]
<script setup>
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Doe;Jane
FN:Jane Doe
ORG:Acme Inc.
TEL;TYPE=CELL:+15551234567
EMAIL:jane@example.com
URL:https://example.com
END:VCARD`
</script>

<template>
  <QrCode :value="vcard" ecc="Q" alt="Save Jane Doe's contact" />
</template>
```

::callout{type="warning"}
Complex QR data significantly increases the number of modules in the code, resulting in a higher HTML size and increased risk of [Gmail clipping](/docs/glossary#gmail-clipping).
::

### Deep app URL

For an app you control, prefer **Universal Links (iOS) / App Links (Android)** — a regular `https://` URL the OS routes to your installed app, with a web fallback when the app isn't installed:

```vue [emails/order-confirmation.vue]
<QrCode
  value="https://app.example.com/orders/abc123?utm_source=email_qr"
  alt="Open order in the Acme app"
/>
```

A **custom URL scheme** opens the app directly when installed, but fails silently when it isn't (no web fallback):

```vue
<QrCode value="acme://orders/abc123" alt="Open order in the app" />
```

If you need both behaviors, point the QR at an `https://` URL on a domain configured for Universal Links and App Links. The OS handles dispatch — the user just scans.
