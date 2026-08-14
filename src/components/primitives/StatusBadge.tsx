import { cn } from "@/lib/utils";
import type { Status } from "@/data/status";

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "-rotate-2 inline-flex items-center gap-1.5 border border-accent/50 bg-accent/5 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-accent",
        className,
      )}
    >
      <span className="size-1.5 shrink-0 bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}
