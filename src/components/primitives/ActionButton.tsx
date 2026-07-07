import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-primary-foreground hover:bg-brand/90 hover:shadow-[0_0_30px_-8px_var(--brand)]",
  secondary:
    "border border-border bg-surface-elevated/60 text-foreground hover:border-brand/40 hover:bg-surface-elevated",
  ghost: "text-muted-foreground hover:text-foreground",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  to,
  variant = "primary",
  className,
  children,
}: CommonProps & { to: string }) {
  return (
    <Link to={to} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"a">) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </a>
  );
}

export function ButtonAction({
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}