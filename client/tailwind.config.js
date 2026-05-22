/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rambutan: {
          50: '#fdf8f6',
          100: '#fce8e0',
          200: '#f9d1c1',
          300: '#f5b9a2',
          400: '#ed9d7d',
          500: '#e07d57',
          600: '#d46344',
          700: '#b84a37',
          800: '#9c3d30',
          900: '#7d3128',
        },
      },
    },
  },
  plugins: [],
}
