import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, requireDashboardEntry = false }) {
  const token = localStorage.getItem("sessionToken");
  const location = useLocation();

  // 🔒 not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 🚧 must come from dashboard
  if (requireDashboardEntry) {
    if (!location.state?.fromDashboard) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
