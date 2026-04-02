import { createFileRoute } from "@tanstack/react-router";
import { LoginView } from "#/features/auth/LoginView";

export const Route = createFileRoute("/login")({
  component: LoginView,
});
