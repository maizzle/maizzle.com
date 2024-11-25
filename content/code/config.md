```js
/** @type {import('tailwindcss').Config} */

module.exports = {
  presets: [
    require('tailwindcss-preset-email')
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          brand: '#286dbd',
        },
      },
    }
  },
}
```
