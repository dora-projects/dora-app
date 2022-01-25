import * as path from "path";
import * as fs from "fs";
// @ts-ignore
import lessToJs from "less-vars-to-js";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const paletteLess = fs.readFileSync("./src/style/theme.less", "utf8");
const palette = lessToJs(paletteLess, { resolveVariables: true });
console.log(palette);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  build: {
    outDir: "build",
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: "" },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: palette,
      },
    },
  },
  plugins: [react()],
});
