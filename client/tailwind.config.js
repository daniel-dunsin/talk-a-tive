/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['components/**/*.{js,ts,jsx,tsx}', 'pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        md: '900px',
      },
    },
  },
  plugins: [],
};
