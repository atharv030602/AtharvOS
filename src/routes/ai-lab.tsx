import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Notebook } from "@/components/ailab/Notebook";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/ai-lab")({
  head: () => ({
    meta: [
      { title: `AI Lab — ${siteConfig.owner}` },
      {
        name: "description",
        content:
          "An engineering notebook of honest AI experiments, research notes and learning journal entries by Atharv Mitkari.",
      },
      { property: "og:title", content: `AI Lab — ${siteConfig.owner}` },
      { property: "og:description", content: "An engineering notebook, not an AI showcase." },
    ],
  }),
  component: AiLab,
});

function AiLab() {
  return (
    <Section className="pt-32">
      <SectionHeading
        eyebrow="AI Lab"
        title="An engineering notebook"
        description="Honest experiments and learning notes as I explore agentic AI — clearly marked as what they are. I'm a Java backend developer studying this space, not an AI expert."
      />
      <div className="mt-14">
        <Notebook />
      </div>
    </Section>
  );
}
