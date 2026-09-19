/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#00A859",
          greenDark: "#005C2E",
          gold: "#FACC15",
        },
      },
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(0, 168, 89, 0.35)",
      },
    },
  },
  plugins: [],
};
