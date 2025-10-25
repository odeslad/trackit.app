
import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/about">Acerca</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
