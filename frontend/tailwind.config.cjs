/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',   // scan all source files
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb', // blue-600-ish; update when branding defined
          light: '#60a5fa',
          dark: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};
