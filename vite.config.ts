import { configDefaults, defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts';
import path from "path";

export default defineConfig({
  plugins : [tsconfigPaths(),dts({ rollupTypes: true })],
  build : {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"],
    }
  }
});