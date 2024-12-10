```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      sm: {max: '600px'},
      xs: {max: '425px'},
    },
    extend: {
      colors: {
        blue: {
          brand: '#286dbd',
        },
      },
      spacing: {
        full: '100%',
        px: '1px',
        0: '0',
        2: '8px',
      }
    }
  },
  plugins: [
    require('tailwindcss-mso'),
    require('tailwindcss-email-variants'),
  ]
}
```
