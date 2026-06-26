import * as React from "react";
import { cn } from "@/utils/cn";

// Lightweight custom button — no external UI lib deps required.

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", isLoading, onClick, ...props }, ref) => {

    const baseStyles =
      "btn-ripple inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 select-none";

    const variants = {
      primary:
        "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5",
      outline:
        "border border-border bg-transparent hover:bg-primary/5 text-foreground hover:border-primary/40",
      ghost: "hover:bg-primary/10 hover:text-primary",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-12 px-8 py-2",
      sm: "h-9 px-4 text-xs",
      lg: "h-14 px-10 text-base",
      icon: "h-12 w-12",
    };

    const compClass = cn(baseStyles, variants[variant], sizes[size], className);

    // Ripple handler
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement("span");
      ripple.className = "ripple-wave";
      ripple.style.cssText = `width:${size}px;height:${size}px;top:${y}px;left:${x}px;`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());

      onClick?.(e);
    };

    return (
      <button
        className={compClass}
        ref={ref}
        onClick={handleClick}
        aria-disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
              aria-hidden="true"
            />
            {props.children}
          </span>
        ) : (
          props.children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

