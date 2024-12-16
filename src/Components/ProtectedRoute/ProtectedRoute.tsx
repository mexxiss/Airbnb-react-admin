// components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { isTokenExpired } from "../../utils/token/tokenHandler";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[]; // Allowed roles for the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user } = useAuthStore.getState();
  const isResult = isTokenExpired(user?.accessToken || "");

  // If not authenticated, redirect to the sign-in page
  if (isResult) {
    return <Navigate to="/admin/sign-in" replace />;
  }

  // If roles are provided, check if the user role matches
  if (roles && !roles.includes(user?.role || "")) {
    return <Navigate to="/admin/sign-in" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
