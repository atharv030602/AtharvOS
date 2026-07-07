import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { CertificationsExplorer } from "@/components/certifications/CertificationsExplorer";
import { CertificationTimeline } from "@/components/certifications/CertificationTimeline";
import { certifications } from "@/data/certifications";
import { sortCertifications } from "@/lib/certifications";
import { siteConfig } from "@/config/site";

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Certifications — ${siteConfig.owner}`,
  itemListElement: sortCertifications(certifications, "newest").map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "EducationalOccupationalCredential",
      name: c.title,
      credentialCategory: c.category,
      recognizedBy: { "@type": "Organization", name: c.issuer },
    },
  })),
};

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: `Certifications — ${siteConfig.owner}` },
      {
        name: "description",
        content:
          "Searchable, filterable collection of Atharv Mitkari's certifications across Java, Backend, Cybersecurity and more — with a chronological timeline.",
      },
      { property: "og:title", content: `Certifications — ${siteConfig.owner}` },
      {
        property: "og:description",
        content: "Browse, filter and verify Atharv Mitkari's certifications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(itemListJsonLd) },
    ],
  }),
  component: Certifications,
});

function Certifications() {
  return (
    <>
      <Section className="pt-32 pb-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials & continuous learning"
          description="A living, data-driven record of certifications — searchable, filterable and always up to date."
        />
      </Section>

      <Section className="py-8">
        <CertificationsExplorer />
      </Section>

      <Section className="py-8">
        <SectionHeading
          eyebrow="Timeline"
          title="Certification history"
          description="Automatically generated from issue dates — newest first."
          className="mb-10"
        />
        <Reveal>
          <CertificationTimeline />
        </Reveal>
      </Section>
    </>
  );
}
