/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Ensure Tailwind scans all JS/JSX/TS/TSX files in src
  ],
  theme: {
    extend: {
      colors: {
        honey: '#F0B62B', // Add your custom color hex codes
        coal: '#2A3138', // Default color (middle shade)
        vanilla: '#F9F9F9',
        }
    },  // You can customize your theme here if needed
  },
  plugins: [],
};
