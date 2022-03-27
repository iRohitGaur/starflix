import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";

function RestrictedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default RestrictedRoute;
