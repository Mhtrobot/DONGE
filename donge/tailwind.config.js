/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headerColor : '#DEE5D4',
        headerHoverButton : '#b6c69f',
        subHeaderColor : '#f3f5ef',
        buttonColor : '#00B894',
        textBoxColor : '#D5ED9F70',
        panelColor : '#D5ED9F',
        panelHover : '#bee269',
      },
      fontFamily: {
        iranyekan: ['IranYekan', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

