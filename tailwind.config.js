import background from "./src/_assets/images/Pattern.png";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // boxShadow: {
      //   custom: "inset 0 0 1rem black, 0 0 1rem black)",
      // },
      // backgroundImage: {
      //   backgroundPage: "url('./src/_assets/images/Pattern.png')",
      // },
    },
  },
  plugins: [],
};
