import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, type RouterState } from "react-router-dom";
import { routes } from "./routes";

import '../shared/styles/global.css';

interface WindowWithHydrationData extends Window {
  __staticRouterHydrationData?: Partial<Pick<RouterState, "loaderData" | "actionData" | "errors">>;
}

const router = createBrowserRouter(routes, {
  hydrationData: (window as WindowWithHydrationData).__staticRouterHydrationData,
});

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <RouterProvider router={router} />
);
