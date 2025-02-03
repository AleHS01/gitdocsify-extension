import ColorModeSwitcher from "./components/ColorModeSwitcher";
import { useRoutes } from "react-router-dom";
import { Box } from "@primer/react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const routes = useRoutes([
    { path: "/", element: <ProtectedRoute children={<Dashboard />} /> },
    { path: "/login", element: <Login /> },
  ]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "canvas.default",
        position: "relative",
      }}
    >
      <ColorModeSwitcher />
      {routes}
    </Box>
  );
}

export default App;
