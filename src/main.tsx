import "@fontsource/inter";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { DataFetcherByIdProvider } from "./context/DataFetcherByIdContext.tsx";
import { ShowFormProvider } from "./context/ShowFormContext.tsx";
import { ToggleEditFormProvider } from "./context/ToggleEditFormContext.tsx";
import "./index.css";
import { DarkModeProvider } from "./ui/components/darkMode/DarkModeGlobal.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <ShowFormProvider>
          <DataFetcherByIdProvider>
            <ToggleEditFormProvider>
              <App />
              <Toaster
                richColors
                position="top-center"
                duration={10000}
                closeButton
              />
            </ToggleEditFormProvider>
          </DataFetcherByIdProvider>
        </ShowFormProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
