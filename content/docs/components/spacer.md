---
title: "Spacer Component"
description: "A component for creating consistent vertical spacing in HTML emails."
---

# Spacer Component

The Spacer component in Maizzle makes it super simple to add consistent, accessible vertical spacing to your HTML emails.

## Usage

The Spacer component is defined in `src/components/spacer.html`.

This enables the `<x-spacer>` syntax, which you can use like this:

```html {5}
<x-main>
  <table>
    <tr>
      <td>
        <x-spacer height="32px" />
      </td>
    </tr>
  </table>
</x-main>
```

You can use it anywhere you'd use a `<div>`.

If you need to add space between `<tr>`, see the [Row Spacer example](/docs/examples/spacers#row) instead.

## Props

You can pass props to the component via HTML attributes, to control its height.

### height

Default: `undefined`

This will define the height of the Spacer.

You may use any CSS unit that you prefer, it doesn't have to be `px`.

```html [src/templates/example.html]
<x-spacer height="1em" />
```

That will render the following HTML:

```html [src/templates/example.html]
<div style="line-height: 1em;" role="separator">&zwj;</div>
```

If `height` is omitted, the Spacer will render as `<div role="separator">&zwj;</div>`, which will render as an empty space that is as high as its parent element's `line-height`.

### mso-height

Default: `undefined`

Override the height of the Spacer in Outlook for Windows.

```html [src/templates/example.html]
<x-spacer height="32px" mso-height="30px" />
```

This uses the `mso-line-height-alt` MSO CSS property to set a custom Spacer height in Outlook for Windows.

Note: for the Spacer to work as expected in Outlook on Windows, it should also be styled with `mso-line-height-rule: exactly`. In Maizzle this is set globally in the `main.html` layout, so you don't need to worry about it.

However, if you can't use that layout for some reason or are worried that the Outlook-specific CSS in the `<head>` might be stripped in some situations, simply add it in a style attribute on the tag:

```html [src/templates/example.html]
<x-spacer style="mso-line-height-rule: exactly;" />
```

Alternatively, you may also use the `mso-line-height-rule-exactly` class that is available from the `tailwindcss-mso` plugin (included in the Starter):

```html [src/templates/example.html]
<x-spacer class="mso-line-height-rule-exactly" />
```

Of course, you can also modify `src/components/spacer.html` and add the `mso-line-height-rule: exactly` CSS rule to the `<div>` element.

### Other attributes

You may pass any other HTML attributes to the component, such as `class` or `id`.

Note that non-standard attributes will be ignored by default - you'll need to define them as props in the component if you need them preserved. Alternatively, you can safelist them in your `build.components` config.

## Responsive

To override the height of the Spacer on mobile, use the `leading` utilities in Tailwind CSS:

```html [src/templates/example.html]
<x-spacer height="32px" class="sm:leading-4" />
```
