---
title: "Spacers"
description: "Learn how to create reliable vertical spacing for HTML email with Tailwind CSS in Maizzle"
---

# Spacers

Vertical spacing in HTML emails can be tricky, mainly because of inconsistent support for (and rendering of) margin, padding, and `<br>` tags.

Here's how easy it is to create simple yet reliable spacers for your emails, using basic HTML and Tailwind CSS utility classes.

## Div

The simplest vertical spacer for HTML emails:

<code-sample title="src/templates/example.html">

  ```xml
  <div class="leading-4" role="separator">&zwnj;</div>
  ```

</code-sample>

How it works:

1. `leading-4` sets the spacer's height with `line-height: 16px;`
2. `role="separator"` indicates the element is a divider, improving accessibility
3. `&zwnj;` adds 'content' inside, so that the `<div>` can take up height

You may specify a different height for smaller devices by using the `sm:` screen variant:

```xml
<div class="leading-4 sm:leading-2" role="separator">&zwnj;</div>
```

<alert>Responsive heights will only work in email clients that support `@media` queries.</alert>

<alert>Feel free to use `&nbsp;` instead of `&zwnj;`, both work just fine.</alert>

## Table

Styling `<table>` and `<td>` is better supported than `<div>` in HTML emails, particularly in Outlook for Windows.

If you need more control over the styling of your Spacer, use this one instead:

<code-sample title="src/templates/example.html">

  ```xml
  <table class="w-full" role="separator">
    <tr>
      <td class="leading-4">&zwnj;</td>
    </tr>
  </table>
  ```

</code-sample>

## Row

Need to add space between `<table>` rows?

<code-sample title="src/templates/example.html">

  ```xml
  <tr role="separator">
    <td class="leading-4">&zwnj;</td>
  </tr>
  ```

</code-sample>

The default ARIA role for a `<tr>` is `row`, so we use `role="separator"` to indicate that this is a separator, not a table row.

## Semantic

We can use an `<hr>` to create a semantic Spacer.

<code-sample title="src/templates/example.html">

```xml
<hr class="border-0 text-white my-4 min-h-full">
```

</code-sample>

How it works:

- we hide the line by resetting the border
- we give it the same color as the background of the page (for Outlook)
- we control the height with top and bottom margins

The `min-h-full` class is used for compatibility with Apple email clients.

<alert type="warning">Do not add `role="separator"` on the `<hr>` spacer, as it is implied.</alert>
