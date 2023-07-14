---
title: "Grids"
description: "Learn how to create a simple grid system for HTML email with Tailwind CSS in Maizzle"
---

# Grids

You'll sometimes need to create multi-column HTML email layouts. Here's how to create a responsive email grid with Tailwind CSS in Maizzle.

## Percentage

The simplest (and recommended) approach is to use Tailwind percentage widths:

<div class="example-preview">
  <div class="not-prose px-4">
    <table class="w-full max-w-[600px]">
      <tr>
        <td class="w-4/12 bg-slate-200 p-2">4 cols</td>
        <td class="w-8/12 bg-slate-300 p-2">8 cols</td>
      </tr>
    </table>
  </div>

  ```xml
  <table class="w-[600px] sm:w-full">
    <tr>
      <td class="w-4/12">4 cols</td>
      <td class="w-8/12">8 cols</td>
    </tr>
  </table>
  ```
</div>

Tailwind comes configured with 2, 3, 4, 5, 6 and 12 column grids, so you can create columns with classes like `w-2/3` or `w-4/6`.

## Fixed

Of course, you can use fixed widths if you prefer.

<div class="example-preview">
  <div class="not-prose">
    <table class="w-full max-w-[600px]">
      <tr>
        <td class="bg-slate-200 p-2 w-[300px]">300px</td>
        <td class="bg-slate-300 p-2 w-[300px]">300px</td>
      </tr>
    </table>
  </div>

  ```xml
  <table class="w-[600px] sm:w-full">
    <tr>
      <td class="w-[300px]">6 cols</td>
      <td class="w-[300px]">6 cols</td>
    </tr>
  </table>
  ```
</div>

## Stacking

Responsive HTML emails usually reset the columns to stack on mobile. We can easily achieve this with a couple utility classes.

Using the [percentage](#percentage) example, we might do:

<div class="example-preview">
  <div class="not-prose">
    <table class="w-full max-w-[600px]">
      <tr>
        <td class="w-full sm:w-4/12 inline-block bg-slate-200 p-2">4 cols</td>
        <td class="w-full sm:w-8/12 inline-block bg-slate-300 p-2">8 cols</td>
      </tr>
    </table>
  </div>

  ```xml
  <table class="w-[600px] sm:w-full">
    <tr>
      <td class="w-4/12 sm:w-full inline-block">4 cols</td>
      <td class="w-8/12 sm:w-full inline-block">8 cols</td>
    </tr>
  </table>
  ```
</div>

Some email clients strip the `doctype` of your email, which prevents `inline-block` from working on `<td>`. This can be fixed by using `<th>` instead, but requires resetting the font weight and text alignment:

<div class="example-preview">
  <div class="not-prose">
    <table class="w-full max-w-[600px]">
      <tr>
        <th class="w-full sm:w-4/12 inline-block bg-slate-200 p-2 font-normal text-left">4 cols</th>
        <th class="w-full sm:w-8/12 inline-block bg-slate-300 p-2 font-normal text-left">8 cols</th>
      </tr>
    </table>
  </div>

  ```xml
  <table class="w-[600px] sm:w-full">
    <tr>
      <th class="w-4/12 sm:w-full inline-block font-normal text-left">4 cols</th>
      <th class="w-8/12 sm:w-full inline-block font-normal text-left">8 cols</th>
    </tr>
  </table>
  ```
</div>

Need a custom column stacking order on mobile? See the [reverse stack](/docs/examples/reverse-stack) docs.
