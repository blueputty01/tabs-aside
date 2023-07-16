// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tabHover: colors.blue[200],
      },
      boxShadow: {
        md: '0 1px 2px 0 hsla(206, 6%, 25%, 0.3), 0 2px 6px 2px hsla(206, 6%, 25%, 0.1)',
      },
      animation: {
        'zoom-in': 'zoom-in 0.1s ease-out forwards',
        'zoom-out': 'zoom-in 0.1s ease-out forwards',
      },
      keyframes: {
        'zoom-in': {
          '0%': { opacity: 0, visibility: 'hidden', transform: 'scale(0.97)' },
          '100%': { opacity: 1, visibility: 'visible', transform: 'scale(1)' },
        },
        'zoom-out': {
          '0%': { opacity: 1, visibility: 'visible', transform: 'scale(1)' },
          '100%': {
            opacity: 0,
            visibility: 'hidden',
            transform: 'scale(0.97)',
          },
        },
      },
    },
  },
  plugins: [],
};
