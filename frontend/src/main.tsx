import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { BaseStyles, ThemeProvider } from "@primer/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider colorMode="auto">
      <UserProvider>
        <BaseStyles>
          <App />
        </BaseStyles>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
