import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Download, ExternalLink, FileText, CalendarClock, GitBranch, Loader2 } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { siteConfig, resumeMeta } from "@/config/site";

// react-pdf touches browser-only APIs, so it must never load during SSR.
const ResumeViewer = lazy(() => import("@/components/resume/ResumeViewer"));

function ViewerLoading() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4 bg-surface">
      <Loader2 className="size-6 animate-spin text-brand" aria-hidden="true" />
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Loading viewer…
      </p>
    </div>
  );
}

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: `Resume — ${siteConfig.owner}` },
      {
        name: "description",
        content: `Preview and download the resume of ${siteConfig.owner}, ${siteConfig.specialty}.`,
      },
      { property: "og:title", content: `Resume — ${siteConfig.owner}` },
      { property: "og:description", content: "Preview and download my latest resume." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Resume,
});

function Resume() {
  const { file, version, lastUpdated } = resumeMeta;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <>
      <Section className="pt-32 pb-8">
        <SectionHeading
          eyebrow="Resume"
          title="My resume"
          description="Preview it inline or download the PDF. The file is also directly accessible at /resume.pdf."
        />

        <Reveal className="mt-8 flex flex-col gap-6 rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            <div className="flex items-center gap-2.5">
              <GitBranch className="size-4 text-brand" aria-hidden="true" />
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Version
                </dt>
                <dd className="text-sm font-medium text-foreground">{version}</dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <CalendarClock className="size-4 text-brand" aria-hidden="true" />
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Last Updated
                </dt>
                <dd className="text-sm font-medium text-foreground">{lastUpdated}</dd>
              </div>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            <a
              href={file}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ExternalLink className="size-4" aria-hidden="true" /> Preview Resume
            </a>
            <a
              href={file}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Download className="size-4" aria-hidden="true" /> Download Resume
            </a>
          </div>
        </Reveal>
      </Section>

      <Section className="py-8">
        <Reveal className="overflow-hidden rounded-2xl border border-border bg-surface/60">
          <div className="flex items-center gap-2 border-b border-border px-5 py-3 text-sm text-muted-foreground">
            <FileText className="size-4 text-brand" aria-hidden="true" />
            <span className="font-mono text-xs">resume.pdf</span>
          </div>
          {mounted ? (
            <Suspense fallback={<ViewerLoading />}>
              <ResumeViewer file={file} title={`${siteConfig.owner} resume`} />
            </Suspense>
          ) : (
            <ViewerLoading />
          )}
        </Reveal>
      </Section>
    </>
  );
}
