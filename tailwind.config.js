/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        dmSans: ["DM Sans", "sans-serif"],
        // 'roboto': ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        container: "inset 0 0 0.8rem black, 0 0 2rem black",
        smContainer: "inset 0 0 0.5rem black, 0 0 0.5rem black",
        buttom: "inset 0 0 10rem #403937, 0 0 10rem black",
      },
      borderRadius: {
        large: "85px",
        md: "35px",
      },
      borderWidth: {
        6: "6px",
      },
      colors: {
        baseText: "#403937",
        baseInput: "#EDEDED",
        baseButton: "#E6E5E5",
        baseLabel: "8D8686",
        baseInputsBackground: "#F3F2F2",
        baseCard: "#F3F2F2",
        grupButtonsBorder: "#D7D5D5",
        baseBackground: "#FAFAFA",
        footerTitle: "#4B2995",
        footerOptions: "#574F4D",
      },
      backgroundImage: {
        backgroundPage: "url('./src/_assets/images/Pattern.png')",
      },
    },
  },
  plugins: [],
};
