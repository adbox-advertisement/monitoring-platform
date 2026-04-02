import { createFileRoute } from "@tanstack/react-router";
import { ApiGatewayView } from "#/features/api-gateway/ApiGatewayView";

export const Route = createFileRoute("/api-gateway")({
  component: ApiGatewayView,
});
