import { createFileRoute } from "@tanstack/react-router";
import { BackendView } from "#/features/adbox-backend/BackendView";

export const Route = createFileRoute("/adbox-backend")({
  component: BackendView,
});
