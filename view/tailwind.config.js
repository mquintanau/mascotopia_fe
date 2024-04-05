/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1s linear', // Define una animación de giro lento
        'fadeIn': 'fadeIn 0.3s ease-in', // Define una animación de fundido
        'fadeOut': 'fadeOut 0.3s ease-out', // Define una animación de fundido
        'bounce' : 'bounce 1s'
        
      },
      colors: {
        main: "#F1FFF2",
        primary: "#80ED99",
        secondary: "#6FC2BD",
        black: "#0E1918",
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
