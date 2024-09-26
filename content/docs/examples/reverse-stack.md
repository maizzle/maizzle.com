---
title: "Reverse Stack"
description: "Reorder stacked columns in a mobile responsive HTML email template with table layout CSS properties."
---

# Reverse Stack

With responsive HTML emails, you sometimes need to reverse the order in which stacked columns appear on mobile. You might even want to set a custom stacking order for layouts with 3+ columns.

## Reverse 2 col

Imagine a two column layout, with text on the left and an image on the right:

```html [2-col.html]
<table class="w-full">
  <tr>
    <th class="sm:block w-1/2 sm:w-full font-sans font-normal text-left">
      <p class="text-2xl font-hairline text-black">Left text</p>
      <p class="text-slate-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur.</p>
    </th>
    <th class="sm:block w-1/2 sm:w-full font-normal text-left">
      <img src="https://picsum.photos/600/600" alt="Unsplash photo">
    </th>
  </tr>
</table>
```

Naturally, the image will show under the text when viewed on a mobile device.

However, using table responsive display utilities, we can reverse the columns:

```html [2-col-reverse.html]
<table class="w-full">
  <tr>
    <th class="w-1/2 sm:table-footer-group font-sans font-normal text-left">
      <div class="sm:w-full sm:px-8">
        <h2 class="text-2xl font-hairline text-black">Left text</h2>
        <p class="text-slate-700 m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur.</p>
      </div>
    </th>
    <th class="w-1/2 sm:table-header-group font-normal text-left">
      <div class="sm:w-full sm:px-8">
        <img src="https://picsum.photos/600/600" alt="Unsplash photo">
      </div>
    </th>
  </tr>
</table>
```

It's done in 2 simple steps:

1. Use the responsive `table-{...}-group` utilities on each column, to reverse column order on small screens
2. Wrap the contents of each column in a `<div>` and use it to set padding for mobile. This is required because the CSS properties used to reverse the column order do not support padding

See the [2 col reorder demo on CodePen](https://codepen.io/maizzle/pen/dgpxbB?editors=1000).

## Reorder 3+ cols

In a similar fashion, we can reorder a 3+ column layout:

```html [3-col-reverse.html]
<table class="w-full">
  <tr class="sm:w-full sm:table">
    <th class="w-1/3 sm:table-footer-group">
      <div class="sm:px-2">
        <h2 class="text-xl font-hairline">Last on mobile</h2>
      </div>
    </th>
    <th class="w-1/3 sm:table-footer-group">
      <div class="sm:px-2">
        <h2 class="text-xl font-hairline">Second on mobile</h2>
      </div>
    </th>
    <th class="w-1/3 sm:table-caption sm:w-full">
      <div class="sm:px-2">
        <h2 class="text-xl font-hairline">First on mobile</h2>
      </div>
    </th>
  </tr>
</table>
```

This only needed a couple of extra steps:

- Make the `<tr>` full width on mobile, by adding `sm:w-full` and `sm:table`
- Use `sm:table-caption` and `sm:w-full` on the column that you want to display first on mobile

See the [3+ col reorder demo on CodePen](https://codepen.io/maizzle/pen/dgpxLp?editors=1000).
