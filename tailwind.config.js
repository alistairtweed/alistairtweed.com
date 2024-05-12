const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/**/*.vue",
    "./index.html"
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class"
    })
  ]
}
