/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-green': '#004643',
        'light-green': '#abd1c6',
        'white-ish': '#fffffe',
        'gray-ish': '#e8e4e6',
        'custom-yellow': '#f9bc60',
        'custom-purple': '#7f5af0',
      },
    },
  },
  plugins: [],
};
