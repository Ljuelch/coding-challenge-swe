/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      margin: {
        '88': '22.3rem',
      },
      screens: {
        'lg-1500-hidden': '1500px',
      },
    },
  },
  plugins: [],
}
