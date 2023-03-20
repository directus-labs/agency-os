// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16)
  var g = parseInt(hex.slice(3, 5), 16)
  var b = parseInt(hex.slice(5, 7), 16)
  var a = alpha || 1
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'
}

module.exports = {
  theme: {
    extend: {
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
  plugins: [require('@tailwindcss/typography')],
}
