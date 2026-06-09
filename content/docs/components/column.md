---
title: Column
description: An individual column within a Row component.
section: Components
order: 8
---

# Column

An individual column within a Row. Renders a `<div>` that auto-sizes from its parent and together with its siblings, with table-based fallback for Outlook classic.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Layout>
      <Container class="max-w-xl">
        <Row>
          <Column>
            <Text>Left column</Text>
          </Column>
          <Column>
            <Text>Right column</Text>
          </Column>
        </Row>
      </Container>
    </Layout>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {12-25}
  <!DOCTYPE html>
  <html lang="en" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- ... -->
    </head>
    <body xml:lang="en" style="margin: 0; width: 100%; height: 100%; padding: 0; word-break: break-word;">
      <div role="article" aria-roledescription="email" lang="en" dir="ltr" style="font-size: medium; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans', Ubuntu, Cantarell, 'Helvetica Neue', sans-serif; font-size: max(16px, 1rem);">
      <!--[if mso]><table role="none" cellpadding="0" cellspacing="0" style="width: 576px" align="center"><tr><td><![endif]-->
      <div style="margin: 0 auto; max-width: 576px;">
        <!--[if mso]><table role="none" cellpadding="0" cellspacing="0" style="width: 100%"><tr><![endif]-->
        <div style="font-size: 0;">
          <!--[if mso]><td style="width: 288px; vertical-align: top"><![endif]-->
          <div style="width: 288px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">
            <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">
              Left column
            </p>
          </div>
          <!--[if mso]></td><![endif]-->
          <!--[if mso]><td style="width: 288px; vertical-align: top"><![endif]-->
          <div style="width: 288px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">
            <p style="margin: 16px 0; font-size: 16px; line-height: 24px;">
              Right column
            </p>
          </div>
          <!--[if mso]></td><![endif]-->
        </div>
        <!--[if mso]></tr></table><![endif]-->
      </div>
      <!--[if mso]></td></tr></table><![endif]-->
    </div>
    </body>
  </html>
  ```
  :::
::

Each Column renders a `<div>` with auto-calculated `width` and: 

- `display: inline-block` to sit side by side with siblings and stack when space runs out
- `vertical-align: top` for aligning content to the top in tall columns 
- `font-size: medium` to reset `font-size: 0` inherited from its parent `<Row>`

For Outlook (classic), the `<div>` is also wrapped in a `<td>` with the same `width`, so columns render side by side instead of stacking.

## Auto-sizing

Each Column figures out its own width from the parent. Drop two Columns into a 576px Container and they're 288px each. Drop three and they're 192px each.

If one Column has a fixed width (like `w-5` or `width="200"`), its siblings split what's left. And of course, padding and borders on the Column are subtracted automatically so the total widths still add up correctly.

By default, Columns sit side by side on desktop and stack one at a time when the parent gets too narrow to fit them. No `@media` queries needed.

## Modern mode

Columns inside a layout component that has `:outlook-fallback="false"` render as simple `<div>`s without the MSO fallback. This is ideal for modern email clients that support `display: inline-block` and don't require the extra table structure.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Layout :outlook-fallback="false">
      <Container class="max-w-xl">
        <Row>
          <Column>Left column</Column>
          <Column>Right column</Column>
        </Row>
      </Container>
    </Layout>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {3-8}
  <div style="margin: 0 auto; max-width: 576px;">
    <div style="font-size: 0;">
      <div style="width: 288px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">
        Left column
      </div>
      <div style="width: 288px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">
        Right column
      </div>
    </div>
  </div>
  ```
  :::
::

::callout{type="info"}
All layout components support the `outlook-fallback` prop: `<Layout>`, `<Container>`, `<Section>`, `<Row>`, `<Column>`.
::

## Props

### width

Type: `string | number`\
Default: `null`

Override the auto-calculated column width. Can be used instead of Tailwind width classes.

```vue
<template>
  <Row>
    <Column :width="200">
      <Text>Fixed 200px</Text>
    </Column>
    <Column>
      <Text>Auto-sized — splits the remainder with siblings</Text>
    </Column>
  </Row>
</template>
```

### msoStyle

Type: `string`\
Default: `undefined`

Applies inline CSS only to the MSO `<td>` element. Use this when you need Outlook-specific styling for the `<td>`, that shouldn't affect the main `<div>` used by other clients.

```vue
<template>
  <Column mso-style="padding: 8px">
    <Text>Extra padding in Outlook only.</Text>
  </Column>
</template>
```

### outlookFallback

Type: `boolean`\
Default: `true`

Toggle Outlook (classic) fallback markup for this Column and its descendants.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue [emails/example.vue]
  <template>
    <Container class="max-w-xl">
      <Row>
        <Column :outlook-fallback="false">First</Column>
        <Column>Second</Column>
      </Row>
    </Container>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html {5}
  <!--[if mso]><table role="none" cellpadding="0" cellspacing="0" style="width: 576px" align="center"><tr><td><![endif]-->
  <div style="margin: 0 auto; max-width: 576px;">
    <!--[if mso]><table role="none" cellpadding="0" cellspacing="0" style="width: 100%"><tr><![endif]-->
    <div style="font-size: 0;">
      <div style="width: 288px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">First</div>
      <!--[if mso]><td style="width: 288px; vertical-align: top"><![endif]-->
      <div style="width: 288px; max-width: 100%; display: inline-block; vertical-align: top; font-size: medium">Second</div>
      <!--[if mso]></td><![endif]-->
    </div>
    <!--[if mso]></tr></table><![endif]-->
  </div>
  <!--[if mso]></td></tr></table><![endif]-->
  ```
  :::
::

::callout{type="warning"}
This can break Outlook (classic) if used on just one out of multiple Columns within a Row (as seen above). The fallback markup relies on all sibling Columns being wrapped in `<td>`.
::

## Patterns

Common email design patterns with rows and columns.

### Equal columns, stack naturally on mobile

Default behavior, no width classes needed.

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column>Left</Column>
      <Column>Right</Column>
    </Row>
  </Container>
</template>
```

Each column gets `min-width: 288px`. Side-by-side on desktop, stacks below `~576px`.

### Percentage widths never stack

Use Tailwind fractional width utilities if you don't want columns stacking automatically.

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column class="w-1/3">1</Column>
      <Column class="w-1/3">2</Column>
      <Column class="w-1/3">3</Column>
    </Row>
  </Container>
</template>
```

### Percentage widths, mobile full width

Reset the column to full width below the `sm` breakpoint.

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column class="w-1/3 max-sm:min-w-full">1</Column>
      <Column class="w-1/3 max-sm:min-w-full">2</Column>
      <Column class="w-1/3 max-sm:min-w-full">3</Column>
    </Row>
  </Container>
</template>
```

::callout{type="info"}
This pattern uses `@media` queries, so treat it as a progressive enhancement for clients like [GANGA](/docs/glossary#ganga), where support is lacking.
::

### Custom mobile widths

Mix widths per breakpoint, using `@media` queries.

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column class="w-1/3 max-sm:w-1/2">
        1/3 desktop, 1/2 mobile
      </Column>
      <Column class="w-1/3 max-sm:w-1/2">
        1/3 desktop, 1/2 mobile
      </Column>
      <Column class="w-1/3 max-sm:min-w-full">
        1/3 desktop, full mobile
      </Column>
    </Row>
  </Container>
</template>
```

### Force equal heights

Use `display: table-cell` so columns physically match heights, while `inline-block` remains the default for stacking.

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      // [!code word:table-cell]
      <Column class="table-cell sm:block sm:w-full"> 
        Short
      </Column>
      <Column class="table-cell sm:block sm:w-full">
        This column is much taller. The shorter sibling fills its full height too.
      </Column>
    </Row>
  </Container>
</template>
```

::callout{type="info"}
This requires using `@media` queries for stacking columns on mobile, as shown above.
::

### Reverse stack on mobile

Use CSS table display modes to reorder rows on mobile without rewriting markup. 

`table-header-group` floats to the top, `table-footer-group` to the bottom.

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row class="max-sm:table max-sm:w-full">
      <Column class="max-w-1/3 max-sm:table-footer-group">
        Renders 3rd on mobile
      </Column>
      <Column class="max-w-1/3 max-sm:table-footer-group">
        Renders 2nd on mobile
      </Column>
      <Column class="max-w-1/3 max-sm:table-header-group">
        Renders 1st on mobile
      </Column>
    </Row>
  </Container>
</template>
```

### Stack by default, columns on desktop (mobile-first)

Switch from stacked to horizontal at the `sm` breakpoint.

```vue
<template>
  <Container class="max-w-xl">
    <Row >
      <Column class="w-full min-sm:w-1/3">Column 1</Column>
      <Column class="w-full min-sm:w-1/3">Column 2</Column>
      <Column class="w-full min-sm:w-1/3">Column 3</Column>
    </Row>
  </Container>
</template>
```

::callout{type="warning"}
This breaks in clients that do not support `@media` queries. It can also show columns stacked on desktop if the viewport is narrow enough to trigger the `sm` breakpoint and `@media` queries are supported.
::

### Gutters between columns

The cleanest way to add a gap between columns is a spacer `Column` with a fixed width. Auto-width siblings absorb the remainder, so the row stays full-width with the gutter sitting cleanly between them.

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column>Left</Column>
      <Column class="w-5" />
      <Column>Right</Column>
    </Row>
  </Container>
</template>
```

In a 576px container, the spacer takes 20px (`w-5`), and the two content columns split the remaining 556px (278px each). No padding tricks, no outer bleed, and the spacer is a real grid slot so Outlook gets a proper MSO `<td>` for it.

For more than two content columns, drop a spacer between each pair:

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column>1</Column>
      <Column class="w-5" />
      <Column>2</Column>
      <Column class="w-5" />
      <Column>3</Column>
    </Row>
  </Container>
</template>
```

#### Asymmetric padding

For two-column layouts where you'd rather not add a spacer col, put half the gap on each side via `pr-*` and `pl-*`:

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column class="pr-2.5">Left</Column>
      <Column class="pl-2.5">Right</Column>
    </Row>
  </Container>
</template>
```

Each col gets the outer 288px slot. The inner padding (10 + 10) gives a 20px gap between content, with no padding on the row's outer edges.

The downside is that the padding eats into the column's width and you then need to reset it for mobile in order to have the content align properly. Also, this gets messy fast when using more than two columns.

#### Symmetric padding (gutter + outer)

If you want padding between columns **and** on the row's outer edges, use `px-*`:

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column class="px-2">1</Column>
      <Column class="px-2">2</Column>
      <Column class="px-2">3</Column>
    </Row>
  </Container>
</template>
```

Problem with this is that the space between columns is double the outer padding (16px inside vs 8px outer in this example). To keep them even, add extra padding to the outer sides of the outer columns:

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column class="pl-4 pr-2">1</Column>
      <Column class="px-2">2</Column>
      <Column class="pl-2 pr-4">3</Column>
    </Row>
  </Container>
</template>
```

### Nested rows

Columns can contain Rows, which in turn can contain Columns, allowing for complex nested layouts. A nested Row's width is determined by its parent Column's resolved width, so the inner Columns divide that space as you'd expect.

```vue [emails/example.vue]
<template>
  <Container class="max-w-xl">
    <Row>
      <Column class="w-2/3 max-xs:w-full">
        Main 2/3
      </Column>
      <Column class="w-1/3 max-xs:w-full">
        <Row>
          <Column class="w-1/2 max-xs:w-full">
            Nested 1
          </Column>
          <Column class="w-1/2 max-xs:w-full">
            Nested 2
          </Column>
        </Row>
      </Column>
    </Row>
  </Container>
</template>
```
