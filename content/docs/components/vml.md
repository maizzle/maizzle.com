---
title: Vml
description: General-purpose VML primitive for Outlook — render rectangles, rounded rectangles, ovals, lines, gradients, and background images.
section: Components
order: 24
---

# Vml

Renders a VML shape for Word-based Outlook versions. Unlike [`<OutlookBg>`](/docs/components/outlookbg) which is focused on background images, `<Vml>` is the general-purpose VML primitive — pick a shape (`rect`, `roundrect`, `oval`, `line`), apply a fill (solid color, image, gradient), and Outlook will render it inside an MSO conditional comment.

Use it for shapes, rounded outlines, dividers, and gradients. For plain background images, [`<OutlookBg>`](/docs/components/outlookbg) is the shorter alternative.

## Usage

### Background image

`<Vml>` can do everything `<OutlookBg>` does. The only difference is that `type` has no default — set it explicitly:

```vue [emails/example.vue]
<template>
  <Layout>
    <Container class="max-w-xl">
      <Vml type="frame" src="hero.jpg" width="600" height="400">
        <div class="bg-[url('hero.jpg')] bg-cover">
          <Text class="text-white text-2xl p-8">
            Content over a background image.
          </Text>
        </div>
      </Vml>
    </Container>
  </Layout>
</template>
```

Pair the VML with a CSS background on the same element — VML handles Outlook, CSS handles everything else.

### Rounded rectangle

```vue
<template>
  <Vml shape="roundrect" arcsize="0.1" width="300" height="120" fillcolor="#3b82f6">
    <Text class="text-white text-center p-8">Rounded card</Text>
  </Vml>
</template>
```

### Linear gradient

```vue
<template>
  <Vml type="gradient" color="#3b82f6" color2="#9333ea" angle="90" width="600" height="200">
    <Text class="text-white text-2xl p-8">Gradient header</Text>
  </Vml>
</template>
```

### Radial gradient

```vue
<template>
  <Vml
    type="gradientradial"
    color="#fef3c7"
    color2="#f59e0b"
    focus="100"
    focusposition="0.5,0.5"
    focussize="0,0"
    width="600"
    height="300"
  >
    <Text class="p-8">Radial fill</Text>
  </Vml>
</template>
```

### Oval

```vue
<template>
  <Vml shape="oval" width="80" height="80" fillcolor="#f97316" />
</template>
```

### Line divider

```vue
<template>
  <Vml shape="line" from="0,0" to="600,0" strokecolor="#e5e7eb" />
</template>
```

For `shape="line"`, `width`/`height` are ignored — use `from` and `to` instead, and `stroke` defaults to `true` while `fill` defaults to `false`.

## Props

### shape

Type: `'rect' | 'roundrect' | 'oval' | 'line'`\
Default: `'rect'`

The underlying VML element to render.

```vue
<template>
  <Vml shape="roundrect">
    <!-- ... -->
  </Vml>
</template>
```

### arcsize

Type: `string | number`\
Default: `undefined`

Corner radius for `shape="roundrect"`, as a fraction of the shorter side (0–1). Ignored for other shapes.

```vue
<template>
  <Vml shape="roundrect" arcsize="0.1">
    <!-- ... -->
  </Vml>
</template>
```

### from

Type: `string`\
Default: `undefined`

Start coordinate for `shape="line"` as `"x,y"`. Required for lines.

```vue
<template>
  <Vml shape="line" from="0,0" to="600,0" />
</template>
```

### to

Type: `string`\
Default: `undefined`

End coordinate for `shape="line"` as `"x,y"`. Required for lines.

### width

Type: `string | number`\
Default: `'600px'`

Width of the shape. Ignored when `shape="line"`.

```vue
<template>
  <Vml width="500">
    <!-- ... -->
  </Vml>
</template>
```

### height

Type: `string | number`\
Default: `null`

Height of the shape. When unset, the shape auto-sizes to fit its content. Ignored when `shape="line"`.

```vue
<template>
  <Vml height="300">
    <!-- ... -->
  </Vml>
</template>
```

### type

Type: `'solid' | 'gradient' | 'gradientradial' | 'tile' | 'pattern' | 'frame'`\
Default: `undefined`

VML fill type, emitted on the `<v:fill>` child element.

- `frame` — scale image to fill the shape (use for background images)
- `tile` — repeat image to fill
- `pattern` — tile at the image's original size
- `solid` — solid color fill
- `gradient` — linear gradient
- `gradientradial` — radial gradient

```vue
<template>
  <Vml type="frame" src="hero.jpg">
    <!-- ... -->
  </Vml>
</template>
```

### src

Type: `string`\
Default: `undefined`

URL of a fill image. When set, a `<v:fill>` child is emitted with this `src`. Combine with `type="frame"` (or `tile`/`pattern`).

```vue
<template>
  <Vml type="frame" src="https://example.com/hero.jpg">
    <!-- ... -->
  </Vml>
</template>
```

### color

Type: `string`\
Default: `undefined`

Primary fill color on the `<v:fill>` element. Used as the start color for gradient fills.

```vue
<template>
  <Vml type="gradient" color="#3b82f6" color2="#9333ea">
    <!-- ... -->
  </Vml>
</template>
```

### color2

Type: `string`\
Default: `undefined`

End color for gradient fills.

```vue
<template>
  <Vml type="gradient" color="#3b82f6" color2="#9333ea">
    <!-- ... -->
  </Vml>
</template>
```

### angle

Type: `string | number`\
Default: `undefined`

Gradient direction in degrees (0–360).

```vue
<template>
  <Vml type="gradient" angle="90" color="#3b82f6" color2="#9333ea">
    <!-- ... -->
  </Vml>
</template>
```

### focus

Type: `string | number`\
Default: `undefined`

Gradient midpoint, as a percentage of the distance from the start color (0–100).

```vue
<template>
  <Vml type="gradient" focus="50" color="#3b82f6" color2="#9333ea">
    <!-- ... -->
  </Vml>
</template>
```

### focussize

Type: `string`\
Default: `undefined`

Radial gradient focus size as `"x,y"` fractions.

```vue
<template>
  <Vml type="gradientradial" focussize="0,0">
    <!-- ... -->
  </Vml>
</template>
```

### focusposition

Type: `string`\
Default: `undefined`

Radial gradient focus position as `"x,y"` fractions.

```vue
<template>
  <Vml type="gradientradial" focusposition="0.5,0.5">
    <!-- ... -->
  </Vml>
</template>
```

### sizes

Type: `string`\
Default: `undefined`

Comma-separated fill image dimensions.

```vue
<template>
  <Vml sizes="300px,200px">
    <!-- ... -->
  </Vml>
</template>
```

### origin

Type: `string`\
Default: `undefined`

Fill origin offset as fractional values. Replicates the CSS `background-position` property. Overridden by `backgroundPosition` if both are set.

```vue
<template>
  <Vml origin="0,0">
    <!-- ... -->
  </Vml>
</template>
```

### position

Type: `string`\
Default: `undefined`

Fill position offset as fractional values. Overridden by `backgroundPosition` if both are set.

```vue
<template>
  <Vml position="0.5,0.5">
    <!-- ... -->
  </Vml>
</template>
```

### backgroundPosition

Type: `string`\
Default: `undefined`

Convenience prop that maps named positions to VML `origin` and `position` values. Format is `vertical,horizontal`.

Supported values:

- `top,left` / `top,center` / `top,right`
- `center,left` / `center,center` / `center,right`
- `bottom,left` / `bottom,center` / `bottom,right`

Explicit `origin` or `position` props override the values set by `backgroundPosition`.

```vue
<template>
  <Vml background-position="center,center">
    <!-- ... -->
  </Vml>
</template>
```

### aspect

Type: `'atleast' | 'atmost'`\
Default: `undefined`

Aspect ratio constraint for the fill image. Replicates the CSS `background-size` property.

```vue
<template>
  <Vml aspect="atleast">
    <!-- ... -->
  </Vml>
</template>
```

### inset

Type: `string`\
Default: `'0,0,0,0'`

`top,right,bottom,left` textbox padding. Replicates the CSS `padding` property.

```vue
<template>
  <Vml inset="10px,20px,10px,20px">
    <!-- ... -->
  </Vml>
</template>
```

### stroke

Type: `boolean | string`\
Default: `false` (`true` when `shape="line"`)

Whether the shape has a visible border.

```vue
<template>
  <Vml :stroke="true">
    <!-- ... -->
  </Vml>
</template>
```

### strokecolor

Type: `string`\
Default: `undefined`

Border color. Setting this automatically enables `stroke`.

```vue
<template>
  <Vml strokecolor="#000000">
    <!-- ... -->
  </Vml>
</template>
```

### fill

Type: `boolean | string`\
Default: `true` (`false` when `shape="line"`)

Whether the shape has a fill.

```vue
<template>
  <Vml :fill="false">
    <!-- ... -->
  </Vml>
</template>
```

### fillcolor

Type: `string`\
Default: `undefined`

Fallback fill color on the shape element. Rendered when no `<v:fill>` child is emitted or the fill image cannot be loaded.

```vue
<template>
  <Vml fillcolor="#3b82f6">
    <!-- ... -->
  </Vml>
</template>
```
