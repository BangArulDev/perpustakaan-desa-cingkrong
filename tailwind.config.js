/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#5eead4",
          DEFAULT: "#3B9797", // User's Teal (30% - Main Brand)
          dark: "#115e59",
        },
        secondary: {
          light: "#334b82",
          DEFAULT: "#16476A", // User's Blue (Secondary Surface/Element)
          dark: "#0f304a",
        },
        accent: {
          light: "#e11d48",
          DEFAULT: "#BF092F", // User's Red (10% - Highlight)
          dark: "#881337",
        },
        background: "#132440", // User's Dark Navy (60% - Canvas)
        surface: "#1e3a5f", // Slightly lighter navy for cards (derived)
        text: {
          primary: "#0f172a", // Slate-900 - Deepest dark for max readability
          secondary: "#475569", // Slate-600 - Readable darkish grey
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
