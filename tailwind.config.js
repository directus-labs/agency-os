const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16)
  var g = parseInt(hex.slice(3, 5), 16)
  var b = parseInt(hex.slice(5, 7), 16)
  var a = alpha || 1
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'
}

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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
              '&:not(.btn)': {
                textDecoration: 'none',
                backgroundImage: `linear-gradient(${theme(
                  'colors.accent.DEFAULT'
                )},${theme('colors.accent.DEFAULT')})`,
                backgroundSize: '100% 2px',
                backgroundPosition: 'center bottom 2%',
                backgroundRepeat: 'no-repeat',
                transition: 'all ease-in-out .2s',
                '&:hover': {
                  backgroundSize: '90% 12px',
                  backgroundPosition: 'right top 2%',
                  backgroundImage: `linear-gradient(${hexToRgba(
                    theme('colors.accent.DEFAULT'),
                    0.8
                  )},${hexToRgba(theme('colors.accent.DEFAULT'), 0.8)})`,
                  transition: 'all ease-in-out .2s',
                  '&::after': {
                    opacity: '1',
                  },
                },
                // Create a psuedo element to add a triangle to the end of the link
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  opacity: '0',
                  width: '0',
                  height: '0',
                  marginTop: '-14px',
                  borderLeft: `24px solid ${hexToRgba(
                    theme('colors.accent.DEFAULT'),
                    0.8
                  )}`,
                  borderTop: '24px solid transparent ',
                  borderBottom: '24px solid transparent',
                  transition: 'all ease-in-out .2s',
                },
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    // Formkit Plugin for Tailwind
    // https://formkit.com/guides/create-a-tailwind-theme
    require('@formkit/themes/tailwindcss'),
  ],
}
