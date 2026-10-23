import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface-elevated/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
