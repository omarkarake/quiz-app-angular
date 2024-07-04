/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
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
    },
    plugins: [],
  },
};
