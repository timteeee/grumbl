module.exports = {
  content: ["./src/components/**/*.js"],
  theme: {
    screens: {
      bp: "400px",
      sm: "480px",
      md: "740px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        Lobster: ["Lobster", "cursive"]
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
}
