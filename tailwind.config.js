/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tron-blue": "#3ed9de",
        "tron-orange": "#d69760",
      },
      fontFamily: {
        clash: ["Clash-Regular", "sans-serif"],
        coc: ["Coc", "sans-serif"],
        sans: ["var(--font-inter)"],
      },
      animation: {
        fade: "fadeIn 1s ease-in-out",
      },
      keyframes: (theme) => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      }),
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))", // Define custom grid with 20 columns
        64: "repeat(64, minmax(0, 1fr))",
        128: "repeat(128, minmax(0, 1fr))",
        256: "repeat(256, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
