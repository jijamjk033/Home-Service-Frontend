/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../src/**/*.{html,ts,js,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle at bottom left, #8b90a8 0%, transparent 25%), radial-gradient(circle at top right, #8b90a8 0%, transparent 25%)',
      },
    },
  },
  plugins: [],
};
