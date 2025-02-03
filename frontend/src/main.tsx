import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { ThemeProvider, BaseStyles } from "@primer/react";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider colorMode="auto">
      <BaseStyles>
        <BrowserRouter>
          <UserProvider>
            <App />
          </UserProvider>
        </BrowserRouter>
      </BaseStyles>
    </ThemeProvider>
  </StrictMode>
);
