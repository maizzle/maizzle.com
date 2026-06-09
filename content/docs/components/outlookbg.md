---
title: OutlookBg
description: VML background images for Outlook, where CSS background-image is not supported.
section: Components
order: 23
---

# OutlookBg

Renders VML background images for Word-based Outlook versions, where CSS `background-image` is not supported.

## Usage

```vue [emails/example.vue]
<template>
  <Layout>
    <Container class="max-w-xl">
      <OutlookBg src="hero.jpg" width="600" height="400">
        <div class="bg-[url('hero.jpg')] bg-cover">
          <Text class="text-white text-2xl p-8">
            Content over a background image.
          </Text>
        </div>
      </OutlookBg>
    </Container>
  </Layout>
</template>
```

You typically pair VML with a CSS background on the same element — VML handles Outlook, CSS handles everything else.

### Background position

Use the `background-position` prop to control image placement:

```vue
<template>
  <OutlookBg
    src="https://example.com/bg.jpg"
    width="600"
    height="300"
    background-position="center,center"
    fillcolor="#1e3a5f"
  >
    <div class="bg-[#1e3a5f] bg-[url('https://example.com/bg.jpg')] bg-cover bg-center bg-no-repeat">
      <Text class="text-white p-12">Centered background.</Text>
    </div>
  </OutlookBg>
</template>
```

## Props

### width

Type: `string | number`\
Default: `'600px'`

Width of the VML rectangle.

```vue
<template>
  <OutlookBg width="500">
    <!-- ... -->
  </OutlookBg>
</template>
```

### height

Type: `string | number`\
Default: `null`

Height of the VML rectangle. When not set, the rectangle auto-sizes to fit its content.

```vue
<template>
  <OutlookBg height="300">
    <!-- ... -->
  </OutlookBg>
</template>
```

### type

Type: `'solid' | 'gradient' | 'gradientradial' | 'tile' | 'pattern' | 'frame'`\
Default: `'frame'`

The VML fill type. Use `frame` for background images, `solid` for solid colors, or one of the gradient/pattern types.

```vue
<template>
  <OutlookBg type="tile" src="https://example.com/pattern.png">
    <!-- ... -->
  </OutlookBg>
</template>
```

### src

Type: `string`\
Default: `'https://via.placeholder.com/600x400'`

URL of the background image.

```vue
<template>
  <OutlookBg src="https://example.com/hero.jpg">
    <!-- ... -->
  </OutlookBg>
</template>
```

### fillcolor

Type: `string`\
Default: `'none'`

Fallback background color shown while the image loads or if it fails.

```vue
<template>
  <OutlookBg fillcolor="#1e3a5f">
    <!-- ... -->
  </OutlookBg>
</template>
```

### color

Type: `string`\
Default: `undefined`

Fill color, used with `solid` and `gradient` fill types.

```vue
<template>
  <OutlookBg type="solid" color="#4338ca">
    <!-- ... -->
  </OutlookBg>
</template>
```

### sizes

Type: `string`\
Default: `undefined`

Comma-separated fill image dimensions.

```vue
<template>
  <OutlookBg sizes="300px,200px">
    <!-- ... -->
  </OutlookBg>
</template>
```

### origin

Type: `string`\
Default: `undefined`

Fill origin offset as fractional values. Replicates the CSS `background-position` property.

```vue
<template>
  <OutlookBg origin="0,0">
    <!-- ... -->
  </OutlookBg>
</template>
```

### position

Type: `string`\
Default: `undefined`

Fill position offset as fractional values. Overrides the value set by `backgroundPosition`.

```vue
<template>
  <OutlookBg position="0.5,0.5">
    <!-- ... -->
  </OutlookBg>
</template>
```

### backgroundPosition

Type: `string`\
Default: `undefined`

A convenience prop that maps position names to VML `origin` and `position` values. Format is `vertical,horizontal`.

Supported values:

- `top,left` / `top,center` / `top,right`
- `center,left` / `center,center` / `center,right`
- `bottom,left` / `bottom,center` / `bottom,right`

Explicit `origin` or `position` props will override the values set by `backgroundPosition`.

```vue
<template>
  <OutlookBg background-position="center,center">
    <!-- ... -->
  </OutlookBg>
</template>
```

### aspect

Type: `'atleast' | 'atmost'`\
Default: `undefined`

Aspect ratio constraint for the fill image. Replicates the CSS background-size property.

```vue
<template>
  <OutlookBg aspect="atleast">
    <!-- ... -->
  </OutlookBg>
</template>
```

### inset

Type: `string`\
Default: `'0,0,0,0'`

`top,right,bottom,left` textbox padding, replicates the CSS padding property.

```vue
<template>
  <OutlookBg inset="10px,20px,10px,20px">
    <!-- ... -->
  </OutlookBg>
</template>
```

### stroke

Type: `boolean | string`\
Default: `false`

Whether the VML rectangle has a visible border.

```vue
<template>
  <OutlookBg :stroke="true">
    <!-- ... -->
  </OutlookBg>
</template>
```

### strokecolor

Type: `string`\
Default: `undefined`

Border color. Setting this automatically enables `stroke`.

```vue
<template>
  <OutlookBg strokecolor="#000000">
    <!-- ... -->
  </OutlookBg>
</template>
```

### fill

Type: `boolean | string`\
Default: `true`

Whether the VML rectangle has a fill.

```vue
<template>
  <OutlookBg :fill="false">
    <!-- ... -->
  </OutlookBg>
</template>
```
