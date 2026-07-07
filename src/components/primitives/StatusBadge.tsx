import { cn } from "@/lib/utils";
import type { Status } from "@/data/status";

const styles: Record<Status, string> = {
  Building: "border-brand/40 bg-brand/10 text-brand",
  Learning: "border-brand-accent/40 bg-brand-accent/10 text-brand-accent",
  Exploring: "border-brand-secondary/40 bg-brand-secondary/10 text-brand-secondary",
  Completed: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  Planned: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  "Coming Soon": "border-amber-500/40 bg-amber-500/10 text-amber-400",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium",
        styles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}