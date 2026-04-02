import {
  Navigate,
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { MainLayout } from "../app/layout/MainLayout";
import { AuthProvider, useAuth } from "../app/providers/auth-provider";
import { SocketProvider } from "../app/providers/socket-provider";
import { ThemeProvider } from "../app/providers/theme-provider";
import "../styles/globals.css";
import "../styles/theme.css";

export const Route = createRootRoute({
  component: RootShell,
});

function RootShell() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <AppFrame />
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppFrame() {
  const { isAuthenticated } = useAuth();
  const { location } = useRouterState();
  const isLoginRoute = location.pathname === "/login";

  if (!isAuthenticated && !isLoginRoute) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && isLoginRoute) {
    return <Navigate to="/" />;
  }

  return isLoginRoute ? <Outlet /> : <MainLayout />;
}
