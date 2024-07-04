/* @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: "#A729F5",
        "dark-navy": "#313E51",
        navy: "#3B4D66",
        "grey-navy": "#626C7F",
        "light-blueish": "#ABC1E1",
        "light-grey": "#F4F6FA",
        "pure-white": "#FFFFFF",
        green: "#26D782",
        red: "#EE5454",
      },
      fontFamily: {
        rubik: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        display: ["144px", { lineHeight: "1" }],
        headingL: ["64px", { lineHeight: "1" }],
        headingM: ["36px", { lineHeight: "1" }],
        headingS: ["28px", { lineHeight: "1" }],
        bodyM: ["12px", { lineHeight: "1.5" }],
        bodyS: ["12px", { lineHeight: "1.5"}],
      },
    },
    plugins: [],
  },
};
