// vite.config.ts
import { defineConfig } from "vite";

import dts from 'vite-plugin-dts';
import typescript from "@rollup/plugin-typescript";
import path from "path";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
  
  },
  server: {
    port: 3000,
  },
  build: {
    //target: "esnext",
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {},
  },
});
