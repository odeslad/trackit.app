
// @ts-expect-error: TS6133
import React from "react";

import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Footer } from "../footer";
import { Content } from "../content";

export const Main = () => {
  return (
    <>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </>
  );
}
