import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const base = "rounded-md px-6 py-3 text-md font-normal font-mono transition-colors disabled:opacity-50";
  const variants = {
    primary: "bg-ink text-white hover:bg-slate-50 hover:text-ink",
    secondary: " text-ink hover:bg-slate-50",
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
}
