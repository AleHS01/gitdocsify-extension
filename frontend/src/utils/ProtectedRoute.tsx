import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LoadingScreen from "../pages/LoadingScreen";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useUser();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
