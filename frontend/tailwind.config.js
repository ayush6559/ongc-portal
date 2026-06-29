/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ongc-blue': '#003B7A',
        'ongc-red': '#C00A0A',
        'ongc-orange': '#FF6B35',
        'glass-light': 'rgba(255, 255, 255, 0.7)',
        'glass-dark': 'rgba(17, 24, 39, 0.7)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
