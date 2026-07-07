import { ArrowUpRight, Star } from "lucide-react";
import { pinnedRepos, recentActivity, contributionGrid } from "@/data/github";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { Tag } from "@/components/primitives/Tag";
import { GithubIcon } from "@/components/primitives/icons";

const cellShades = [
  "bg-surface-elevated",
  "bg-brand/25",
  "bg-brand/45",
  "bg-brand/70",
  "bg-brand",
];

export function GithubSection() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Open Source"
          title="On GitHub"
          description="Pinned repositories, recent activity, and where I'm shipping code."
        />
        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-brand/40"
        >
          <GithubIcon className="size-4" /> View profile
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {pinnedRepos.map((repo, i) => (
            <Reveal key={repo.name} delay={(i % 2) * 0.05}>
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand/40"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-sm font-medium text-foreground">
                    <GithubIcon className="size-4 text-muted-foreground" />
                    {repo.name}
                  </span>
                  <Star className="size-3.5 text-muted-foreground" />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {repo.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="size-2 rounded-full bg-brand" />
                    {repo.language}
                  </span>
                  {repo.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <Reveal className="rounded-2xl border border-border bg-surface/50 p-5 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Contribution activity
            </p>
            <div className="mt-4 flex flex-wrap gap-1" aria-hidden="true">
              {contributionGrid.flatMap((row, r) =>
                row.map((level, c) => (
                  <span
                    key={`${r}-${c}`}
                    className={`size-2.5 rounded-[3px] ${cellShades[level]}`}
                  />
                )),
              )}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">A snapshot of recent commit rhythm.</p>
          </Reveal>

          <Reveal className="rounded-2xl border border-border bg-surface/50 p-5 backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Recent activity
            </p>
            <ul className="mt-4 space-y-3">
              {recentActivity.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>
                    {a.action} <span className="font-mono text-foreground">{a.repo}</span>{" "}
                    <span className="text-xs">· {a.when}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}