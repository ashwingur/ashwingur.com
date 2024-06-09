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
        // Base style colours
        primary: "var(--color-primary)",
        "primary-muted": "var(--color-primary-muted)",
        "primary-hover": "var(--color-primary-hover)",
        secondary: "var(--color-secondary)",
        "secondary-muted": "var(--color-secondary-muted)",
        "secondary-hover": "var(--color-secondary-hover)",
        background: "var(--color-background)",
        "background-muted": "var(--color-background-muted)",
        "background-hover": "var(--color-background-hover)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "text-hover": "var(--color-text-hover)",
        "text-primary": "var(--color-text-primary)", // Contrasts against primary colour
        "text-secondary": "var(--color-text-secondary)", // Contrasts against secondary colour
        "text-accent": "var(--color-text-accent)", // Contrasts against accent colour
        accent: "var(--color-accent)",
        "accent-muted": "var(--color-accent-muted)",
        "accent-hover": "var(--color-accent-hover)",
        // Tron colours
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
        "pulse-glow": "pulseGlow 8s infinite ease-in-out",
        moveBackgroundDiagonal: "moveBackground 160s linear infinite",
      },
      keyframes: (theme) => ({
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 40px rgba(62, 217, 222, 1)" },
          "50%": { boxShadow: "0 0 45px rgba(62, 217, 222, 0.5)" },
        },
        pulseGlowOrange: {
          "0%, 100%": { boxShadow: "0 0 40px rgba(214, 151, 96, 1)" },
          "50%": { boxShadow: "0 0 45px rgba(214, 151, 96, 0.5)" },
        },
        moveBackground: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "300% 400%" },
        },
      }),
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))", // Define custom grid with 20 columns
        64: "repeat(64, minmax(0, 1fr))",
        128: "repeat(128, minmax(0, 1fr))",
        256: "repeat(256, minmax(0, 1fr))",
      },
      boxShadow: {
        "glow-blue": "0 0 10px rgba(62, 217, 222, 0.7)",
        "glow-blue-md": "0 0 15px rgba(62, 217, 222, 0.7)",
        "glow-blue-lg": "0 0 20px rgba(62, 217, 222, 0.7)",
        "glow-blue-xl": "0 0 25px rgba(62, 217, 222, 0.7)",
        "glow-blue-2xl": "0 0 35px rgba(62, 217, 222, 0.7)",
        "glow-orange": "0 0 10px rgba(214, 151, 96, 0.7)",
        "glow-orange-md": "0 0 15px rgba(214, 151, 96, 0.7)",
        "glow-orange-lg": "0 0 20px rgba(214, 151, 96, 0.7)",
        "glow-orange-xl": "0 0 25px rgba(214, 151, 96, 0.7)",
        "glow-orange-2xl": "0 0 35px rgba(214, 151, 96, 0.7)",
      },
      borderRadius: {
        inherit: "inherit",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".clip-path-chamfered": {
            clipPath:
              "polygon(7% 0%, 93% 0%, 100% 20%, 100% 80%, 93% 100%, 7% 100%, 0% 80%, 0% 20%)",
          },
          ".clip-path-chamfered-logo": {
            clipPath:
              "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
