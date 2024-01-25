/*
 * Reference: https://tailwindcss.com/docs/guides/gatsby
 */

module.exports = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
