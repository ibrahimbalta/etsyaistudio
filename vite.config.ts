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
        
        // Copy everything from .output/client to .output root for Pages assets
        if (fs.existsSync(clientDir)) {
          const files = fs.readdirSync(clientDir);
          for (const file of files) {
            const src = path.join(clientDir, file);
            const dest = path.join(outputDir, file);
            if (fs.statSync(src).isDirectory()) {
              // Note: simple recursive copy for folders
              fs.cpSync(src, dest, { recursive: true });
            } else {
              fs.copyFileSync(src, dest);
            }
          }
          console.log("Moved assets to .output root");
        }
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
