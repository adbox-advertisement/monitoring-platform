import { cn } from "../../utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={cn("panel", className)}>{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className="panel-title">{children}</div>;
}
