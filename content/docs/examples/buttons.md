---
title: "Buttons"
description: "Techniques for coding call to action buttons for HTML emails."
---

# Buttons

Buttons in HTML emails can be created with simple table structures with an anchor inside, or through advanced techniques involving <abbr title="Vector Markup Language">VML</abbr> or `mso-` CSS, for fully-clickable buttons in Outlook for Windows.

## Link

<Alert>This is inspired by <a href="https://twitter.com/M_J_Robbins">@M_J_Robbins</a>' link button - see the original on <a href="https://www.goodemailcode.com/email-code/link-button">goodemailcode.com</a></Alert>

We can use a smart combination of basic and vendor CSS properties to get fully clickable buttons in HTML - no VML required!

Here's the Filled button, fully clickable in Outlook:

<div class="example-preview">
  <div>
    <button
      class="block py-4 px-6 text-sm/none no-underline text-white font-semibold rounded bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
        Read more
    </button>
  </div>

  ```xml
  <a
    href="https://maizzle.com/"
    class="inline-block py-4 px-6 text-sm/none font-semibold rounded no-underline text-white bg-indigo-500 hover:bg-indigo-600"
  >
    <outlook>
      <i class="mso-font-width-[150%] mso-text-raise-[26pt]">&nbsp;</i>
    </outlook>
      <span class="mso-text-raise-[13pt]">Read more</span>
    <outlook>
      <i class="mso-font-width-[150%]">&nbsp;</i>
    </outlook>
  </a>
  ```
</div>

As you can see it's just a simple `<a>` tag, but with some nifty workarounds for Outlook's lack of support for `padding` on inline elements:

- left/right padding is faked with `<i>` elements that use `mso-font-width` with a `&emsp;` to grow in width; these elements are wrapped in conditional comments, so they only show in Outlook and Windows 10 Mail
- the text label is wrapped in a `<span>` and `mso-text-raise` adjusts its vertical position, allowing us to control the top padding
- the first `<i>` also adds bottom padding

<Alert>Line breaks and spaces between tags in the example above might render the button larger (although barely noticeable). If you want your button to be absolutely pixel perfect, just remove them.</Alert>

## VML

Another approach to buttons in HTML email is coding them with <abbr title="Vector Markup Language">VML</abbr>, Microsoft's obsolete and deprecated _Vector Markup Language_.

[buttons.cm](https://buttons.cm/), a tool by Campaign Monitor, makes it easy to generate a VML button.

However, you should keep in mind that VML buttons:

- have a larger code footprint
- must have a fixed width and height
- require that you add the URL in two places
- are converted to an image, which can degrade accessibility for screen reader users
- cannot be nested inside other VML elements (for example, background images for Outlook require VML, so you can't place a VML button on top of a background image for Outlook)

These limitations make VML buttons inaccessible, less flexible, and harder to maintain.

### Rounded corners in Outlook

Probably the only reason you'd want to use a VML button is because it's the only way to achieve rounded button corners in Outlook for Windows.

Here is a simplified VML button with rounded corners, styled with Tailwind CSS:

```xml [vml-rounded-button.html]
<!--[if mso]>
<v:roundrect arcsize="50%" style="height: 48px; mso-wrap-style: none;" stroke="f" fillcolor="#1d4ed8">
<![endif]-->
  <a
    href="https://example.com/"
    class="inline-block p-0 px-6 text-base/10 rounded-md no-underline text-white bg-blue-700"
  >
    <outlook>
      <i class="mso-font-width-[150%] mso-text-raise-[26pt]">&nbsp;</i>
    </outlook>
    <span>Link Text</span>
    <outlook>
      <i class="mso-font-width-[150%]">&nbsp;</i>
    </outlook>
  </a>
<!--[if mso]>
</v:roundrect>
<![endif]-->
```

<Alert type="warning">Keep in mind that VML code cannot be nested, so you can't use such a button inside a `<v:rect>`, like when coding background images for Outlook on Windows.</Alert>

## Table-based

A simple table structure, with background color set on the cell.

For modern email clients, we use CSS padding on the `<a>` to make the entire button clickable. In Outlook and Windows 10 Mail, because CSS padding isn't supported on anchor tags, the MSO `mso-padding-alt` CSS property can be used on the table cell in order to preserve the _visual aspect_.

This means that in Outlook/Windows 10 Mail only the text itself will be clickable.

Table-based buttons are easier to code and maintain than VML buttons, the main trade-off being accessibility: the click area in Outlook is not ideal.

### Filled

The most common type of button.

For an extra touch, let's add rounded corners and a hover effect:

<div class="example-preview">
  <div>
    <button
      class="py-4 px-6 text-sm/none no-underline text-white font-semibold rounded bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
        Read more
    </button>
  </div>

  ```xml
  <table>
    <tr>
      <th class="bg-indigo-500 hover:bg-indigo-600 rounded mso-padding-alt-[12px_24px]">
        <a
          href="https://maizzle.com"
          class="block py-4 px-6 text-white text-sm/[100%] no-underline"
        >
          Button
        </a>
      </th>
    </tr>
  </table>
  ```
</div>

<Alert>Outlook doesn't support <code>border-radius</code>, it will render square corners.</Alert>

### Outlined

No background color, so it inherits its container's background (gray in our case). We add a colored border to the table cell to create the outline.

To make it more interesting, let's also change the background on hover:

<div class="example-preview">
  <div>
    <button
      class="py-3 px-6 rounded border-2 border-indigo-500 hover:border-indigo-600 hover:bg-indigo-600 text-sm text-indigo-500 hover:text-white font-bold leading-full focus:outline-none">
        Read more
    </button>
  </div>

  ```xml
  <table>
    <tr>
      <th class="block border-2 border-indigo-500 hover:bg-indigo-500 rounded mso-padding-alt-[12px_24px]">
        <a
          href="https://maizzle.com"
          class="block py-3 px-6 text-sm/[100%] text-indigo-500 hover:text-white no-underline"
        >
          Button
        </a>
      </th>
    </tr>
  </table>
  ```
</div>

### Pill

Pill buttons simply use a larger border-radius value.

<div class="example-preview">
  <div>
    <button class="py-3 px-6 rounded-full shadow-md bg-indigo-500 hover:bg-indigo-600 text-sm text-white font-bold leading-full focus:outline-none">Read more</button>
  </div>

  ```xml
  <table>
    <tr>
      <th class="bg-indigo-500 hover:bg-indigo-600 shadow-md rounded-full mso-padding-alt-[16px_24px]">
        <a
          href="https://maizzle.com"
          class="block py-3 px-6 text-sm/none text-white no-underline"
        >
          Button
        </a>
      </th>
    </tr>
  </table>
  ```
</div>
