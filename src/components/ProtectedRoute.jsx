import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../pages/CartProvider";

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user } = useContext(CartContext);
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Prevent logged-in admin from accessing user login/register pages
  if ((location.pathname === "/login" || location.pathname === "/register") && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // Admin protected routes
  if (requireAdmin) {
    if (!isAdmin) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }

  // User protected routes
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Prevent normal users from accessing admin routes
  if (!requireAdmin && location.pathname.startsWith("/admin") && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
