import express from "express";
// import { handleRequest } from "../src/entry.server";
import path from "path";
import { fileURLToPath } from "url";
import { ViteDevServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

let viteServer: ViteDevServer | undefined;
let handleRequest: (req: express.Request, res: express.Response) => Promise<void>;

if (process.env.NODE_ENV !== "production") {

  const { createServer } = await import("vite");
  viteServer = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: process.cwd(),
    publicDir: false,
  });

  app.use(viteServer.middlewares);

  const mod = await viteServer.ssrLoadModule("/src/entry.server.tsx");
  handleRequest = mod.handleRequest;
} else {
  app.use(express.static(path.resolve(__dirname, "../client"), { index: false }));

  const mod = await import("../src/entry.server.js");
  handleRequest = mod.handleRequest;
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
      viteServer.ssrFixStacktrace(error as Error);
    }
    res.status(500).send("Error interno del servidor");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});