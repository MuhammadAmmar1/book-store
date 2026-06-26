import * as React from "react";
import { cn } from "@/utils/cn";

// Lightweight custom button — no external UI lib deps required.

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95";
    
    const variants = {
      primary: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-border bg-transparent hover:bg-primary/5 text-foreground",
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

    return (
      <button className={compClass} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button };
