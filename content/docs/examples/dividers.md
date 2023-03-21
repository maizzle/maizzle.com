---
title: "Dividers"
description: "Create dividers or horizontal rules for your HTML email template in Maizzle"
---

# Dividers

A Divider is a visible horizontal line that separates content areas.

Similar to Spacers, Dividers provide consistent vertical spacing while also offering visual separation of your content.

## Div

The simplest, most reliable way to create a visual, horizontal divider line in HTML emails is to use a `<div>` element:

<code-sample title="src/templates/example.html">

  ```xml
  <div class="h-px leading-px bg-slate-300" role="separator">&zwj;</div>
  ```

</code-sample>

The `separator` role indicates that this is a divider that separates and distinguishes sections of content.

You may adjust the top and bottom spacing around the divider with margin utilities:

<code-sample title="src/templates/example.html">

  ```xml
  <div class="h-px leading-px bg-slate-300 my-8" role="separator">&zwj;</div>
  ```

</code-sample>

## Semantic

To create a semantic Divider, we can use a regular `<hr>` element:

<code-sample title="src/templates/example.html">

  ```xml
  <hr class="border-0 bg-slate-500 text-gray-500 h-px">
  ```

</code-sample>

### How it works

1. We first reset the `border-width`, so we can apply our own colors
2. We use a combination of `background-color` and `color` - the latter is for Outlook (Windows)
3. Removing the border means the element now has no `height`, so we use `h-px` to set it to `1px`

The `<hr>` Divider is based on Mark Robbins' excellent work, available at [goodemailcode.com](https://www.goodemailcode.com/email-code/hr).

### Customization

You can customize the divider and give it a custom width or height, change its color, the top/bottom space around it, and even its alignment.

#### Width

An `<hr>` goes full width by default, but we can set a custom width.

While we're at it, let's also use `max-w-full`, to make it responsive.

<code-sample title="src/templates/example.html">

  ```xml
  <hr class="border-0 bg-slate-500 text-slate-500 h-px w-[400px] max-w-full">
  ```

</code-sample>

Need a custom width for mobile devices? Use the `sm` breakpoint:

<code-sample title="src/templates/example.html">

  ```xml
  <hr class="border-0 bg-slate-500 text-slate-500 h-px sm:w-16 max-w-full">
  ```

</code-sample>

#### Margin

You may customize top and bottom spacing with CSS margins.

For example, let's add `32px` to the top and bottom:

<code-sample title="src/templates/example.html">

  ```xml
  <hr class="border-0 bg-slate-500 text-slate-500 h-px my-8">
  ```

</code-sample>

Need uneven spacing?

<code-sample title="src/templates/example.html">

  ```xml
  <hr class="border-0 bg-slate-500 text-slate-500 h-px mt-4 mb-8">
  ```

</code-sample>

<alert>Note that <code>&lt;hr&gt;</code> elements come with margins by default, so you might want to set a custom one or reset it with <code>m-0</code>. For example, Chrome resets to <code>8px</code>.</alert>

#### Alignment

You can use the `align` attribute to align a Divider.

<code-sample title="src/templates/example.html">

  ```xml
  <hr align="right" class="border-0 bg-slate-500 text-slate-500 h-px mt-4 mb-8">
  ```

</code-sample>

By default, it will be centered.

#### Vertical

For a vertical Divider, simply use a narrow width and a bigger height:

<code-sample title="src/templates/example.html">

  ```xml
  <hr class="border-0 bg-slate-500 text-slate-500 w-px h-16 m-0">
  ```

</code-sample>

### Outlook note

The `<hr>` divider is harder to control in Outlook on Windows - it usually renders wider than intended and you can't use left/right CSS margins.

A proposed solution, as seen in Mark's example, is to wrap it in a `<div>` and add margins to that instead:

<code-sample title="src/templates/example.html">

  ```xml
  <div class="mx-6">
    <hr class="border-0 bg-slate-500 text-gray-500 h-px">
  </div>
  ```

</code-sample>

In our tests, the semantic `<hr>` divider has been hard to control in Outlook on Windows, so we recommend using the Div or Table Divider.

The Maizzle Starter includes a [Divider component](/docs/components/divider) that uses the `<div>` technique.

## Table divider

The spacing above and below the Table Divider line is defined through the vertical padding of the inner `<td>` element, with Tailwind CSS utilities:

<code-sample title="src/templates/example.html">

  ```xml
  <table class="w-full" role="separator">
    <tr>
      <td class="py-6">
        <div class="bg-slate-300 h-px leading-px">&zwj;</div>
      </td>
    </tr>
  </table>
  ```

</code-sample>

How it works:

- `py-6` adds 24px top and bottom padding
- the `<div>` is the horizontal line: we set its height and line-height to 1px, and give it a background color
- we use a `&zwj;` to add something inside the `<div>`, so it can take up height

Feel free to use `&nbsp;` instead of `&zwj;` - both work just fine 👌

### Outlook note

The `<div>` element where we use `leading-px` needs some extra attention for Outlook. Otherwise, it will render thicker than intended.

To make Outlook respect the line height you set on elements, you may use the `mso-line-height-rule-exactly` class that is available from the `tailwindcss-mso` plugin (included in the Starter).

<code-sample title="src/templates/example.html">

  ```xml
  <table class="w-full" role="separator">
    <tr>
      <td class="py-6">
        <div class="bg-slate-300 h-px leading-px mso-line-height-rule-exactly">&zwj;</div>
      </td>
    </tr>
  </table>
  ```

</code-sample>
