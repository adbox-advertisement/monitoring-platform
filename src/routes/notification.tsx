import { createFileRoute } from "@tanstack/react-router";
import { NotificationView } from "#/features/notification/NotificationView";

export const Route = createFileRoute("/notification")({
  component: NotificationView,
});
