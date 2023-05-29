const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e6cccc',
          200: '#cc9999',
          300: '#b36666',
          400: '#993333',
          500: '#800000',
          600: '#660000',
          700: '#4d0000',
          800: '#330000',
          900: '#1a0000',
        },
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: '0.5rem',
      },
    },
  },
  plugins: [],
};
