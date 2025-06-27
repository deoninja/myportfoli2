/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // A shade of indigo
        secondary: '#8B5CF6', // A shade of violet
        accent: '#EC4899', // A shade of pink for highlights
        darkBackground: '#1A202C', // Dark background for dark mode
        darkText: '#E2E8F0', // Light text for dark mode
      },
    },
  },
  plugins: [],
}