---
title: "VML Components"
description: "Components for coding background images for Outlook on Windows."
---

# VML Components

VML stands for Vector Markup Language, it is a legacy markup language that was used in Outlook for Windows.

The Maizzle Starter includes a VML component that you can use to add support for background images in Outlook for Windows.

## v-fill

The Fill component is defined in `components/v-fill.html`.

Use it when you need to add a background image that you don't know the height of.

<Alert type="warning">`v:fill` does not work in Windows 10 Mail.</Alert>

You can use it immediately inside a container that has a CSS background image:

```html {4-9}
<table>
  <tr>
    <td style="background-image: url('https://picsum.photos/600/400')">
      <x-v-fill
        image="https://picsum.photos/600/400"
        width="600px"
      >
        HTML to show on top of the image
      </x-v-fill>
    </td>
  </tr>
</table>
```

That will compile to:

```html {4-9}
<table cellpadding="0" cellspacing="0" role="none">
  <tr>
    <td style="background-image: url('https://picsum.photos/600/400')">
      <!--[if mso]>
      <v:rect stroke="f" fillcolor="none" style="width: 600px" xmlns:v="urn:schemas-microsoft-com:vml">
      <v:fill type="frame" src="https://picsum.photos/600/400" />
      <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text: true"><div><![endif]-->
        HTML to show on top of the image
      <!--[if mso]></div></v:textbox></v:rect><![endif]-->
    </td>
  </tr>
</table>
```

## Props

The `x-v-fill` component supports the following props:

### image

Default: `https://via.placeholder.com/600x400`

The URL of the image that will be used as a background image in Outlook for Windows.

### width

Default: `600px`

The width of the image, preferably in pixels. This sets CSS `width` on the root `<v:rect>` VML element of the component, so you'll need to include the unit, i.e. `600px` instead of `600`.

### inset

Default: `0,0,0,0`

Replicates the CSS `padding` property.

The order of the values is `left, top, right, bottom`.

This is applied to a `<v:textbox>` element that wraps the content of the component - basically, the content that you want overlayed on top of the background image.

```html
<x-v-fill
  image="https://picsum.photos/600/400"
  width="600px"
  inset="10px,20px,10px,20px"
/>
```

### type

Default: `frame`

The type of fill to use. You can use `frame` or `tile`.

### sizes

Default: `undefined`

Define the exact dimensions of the `<v:fill>` element.

Both values need to be set and they can be separated by either a comma or a space:

```html
<x-v-fill
  image="https://picsum.photos/600/400"
  width="600px"
  sizes="300px,200px"
/>
```

### origin

Default: `undefined`

Replicates the CSS `background-position` property.

```html
<x-v-fill
  image="https://picsum.photos/600/400"
  width="600px"
  origin="0.5,0.5"
  position="0.5,0.5"
/>
```

TL;DR:

- `origin="-0.5,-0.5" position="-0.5,-0.5"` equals `top left`
- `origin="0.5,-0.5" position="0.5,-0.5"` equals `top right`
- `origin="-0.5,0.5" position="-0.5,0.5"` equals `bottom left`
- `origin="0.5,0.5" position="0.5,0.5"` equals `bottom right`

Read more [here](https://www.hteumeuleu.com/2021/background-properties-in-vml/#background-position).

### position

Default: `undefined`

See the docs for `origin` above.

### aspect

Default: `undefined`

Replicates the CSS `background-size` property.

Possible values:

- `atleast` (background-size: cover)
- `atmost` (background-size: contain)

Example:

```html
<x-v-fill
  image="https://picsum.photos/600/400"
  width="600px"
  aspect="atleast"
/>
```

### color

Default: `undefined`

Replicates the CSS `background-color` property.

Example:

```html
<x-v-fill
  image="https://picsum.photos/600/400"
  width="600px"
  color="#f8fafc"
/>
```

### fillcolor

Default: `none`

Whether to fill the shape with a color.

Example:

```html
<x-v-fill
  image="https://picsum.photos/600/400"
  width="600px"
  fillcolor="#f8fafc"
/>
```

### stroke

Default: `f`

Adds a border to the shape.

Example:

```html
<x-v-fill
  image="https://picsum.photos/600/400"
  width="600px"
  stroke="t"
/>
```

### strokecolor

Default: `undefined`

The color of the border.

Example:

```html
<x-v-fill
  image="https://picsum.photos/600/400"
  width="600px"
  stroke="t"
  strokecolor="#f8fafc"
/>
```
