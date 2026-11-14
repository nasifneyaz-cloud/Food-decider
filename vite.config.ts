import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const root = path.dirname(fileURLToPath(import.meta.url));

// Static files that live next to index.html and must be copied into dist/ as-is.
function copyStatic(): Plugin {
  return {
    name: "copy-static",
    apply: "build",
    closeBundle() {
      const dist = path.join(root, "dist");
      for (const f of fs.readdirSync(root)) {
        if (/\.(jpg|png|svg|webmanifest)$/.test(f) || f === "sw.js" || f === ".nojekyll") {
          fs.copyFileSync(path.join(root, f), path.join(dist, f));
        }
      }
    },
  };
}

export default defineConfig({
  base: "./",
  publicDir: false,
  plugins: [react(), tailwindcss(), viteSingleFile(), copyStatic()],
});
