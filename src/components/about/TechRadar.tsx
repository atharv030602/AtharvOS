import { techRadar, radarRings, type RadarRing } from "@/data/techRadar";
import { Reveal } from "@/components/primitives/Reveal";

const ringStyle: Record<RadarRing, string> = {
  Adopt: "border-emerald-500/40 text-emerald-400",
  Trial: "border-brand/40 text-brand",
  Assess: "border-brand-secondary/40 text-brand-secondary",
  Hold: "border-slate-500/40 text-slate-300",
};

export function TechRadar() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {radarRings.map((r, i) => {
        const items = techRadar.filter((t) => t.ring === r.ring);
        return (
          <Reveal
            key={r.ring}
            delay={i * 0.05}
            className="rounded-2xl border border-border bg-surface/50 p-5 backdrop-blur-sm"
          >
            <div className="flex items-baseline justify-between">
              <h3 className={`font-display text-lg font-semibold ${ringStyle[r.ring].split(" ")[1]}`}>
                {r.ring}
              </h3>
              <span className="font-mono text-xs text-muted-foreground">{items.length}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{r.blurb}</p>
            <ul className="mt-4 space-y-2">
              {items.map((t) => (
                <li
                  key={t.name}
                  className={`rounded-lg border bg-surface-elevated/40 px-3 py-1.5 text-sm text-foreground ${ringStyle[t.ring].split(" ")[0]}`}
                >
                  {t.name}
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}