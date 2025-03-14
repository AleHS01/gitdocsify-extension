import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { ThemeProvider, BaseStyles } from "@primer/react";
import { BrowserRouter } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider colorMode="auto">
      <BaseStyles>
        <BrowserRouter>
          <UserProvider>
            <DndContext>
              <App />
            </DndContext>
          </UserProvider>
        </BrowserRouter>
      </BaseStyles>
    </ThemeProvider>
  </StrictMode>
);
