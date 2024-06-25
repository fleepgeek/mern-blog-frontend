import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithRedirect from "./contexts/Auth0ProviderWithRedirect";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0ProviderWithRedirect>
      <AppRoutes />
    </Auth0ProviderWithRedirect>
  </React.StrictMode>
);
