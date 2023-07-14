const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  // @ts-ignore
  plugins: [tailwindcss('./tailwind.config.js'), autoprefixer],
};
