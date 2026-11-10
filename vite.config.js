import { defineConfig } from "vite";
import { cpSync, existsSync } from "node:fs";

// Folders to copy into dist/ as-is. Add a name in this array whenever you add a new folder
// for other kinds of assets, like this:
// const copyDirs = ['images', 'models', 'data']
// For now, we just have images/ so this is sufficient:

const copyDirs = ["images"];

export default defineConfig({
  base: "./",
  publicDir: false,
  build: {
    outDir: "dist",
  },
  plugins: [
    {
      name: "copy-static-folders",
      apply: "build",
      closeBundle() {
        for (const dir of copyDirs) {
          if (existsSync(dir)) cpSync(dir, `dist/${dir}`, { recursive: true });
        }
      },
    },
  ],
});
