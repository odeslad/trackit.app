import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => {
  process.env.BABEL_ENV = "production";
  process.env.NODE_ENV = "production";

  return {
    plugins: [
      react({
        jsxRuntime: "automatic",
        jsxImportSource: "react",
        babel: {
          presets: [
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
                development: false,
                importSource: "react",
              },
            ],
          ],
        },
      }),
    ],
    build: {
      ssr: "server/server.ts",
      outDir: "build/server",
      emptyOutDir: false,
      target: "esnext",
      minify: false,
    },
    ssr: {
      noExternal: ["react", "react-dom", "react-router", "react-router-dom"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
