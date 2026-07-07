import { certifications } from "@/data/certifications";
import { formatCertDate, sortCertifications } from "@/lib/certifications";
import { Reveal } from "@/components/primitives/Reveal";

/** Auto-generated timeline from issue dates — newest first. */
export function CertificationTimeline() {
  const ordered = sortCertifications(certifications, "newest");
  return (
    <ol className="relative ml-3 border-l border-border">
      {ordered.map((cert, i) => (
        <Reveal
          as="li"
          key={cert.id}
          delay={(i % 4) * 0.05}
          className="relative ml-6 pb-8 last:pb-0"
        >
          <span
            className="absolute -left-[1.6rem] top-1.5 flex size-3 items-center justify-center rounded-full border border-brand/50 bg-brand/20"
            aria-hidden="true"
          >
            <span className="size-1.5 rounded-full bg-brand" />
          </span>
          <time className="font-mono text-xs text-brand">{formatCertDate(cert.issueDate)}</time>
          <p className="mt-1 font-medium text-foreground">{cert.title}</p>
          <p className="text-sm text-muted-foreground">
            {cert.issuer} · {cert.category}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
