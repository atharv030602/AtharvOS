import { GraduationCap, Briefcase, Flag } from "lucide-react";
import { timeline, type TimelineEntry } from "@/data/timeline";
import { Reveal } from "@/components/primitives/Reveal";

const icons = {
  education: GraduationCap,
  experience: Briefcase,
  milestone: Flag,
} as const;

export function Timeline() {
  return (
    <ol className="relative ml-3 border-l border-border">
      {timeline.map((entry: TimelineEntry, i) => {
        const Icon = icons[entry.kind];
        return (
          <Reveal as="li" key={`${entry.title}-${i}`} delay={i * 0.04} className="mb-8 ml-6">
            <span className="absolute -left-3 flex size-6 items-center justify-center rounded-full border border-border bg-surface-elevated">
              <Icon className="size-3 text-brand" />
            </span>
            <p className="font-mono text-xs text-brand">{entry.period}</p>
            <h3 className="mt-1 font-medium text-foreground">{entry.title}</h3>
            {entry.org && <p className="text-sm text-muted-foreground">{entry.org}</p>}
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
          </Reveal>
        );
      })}
    </ol>
  );
}