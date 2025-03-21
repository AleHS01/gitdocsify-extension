import React, { StrictMode } from "react";
import { UserProvider } from "./context/UserContext.tsx";
import { ThemeProvider, BaseStyles } from "@primer/react";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext.tsx";
type AppWrapperProps = {
  children: React.ReactNode;
};

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <StrictMode>
      <ThemeProvider colorMode="auto">
        <BaseStyles>
          <BrowserRouter>
            <UserProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </UserProvider>
          </BrowserRouter>
        </BaseStyles>
      </ThemeProvider>
    </StrictMode>
  );
};

export default AppWrapper;
