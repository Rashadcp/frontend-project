import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../pages/CartProvider';

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user } = useContext(CartContext);
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // For admin routes
  if (requireAdmin) {
    if (!isAdmin) {
      // Redirect to admin login if trying to access admin routes without admin auth
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }

  // For user routes
  if (!user) {
    // Redirect to login if trying to access user routes without being logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;