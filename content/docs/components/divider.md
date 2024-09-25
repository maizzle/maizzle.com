---
title: "Divider Component"
description: "A component for creating horizontal visual dividers in HTML emails."
---

# Divider Component

Quickly add horizontal visual dividers to your HTML emails.

## Usage

The Divider component is defined in `src/components/divider.html`.

This enables the `<x-divider>` syntax, which you can use like this:

  ```html [src/templates/example.html] {5}
  <x-main>
    <table>
      <tr>
        <td>
          <x-divider />
        </td>
      </tr>
    </table>
  </x-main>
  ```

You can use it anywhere you'd use a `<div>`.

Simply using the `<x-divider>` tag will render a `1px` gray horizontal line with `24px` of space above and below it.

## Customization

You can customize the Divider and give it a custom height (line thickness), change its color, and adjust the space around it.

### Height

Default: `1px`

The default height is `1px`, but you can change it with the `height` prop:

```html [src/templates/example.html]
<x-divider height="2px" />
```

### Color

Default: `#cbd5e1`

Define a custom line color with the `color` prop. You can use any CSS color value.

If you omit this prop, the Divider will use `bg-slate-300` from Tailwind CSS, which is currently set to `#cbd5e1`.

Let's change the color to red:

```html [src/templates/example.html]
<x-divider color="#e53e3e" />
```

You can also use Tailwind CSS utilities if you prefer:

```html [src/templates/example.html]
<x-divider class="bg-rose-500" />
```

<Alert>Tailwind CSS utilities must be passed inside the `class` attribute, not the `color` attribute.</Alert>

### Margins

Default: `undefined`

Add margins to any of the four sides of the Divider, through these props:

- `top`
- `right`
- `bottom`
- `left`

For example, let's add `32px` to the top and `64px` to the bottom:

```html [src/templates/example.html]
<x-divider top="32px" bottom="64px" />
```

Under the hood, the CSS `margin` property is used, so you can use any CSS unit that is supported in HTML emails.

<Alert>Margin props will override `space-y|x` props.</Alert>

### Spacing

Default: `24px|undefined`

You may add top/bottom or left/right spacing through a single prop:

- `space-y` for top & bottom (default: `24px`)
- `space-x` for left & right (not set by default)

For example, let's add `32px` to the top and bottom:

```html [src/templates/example.html]
<x-divider space-y="32px" />
```

Similarly, let's add `24px` to the left and right:

```html [src/templates/example.html]
<x-divider space-x="24px" />
```

<Alert>`space-y|x` props will be overridden by individual margin props.</Alert>

### Other attributes

You may pass any other HTML attributes to the component, such as `data-*` or `id`.

Note that non-standard attributes will be ignored by default - you'll need to define them as props in the component if you need them preserved. Alternatively, you can safelist them in your `build.components` config.

## Responsive

To override Divider styling on small viewports, use Tailwind CSS utilities:

```html [src/templates/example.html]
<x-divider space-y="32px" class="sm:my-4 sm:bg-black" />
```

## Outlook note

The root `<div>` element of the Divider component needs some extra attention for Outlook on Windows, otherwise it will render thicker than intended.

For the Divider to render the visual line as expected in Outlook on Windows too, it should also be styled with `mso-line-height-rule: exactly`. In Maizzle, this is set globally in the `main.html` layout so you don't need to worry about it.

However, if you can't use that layout for some reason or are worried that the Outlook-specific CSS in the `<head>` might be stripped in some situations, simply add it in a style attribute on the tag:

```html [src/templates/example.html]
<x-divider style="mso-line-height-rule: exactly;" />
```

Alternatively, you may also use the `mso-line-height-rule-exactly` class that is available from the `tailwindcss-mso` plugin (included in the Starter):

```html [src/templates/example.html]
<x-divider class="mso-line-height-rule-exactly" />
```

Of course, you can also modify `src/components/divider.html` and add the `mso-line-height-rule: exactly` CSS rule to the `<div>` element.

## Alternatives

There are other ways to create horizontal visual dividers in your HTML emails, such as using a `<table>` or an `<hr>`. Check out our [Divider examples](/docs/examples/dividers) for more ideas.
