import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap border px-5 py-3 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50",
  { variants: { variant: {
    primary: "border-transparent bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)]",
    outline: "border-[var(--foreground)] bg-transparent hover:bg-[var(--foreground)] hover:text-[var(--background)]",
    ghost: "border-transparent bg-transparent hover:bg-[var(--surface)]",
  }, size: { default: "h-12", sm: "h-10 px-4", lg: "h-14 px-7" } }, defaultVariants: { variant: "primary", size: "default" } }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
