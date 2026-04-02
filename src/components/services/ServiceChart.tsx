import type { ChartColor } from "#/features/dashboard/dashboard.types";
import { ChartBar } from "../ui/ChartBar";

interface ServiceChartProps {
  heights?: number[];
  color?: ChartColor | "err";
  size?: "mini" | "big";
}

export function ServiceChart({
  heights = [],
  color,
  size = "mini",
}: ServiceChartProps) {
  return <ChartBar heights={heights} color={color} size={size} />;
}
