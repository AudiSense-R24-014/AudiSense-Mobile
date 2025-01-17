/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter-regular": ["Inter_400Regular", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "sans-serif"],
        "inter-semibold": ["Inter_600SemiBold", "sans-serif"],
        "inter-bold": ["Inter_700Bold", "sans-serif"],
        sevillana: ["Sevillana_400Regular", "sans-serif"],
      },
      colors: {
        "audi-purple": "#6C26A6",
        "audi-blue": "#2379A4",
        secondary: "#5E5B5B",
      },
    },
  },
  plugins: [],
};
