---
title: "Tailwind CSS configuration"
description: "Tailwind CSS configuration options for email development in Maizzle"
---

# Tailwind CSS configuration

Options for Tailwind CSS in Maizzle, and how `tailwind.config.js` is configured.

## Build configuration

Tailwind CSS paths are configured with the `build.tailwind` key in your config:

<code-sample title="config.js">

  ```js
  module.exports = {
    build : {
      tailwind: {
        css: 'src/css/tailwind.css',
        config: 'tailwind.config.js',
        compiled: ''
      }
    }
  }
  ```

</code-sample>

### css

Default: `src/css/tailwind.css`

Path to your main CSS file, that will be compiled with Tailwind CSS.

This file is optional: if it doesn't exist Maizzle will compile Tailwind CSS with the `@tailwind components; @tailwind utilities;` directives.

### config

Default: `tailwind.config.js`

Path to the Tailwind CSS config file to use.

You can use this to specify a custom Tailwind config file for each Environment.

For example, you could have multiple Tailwind config files, where you:

- keep a certain project's design system
- disable `!important` (like in ⚡4email templates)
- use different Tailwind CSS plugins

<alert>If the `config` key is missing, Maizzle will try to load `tailwind.config.js` from your project root. If that file is also missing, Tailwind CSS will be compiled using its default settings (which are not email-optimized).</alert>

#### No effect in Front Matter

Because Tailwind CSS is compiled only once, _before_ any Templates are processed, something like this won't have any effect:

<code-sample title="src/templates/example.html">

  ```xml
  ---
  build:
    tailwind:
      config:
        important: false
  ---

  <extends src="src/layouts/main.html">
    <!-- ... -->
  </extends>
  ```

</code-sample>

### compiled

Use the `compiled` key if you already have a CSS string - this will skip Tailwind CSS compilation and no utilities will be generated.

You shouldn't need this in real life, it's there for internal use mostly.

## tailwind.config.js

Maizzle comes with an email-tailored `tailwind.config.js`, customized for optimal email client compatibility.

### Content

These are the default Tailwind CSS [content sources](https://tailwindcss.com/docs/content-configuration) that Maizzle uses:

- the content of the template file currently being processed
- your [Components root](/docs/configuration/components#root) (default: `./src/components/**/*.html`)
- your [Layouts root](/docs/configuration/layouts#root) (default: `./src/layouts/**/*.html`)
- all your [Template sources](/docs/configuration/templates#source)

These paths are scanned by Tailwind CSS for class names, so that it can generate the corresponding CSS.

You may configure additional content sources by adding a `content` key to your `tailwind.config.js`:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    content: [
      './some/other/path/**.{html,js}',
      // Need to add these two back:
      './src/components/**/*.html',
      './src/layouts/**/*.html',
    ],
  }
  ```

</code-sample>

Adding paths to `tailwind.config.js` will overwrite the default content paths, so you need to add back the paths for Components and Layouts, like in the example above.

### !important

HTML emails still need to use inline CSS, most notably for these reasons:

- Outlook/Office 365 for Windows only reads the first class in a `class=""` attribute, ignoring the rest.
  So it'll only use `a` from `class="a b"`
- Some email clients don't support embedded CSS (i.e. in `<style>`)
- Embedded styles are often discarded when an email is forwarded

Because of this, Tailwind's `important` option is set to `true` in Maizzle - this way responsive utilities can actually override the inlined CSS.

<alert>Only CSS in `<style>` tags will use `!important`, inlined CSS in `style=""` attributes will not.</alert>

You may disable this behavior by adding the `important` key to your Tailwind config:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    important: false,
  }
  ```

</code-sample>

### Separator

Characters like `:` in `hover:bg-black` need to be \escaped in CSS.

Because some email clients (Gmail 👀) fail to parse selectors with escaped characters, Maizzle normalizes all your CSS selectors and HTML classes, replacing any escaped characters it finds with email-safe alternatives.

So you can safely use Tailwind's awesome default separator and write classes like `sm:w-1/2` - Maizzle will convert that to `sm-w-1-2` in your compiled template:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    separator: ':',
    theme: {
      width: {
        '2/5': '40%', // w-2/5 converted to w-2-5
        '50%': '50%', // w-50\% => w-50pc
        '2.5': '0.625rem', // w-2\.5 => w-2_5
      }
    }
  }
  ```

</code-sample>

You can also [configure the replacement mappings](/docs/transformers/safe-class-names).

### Screens

Maizzle uses a desktop-first approach with `max-width` media queries instead of Tailwind's default, mobile-first approach that uses `min-width`:

<code-sample title="tailwind.config.js">

```js
module.exports = {
  screens: {
    xs: {max: '425px'},
    sm: {max: '600px'},
  },
}
```

</code-sample>

Of course, you're free to adjust this as you like. For example, you might add a breakpoint that targets tablet devices based on their viewport width:

<code-sample title="tailwind.config.js">

```js
module.exports = {
  screens: {
    xs: {max: '425px'},
    sm: {max: '600px'},
    md: {min: '768px', max: '1023px'},
  },
}
```

</code-sample>

That would enable you to write classes like `md:hidden` or `md:text-lg`, which will be wrapped in a `@media (min-width: 768px) and (max-width: 1023px)` media query.

More on screens, in the [Tailwind CSS docs](https://tailwindcss.com/docs/responsive-design).

### Colors

Maizzle uses the [default colors](https://tailwindcss.com/docs/customizing-colors) from Tailwind CSS.

You may define your own colors, or even extend or change the default color palette by adding a `colors` key to your Tailwind config:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
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

</code-sample>

See the [Tailwind color palette reference](https://tailwindcss.com/docs/customizing-colors).

### Pixel units

Because of poor email client support, `rem` units have been replaced with `px`.

This affects the following utilities:

- `spacing` (width, height, margin, padding, etc)
- `maxWidth`
- `borderRadius`
- `fontSize`
- `lineHeight`

### Spacing

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    theme: {
      extend: {
        spacing: {
          screen: '100vw',
          full: '100%',
          px: '1px',
          0: '0',
          0.5: '2px',
          1: '4px',
          1.5: '6px',
          2: '8px',
          2.5: '10px',
          3: '12px',
          3.5: '14px',
          4: '16px',
          4.5: '18px',
          5: '20px',
          5.5: '22px',
          6: '24px',
          6.5: '26px',
          7: '28px',
          7.5: '30px',
          8: '32px',
          8.5: '34px',
          9: '36px',
          9.5: '38px',
          10: '40px',
          11: '44px',
          12: '48px',
          14: '56px',
          16: '64px',
          20: '80px',
          24: '96px',
          28: '112px',
          32: '128px',
          36: '144px',
          40: '160px',
          44: '176px',
          48: '192px',
          52: '208px',
          56: '224px',
          60: '240px',
          64: '256px',
          72: '288px',
          80: '320px',
          96: '384px',
          97.5: '390px',
          120: '480px',
          150: '600px',
          160: '640px',
          175: '700px',
          '1/2': '50%',
          '1/3': '33.333333%',
          '2/3': '66.666667%',
          '1/4': '25%',
          '2/4': '50%',
          '3/4': '75%',
          '1/5': '20%',
          '2/5': '40%',
          '3/5': '60%',
          '4/5': '80%',
          '1/6': '16.666667%',
          '2/6': '33.333333%',
          '3/6': '50%',
          '4/6': '66.666667%',
          '5/6': '83.333333%',
          '1/12': '8.333333%',
          '2/12': '16.666667%',
          '3/12': '25%',
          '4/12': '33.333333%',
          '5/12': '41.666667%',
          '6/12': '50%',
          '7/12': '58.333333%',
          '8/12': '66.666667%',
          '9/12': '75%',
          '10/12': '83.333333%',
          '11/12': '91.666667%',
        },
      }
    }
  }
  ```

</code-sample>

### borderRadius

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    theme: {
      extend: {
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
      }
    }
  }
  ```

</code-sample>

### boxShadow

Maizzle uses [tailwindcss-box-shadow](https://www.npmjs.com/package/tailwindcss-box-shadow) to output box-shadow CSS values exactly as you have them defined in your Tailwind CSS config.

The default, CSS variables-based box shadows need to be disabled in your `tailwind.config.js`, because email clients have very poor support for CSS variables.

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    theme: {
      extend: {
        boxShadow: {
          sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
          xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        },
      },
      corePlugins: {
        boxShadow: false,
        // ...
      },
    }
  }
  ```

</code-sample>

### fontFamily

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
          serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
          mono: ['ui-monospace', 'Menlo', 'Consolas', 'monospace'],
        },
      }
    }
  }
  ```

</code-sample>

### fontSize

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    theme: {
      extend: {
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
      }
    }
  }
  ```

</code-sample>

### lineHeight

The `lineHeight` utilities have been extended to include all `spacing` scale values:

<code-sample title="config.js">

  ```js
  module.exports = {
    theme: {
      extend: {
        lineHeight: theme => ({
          ...theme('spacing'),
        }),
      }
    }
  }
  ```

</code-sample>

So you can use `leading` utilities to easily create vertical spacing, like this:

```xml
<div class="leading-16">&zwj;</div>
<!-- Result: <div style="line-height: 64px">&zwj;</div> -->
```

### maxWidth

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    theme: {
      extend: {
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
      }
    }
  }
  ```

</code-sample>

### Plugins

You can of course use any Tailwind CSS plugin, all you have to do is to install it from NPM and then `require` it in your `tailwind.config.js`.

For example, let's use the [tailwindcss-email-variants](https://github.com/maizzle/tailwindcss-email-variants) plugin:

<terminal show-copy>

  ```
  npm install tailwindcss-email-variants
  ```

</terminal>

<code-sample title="tailwind.config.js">

```js
module.exports = {
  plugins: [
    require("tailwindcss-email-variants"),
  ],
}
```

</code-sample>

<alert type="info">
  <code>tailwindcss-email-variants</code> is already included in the Starter, no need to install it.
</alert>

### Disabled plugins

The Maizzle Starter disables the following Tailwind CSS core plugins due to poor support in the majority of email clients:

- preflight
- backgroundOpacity
- borderOpacity
- boxShadow
- divideOpacity
- placeholderOpacity
- textOpacity

If you want to use one of these plugins, simply set it to `true` in `corePlugins` at the bottom of your `tailwind.config.js`:

<code-sample title="tailwind.config.js">

  ```diff
  corePlugins: {
  - backgroundOpacity: false,
  + backgroundOpacity: true,
  }
  ```

</code-sample>
