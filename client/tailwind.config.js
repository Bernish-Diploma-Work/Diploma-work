const plugin = require('tailwindcss/plugin')
  ;
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF7652",
        purple: "#6C5ECF",
        'light-blue': "#32A8E2",
        gray: {
          400: "#989AD",
          500: "#6B6B7B",
          600: "#5B5B6B",
          800: "#353340",
          900: "#272532"

        }
      },
      boxShadow: {
        DEFAULT: "0px 3px 12px rgba(0,0,0,0.63)",
        md: "0px 3px 12px rgba(0,0,0,0.1)"
      },
      keyframes: {
        fadeIn: {
          from: {opacity: 0},
          to: {opactiy: 1}
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)'
          },
          '50%': {
            opacity: 0.3
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        },
        countDown: {
          '0%': {
            width: '100%',
          },
          '100%': {
            width: '0%'
          }

        },
        loading: {
          '0%': {
            transform: 'translateX(-150%)'
          },
          '50%': {
            transform: 'translateX(-60%)'
          },
          '100%': {
            transform: 'translateX(150%)'
          }

        }

      },
      fontSize: {
        xs: '.9rem',
        sm: '1rem',
        tiny: '1.2rem',
        base: '1.4rem',
        lg: '1.5rem',
        xl: '1.5rem',
        '2xl': '1.75rem',
        '3xl': '1.9rem',
        '4xl': '2.5rem',
        '5xl': '3.5rem',
        '6xl': '4.5rem',
        '7xl': '5.5rem'
      },
      animation: {
        fadeIn: 'fadeIn .5s ease-in-out',
        scaleIn: 'scaleIn .35s ease-in-out',
        progressCountDown: 'countDown 5s ease',
        loading: 'loading 2s ease infinite'

      }
    },
  },
  plugins: [
    plugin(({addComponents}) => {
      addComponents({
        '.shadow-block': {
          display: 'block',
          boxShadow: 
            '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          animation: 'scaleIn .35s ease-in-out',
          backgroundColor: '#272532'
        }
      })
    })
  ],
}
