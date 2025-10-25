import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build/client",
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      input: "app/entry.client.tsx",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
