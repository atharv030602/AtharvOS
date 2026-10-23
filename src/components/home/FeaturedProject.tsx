import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { featuredProject } from "@/data/projects";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { StatusBadge } from "@/components/primitives/StatusBadge";
import { Tag } from "@/components/primitives/Tag";

export function FeaturedProject() {
  const p = featuredProject;
  return (
    <Section>
      <SectionHeading
        eyebrow="Flagship Project"
        title="The project I'd want a recruiter to open first"
        description="A real, end-to-end system — documented like engineering, not marketing."
      />
      <Reveal className="mt-10">
        <Link
          to="/project/$slug"
          params={{ slug: p.slug }}
          className="group block overflow-hidden border border-border bg-surface/60 transition-all duration-150 hover:-translate-y-0.5 hover:border-line-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <StatusBadge status={p.status} />
                <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-foreground sm:text-4xl">{p.name}</h3>
              <p className="mt-2 text-lg text-brand">{p.tagline}</p>
              <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{p.summaryLine}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                Read the case study
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
            <div className="relative min-h-52 border-t border-border bg-surface-elevated/30 p-8 lg:border-l lg:border-t-0">
              <div className="grid h-full grid-cols-2 gap-3">
                {p.moduleDiagram.slice(0, 6).map((m) => (
                  <div key={m.label} className="border border-border bg-surface-elevated/60 p-3">
                    <p className="font-mono text-xs font-medium text-foreground">{m.label}</p>
                    {m.detail && (
                      <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                        {m.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </Reveal>
    </Section>
  );
}
