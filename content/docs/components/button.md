---
title: Button
description: A styled call-to-action link with variants, alignment, icon support, and Outlook compatibility.
section: Components
order: 13
---

# Button

Renders a styled call-to-action link with props for variants, alignment, icons, and Outlook padding adjustments that make it fully clickable without using VML. 

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Button href="https://example.com">Get Started</Button>
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <div>
    <a href="https://example.com" style="display: inline-block; text-decoration: none; padding: 16px 24px; font-size: 16px; line-height: 1; border-radius: 4px; color: #fffffe; background-color: #4338ca;">
      <!--[if mso]><i style="mso-font-width: 150%; mso-text-raise: 31px;" hidden>&emsp;</i><![endif]-->
      <span style="mso-text-raise: 16px;">Get Started</span>
      <!--[if mso]><i style="mso-font-width: 150%;" hidden>&emsp;&#8203;</i><![endif]-->
    </a>
  </div>
  ```
  :::
::

This renders a solid button with a filled indigo background and white text, with padding that works in Outlook thanks to the spacer `<i>` elements.

### Variants

The `variant` prop controls the button's visual style:

```vue [emails/example.vue]
<template>
  <!-- Solid: filled background, white text (default) -->
  <Button href="https://example.com">Solid Button</Button>

  <!-- Outline: transparent background, colored border -->
   // [!code word:variant="outline"]
  <Button href="https://example.com" variant="outline">Outline Button</Button>

  <!-- Ghost: transparent background, no border -->
  // [!code word:variant="ghost"]
  <Button href="https://example.com" variant="ghost">Ghost Button</Button>

  <!-- Link: plain anchor, no button styling -->
  // [!code word:variant="link"]
  <Button href="https://example.com" variant="link">Link Button</Button>
</template>
```

### Alignment

Center or align the button using the `align` prop:

```vue [emails/example.vue]
<template>
  // [!code word:align="center"]
  <Button href="https://example.com" align="center">
    Centered Button
  </Button>
  
  // [!code word:align="right"]
  <Button href="https://example.com" align="right">
    Right-aligned Button
  </Button>
</template>
```

### Colors

Each variant ships with default styles that can be customized with Tailwind or inline CSS.

```vue [emails/example.vue] {5,14}
<template>
  <!-- Solid: blue bg, white text -->
  <Button 
    href="https://example.com" 
    class="bg-blue-600 text-white"
  >
    Blue Button
  </Button>

  <!-- Outline: green border + green text -->
  <Button
    href="https://example.com"
    variant="outline"
    style="border-color: #16a34a; color: #16a34a;"
  >
    Green Outline
  </Button>
</template>
```

### Icons

Add an icon to the button with the `icon` prop:

```vue [emails/example.vue] {4,11}
<template>
  <Button
    href="https://example.com"
    icon="https://example.com/arrow.png"
  >Continue</Button>

  <!-- Icon on the left -->
  <Button
    href="https://example.com"
    icon="https://example.com/arrow.png"
    icon-position="left"
  >Go Back</Button>
</template>
```

## Props

### href

Type: `String`\
Default: _required_

The URL the button links to. Required.

### variant

Type: `solid | outline | ghost | link`\
Default: `solid`

The visual style of the button.

- **solid** — filled indigo background with white text
- **outline** — transparent background with an indigo border and indigo text
- **ghost** — transparent background, indigo text, light indigo hover background
- **link** — plain anchor with indigo text and no button chrome

::callout{type="info"}
Override any of the default colors by passing your own Tailwind classes.
::

### align

Type: `left | center | right | null`\
Default: `null`

Horizontal alignment of the button. The button is wrapped in a `<div>` which handles the alignment and ensures it renders on its own line, as a block-level element.

### msoPt

Type: `String`\
Default: `'16px'`

Sets `mso-text-raise` to force some top padding in Outlook (classic), which does not support CSS padding on inline elements like `<a>`.

### msoPb

Type: `String`\
Default: `'31px'`

Similarly, adds `mso-text-raise` to create bottom padding in Outlook.

### msoPx

Type: `String | Number`\
Default: `150`

Horizontal padding in old Outlook, applied as `mso-font-width` on the outer spacer `<i>` elements. Accepts a number, a numeric string, or a string with `%`. Bare numbers are treated as percentages. Effective range up to 500%.

```vue
<Button href="#" :mso-px="200">Wider in Outlook</Button>
```

### icon

Type: `String`\
Default: `null`

URL or path to an icon image displayed inside the button.

### iconWidth

Type: `String | Number`\
Default: `12`

Width of the icon image in pixels.

### iconPosition

Type: `'left' | 'right'`\
Default: `'right'`

Placement of the icon relative to the button text.

### iconClass

Type: `String`\
Default: `''`

CSS classes to apply to the icon `<img>` element.

### iconAlt

Type: `String`\
Default: `''`

Alt text for the icon image.

### outlookFallback

Type: `Boolean`\
Default: `true`

Toggle modern button mode: Outlook support is discarded when `false`.
