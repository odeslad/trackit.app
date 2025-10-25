import express from "express";
import { handleRequest } from "../app/entry.server";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

let viteServer: any;

if (process.env.NODE_ENV !== "production") {

  const { createServer } = await import("vite");
  viteServer = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: process.cwd(),
    publicDir: false,
  });

  app.use(viteServer.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, "../client"), { index: false }));
}

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.use(async (req, res, next) => {
  const url = req.originalUrl;

  if (
    url.startsWith('/@vite') ||
    url.includes('@react-refresh') ||
    url.startsWith('/node_modules') ||
    url.includes('.well-known') ||
    url.includes('.tsx') ||
    url.includes('.ts') ||
    url.includes('.js') ||
    url.includes('.css') ||
    url.includes('.map') ||
    url.includes('.ico') ||
    url.includes('.png') ||
    url.includes('.jpg') ||
    url.includes('.svg')
  ) {
    return next();
  }

  try {
    await handleRequest(req, res);
  } catch (error) {
    if (viteServer) {
      viteServer.ssrFixStacktrace(error);
    }
    res.status(500).send("Error interno del servidor");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});