/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bpiBlau: "#00305d",
        bpiOrange: "#EF7D00",
      },
    },
  },
  plugins: [require("daisyui")],
};
