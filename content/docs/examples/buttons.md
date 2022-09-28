---
title: "Buttons"
description: "Learn how to create simple buttons for your HTML email templates in Maizzle"
---

# Buttons

Buttons in HTML emails can be created with simple table structures with an anchor inside, or through advanced techniques involving <abbr title="Vector Markup Language">VML</abbr> or even `mso-` CSS, for fully-clickable buttons in Outlook and Windows 10 Mail.

## Bulletproof

Bulletproof buttons in HTML emails commonly refer to buttons that are _fully_ clickable in all email clients, including Outlook and Windows 10 Mail.

### Semantic (CSS)

<alert>Credit goes to <a href="https://twitter.com/M_J_Robbins">@M_J_Robbins</a> for this technique.</alert>

We can use a smart combination of basic and (Outlook) vendor CSS properties to get fully clickable buttons in HTML - no VML required!

Here's the Filled button, fully clickable in Outlook:

<div class="example-preview">
  <div>
    <button
      class="block py-4 px-6 text-sm leading-none no-underline text-white font-semibold rounded bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
        Read more
    </button>
  </div>

  ```xml
  <a
    href="https://maizzle.com/"
    class="inline-block py-4 px-6 text-sm leading-none [text-decoration:none] text-white font-semibold rounded bg-indigo-500 hover:bg-indigo-600">
    <!--[if mso]><i style="letter-spacing: 27px; mso-font-width: -100%; mso-text-raise: 26pt;">&nbsp;</i><![endif]-->
      <span style="mso-text-raise: 13pt;">Read more</span>
    <!--[if mso]><i style="letter-spacing: 27px; mso-font-width: -100%;">&nbsp;</i><![endif]-->
  </a>
  ```
</div>

It's just a simple `<a>` tag, but with some nifty workarounds for Outlook's lack of support for `padding` on inline elements:

- left/right padding is faked with a `<i>` elements that use `letter-spacing` to grow in width; these elements are wrapped in conditional comments, so they only show in Outlook and Windows 10 Mail
- text is wrapped in a `<span>` and `mso-text-raise` adjusts its vertical position
- the first `<i>` uses double the `pt` that the `<span>` uses
- finally, the width of the `&nbsp;` character is reset (as in, canceled) through the `mso-font-width` property

<alert>Line breaks and spaces between tags in the example above might render the button larger (although barely noticeable). If you want your button to be absolutely pixel perfect, just remove them.</alert>

**Tip**: use the [`<outlook>`](/docs/tags#outlook) tag for cleaner-looking, editor-friendly markup. As an added bonus, you can also use Tailwind CSS utilities with it:

<code-sample title="button.html">

  ```xml
  <a
    href="https://maizzle.com/"
    class="inline-block py-4 px-6 text-sm leading-none [text-decoration:none] text-white font-semibold rounded bg-indigo-500 hover:bg-indigo-600">
    <outlook>
      <i class="tracking-6 mso-font-width-[-100%] mso-text-raise-[26pt]">&nbsp;</i>
    </outlook>
      <span class="mso-text-raise-[13pt]">Read more</span>
    <outlook>
      <i class="tracking-6 mso-font-width-[-100%]">&nbsp;</i>
    </outlook>
  </a>
  ```

</code-sample>

### Traditional (VML)

The classic approach to bulletproof buttons is coding them with <abbr title="Vector Markup Language">VML</abbr>, and Campaign Monitor has a very useful [tool](https://buttons.cm/) for this.

However, VML buttons have a larger code footprint, are fixed in size and require you add the URL in two places, which makes them less flexible and harder to maintain.

## Table-based

A simple table structure, with background color set on the cell.

For modern email clients, we use CSS padding on the `<a>` to make the entire button clickable. In Outlook and Windows 10 Mail, because CSS padding isn't supported on anchor tags, the MSO `mso-padding-alt` CSS property can be used on the table cell in order to preserve the _visual aspect_.

This means that in Outlook/Windows 10 Mail only the text itself will be clickable.

Table-based buttons are easier to code and maintain than bulletproof buttons, the main trade-off being accessibility: they provide smaller-than-recommended click or touch area in some email clients.

### Filled

The most common type of button.

For an extra touch, let's add rounded corners and a hover effect:

<div class="example-preview">
  <div>
    <button class="mt-4 sm:mt-0 rounded bg-indigo-500 hover:bg-indigo-600 text-sm text-white font-bold leading-full py-3 px-12 focus:outline-none">Button</button>
  </div>

  ```xml
  <table>
    <tr>
      <th class="bg-indigo-500 hover:bg-indigo-600 rounded mso-padding-alt-[12px_48px]">
        <a
          href="https://maizzle.com"
          class="block text-white text-sm leading-full py-3 px-12 [text-decoration:none]"
        >
          Button
        </a>
      </th>
    </tr>
  </table>
  ```
</div>

<alert>Outlook doesn't support <code>border-radius</code>, it will render square corners.</alert>

### Outlined

No background color, so it inherits its container's background (gray in our case). We add a colored border to the table cell to create the outline.

To make it more interesting, let's also change the background on hover:

<div class="example-preview">
  <div>
    <button class="rounded border-2 border-indigo-500 hover:border-indigo-600 hover:bg-indigo-600 text-sm text-indigo-500 hover:text-white font-bold leading-full py-3 px-12 focus:outline-none">Button</button>
  </div>

  ```xml
  <table>
    <tr>
      <th class="border-2 border-indigo-500 hover:bg-indigo-500 block rounded mso-padding-alt-[12px_48px]">
        <a
          href="https://maizzle.com"
          class="block text-sm text-indigo-500 hover:text-white leading-full py-3 px-12 [text-decoration:none]"
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
    <button class="rounded-full shadow-md bg-indigo-500 hover:bg-indigo-600 text-sm text-white font-bold leading-full py-3 px-12 focus:outline-none">Button</button>
  </div>

  ```xml
  <table>
    <tr>
      <th class="bg-indigo-500 hover:bg-indigo-600 shadow-md rounded-full mso-padding-alt-[12px_48px]">
        <a
          href="https://maizzle.com"
          class="block text-sm text-white leading-full py-3 px-12 [text-decoration:none]"
        >
          Button
        </a>
      </th>
    </tr>
  </table>
  ```
</div>
