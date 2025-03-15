import ColorModeSwitcher from "./components/ColorModeSwitcher";
import { useRoutes } from "react-router-dom";
import { Box } from "@primer/react";
import Dashboard from "./pages/Dashboard";
import RepoView from "./pages/RepoView";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const routes = useRoutes([
    { path: "/", element: <ProtectedRoute children={<Dashboard />} /> },
    { path: "/login", element: <Login /> },
    {
      path: "/repo/:name",
      element: <ProtectedRoute children={<RepoView />} />,
    },
  ]);

  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "canvas.default",
        position: "relative",
      }}
    >
      <ColorModeSwitcher />
      <Box
        sx={{
          px: 1,
        }}
      >
        {routes}
      </Box>
    </Box>
  );
}

export default App;
