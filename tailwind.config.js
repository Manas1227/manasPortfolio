/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(14deg)" },
          "30%": { transform: "rotate(-8deg)" },
          "40%": { transform: "rotate(14deg)" },
          "50%": { transform: "rotate(-4deg)" },
          "60%": { transform: "rotate(10deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        wave: "wave 1.8s infinite ease-in-out",
      }
    },
  },
  plugins: [],
}

