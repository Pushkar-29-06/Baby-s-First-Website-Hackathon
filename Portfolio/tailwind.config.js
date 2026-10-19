/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hax: {
          cream: '#fff8f1',
          berry: '#a34063',
          darkBerry: '#5c4033',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], 
        sans: ['"Fredoka"', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}