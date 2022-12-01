const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './content/**/*.md',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1921px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        'xl-card': '0 20px 25px -5px rgba(67, 152, 238, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  corePlugins: {
    textOpacity: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
