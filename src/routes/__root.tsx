import {
  HeadContent,
  Navigate,
  Outlet,
  Scripts,
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
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AdBox — Service Monitor" },
    ],
    links: [
      { rel: "icon", href: "/logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
      { rel: "manifest", href: "/manifest.json" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <SocketProvider>
              <AppFrame />
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
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
