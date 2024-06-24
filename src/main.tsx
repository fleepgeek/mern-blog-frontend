import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import AppRoutes from "./AppRoutes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
