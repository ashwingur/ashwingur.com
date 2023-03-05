/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        clash: ["Clash-Regular", "sans-serif"],
        coc: ["Coc", "sans-serif"],
      },
    },
  },
  plugins: [],
};
