---
title: "Tailwind CSS configuration"
description: "Tailwind CSS configuration options for email development in Maizzle."
---

# Tailwind CSS configuration

Configuring Tailwind CSS in Maizzle.

## Build configuration

You may provide a custom Tailwind configuration object under the `css.tailwind` key in your `config.js` file:

```js [config.js]
export default {
  css: {
    tailwind: {
      // ...
    },
  },
}
```

You'll probably only need this when using Maizzle programmatically - otherwise you can use the `@config` directive in your CSS to specify a custom Tailwind CSS config file to use.

## tailwind.config.js

Maizzle uses [`tailwindcss-preset-email`](https://github.com/maizzle/tailwindcss-preset-email), a custom preset that configures Tailwind CSS for better email client support.

This preset helps generate more email-friendly CSS, by disabling some of the default Tailwind CSS features that are not well supported in email clients.
For example, HEX values are preferred over CSS variables, and `rem` units are replaced with `px` units.

Options that are more project-specific are simply added to the `tailwind.config.js` file.

### content

By default, Tailwind CSS in Maizzle is configured to scan all `.html` files in your project's `src` directory for classes to generate:

```js [tailwind.config.js]
export default {
  content: [
    './src/**/*.html',
  ],
}
```

### !important

HTML emails still need to use inline CSS, most notably for these reasons:

- Outlook/Office 365 for Windows only reads the first class in a `class=""` attribute, ignoring the rest. So it'll only use `a` from `class="a b"`
- Some email clients don't support embedded CSS (i.e. in `<style>`)
- Embedded styles are often discarded when an email is forwarded

The Tailwind preset in Maizzle sets `important: true` - this way, things like responsive utilities can actually override inline CSS.

<Alert>Only CSS in `<style>` tags will use `!important`, inlined CSS in `style=""` attributes will not.</Alert>

You may disable this behavior by setting the `important` key to `false`:

```js [tailwind.config.js] diff {8}
import emailPreset from 'tailwindcss-preset-email'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    emailPreset,
  ],
+  important: false,
}
```

### separator

Characters like `:` in `hover:bg-black` need to be \escaped in CSS.

Because some email clients (Gmail 👀) fail to parse selectors with escaped characters, Maizzle normalizes all your CSS selectors and HTML classes, replacing any escaped characters it finds with email-safe alternatives.

So you can safely use Tailwind's awesome default separator and write classes like `sm:w-1/2` - Maizzle will convert that to `sm-w-1-2` in your compiled template.

You can also [configure the replacement mappings](/docs/transformers/safe-class-names) if you need to.

### screens

Maizzle uses a desktop-first approach with `max-width` media queries instead of Tailwind's default, mobile-first approach that uses `min-width`.

These are the default screens in Maizzle:

```js [tailwind.config.js]
export default {
  screens: {
    sm: {max: '600px'},
    xs: {max: '425px'},
  },
}
```

Of course, you're free to adjust this as you like. For example, you might add a breakpoint that targets tablet devices based on their viewport width:

```js [tailwind.config.js] diff {10}
import emailPreset from 'tailwindcss-preset-email'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    emailPreset,
  ],
  screens: {
    sm: {max: '600px'},
+    md: {min: '768px', max: '1023px'},
    xs: {max: '425px'},
  },
}
```

That would enable you to write classes like `md:hidden` or `md:text-lg`, which will be wrapped in a `@media (min-width: 768px) and (max-width: 1023px)` media query.

More on screens, in the [Tailwind CSS docs](https://tailwindcss.com/docs/responsive-design).

### colors

Maizzle uses the [default color palette](https://tailwindcss.com/docs/customizing-colors) from Tailwind CSS.

You may define your own colors, or even extend or change the default color palette by adding a `colors` key to your Tailwind config:

```js [tailwind.config.js]
import emailPreset from 'tailwindcss-preset-email'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    emailPreset,
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          // change 'blue-500'
          500: '#03a9f4',
          // add 'blue-1000'
          1000: '#101e47',
        },
        // custom color
        primary: '#FFCC00',
      }
    }
  }
}
```

### spacing

The spacing scale has been extended to include more values:

```js
spacing: {
  screen: '100vw',
  full: '100%',
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',
  // ...
  14: '56px',
  16: '64px',
  18: '72px',
  // ...
  48: '192px',
  50: '200px',
  // ...
  96: '384px',
},
```

### borderRadius

```js
borderRadius: {
  none: '0px',
  sm: '2px',
  DEFAULT: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
},
```

### boxShadow

The [tailwindcss-box-shadow](https://www.npmjs.com/package/tailwindcss-box-shadow) plugin is used to output `box-shadow` CSS values exactly as you have them defined in your Tailwind CSS config.

```js
boxShadow: {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
},
```

### fontFamily

Font stacks are the default ones from Tailwind CSS, but simplified. We also include a stack for the Inter font:

```js
fontFamily: {
  inter: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
  sans: ['ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
  serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
  mono: ['ui-monospace', 'Menlo', 'Consolas', 'monospace'],
},
```

### fontSize

Pixel values are preferred for font size utilities:

```js
fontSize: {
  0: '0',
  xxs: '11px',
  xs: '12px',
  '2xs': '13px',
  sm: '14px',
  '2sm': '15px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '72px',
  '8xl': '96px',
  '9xl': '128px',
},
```

### lineHeight

The `lineHeight` utilities have been extended to include all `spacing` scale values:

```js
lineHeight: theme => ({
  ...theme('spacing'),
}),
```

So you can use `leading` utilities to easily create vertical spacing, like this:

```xml [src/templates/example.html]
<div class="leading-16">&zwj;</div>
```

Result:

```html
<div style="line-height: 64px">&zwj;</div>
```

### maxWidth

```js
maxWidth: theme => ({
  ...theme('spacing'),
  xs: '160px',
  sm: '192px',
  md: '224px',
  lg: '256px',
  xl: '288px',
  '2xl': '336px',
  '3xl': '384px',
  '4xl': '448px',
  '5xl': '512px',
  '6xl': '576px',
  '7xl': '640px',
}),
```

### Pixel units

Because of poor email client support, our email preset for Tailwind CSS replaces `rem` units with `px`.
This affects the following utilities:

- `spacing` (width, height, margin, padding, etc)
- `maxWidth`
- `borderRadius`
- `fontSize`
- `lineHeight`

### Plugins

You can of course use any Tailwind CSS plugin, all you have to do is to install it from NPM and then `import` or `require` it in your `tailwind.config.js`.

```sh
npm install tailwindcss-email-variants
```

With `import`:

```js [tailwind.config.js] {1, 4-6} diff
+ import emailVariants from 'tailwindcss-email-variants'

export default {
+  plugins: [
+    emailVariants,
+  ],
}
```

With `require`:

```js [tailwind.config.js] {2-4} diff
module.exports = {
+  plugins: [
+    require('tailwindcss-email-variants'),
+  ],
}
```

<Alert type="info">`tailwindcss-email-variants` is already included in the email preset, no need to install it.</Alert>

### Disabled plugins

`tailwindcss-preset-email` disables the following Tailwind CSS core plugins due to poor support in the majority of email clients:

- preflight
- backgroundOpacity
- borderOpacity
- borderSpacing
- divideOpacity
- placeholderOpacity
- textOpacity
- textDecoration

If you want to use one of these plugins, simply set it to `true` in `corePlugins` at the bottom of your `tailwind.config.js`:

```js [tailwind.config.js] diff
corePlugins: {
- backgroundOpacity: false,
+ backgroundOpacity: true,
}
```
