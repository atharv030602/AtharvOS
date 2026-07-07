import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}

/** Consistent page section: max width + horizontal + vertical rhythm. */
export function Section({ children, className, id, as = "section" }: SectionProps) {
  const Tag = as;
  return (
    <Tag id={id} className={cn("mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20", className)}>
      {children}
    </Tag>
  );
}