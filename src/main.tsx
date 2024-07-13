import "@fontsource/inter";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { DataFetcherByIdProvider } from "./context/DataFetcherByIdContext.tsx";
import { DataUserProvider } from "./context/DataUserContext.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import { ShowFormProvider } from "./context/ShowFormContext.tsx";
import { ToggleEditFormProvider } from "./context/ToggleEditFormContext.tsx";
import { ToggleNavProvider } from "./context/ToggleNavContext.tsx";
import { ToggleStateProvider } from "./context/ToggleStateContext.tsx";
import "./index.css";
import { DarkModeProvider } from "./ui/components/darkMode/DarkModeGlobal.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToggleStateProvider>
        <ToggleNavProvider>
          <DarkModeProvider>
            <ShowFormProvider>
              <DataFetcherByIdProvider>
                <ToggleEditFormProvider>
                  <LoadingProvider>
                    <DataUserProvider>
                      <AuthProvider>
                        <App />
                        <Toaster
                          richColors
                          position="top-center"
                          duration={6000}
                          closeButton
                        />
                      </AuthProvider>
                    </DataUserProvider>
                  </LoadingProvider>
                </ToggleEditFormProvider>
              </DataFetcherByIdProvider>
            </ShowFormProvider>
          </DarkModeProvider>
        </ToggleNavProvider>
      </ToggleStateProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
