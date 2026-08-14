import { Hammer } from "lucide-react";
import { nowBuilding } from "@/data/nowBuilding";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";

export function NowBuilding() {
  return (
    <Section className="py-10">
      <Reveal className="rounded-2xl border border-border bg-surface/50 p-5 backdrop-blur-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-brand">
            <Hammer className="size-4" />
            Now Building
          </div>
          <ul className="flex flex-wrap gap-2">
            {nowBuilding.map((item) => (
              <li
                key={item.title}
                className="group flex items-center gap-2 border border-border bg-surface-elevated/60 px-3 py-1.5 text-sm text-foreground"
                title={item.detail}
              >
                <span className="size-1.5 animate-pulse bg-accent" />
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}