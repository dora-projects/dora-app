module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
  plugins: [require("@tailwindcss/forms")],
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
};
