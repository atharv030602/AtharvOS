import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { StatusBadge } from "@/components/primitives/StatusBadge";
import { Tag } from "@/components/primitives/Tag";
import { GithubIcon } from "@/components/primitives/icons";

function DocSection({
  title,
  children,
  eyebrow,
}: {
  title: string;
  children: ReactNode;
  eyebrow?: string;
}) {
  return (
    <Reveal as="section" className="border-t border-border pt-10">
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-brand">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}

function SummaryItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-5">
      <p className="font-mono text-xs uppercase tracking-wider text-brand">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

const stackRows: { key: keyof Project["techStack"]; label: string }[] = [
  { key: "languages", label: "Languages" },
  { key: "frameworks", label: "Frameworks" },
  { key: "database", label: "Database" },
  { key: "architecture", label: "Architecture" },
  { key: "authentication", label: "Authentication" },
  { key: "deployment", label: "Deployment" },
  { key: "tools", label: "Tools" },
];

export function CaseStudy({ project: p }: { project: Project }) {
  return (
    <article className="pt-28">
      {/* Header */}
      <Section className="py-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All projects
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusBadge status={p.status} />
          <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {p.name}
        </h1>
        <p className="mt-3 text-lg text-brand">{p.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.links.github && (
            <a
              href={p.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-brand/40"
            >
              <GithubIcon className="size-4" /> GitHub
            </a>
          )}
          {p.links.demo && (
            <a
              href={p.links.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand/90"
            >
              <ExternalLink className="size-4" /> Live Demo
            </a>
          )}
        </div>
      </Section>

      <Section className="flex flex-col gap-10 py-8">
        {/* Summary */}
        <Reveal as="section">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-brand">Summary</p>
          <h2 className="text-2xl font-semibold text-foreground">Project Overview</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{p.overview}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <SummaryItem label="Why I Built This">{p.whyBuilt}</SummaryItem>
            <SummaryItem label="Target Users">{p.targetUsers}</SummaryItem>
            <SummaryItem label="Problem Statement">{p.problemStatement}</SummaryItem>
            <SummaryItem label="Outcome">{p.outcome}</SummaryItem>
          </div>
        </Reveal>

        {/* Tech Stack panel */}
        <Reveal as="section" className="rounded-2xl border border-border bg-surface/50 p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Tech Stack</p>
          <dl className="mt-5 divide-y divide-border">
            {stackRows
              .filter((row) => p.techStack[row.key].length > 0)
              .map((row) => (
              <div key={row.key} className="grid gap-2 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-foreground">{row.label}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {p.techStack[row.key].map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Architecture */}
        {p.architecture.length > 0 && (
          <DocSection title="Architecture" eyebrow="Design">
            <BulletList items={p.architecture} />
          </DocSection>
        )}

        {/* Module Diagram */}
        {p.moduleDiagram.length > 0 && (
          <DocSection title="Module Diagram">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {p.moduleDiagram.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-surface/40 p-4">
                  <p className="font-mono text-sm font-medium text-foreground">{m.label}</p>
                  {m.detail && <p className="mt-1 text-xs text-muted-foreground">{m.detail}</p>}
                </div>
              ))}
            </div>
          </DocSection>
        )}

        {/* Database Design */}
        {p.databaseDesign.length > 0 && (
          <DocSection title="Database Design">
            <div className="grid gap-3 sm:grid-cols-2">
              {p.databaseDesign.map((tbl) => (
                <div key={tbl.table} className="overflow-hidden rounded-xl border border-border">
                  <p className="border-b border-border bg-surface-elevated/60 px-4 py-2 font-mono text-sm text-brand">
                    {tbl.table}
                  </p>
                  <ul className="divide-y divide-border">
                    {tbl.fields.map((f) => (
                      <li key={f} className="px-4 py-1.5 font-mono text-xs text-muted-foreground">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DocSection>
        )}

        {/* ER Diagram */}
        {p.erDiagram && (
          <DocSection title="ER Diagram">
            <pre className="overflow-x-auto rounded-xl border border-border bg-surface/60 p-5 font-mono text-xs leading-relaxed text-muted-foreground">
              {p.erDiagram}
            </pre>
          </DocSection>
        )}

        {/* Folder Structure */}
        {p.folderStructure && (
          <DocSection title="Folder Structure">
            <pre className="overflow-x-auto rounded-xl border border-border bg-surface/60 p-5 font-mono text-xs leading-relaxed text-muted-foreground">
              {p.folderStructure}
            </pre>
          </DocSection>
        )}

        {/* Screenshots */}
        {p.screenshots.length > 0 && (
          <DocSection title="Screenshots">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.screenshots.map((shot, i) => (
                <figure key={i} className="overflow-hidden rounded-xl border border-border bg-surface/40">
                  <img
                    src={shot.src}
                    alt={shot.caption}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                  <figcaption className="px-4 py-2 text-xs text-muted-foreground">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </DocSection>
        )}

        {/* Features */}
        {p.features.length > 0 && (
          <DocSection title="Features">
            <BulletList items={p.features} />
          </DocSection>
        )}

        {/* Mandatory reflection section */}
        <Reveal as="section" className="rounded-2xl border border-brand/25 bg-brand/5 p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">Reflection</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">Lessons Learned</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {p.lessonsLearned.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-medium text-foreground">Lessons Learned</h3>
                <BulletList items={p.lessonsLearned} />
              </div>
            )}
            {p.whatIdImprove.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-medium text-foreground">What I Would Improve</h3>
                <BulletList items={p.whatIdImprove} />
              </div>
            )}
            {p.challenges.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-medium text-foreground">Technical Challenges</h3>
                <BulletList items={p.challenges} />
              </div>
            )}
            {p.tradeoffs.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-medium text-foreground">Trade-offs</h3>
                <BulletList items={p.tradeoffs} />
              </div>
            )}
          </div>
        </Reveal>

        {/* Future Roadmap */}
        {p.futureRoadmap.length > 0 && (
          <DocSection title="Future Roadmap">
            <div className="flex flex-wrap gap-2">
              {p.futureRoadmap.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-border bg-surface-elevated/60 px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {f}
                </span>
              ))}
            </div>
          </DocSection>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 border-t border-border pt-10">
          {p.links.github && (
            <a
              href={p.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-brand/40"
            >
              <GithubIcon className="size-4" /> View on GitHub
            </a>
          )}
          {p.links.demo && (
            <a
              href={p.links.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand/90"
            >
              <ExternalLink className="size-4" /> Live Demo
            </a>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-brand/40"
          >
            Discuss this project
          </Link>
        </div>
      </Section>
    </article>
  );
}