const fs = require("fs");
const path = require("path");
const lessToJs = require("less-vars-to-js");
const CracoLessPlugin = require("craco-less");

const paletteLess = fs.readFileSync("./src/style/theme.less", "utf8");
const palette = lessToJs(paletteLess, { resolveVariables: true });

console.log("palette", palette);

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  style: {
    // postcss: {
    //   plugins: [require("tailwindcss"), require("autoprefixer")],
    // },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: palette,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
