import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Timeline } from "@/components/about/Timeline";
import { LookingFor } from "@/components/about/LookingFor";
import { SkillsGrid } from "@/components/about/SkillsGrid";
import { TechRadar } from "@/components/about/TechRadar";
import { FeaturedCertifications } from "@/components/certifications/FeaturedCertifications";
import { MissionDashboard } from "@/components/home/MissionDashboard";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${siteConfig.owner} | ${siteConfig.specialty}` },
      {
        name: "description",
        content:
          "The story, skills, tech radar and certifications of Atharv Mitkari — a Java backend developer exploring Agentic AI.",
      },
      { property: "og:title", content: `About — ${siteConfig.owner}` },
      {
        property: "og:description",
        content: "Story, skills, tech radar and what I'm looking for.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <Section className="pt-32 pb-8">
        <SectionHeading
          eyebrow="About"
          title="A backend engineer who documents the journey"
          description={siteConfig.heroHeadline}
        />
      </Section>

      <Section className="py-8">
        <LookingFor />
      </Section>

      <Section className="py-8">
        <SectionHeading eyebrow="Journey" title="How I got here" className="mb-10" />
        <Timeline />
      </Section>

      <MissionDashboard />

      <Section className="py-8">
        <SectionHeading
          eyebrow="Skills"
          title="An honest skills breakdown"
          description="Grouped by how confidently I use them today."
          className="mb-10"
        />
        <SkillsGrid />
      </Section>

      <Section className="py-8">
        <SectionHeading
          eyebrow="Tech Radar"
          title="Where my focus is moving"
          description="Adopt, Trial, Assess, Hold — an honest read on my technical direction."
          className="mb-10"
        />
        <TechRadar />
      </Section>

      <FeaturedCertifications
        eyebrow="Credentials"
        title="Certifications & programs"
        description="Featured certifications — explore the full, searchable collection for everything."
      />
    </>
  );
}
