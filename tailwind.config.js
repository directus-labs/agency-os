const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./nuxt.config.{js,ts}`,
    `./form.theme.js`,
    `./formkit.config.{js,ts}`,
  ],

  // Using a separate config file for typography to keep things clean and tidy
  presets: [require('./tailwind.config.typography.js')],

  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        accent: {
          DEFAULT: '#FF99DD',
        },
        red: colors.rose,
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
      animation: {
        'fade-in': 'fade-in 0.5s linear forwards',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    // Formkit Plugin for Tailwind
    // https://formkit.com/guides/create-a-tailwind-theme
    require('@formkit/themes/tailwindcss'),
  ],
}
