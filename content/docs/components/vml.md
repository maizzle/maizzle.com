---
title: "VML Components"
description: "VML components for background images support in HTML emails for Outlook on Windows."
---

# VML Components

VML stands for Vector Markup Language, it is a legacy markup language that was used in Outlook for Windows.

The Maizzle Starter includes two VML components that you can use to add support for background images in Outlook for Windows:

- Fill, using the `<x-v-fill>` tag
- Image, using the `<x-v-image>` tag

## v-fill

The Fill component is defined in `src/components/v-fill.html`.

Use it when you need to add a background image that you don't know the height of.

<Alert type="warning">`v:fill` does not work in Windows 10 Mail, see the `v-image` component for that.</Alert>

You can use it immediately inside a container that has a CSS background image:

```xml{4-9} diff
<table>
  <tr>
    <td style="background-image: url('https://picsum.photos/600/400')">
+     <x-v-fill
+       image="https://picsum.photos/600/400"
+       width="600px"
+     >
+       HTML to show on top of the image
+     </x-v-fill>
    </td>
  </tr>
</table>
```

That will compile to:

```xml {4-9}
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

### Props

The `x-v-fill` component supports the following props:

#### image

Default: `https://via.placeholder.com/600x400`

The URL of the image that will be used as a background image in Outlook for Windows.

#### width

Default: `600px`

The width of the image, preferably in pixels. This sets CSS `width` on the root `<v:rect>` VML element of the component, so you'll need to include the unit, i.e. `600px` instead of `600`.

## v-image

The Image component is defined in `src/components/v-image.html`.

Use it if you need your background image to also render in Windows 10 Mail.

The downside is that you must also pass the `height` prop, which means you need to know the height of the image:

```xml{5-11} diff
<x-main>
  <table>
    <tr>
      <td style="background-image: url('https://picsum.photos/600/400')">
+       <x-v-image
+         image="https://picsum.photos/600/400"
+         height="400px"
+         width="600px"
+       >
+         HTML to show on top of the image
+       </x-v-image>
      </td>
    </tr>
  </table>
</x-main>
```

That will compile to:

```xml {4-9}
<table cellpadding="0" cellspacing="0" role="none">
  <tr>
    <td style="background-image: url('https://picsum.photos/600/400')">
      <!--[if mso]>
      <v:image src="https://picsum.photos/600/400" style="width: 600px; height: 400px;" xmlns:v="urn:schemas-microsoft-com:vml" />
      <v:rect fill="f" stroke="f" style="position: absolute; width: 600px; height: 400px;" xmlns:v="urn:schemas-microsoft-com:vml">
      <v:textbox inset="0,0,0,0"><div><![endif]-->
        HTML to show on top of the image
      <!--[if mso]></div></v:textbox></v:rect><![endif]-->
    </td>
  </tr>
</table>
```

### Props

The `x-v-image` component supports the following props:

#### image

Default: `https://via.placeholder.com/600x400`

The URL of the image that will be used as a background image in Outlook for Windows and Windows 10 Mail.

#### width

Default: `600px`

The width of the image, preferably in pixels. This sets CSS `width` on the `<v:image>` and `<v:rect>` VML elements in the component, so you'll need to include the unit, i.e. `600px` instead of `600`.

#### height

Default: `400px`

The height of the image, preferably in pixels. This sets CSS `height` on the `<v:image>` and `<v:rect>` VML elements in the component, so you'll need to include the unit, i.e. `400px` instead of `400`.
