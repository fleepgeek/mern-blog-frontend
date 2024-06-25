import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithRedirect from "./contexts/Auth0ProviderWithRedirect";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster, toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(error.message);
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithRedirect>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </Auth0ProviderWithRedirect>
      <Toaster position="top-right" />
    </Router>
  </React.StrictMode>,
);
