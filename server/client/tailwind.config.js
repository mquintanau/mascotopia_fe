/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 1s linear", // Define una animación de giro lento
        fadeIn: "fadeIn 0.3s ease-in", // Define una animación de fundido
        fadeOut: "fadeOut 0.3s ease-out", // Define una animación de fundido
        bounce: "bounce 1s",
        "in-out": "ease-in-out 0.3s",
      },
      colors: {
        main: "#F1FFF2",
        primary: "#80ED99",
        gray1: "#E0E3E2",
        background: "#f1fff2",
        secondary: "#6FC2BD",
        black: "#0E1918",
        green1: "#A4F3B3",
        green2: "#78D8AB",
        green3: "#C1DCC7",
        green4: "#D2F9D3",
        green5: "#B4F2C2",
        teal: "#0A8D85",
        navbar: "#D6FEDA",
        greenLogo: "#387f49",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      backgroundImage: {
        welcome: "url('./assets/Group14.png')",
        "line-background": "url('./assets/lineForgotPassword.svg')",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};
