import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router.tsx";

const queryClient = new QueryClient();

const getRootElement = () => {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Root element not found");
  }
  return root;
};

createRoot(getRootElement()).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
