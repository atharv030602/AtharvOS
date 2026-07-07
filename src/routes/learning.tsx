import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, GraduationCap } from "lucide-react";
import { roadmap, learningResources } from "@/data/learning";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { StatusBadge } from "@/components/primitives/StatusBadge";
import { FeaturedCertifications } from "@/components/certifications/FeaturedCertifications";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: `Learning — ${siteConfig.owner}` },
      {
        name: "description",
        content:
          "The learning roadmap, resources and certifications of Atharv Mitkari — continuously improving as a backend engineer.",
      },
      { property: "og:title", content: `Learning — ${siteConfig.owner}` },
      { property: "og:description", content: "Roadmap, resources and certifications." },
    ],
  }),
  component: Learning,
});

function Learning() {
  return (
    <>
      <Section className="pt-32 pb-8">
        <SectionHeading
          eyebrow="Learning"
          title="A continuously improving engineer"
          description="My roadmap from core Java foundations toward backend mastery and agentic AI."
        />
      </Section>

      <Section className="py-8">
        <SectionHeading eyebrow="Roadmap" title="What I'm working through" className="mb-8" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 3) * 0.05}
              className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface/50 p-5 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-foreground">{item.title}</p>
                <StatusBadge status={item.status} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="py-8">
        <SectionHeading eyebrow="Resources" title="What I'm learning from" className="mb-8" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {learningResources.map((res, i) => (
            <Reveal
              key={res.title}
              delay={(i % 3) * 0.05}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface/50 p-5 backdrop-blur-sm"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                {res.type === "Book" ? <BookOpen className="size-4" /> : <GraduationCap className="size-4" />}
              </span>
              <div>
                <p className="font-medium text-foreground">{res.title}</p>
                <p className="text-sm text-muted-foreground">
                  {res.type} · {res.source}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <FeaturedCertifications
        eyebrow="Credentials"
        title="Certifications & programs"
        description="A few highlights — browse the full, filterable collection on the Certifications page."
      />
    </>
  );
}