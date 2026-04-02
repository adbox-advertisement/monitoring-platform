import { cn } from "../../utils/cn";

type BadgeVariant = "healthy" | "warning" | "error" | "idle";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  healthy: "badge-healthy",
  warning: "badge-warning",
  error: "badge-error",
  idle: "badge-idle",
};

export function Badge({ variant = "idle", children, className }: BadgeProps) {
  return (
    <span className={cn("badge", variantStyles[variant], className)}>
      {children}
    </span>
  );
}
