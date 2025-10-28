// @ts-expect-error: TS6133
import React from "react";

import { type RouteObject } from "react-router-dom";
import { Main } from "./pages/main/main";
import { Welcome } from "./pages/welcome/welcome";

import { Loader as WelcomeLoader } from "./loaders/welcome";
import { Action as WelcomeAction } from "./actions/welcome";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Welcome />, loader: WelcomeLoader, action: WelcomeAction },
    ],
  },
];
