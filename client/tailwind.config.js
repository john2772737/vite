module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bodoni-ferrara': ['"Bodoni Ferrara"', 'serif'],
        // Add more custom font families if needed
      },
      fontSize: {
        'xxs': '0.6rem', 
      }
    },
  },
  plugins: [],
}
