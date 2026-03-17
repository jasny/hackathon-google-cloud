/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#001e5a",
        'primary-container': "#003188",
        tertiary: "#460f00",
        'tertiary-fixed': "#ffdbd0",
        'on-tertiary-fixed': "#3a0b00",
        surface: "#f8f9fb",
        'on-surface': "#191c1e",
        'on-surface-variant': "#444652",
        'surface-container-low': "#f2f4f6",
        'surface-container-lowest': "#ffffff",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
