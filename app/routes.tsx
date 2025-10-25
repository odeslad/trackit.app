import React from "react";
import { RouteObject } from "react-router-dom";
import App from "./routes/App";
import Home from "./routes/pages/Home";
import About from "./routes/pages/About";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
];
