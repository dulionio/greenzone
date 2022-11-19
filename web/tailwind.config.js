/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  daisyui: {
    themes: ["garden", "forest"],
  },
  plugins: [
    require("daisyui")
  ],
}
