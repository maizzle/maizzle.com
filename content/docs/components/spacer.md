---
title: "Spacer Component"
description: "A component for creating vertical spacing in HTML emails built with Maizzle."
---

# Spacer Component

The Spacer component makes it super simple to add consistent, accessible vertical spacing to your HTML emails in Maizzle.

<alert>This component is included in the default [Maizzle Starter project](https://github.com/maizzle/maizzle). It uses the new components system available starting with Maizzle `v4.4`.</alert>

## Usage

The Spacer component is defined in `src/components/spacer.html`.

This enables the `<x-spacer>` syntax, which you can use like this:

<code-sample title="src/templates/example.html">

  ```xml
  <table>
    <tr>
      <td>
        [...]

        <x-spacer height="32px" />

        [...]
      </td>
    </tr>
  </table>
  ```

</code-sample>

You can use it anywhere you'd use a `<div>`.

If you need to add space between `<tr>`, see the [Row Spacer example](/docs/examples/spacers#row) instead.

## Props

You can pass props to the component via HTML attributes, to control its height.

### height

Default: `undefined`

This will define the height of the Spacer.

You may use any CSS unit that you prefer, it doesn't have to be `px`.

<code-sample title="src/templates/example.html">

  ```xml
  <x-spacer height="1em" />
  ```

</code-sample>

That will render the following HTML:

<code-sample title="src/templates/example.html">

  ```xml
  <div style="line-height: 1em;" role="separator">&zwj;</div>
  ```

</code-sample>

If `height` is omitted, the Spacer will render as `<div role="separator">&zwj;</div>`, which will render as an empty space that is as high as its parent element's `line-height`.

### mso-height

Override the height of the Spacer in Outlook for Windows.

<code-sample title="src/templates/example.html">

  ```xml
  <x-spacer height="32px" mso-height="30px" />
  ```

</code-sample>

This uses the `mso-line-height-alt` MSO CSS property to set a custom Spacer height in Outlook for Windows.

Note: for the Spacer to work as expected in Outlook on Windows, it should also be styled with `mso-line-height-rule: exactly`. In Maizzle this is set globally in the `main.html` layout, so you don't need to worry about it.

However, if you can't use that layout for some reason or are worried that the Outlook-specific CSS in the `<head>` might be stripped in some situations, simply add it in a style attribute on the tag:

<code-sample title="src/templates/example.html">

  ```xml
  <x-spacer style="mso-line-height-rule: exactly;" />
  ```

</code-sample>

Alternatively, you may also use the `mso-line-height-rule-exactly` class that is available from the `tailwindcss-mso` plugin (included in the Starter):

<code-sample title="src/templates/example.html">

  ```xml
  <x-spacer class="mso-line-height-rule-exactly" />
  ```

</code-sample>

Of course, you can also modify `src/components/spacer.html` and add the `mso-line-height-rule: exactly` CSS rule to the `<div>` element.

### Other attributes

You may pass any other HTML attributes to the component, such as `class` or `id`.

Note that non-standard attributes will be ignored by default - you'll need to define them as props in the component if you need them preserved. Alternatively, you can safelist them in your `build.components` config.

## Responsive

To override the height of the Spacer on mobile, use the `leading` utilities in Tailwind CSS:

<code-sample title="src/templates/example.html">

  ```xml
  <x-spacer height="32px" class="sm:leading-4" />
  ```

</code-sample>
