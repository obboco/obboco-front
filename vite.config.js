import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mkcert from "vite-plugin-mkcert";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

const path = require("path");
export default defineConfig({
  plugins: [
    mkcert(),

    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: "src/styles/quasar.variables.scss",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  server: {
    port: 8080,
    https: true,
  },
});
