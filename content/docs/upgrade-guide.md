---
title: "Upgrade Guide"
description: "Upgrading your Maizzle projects from v3 to v4"
---

# Upgrade Guide

Upgrading your Maizzle projects from v3.x to v4.0.

Maizzle 4 is a major framework update that comes with awesome new features and improvements, but also includes a few breaking changes.

Migrating to Maizzle v4.0 should take less than 10 minutes for most users.

## Node.js

<strong class="text-indigo-500">BREAKING CHANGE</strong>

Maizzle v4.0 requires Node.js v14.0.0 or higher.

Check your current Node.js version:

<terminal show-copy>

  ```
  node --version
  ```

</terminal>

## Upgrade dependencies

It's probably best that you do a clean install:

- remove `node_modules` directory
- remove `package-lock.json` and/or `yarn.lock`


<alert>If using yarn, note that it might have cached your dependencies.</alert>

Install the latest version of Maizzle:

<terminal show-copy>

  ```
  npm install @maizzle/framework@latest
  ```

</terminal>

## Update tailwind.config.js

Some configuration keys are deprecated in Tailwind CSS v3.0, and others have changed.

### Remove deprecated keys

The following keys are now configured by default or deprecated, so you can safely remove them from your `tailwind.config.js`:

- remove `mode` - the JIT engine is now default in Tailwind CSS v3.0
- remove `inset` - no longer needed
- remove `maxHeight` - no longer needed

<code-sample title="tailwind.config.js" no-copy>

  ```diff
  module.exports = {
-  mode: 'jit',
    theme: {
      extend: {
-  inset: theme => ({
-    ...theme('spacing'),
-  }),
-  maxHeight: theme => ({
-    ...theme('spacing'),
-  }),
      },
    },
  }
  ```

</code-sample>

### Update `corePlugins`

Tailwind CSS v3.0 has moved to using CSS variables for color utilities, which are not widely supported by email clients.

Replace your `corePlugins` key with the following:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    // ...
    corePlugins: {
      preflight: false,
      backgroundOpacity: false,
      borderOpacity: false,
      boxShadow: false,
      divideOpacity: false,
      placeholderOpacity: false,
      textOpacity: false,
    },
  }
  ```

</code-sample>

## Update config.js

Some Maizzle config keys have been deprecated, and some have changed.

### Remove deprecated keys

All CSS purging configuration is now done in `tailwind.config.js` through the `content` key, so you can remove `purgeCSS` from your `config.js`:

<code-sample title="config.js" no-copy>

  ```diff
  module.exports = {
-  purgeCSS: false,
  }
  ```

</code-sample>

### Update `baseImageURL`

<strong class="text-indigo-500">BREAKING CHANGE</strong>

The `baseImageURL` key has been renamed to `baseURL`:

<code-sample title="config.js" no-copy>

  ```diff
  module.exports = {
-  baseImageURL: 'https://example.com/images/',
+  baseURL: 'https://example.com/images/',
  }
  ```

</code-sample>

Note that `baseURL` works differently from `baseImageURL`, the most important change being that if you've configured it to be a string like in the example above, it will apply to all tags that it supports.

That includes `<a>` tags, which might lead to unexpected results in some projects.

The `baseURL` Transformer can be customized to target only the tags/attributes that you need it to work on, for example:

<code-sample title="config.js">

  ```js
  module.exports = {
    baseURL: {
      tags: {
        img: {
          src: 'https://example.com/images/',
        },
      },
    },
  }
  ```

</code-sample>

### Update `transform`

<strong class="text-indigo-500">BREAKING CHANGE</strong>

The `transform` key has been renamed to `filters`.

<code-sample title="config.js" no-copy>

  ```diff
  module.exports = {
-  transform: {}
+  filters: {}
  }
  ```

</code-sample>

### Update `mergeLonghand`

<strong class="text-indigo-500">BREAKING CHANGE</strong>

The `inlineCSS.mergeLonghand` key has been moved up one level and renamed to `shorthandInlineCSS`, so you can now use it even if `inlineCSS` is disabled.

<code-sample title="config.js" no-copy>

  ```diff
  module.exports = {
-  inlineCSS: {
-    mergeLonghand: true
-  }
+  shorthandInlineCSS: true
  }
  ```

</code-sample>

The options that you can pass to this Transformer have not changed, see the [`shorthandInlineCSS` docs](/docs/transformers/shorthand-inline-css) for more info.

## Optional

The following changes are not required for v4.0 compatibility, it's totally up to you if you want to add them to your projects.


### Tailwind CSS plugins

The Maizzle Starter now includes some custom Tailwind CSS plugins that can help when developing HTML emails.

Install the plugins:

<terminal show-copy>

  ```
  npm install tailwindcss-box-shadow@latest tailwindcss-email-variants@latest tailwindcss-mso@latest
  ```

</terminal>

Then add them to your `tailwind.config.js`:

<code-sample title="tailwind.config.js">

  ```js
  module.exports = {
    // ...
    plugins: [
      require('tailwindcss-mso'),
      require('tailwindcss-box-shadow'),
      require('tailwindcss-email-variants'),
    ],
  }
  ```

</code-sample>

### Update npm scripts

The npm scripts in the Starter have been renamed:

<code-sample title="package.json">

```diff
module.exports = {
  "scripts": {
-  "local": "maizzle build",
-  "production": "maizzle build production",
-  "watch": "maizzle serve"
+  "dev": "maizzle serve",
+  "build": "maizzle build production"
  },
}
```

</code-sample>

### Spacing scale

Starting with v4.0 we've moved to a spacing scale that is consistent with the one from Tailwind CSS. It still uses pixels, but it's based on the rem scale:

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
      },
    },
  }
  ```

</code-sample>

If you update your spacing scale, make sure to update all spacing utilities in your emails:

<code-sample title="src/templates/example.html">

  ```diff
-  <td class="px-16 py-32">
+  <td class="px-4 py-8">
  ```

</code-sample>

### Font size

Update your `fontSize` scale:

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
      },
    },
  }
  ```

</code-sample>

### Border radius

Update the `borderRadius` scale:

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
      },
    },
  }
  ```

</code-sample>

### Box shadow

Shadows will not work without the `tailwindcss-box-shadow` plugin because Tailwind's default shadows use CSS syntax that is not supported in email.

If you have installed the `tailwindcss-box-shadow` plugin, add the `boxShadow` key to your `tailwind.config.js`:

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
    },
  }
  ```

</code-sample>

<alert type="warning">The default shadows in Tailwind CSS will break your styles in Gmail, because of the `/` character in the `box-shadow` property value.</alert>
