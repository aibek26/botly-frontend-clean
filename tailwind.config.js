/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        botly: {
          primary: "#6366F1",
          secondary: "#8B5CF6",
          accent: "#3B82F6",
        },
      },
    },
  },
  plugins: [],
};

