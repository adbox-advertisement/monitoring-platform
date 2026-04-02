import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        variant === "primary" ? "btn-logs" : "sidebar-link",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
