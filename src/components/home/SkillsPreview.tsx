import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/primitives/Reveal";
import { Tag } from "@/components/primitives/Tag";

/** Deliberately compact — skills get less weight than projects. */
export function SkillsPreview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Reveal className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Skills</p>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Full breakdown <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="mt-5 grid gap-6 sm:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-medium text-foreground">{group.title}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.categories
                  .flatMap((c) => c.items)
                  .slice(0, 6)
                  .map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
