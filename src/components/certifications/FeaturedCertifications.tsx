import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { certifications } from "@/data/certifications";
import { getFeaturedCertifications } from "@/lib/certifications";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { CertificationCard } from "./CertificationCard";
import { PdfViewerModal } from "./PdfViewerModal";

interface FeaturedCertificationsProps {
  limit?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Render its own <Section> wrapper (home/about) vs bare grid. */
  withSection?: boolean;
}

export function FeaturedCertifications({
  limit = 3,
  eyebrow = "Credentials",
  title = "Featured certifications",
  description = "A selection of recent certifications — see the full, searchable collection for more.",
  withSection = true,
}: FeaturedCertificationsProps) {
  const featured = getFeaturedCertifications(certifications, limit);
  const [active, setActive] = useState<Certification | null>(null);

  if (featured.length === 0) return null;

  const body = (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <Link
          to="/certifications"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          View all certifications <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((cert, i) => (
          <Reveal key={cert.id} delay={(i % 3) * 0.05} className="h-full">
            <CertificationCard cert={cert} onView={setActive} />
          </Reveal>
        ))}
      </div>
      <PdfViewerModal
        open={active !== null}
        onOpenChange={(o) => !o && setActive(null)}
        title={active?.title ?? ""}
        subtitle={active ? `${active.issuer}` : undefined}
        file={active?.certificatePdf}
      />
    </>
  );

  return withSection ? <Section className="py-8">{body}</Section> : body;
}
