/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        container: "inset 0 0 0.8rem black, 0 0 2rem black",
        smContainer: "inset 0 0 0.5rem black, 0 0 0.5rem black",
      },
      borderRadius: {
        large: "85px",
        md: "35px",
      },
      // colors: {
      //   baseInput: "#EDEDED",
      //   baseButton: "#E6E5E5",
      //   baseLabel: "8D8686",
      //   baseInputsBackground: "#F3F2F2",
      //   baseCard: "#F3F2F2",
      //   grupButtonsBorder: "#D7D5D5",
      // },
      backgroundImage: {
        backgroundPage: "url('./src/_assets/images/Pattern.png')",
      },
    },
  },
  plugins: [],
};
