// @ts-expect-error: TS6133
import React from "react";

import { type RouteObject } from "react-router-dom";
import { Main } from "./components/main";
import { MainOperations } from "../modules/operations/components/main";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <MainOperations /> },
    ],
  },
];
