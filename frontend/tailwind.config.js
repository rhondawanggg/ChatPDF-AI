module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        'blue-100': '#e0e7ff',
        'blue-400': '#60a5fa',
        'purple-400': '#a78bfa',
      },
    },
  },
  plugins: [],
}; 