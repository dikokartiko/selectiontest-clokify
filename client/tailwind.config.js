/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
