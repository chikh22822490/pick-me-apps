/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.html',
    './apps/**/src/**/*.{vue,js,ts,jsx,tsx}',
    './libs/**/src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: []
}
