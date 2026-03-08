import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface CardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  variant?: "default" | "minimal" | "filled";
}

export function Card({
  title,
  subtitle,
  children,
  actions,
  collapsible = false,
  defaultOpen = true,
  variant = "default",
}: CardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const variantStyles = {
    default: "glass-card",
    minimal: "border border-border/50 rounded-lg",
    filled: "bg-secondary/50 rounded-lg",
  };

  return (
    <div className={`${variantStyles[variant]} ${variant !== "default" ? "p-5" : ""}`}>
      <div
        className={`flex items-center justify-between ${collapsible ? "cursor-pointer" : ""} ${
          variant === "default" ? "p-5 pb-4" : "pb-4"
        } ${collapsible && !isOpen ? "border-b border-border/50" : ""}`}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {collapsible && (
            <ChevronDown
              className={`h-4 w-4 transition-transform ${!isOpen ? "-rotate-90" : ""}`}
            />
          )}
        </div>
      </div>

      {(!collapsible || isOpen) && (
        <div className={variant === "default" ? "px-5 pb-5" : ""}>
          {children}
        </div>
      )}
    </div>
  );
}
