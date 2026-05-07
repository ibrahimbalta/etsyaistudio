import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    tanstackStart({
      server: { entry: "src/server.ts" },
      deployment: "cloudflare-pages",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: "cloudflare-pages-adapter",
      apply: "build",
      closeBundle: async () => {
        const fs = await import("node:fs");
        const path = await import("node:path");
        const serverDir = path.resolve(".output/server");
        const outputDir = path.resolve(".output");
        const clientDir = path.resolve(".output/client");
        
        // Ensure _worker.js exists in .output
        if (fs.existsSync(path.join(serverDir, "server.js"))) {
          fs.copyFileSync(path.join(serverDir, "server.js"), path.join(outputDir, "_worker.js"));
          console.log("Created .output/_worker.js");
        }
        
        // Merge assets: Copy from server/assets and client/assets to .output/assets
        const targetAssetsDir = path.join(outputDir, "assets");
        if (!fs.existsSync(targetAssetsDir)) fs.mkdirSync(targetAssetsDir, { recursive: true });
        
        [path.join(serverDir, "assets"), path.join(clientDir, "assets")].forEach(dir => {
          if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            for (const file of files) {
              fs.copyFileSync(path.join(dir, file), path.join(targetAssetsDir, file));
            }
          }
        });
        
        // Copy other files from client root (like index.html, robots.txt etc)
        if (fs.existsSync(clientDir)) {
          const files = fs.readdirSync(clientDir);
          for (const file of files) {
            if (file === "assets") continue;
            const src = path.join(clientDir, file);
            const dest = path.join(outputDir, file);
            if (fs.statSync(src).isDirectory()) {
              fs.cpSync(src, dest, { recursive: true });
            } else {
              fs.copyFileSync(src, dest);
            }
          }
        }
        console.log("Assets merged and moved to .output root");
      }
    }
  ],
  build: {
    outDir: ".output",
  },
  server: {
    host: "::",
    port: 8080,
  },
});
