import type { ServiceCardState } from "./dashboard.types";

export const initialServiceCards: Omit<
  ServiceCardState,
  "logs" | "errorCount" | "eventCount" | "chartBars"
>[] = [
  {
    id: "api-gateway",
    name: "API Gateway",
    subtitle: "99.9% uptime",
    icon: "⬡",
    iconColor: "blue",
    status: "healthy",
    chartColor: "blue",
  },
  {
    id: "resolutions",
    name: "Resolutions",
    subtitle: "Video worker",
    icon: "▶",
    iconColor: "purple",
    status: "healthy",
    chartColor: "accent",
  },
  {
    id: "adbox-backend",
    name: "Adbox Backend",
    subtitle: "Core service",
    icon: "◈",
    iconColor: "teal",
    status: "healthy",
    chartColor: "teal",
  },
  {
    id: "notification",
    name: "Notification",
    subtitle: "Event bus",
    icon: "◎",
    iconColor: "orange",
    status: "idle",
    chartColor: "warn",
  },
];
