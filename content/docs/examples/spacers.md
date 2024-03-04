---
title: "Spacers"
description: "Creating reliable vertical spacing for HTML email with Tailwind CSS."
---

# Spacers

Vertical spacing in HTML emails can be tricky, mainly because of inconsistent support for (and rendering of) margin, padding, and `<br>` tags.

Here's how easy it is to create simple yet reliable spacers for your emails, using basic HTML and Tailwind CSS utility classes.

## Div

The simplest vertical spacer for HTML emails:

```xml [src/templates/example.html]
<div class="leading-4" role="separator">&zwj;</div>
```

How it works:

1. `leading-4` sets the spacer's height with `line-height: 16px;`
2. `role="separator"` indicates the element is a divider, improving accessibility
3. `&zwj;` adds 'content' inside, so that the `<div>` can take up height

You may specify a different height for smaller devices by using the `sm:` screen variant:

```xml [src/templates/example.html]
<div class="leading-4 sm:leading-2" role="separator">&zwj;</div>
```

<Alert>Responsive heights will only work in email clients that support `@media` queries.</Alert>

The `div` spacer is also available as a [component](/docs/components/spacer).

## Row

Need to add space between `<table>` rows?

```xml [src/templates/example.html]
<tr role="separator">
  <td class="leading-4">&zwj;</td>
</tr>
```

The default ARIA role for a `<tr>` is `row`, so we use `role="separator"` to indicate that this is a separator, not a table row.

## Semantic

We can use an `<hr>` to create a semantic Spacer.

```xml [src/templates/example.html]
<hr class="border-0 text-white my-4 min-h-full">
```

How it works:

- we hide the line by resetting the border
- we give it the same color as the background of the page (for Outlook)
- we control the height with top and bottom margins

The `min-h-full` class is used for compatibility with Apple email clients.

<Alert type="warning">Do not add `role="separator"` on the `<hr>` spacer, as it is implied.</Alert>
