const fs = require("fs");
const path = require("path");
const lessToJs = require("less-vars-to-js");
const CracoLessPlugin = require("craco-less");
const { loaderByName } = require("@craco/craco");

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
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule(lessRule, context) {
          // You have to exclude these file suffixes first,
          // if you want to modify the less module's suffix
          lessRule.exclude = /\.m\.less$/;
          return lessRule;
        },
        modifyLessModuleRule(lessModuleRule, context) {
          // Configure the file suffix
          lessModuleRule.test = /\.m\.less$/;

          // Configure the generated local ident name.
          const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
          cssLoader.options.modules = {
            localIdentName: "[local]_[hash:base64:5]",
          };

          return lessModuleRule;
        },
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
