import type { ChartColor } from "#/features/dashboard/dashboard.types";
import type { Key } from "react";
import { cn } from "../../utils/cn";

interface ChartBarProps {
  heights: number[]; // 0–100 percent values
  color?: ChartColor | "err";
  size?: "mini" | "big";
}

function barClass(color: ChartBarProps["color"], height: number) {
  const colorMap: Record<NonNullable<ChartBarProps["color"]>, string> = {
    accent: "",
    blue: "blue-bar",
    teal: "teal-bar",
    purple: "",
    orange: "warn-bar",
    warn: "warn-bar",
    err: "err-bar",
  };
  const base = colorMap[color ?? "accent"];
  const opacity = height >= 80 ? "active" : height >= 50 ? "mid" : "";
  return cn("bar", base, opacity);
}

export function ChartBar({
  heights = [],
  color = "accent",
  size = "mini",
}: ChartBarProps) {
  return (
    <div className={size === "mini" ? "mini-chart" : "big-chart"}>
      {heights.map((h, i: Key | null | undefined) => (
        <div
          key={i}
          className={barClass(color, h)}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
