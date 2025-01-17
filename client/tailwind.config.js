/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EBEBEB",
        subPrimary: "#656565",
        buttonPrimary: "#9D9D9D"
      },
      screens: {
        'xs': '390px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
