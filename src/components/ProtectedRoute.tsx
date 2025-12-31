import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
