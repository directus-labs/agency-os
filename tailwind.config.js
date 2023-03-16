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
    `.form.theme.js`,
    `.formkit.config.{js,ts}`,
  ],

  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        gray: colors.slate,
        accent: {
          DEFAULT: '#FF99DD',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
      animation: {
        'fade-in': 'fade-in 0.5s linear forwards',

        'spin-slow': 'spin 4s linear infinite',
        'spin-slower': 'spin 6s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
        'spin-reverse-slow': 'spin-reverse 4s linear infinite',
        'spin-reverse-slower': 'spin-reverse 6s linear infinite',
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

        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
      },
      maxWidth: {
        '2xl': '40rem',
      },
    },
    // typography: (theme) => ({
    //   DEFAULT: {
    //     css: {
    //       hr: {
    //         border: `1.5px solid ${theme('colors.gray.200')}`,
    //       },
    //       a: {
    //         textDecoration: 'none',
    //         '&:not(.btn)': {
    //           color: theme('colors.accent.DEFAULT'),
    //           textDecoration: 'none',
    //           // fontWeight: theme('fontWeight.medium'),
    //           backgroundImage: `linear-gradient(${theme(
    //             'colors.gray.200'
    //           )},${theme('colors.gray.200')})`,
    //           backgroundSize: '100% 3px',
    //           backgroundPosition: 'center bottom 2%',
    //           backgroundRepeat: 'no-repeat',
    //           transition: 'all ease-in-out .2s',
    //           '&:hover': {
    //             color: theme('colors.accent.700'),
    //             backgroundSize: '10% 100%',
    //             backgroundPosition: 'right bottom 2%',
    //             backgroundImage: `linear-gradient(${theme(
    //               'colors.gray.200'
    //             )},${theme('colors.gray.200')})`,
    //             transition: 'all ease-in-out .2s',
    //           },
    //         },
    //       },
    //     },
    //   },
    // }),
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
