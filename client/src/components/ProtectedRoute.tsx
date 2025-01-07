import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactElement; // Ensure 'element' is a valid React component
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
