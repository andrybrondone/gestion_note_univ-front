import "@fontsource/inter";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { ShowFormProvider } from "./context/ShowFormContext.tsx";
import "./index.css";
import { DarkModeProvider } from "./ui/components/darkMode/DarkModeGlobal.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ShowFormProvider>
      <DarkModeProvider>
        <App />
        <Toaster richColors position="top-right" />
      </DarkModeProvider>
    </ShowFormProvider>
  </React.StrictMode>
);
