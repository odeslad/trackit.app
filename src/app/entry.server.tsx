// @ts-expect-error: TS6133
import React from "react";
import { renderToString } from "react-dom/server";
import path from "path";
import getRawBody from "raw-body";
import fs from "fs";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  type StaticHandlerContext,
} from "react-router";
import type { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { routes } from "./routes";

export async function handleRequest(
  req: ExpressRequest,
  res: ExpressResponse
): Promise<void> {
  try {
    const handler = createStaticHandler(routes);

    const request = new Request(`http://${req.headers.host}${req.url}`, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? (await getRawBody(req) as BodyInit) || null
          : undefined
    });

    const context = (await handler.query(request)) as StaticHandlerContext;

    if (context instanceof Response) {
      const headers = Object.fromEntries(context.headers.entries());
      res.status(context.status).set(headers);

      if (context.headers.get("Location")) {
        // Redirección
        return res.redirect(context.status, context.headers.get("Location")!);
      }

      const text = await context.text();
      res.send(text);
      return;
    }

    const router = createStaticRouter(handler.dataRoutes, context);
    const appHtml = renderToString(
      <StaticRouterProvider router={router} context={context} />
    );

    const isProd = process.env.NODE_ENV === "production";
    let scriptTag = "";
    let cssTag = "";

    if (isProd) {
      const manifestPath = path.resolve("build/client/.vite/manifest.json");
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      const entry = manifest["src/app/entry.client.tsx"];

      if (entry) {
        if (entry.css) {
          cssTag = entry.css
            .map((file: string) => `<link rel="stylesheet" href="/${file}" />`)
            .join("");
        }
        scriptTag = `<script type="module" src="/${entry.file}"></script>`;
      }
    } else {
      // 🧑‍💻 En desarrollo, usa los módulos sin empaquetar
      scriptTag = `
        <script type="module">
          import RefreshRuntime from "/@react-refresh";
          RefreshRuntime.injectIntoGlobalHook(window);
          window.$RefreshReg$ = () => {};
          window.$RefreshSig$ = () => (type) => type;
          window.__vite_plugin_react_preamble_installed__ = true;
        </script>
        <script type="module" src="/src/app/entry.client.tsx"></script>
      `;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>SSR App</title>
          ${cssTag}
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script>
            window.__staticRouterHydrationData = ${JSON.stringify(context)};
          </script>
          ${scriptTag}
        </body>
      </html>
    `;

    res.status(context.statusCode ?? 200).set({ "Content-Type": "text/html" }).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
}
