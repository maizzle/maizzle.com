---
title: Img
description: Render a responsive image element with support for dark mode, animated source switching, and fixed-aspect cropping for feed thumbnails.
section: Components
order: 14
---

# Img

Renders a responsive image with support for dark mode, animated source switching, and fixed-aspect cropping for unpredictable source images like content feeds.

## Usage

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Img src="https://example.com/hero.jpg" alt="Hero image" width="600" />
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <img src="https://example.com/hero.jpg" alt="Hero image" width="600" class="max-w-full align-middle">
  ```
  :::
::

### Dark mode

Use `dark-src` to provide an alternative image for dark mode:

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Img
      src="https://example.com/logo.png"
      dark-src="https://example.com/logo-dark.png"
      alt="Logo"
      width="120"
    />
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <picture>
    <source srcset="https://example.com/logo-dark.png" media="(prefers-color-scheme: dark)">
    <img src="https://example.com/logo.png" alt="Logo" width="120" class="max-w-full align-middle">
  </picture>
  ```
  :::
::

This wraps the image in a `<picture>` element with a `<source>` that uses the `prefers-color-scheme: dark` media query. Email client support for this is limited.

### Animated images

Use `motion-src` to show an animated image based on the user's reduced motion preference. Email client support for this is also limited.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Img
      src="https://example.com/preview.jpg"
      motion-src="https://example.com/animated.gif"
      alt="Product demo"
      width="400"
    />
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <picture>
    <source srcset="https://example.com/animated.gif" type="image/gif" media="(prefers-reduced-motion: no-preference)">
    <img src="https://example.com/preview.jpg" alt="Product demo" width="400" class="max-w-full align-middle">
  </picture>
  ```
  :::
::

This wraps the image in a `<picture>` element with a `<source>` that uses the `prefers-reduced-motion: no-preference` media query. The MIME type is auto-detected from the file extension. The `src` image serves as the static fallback.

You can combine `dark-src` and `motion-src` on the same component — both `<source>` elements will be rendered inside the `<picture>` wrapper.

### Cropped images {#cropped}

Sometimes you don't control the dimensions of source images, for example with aggregated content feeds, RSS thumbnails or user-uploaded photos.

Set `aspect` to crop them to a consistent ratio without distortion. The rendered structure will switch to a `background-image` div sized via the padding-bottom hack, plus a VML `<v:rect>` fallback so Outlook gets a properly cropped fill too.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue {6}
  <template>
    <Img
      src="https://example.com/portrait-image.jpg"
      width="600"
      alt="Article cover"
      aspect="16:9"
    />
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if mso]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" alt="Article cover" style="width: 600px; height: 338px;"><v:fill type="frame" src="https://example.com/portrait-image.jpg" aspect="atleast" /></v:rect><![endif]-->
  <!--[if !mso]><!-->
  <div role="img" aria-label="Article cover" class="overflow-hidden table max-w-full" style="width: 600px;">
    <div class="table-cell w-full h-0 bg-no-repeat" style="padding-bottom: 56.25%; background-image: url('https://example.com/portrait-image.jpg'); background-size: cover; background-position: center;"></div>
  </div>
  <!--<![endif]-->
  ```
  :::
::

`aspect` accepts both `16:9` and `16/9` notation. Common values: `'1:1'`, `'4:3'`, `'3:2'`, `'16:9'`, `'21:9'`. The `width` you pass is used for both the modern wrapper and the Outlook VML rectangle (height auto-computed from the ratio).

#### Using Tailwind aspect classes

You can also reach for Tailwind's `aspect-*` utilities instead of the prop. When the component sees one of these in its class list, the ratio is derived from it automatically and the class is stripped from the wrapper:

```vue
<Img src="thumb.jpg" width="600" class="aspect-video" />
<Img src="thumb.jpg" width="600" class="aspect-square" />
<Img src="thumb.jpg" width="600" class="aspect-[4/3]" />
```

::callout{type="info"}
If both the `aspect` prop and an `aspect-*` class are present, the prop wins.
::

#### Background size and position {#size-position-cropped}

The default sizing of the cropped background image is `cover`. You may override this through the `size` and `position` props:

```vue {5,6}
<Img
  src="thumb.jpg"
  width="600"
  aspect="16:9"
  size="contain"
  position="top"
/>
```

`size` maps to the VML [`aspect`](https://learn.microsoft.com/en-us/windows/win32/vml/msdn-online-vml-aspect-attribute) attribute, which works like `background-size` for background images in Outlook. 

| `size` prop | VML `aspect` |
|-------------|--------------|
| `cover`     | `atleast`    |
| `contain`   | `atmost`     |

#### Dark and motion variants in cropped mode {#dark-motion-cropped}

`dark-src` and `motion-src` still work in cropped mode, applied via Tailwind's `dark:` and `motion-safe:` arbitrary-value variants instead of `<picture>`:

```vue
<Img
  src="thumb.jpg"
  dark-src="thumb-dark.jpg"
  alt="Featured article"
  width="600"
  aspect="16:9"
/>
```

#### Accessibility

Cropped mode uses a CSS background image instead of an actual `<img>` element, so the wrapper gets `role="img"` and `aria-label` set from your `alt` attribute.

#### Linking cropped images

Use the `href` prop to wrap the rendered image in an anchor.

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue {6}
  <template>
    <Img
      src="https://example.com/banner.jpg"
      alt="Sale banner"
      width="600"
      href="https://example.com/sale"
    />
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <a href="https://example.com/sale">
    <img src="https://example.com/banner.jpg" alt="Sale banner" width="600" class="max-w-full align-middle">
  </a>
  ```
  :::
::

In cropped mode, the modern markup is wrapped in an `<a>` tag. The VML rectangle gets an  [`href`](https://learn.microsoft.com/en-us/windows/win32/vml/href-attribute--shape--vml) attribute so the entire shape is clickable in classic Outlook too:

::code-tabs
  :::code-tab{label="emails/example.vue"}
  ```vue
  <template>
    <Img
      src="https://example.com/hero.jpg"
      width="600"
      alt="Hero"
      aspect="16:9"
      href="https://example.com/landing"
    />
  </template>
  ```
  :::
  :::code-tab{label="dist/example.html"}
  ```html
  <!--[if mso]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" href="https://example.com/landing" alt="Hero" style="width: 600px; height: 338px;"><v:fill type="frame" src="https://example.com/hero.jpg" aspect="atleast" /></v:rect><![endif]-->
  <!--[if !mso]><!-->
  <a href="https://example.com/landing" class="block no-underline">
    <div role="img" aria-label="Hero" class="overflow-hidden table max-w-full" style="width: 600px;">
      <div class="table-cell w-full h-0 bg-no-repeat" style="padding-bottom: 56.25%; background-image: url('https://example.com/hero.jpg'); background-size: cover; background-position: center;"></div>
    </div>
  </a>
  <!--<![endif]-->
  ```
  :::
::

## Props

### src

Type: `String`\
Default: _required_

The image URL. When `motionSrc` is set, this serves as the static fallback.

### alt

Type: `String`\
Default: `''`

Alternative text for the image.

### width

Type: `String | Number`\
Default: `undefined`

The image width, rendered as a unitless HTML attribute (parsed as an integer). When omitted, the width is auto-derived after render from the nearest sized ancestor, falling back to fluid when none is resolvable. The `aspect` crop mode still requires an explicit width.

### darkSrc

Type: `String`\
Default: `null`

Image source for dark mode. When set, the component wraps the `<img>` in a `<picture>` element and adds a `<source>` with `media="(prefers-color-scheme: dark)"`.

### motionSrc

Type: `String`\
Default: `null`

Animated image source for users without a reduced motion preference.

### aspect

Type: `String`\
Default: `''`

Aspect ratio for cropped images. Accepts colon or slash notation: `'16:9'`, `'16/9'`, `'4:3'`, `'1:1'`, etc.

When set (or when a Tailwind `aspect-*` class is detected on the component), Maizzle switches the rendered structure to a background-image div with a VML `<v:rect>` fallback for Outlook. See [Cropped images](#cropped).

The prop wins over an `aspect-*` class if both are provided.

### position

Type: `String`\
Default: `'center'`

CSS `background-position` for the cropped image fill. Only applies in cropped mode.

Accepts the usual values: `'top'`, `'bottom'`, `'left'`, `'right'`, `'center'`, two-value pairs (`'top left'`), or percentages (`'20% 30%'`).

### size

Type: `String`\
Default: `'cover'`

CSS `background-size` for the cropped image fill. Only applies in cropped mode.

Common values: `'cover'`, `'contain'`, `'auto'`. Also maps to Outlook's VML `aspect`: `'cover'` → `atleast`, `'contain'` → `atmost`; other values omit the VML aspect attribute and Outlook uses its default scaling.

### href

Type: `String`\
Default: `''`

URL to navigate to when the image is clicked. When set, the rendered output is wrapped in an `<a>` tag. In cropped mode the anchor gets `block no-underline` utilities so the entire padding-hack area is clickable, and the Outlook `<v:rect>` receives its own [VML `href`](https://learn.microsoft.com/en-us/windows/win32/vml/href-attribute--shape--vml) attribute so classic Outlook gets a clickable shape too.

### outlookFallback

Type: `Boolean`\
Default: inherits — root default `true`

Toggle the Outlook (classic) VML fallback for cropped images. When `false`, no `<!--[if mso]>` conditional comment or `<v:rect>` is emitted and the modern wrapper renders to every client. Outlook will show a blank area where the image should be.
