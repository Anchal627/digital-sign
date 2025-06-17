/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html", // ✅ include actual HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ note: use `jsx`, not just `js`
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
