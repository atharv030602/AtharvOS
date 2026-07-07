import { Target } from "lucide-react";
import { lookingFor } from "@/data/lookingFor";

export function LookingFor() {
  return (
    <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 sm:p-8">
      <div className="flex items-center gap-2 text-brand">
        <Target className="size-5" />
        <h2 className="font-display text-xl font-semibold">Currently Looking For</h2>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {lookingFor.map((role) => (
          <li
            key={role}
            className="rounded-full border border-border bg-surface-elevated/60 px-3.5 py-1.5 text-sm text-foreground"
          >
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}