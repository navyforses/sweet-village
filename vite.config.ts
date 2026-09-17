import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

/**
 * Vercel Image Optimization only exists on Vercel: on by default in a Vercel
 * build, off for local builds and the local Vercel-like QA build (which
 * serves dist/public from a plain static server). SWEET_VILLAGE_IMAGE_OPTIMIZATION=0|1 overrides.
 */
const imageOptimization = process.env.SWEET_VILLAGE_IMAGE_OPTIMIZATION
  ? process.env.SWEET_VILLAGE_IMAGE_OPTIMIZATION === "1"
  : process.env.VERCEL === "1" && process.env.SWEET_VILLAGE_SKIP_BLOB_MIGRATION !== "1";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  define: {
    "import.meta.env.VITE_IMAGE_OPTIMIZATION": JSON.stringify(imageOptimization ? "1" : "0"),
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(import.meta.dirname, "client", "src") },
      { find: "@shared", replacement: path.resolve(import.meta.dirname, "shared") },
      { find: "@assets", replacement: path.resolve(import.meta.dirname, "attached_assets") },
      // The browser bundle ships the guide seeds without their article bodies; article pages load them on demand.
      ...(isSsrBuild ? [] : [{ find: /^\.\/guideCopy\.js$/, replacement: path.resolve(import.meta.dirname, "shared", "guideCopy.stub.ts") }]),
    ],
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
