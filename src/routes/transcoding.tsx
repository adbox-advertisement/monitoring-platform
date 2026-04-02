import { createFileRoute } from "@tanstack/react-router";
import { TranscodingView } from "#/features/transcoding/TranscodingView";

export const Route = createFileRoute("/transcoding")({
  component: TranscodingView,
});
