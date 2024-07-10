/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.html',
    './apps/**/src/**/*.{vue,js,ts,jsx,tsx}',
    './libs/**/src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00728A',
        secondary: '#004452',
        accent: '#A4D7E1',
        'light-background': '#ffffff',
        'dark-background': '#0F172A',
        'btn-background': '#1C1C1C0D',
        highlight: '#EDF5F7',
        success: '#14bc9b',
        info: '#22d3ee',
        warning: '#facc15',
        error: '#b91943'
      },
    }
  },
  plugins: []
}
