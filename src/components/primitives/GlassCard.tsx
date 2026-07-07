import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_0_40px_-16px_var(--brand)]",
        className,
      )}
    >
      {children}
    </div>
  );
}