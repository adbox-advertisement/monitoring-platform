import { createFileRoute } from "@tanstack/react-router";
import { ResolutionsView } from "#/features/resolutions/ResolutionsView";

export const Route = createFileRoute("/resolutions")({
  component: ResolutionsView,
});
