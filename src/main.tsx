import "@fontsource/inter";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { ShowFormProvider } from "./context/ShowFormContext.tsx";
import "./index.css";
import { DarkModeProvider } from "./ui/components/darkMode/DarkModeGlobal.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ShowFormProvider>
        <DarkModeProvider>
          <App />
          <Toaster richColors position="top-right" />
        </DarkModeProvider>
      </ShowFormProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
