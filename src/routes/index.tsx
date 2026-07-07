import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { NowBuilding } from "@/components/home/NowBuilding";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { FeaturedTech } from "@/components/home/FeaturedTech";
import { MissionDashboard } from "@/components/home/MissionDashboard";
import { GithubSection } from "@/components/home/GithubSection";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { FeaturedCertifications } from "@/components/certifications/FeaturedCertifications";
import { siteConfig } from "@/config/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.owner,
  jobTitle: siteConfig.specialty,
  description: siteConfig.description,
  url: "/",
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  knowsAbout: ["Java", "Spring Boot", "REST APIs", "MySQL", "Backend Development", "Agentic AI"],
};

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personJsonLd),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <NowBuilding />
      <FeaturedProject />
      <FeaturedTech />
      <MissionDashboard />
      <GithubSection />
      <FeaturedCertifications />
      <SkillsPreview />
    </>
  );
}
