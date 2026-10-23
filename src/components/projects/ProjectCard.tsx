import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { StatusBadge } from "@/components/primitives/StatusBadge";
import { Tag } from "@/components/primitives/Tag";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link
      to="/project/$slug"
      params={{ slug: project.slug }}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_0_40px_-20px_var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={project.status} />
        <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
      </div>
      <h3 className={`mt-4 font-semibold text-foreground ${large ? "text-2xl" : "text-xl"}`}>
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-brand">{project.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.summaryLine}
      </p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
        Case study
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
