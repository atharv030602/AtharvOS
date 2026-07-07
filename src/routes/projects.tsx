import { createFileRoute } from "@tanstack/react-router";
import { projects, featuredProject } from "@/data/projects";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects — ${siteConfig.owner}` },
      {
        name: "description",
        content:
          "Engineering projects by Atharv Mitkari, documented as case studies — including Garage ERP, a full-stack Spring Boot system.",
      },
      { property: "og:title", content: `Projects — ${siteConfig.owner}` },
      { property: "og:description", content: "Real engineering work, documented like engineering." },
    ],
  }),
  component: Projects,
});

function Projects() {
  const rest = projects.filter((p) => p.slug !== featuredProject.slug);
  return (
    <Section className="pt-32">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built and documented"
        description="Each project is written up as an engineering case study — problem, architecture, trade-offs and lessons."
      />

      <Reveal className="mt-10">
        <ProjectCard project={featuredProject} large />
      </Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.05}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}