---
title: "Button Component"
description: "A Maizzle component that makes it easy to add a styled link button to your HTML emails."
---

# Button Component

The Button component makes it easy to add a styled link button to your HTML emails.

## Usage

The Button component is defined in `src/components/button.html`.

This enables the `<x-button>` tag, which you can use like this:

<code-sample title="src/templates/example.html">

  ```xml
  <x-button href="https://example.com">
    Book now
  </x-button>
  ```

</code-sample>

You can use it anywhere you'd use a `<div>`.

## Customization

You can align the Button to the left, center or right, change its CSS styling, and adjust padding for Outlook on Windows.

### Href

Default: `undefined`

If you want the Button to link somewhere, you need to pass it the `href` prop:

<code-sample title="src/templates/example.html">

  ```xml
  <x-button href="https://example.com">
    Book now
  </x-button>
  ```

</code-sample>

<alert>The Button still renders if you don't pass `href`, but it will not include the `href` attribute on the `<a>` tag and might look broken in some email clients because of this.</alert>

### Align

Default: `undefined`

You can align the Button to the left, center or right, through the `align` prop:

<code-sample title="src/templates/example.html">

  ```xml
  <x-button align="center">
    Book now
  </x-button>
  ```

</code-sample>

This will add the `text-center` class to the button's wrapper `<div>`, which will align the `<a>` inside it to the center.

### Styling

You may style the Button as needed with Tailwind CSS utilities.

The button includes a background and text color by default, so you'll need to override them with the `!` important modifier.

For example, let's make the button blue-themed:

<code-sample title="src/templates/example.html">

  ```xml
  <x-button
    href="https://example.com"
    class="!bg-blue-600 !text-blue-100"
  >
    Book now
  </x-button>
  ```

</code-sample>

Of course, you may change the colors directly in `src/components/button.html`.

### MSO Padding

Left, right and bottom padding for Outlook on Windows is controlled through `letter-spacing` and `mso-text-raise`, a proprietary Outlook CSS property.

This technique is based on the Link Button from [goodemailcode.com](https://www.goodemailcode.com/email-code/link-button).

#### MSO top padding

Default: `16px`

Adjust the top padding for Outlook on Windows with the `mso-pt` prop:

<code-sample title="src/templates/example.html">

  ```xml
  <x-button mso-pt="12px">
    Book now
  </x-button>
  ```

</code-sample>

#### MSO left padding

Default: `32px`

Adjust the left padding for Outlook on Windows with the `mso-pl` prop:

<code-sample title="src/templates/example.html">

  ```xml
  <x-button mso-pl="24px">
    Book now
  </x-button>
  ```

</code-sample>

#### MSO right padding

Default: `32px`

Adjust the right padding for Outlook on Windows with the `mso-pr` prop:

<code-sample title="src/templates/example.html">

  ```xml
  <x-button mso-pr="24px">
    Book now
  </x-button>
  ```

</code-sample>

#### MSO bottom padding

Default: `32px`

Adjust the bottom padding for Outlook on Windows with the `mso-pb` prop:

<code-sample title="src/templates/example.html">

  ```xml
  <x-button mso-pb="24px">
    Book now
  </x-button>
  ```

</code-sample>

### Other attributes

You may pass any other HTML attributes to the component, such as `data-*` or `id` - they will all be added to the `<a>` tag.

Note that non-standard attributes will be ignored by default - you'll need to define them as props in the component if you need them preserved. Alternatively, you can safelist them in your `build.components` config.

## Responsive

To override Button styling on small viewports, use Tailwind CSS utilities.

For example, let's make the button full-width on small viewports:

<code-sample title="src/templates/example.html">

  ```xml
  <x-button class="sm:block">
    Book now
  </x-button>
  ```

</code-sample>

## Alternatives

There are other ways to create buttons in your HTML emails, such as by using a `<table>`. Check out our [Button examples](/docs/examples/buttons) for more ideas.
