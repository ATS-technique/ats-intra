/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
    // Ajoutez d'autres chemins si nécessaire
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
