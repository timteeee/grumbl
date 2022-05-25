const tailwindcss = require("tailwindcss");

module.exports = {
  content: ["./src/components/**/*.js"],
  theme: {
    screens: {
      xs: "400px",
      sm: "480px",
      md: "740px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/aspect-ratio")
  ],
}
