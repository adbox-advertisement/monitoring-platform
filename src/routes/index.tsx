import { DashboardView } from "#/features/dashboard/DashboardView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: DashboardView });
