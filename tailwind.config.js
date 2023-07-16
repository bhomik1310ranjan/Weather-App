/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      colors: {
        'spaceCadet': '#112D4E',
        'steelBlue': '#3F72AF',
        'azureishWhite': '#DBE2EF',
        'cultured': '#F9F7F7',
        'shadowBlue': '#7B8EA9',
        'ceil': '#88A2C5',
        'apple': '#5DB65D',
        'eucalyptus': '	#57C7A5',
        'seaSerpent': '	#5FC4D3',
      },
      fontSize: {
        '2AndHalfXl': '1.74rem',
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      screens: {
        'vs': '480px',
      },
      borderWidth: {
        '6': '6px',
        '7': '7px',
      },
      animation: {
        'spin-clockwise-slow': 'spin-clockwise 1600ms linear infinite',
        'spin-clockwise-fast': 'spin-clockwise 400ms linear infinite',
        'spin-anticlockwise': 'spin-anticlockwise 600ms linear infinite',
      },
      keyframes: {
        'spin-clockwise': {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-anticlockwise': {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(-180deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
}