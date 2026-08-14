import { mission } from "@/data/mission";
import { statusOrder, type Status } from "@/data/status";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { StatusBadge } from "@/components/primitives/StatusBadge";

export function MissionDashboard() {
  const sorted = [...mission].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
  );
  const counts = mission.reduce<Record<string, number>>((acc, m) => {
    acc[m.status] = (acc[m.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <Section>
      <SectionHeading
        eyebrow="Current Mission"
        title="What I'm actively working on"
        description="An honest, live view of where my focus is right now."
      />
      <div className="mt-6 flex flex-wrap gap-2">
        {statusOrder
          .filter((s) => counts[s])
          .map((s) => (
            <StatusBadge key={s} status={s as Status} />
          ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((m, i) => (
          <Reveal key={m.title} delay={(i % 3) * 0.06}>
            <div className="flex h-full flex-col justify-between border border-border bg-surface/50 p-5 backdrop-blur-sm transition-colors hover:border-line-bright">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-foreground">{m.title}</p>
                <StatusBadge status={m.status} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{m.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}