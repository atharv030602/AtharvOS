import { aiLab } from "@/data/ailab";
import { Reveal } from "@/components/primitives/Reveal";
import { StatusBadge } from "@/components/primitives/StatusBadge";
import { Tag } from "@/components/primitives/Tag";

export function Notebook() {
  return (
    <div className="space-y-16">
      {aiLab.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {section.entries.length}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{section.intro}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.entries.map((entry, i) => (
              <Reveal
                key={entry.title}
                delay={(i % 3) * 0.05}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-5 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium leading-snug text-foreground">{entry.title}</h3>
                  <StatusBadge status={entry.status} />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {entry.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {entry.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
