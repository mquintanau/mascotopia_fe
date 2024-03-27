/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#F1FFF2",
        primary: "#80ED99",
        secondary: "#6FC2BD",
        black: "#0E1918",
        green1: "#A4F3B3",
        green2: "#78D8AB",
        navbar: "#D6FEDA",
        greenLogo: "#387f49",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
