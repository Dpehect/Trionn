import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  asChild = false,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        variant === "ghost" &&
          "inline-flex min-h-12 items-center justify-center rounded-full px-5 text-xs uppercase tracking-[.16em] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]",
        className
      )}
      {...props}
    />
  );
}
