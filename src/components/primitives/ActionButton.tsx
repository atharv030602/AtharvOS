import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 border font-display px-5 py-2.5 text-sm font-medium transition-all duration-150 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "border-accent bg-accent text-primary-foreground hover:bg-[color-mix(in_oklab,var(--accent)_88%,white)]",
  secondary:
    "border-line bg-transparent text-foreground hover:border-line-bright hover:bg-surface-elevated/60",
  ghost:
    "border-transparent text-muted-foreground hover:text-foreground hover:bg-surface-elevated/40",
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
