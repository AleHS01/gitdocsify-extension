import "./assets/notifications.css";
import ColorModeSwitcher from "./components/ColorModeSwitcher";
import { useRoutes } from "react-router-dom";
import { Box } from "@primer/react";
import Dashboard from "./pages/Dashboard";
import RepoView from "./pages/RepoView";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import ToastNotification from "./components/ToastNotification";
import { useNotification } from "./context/NotificationContext";

function App() {
  const { notifications } = useNotification();
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
          height: "100%",
        }}
      >
        {routes}
        <Box className="toast-container">
          {notifications.map((toast) => (
            <ToastNotification
              key={toast.id}
              id={toast.id}
              title={toast.title}
              description={toast.description}
              variant={toast.variant}
              duration={3000}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
