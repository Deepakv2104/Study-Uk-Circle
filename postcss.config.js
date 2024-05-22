module.exports = {
    plugins: [
      require('postcss-nesting'), // Add the nesting plugin here
      require('tailwindcss'),     // TailwindCSS should come after nesting plugin
      require('autoprefixer'),    // Autoprefixer can come after TailwindCSS
    ],
  };
  