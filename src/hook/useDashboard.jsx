import { useLocation } from "react-router-dom";

export function useDashboard() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return { isDashboardRoute };
}
