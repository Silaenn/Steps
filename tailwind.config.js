/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "#FAF6F2",
        primary: {
          DEFAULT: "#C75B39",
        },
      },
      fontFamily: {
        sans: ["Outfit", "Outfit Fallback", "system-ui", "sans-serif"],
        heading: ["Space Grotesk", "Space Grotesk Fallback", "Outfit Fallback", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["1.875rem", { lineHeight: "1.3", fontWeight: "700" }],
        h2: ["1.5rem", { lineHeight: "1.35", fontWeight: "600" }],
        h3: ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.625" }],
        caption: ["0.75rem", { lineHeight: "1.5" }],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
