import { BadgeCheck, Download, Eye, ExternalLink, Star } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { formatCertDate, issuerInitials } from "@/lib/certifications";
import { cn } from "@/lib/utils";

/** Every category shares the single accent — differentiated by label only. */
const categoryStyle = "border-accent/40 bg-accent/5 text-accent";

interface CertificationCardProps {
  cert: Certification;
  onView: (cert: Certification) => void;
}

export function CertificationCard({ cert, onView }: CertificationCardProps) {
  const hasPdf = Boolean(cert.certificatePdf);
  return (
    <article
      className="flex h-full flex-col border border-border bg-surface/60 p-5 backdrop-blur-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-line-bright"
      aria-labelledby={`cert-${cert.id}-title`}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden border border-border bg-surface-elevated/60">
          {cert.logo ? (
            <img
              src={cert.logo}
              alt={`${cert.issuer} logo`}
              loading="lazy"
              className="size-full object-contain p-1.5"
            />
          ) : (
            <span className="font-mono text-sm font-bold text-accent" aria-hidden="true">
              {issuerInitials(cert.issuer)}
            </span>
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {cert.verified ? (
              <span className="inline-flex items-center gap-1 border border-accent/40 bg-accent/5 px-2 py-0.5 font-mono text-[10px] font-medium text-accent">
                <BadgeCheck className="size-3" aria-hidden="true" /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center border border-border bg-surface-elevated/60 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
                Issued
              </span>
            )}
            {cert.featured && (
              <span className="inline-flex items-center gap-1 border border-accent/40 bg-accent/5 px-2 py-0.5 font-mono text-[10px] font-medium text-accent">
                <Star className="size-3" aria-hidden="true" /> Featured
              </span>
            )}
          </div>
          <h3
            id={`cert-${cert.id}-title`}
            className="mt-1.5 font-medium leading-snug text-foreground"
          >
            {cert.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {cert.issuer} · {formatCertDate(cert.issueDate)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className={cn("border px-2 py-0.5 font-mono text-[11px]", categoryStyle)}>
          {cert.category}
        </span>
        {cert.level && (
          <span className="border border-border bg-surface-elevated/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            {cert.level}
          </span>
        )}
      </div>

      {cert.skills.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills covered">
          {cert.skills.map((s) => (
            <li
              key={s}
              className="border border-border bg-surface-elevated/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {cert.credentialId && (
        <p className="mt-4 font-mono text-[11px] text-muted-foreground">
          Credential ID: <span className="text-foreground">{cert.credentialId}</span>
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {hasPdf && (
          <>
            <button
              type="button"
              onClick={() => onView(cert)}
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:border-line-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`View ${cert.title} certificate`}
            >
              <Eye className="size-3.5" aria-hidden="true" /> View
            </button>
            <a
              href={cert.certificatePdf}
              download
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:border-line-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Download ${cert.title} certificate`}
            >
              <Download className="size-3.5" aria-hidden="true" /> Download
            </a>
          </>
        )}
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:border-line-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Verify ${cert.title} credential`}
          >
            <ExternalLink className="size-3.5" aria-hidden="true" /> Credential
          </a>
        )}
        {!hasPdf && !cert.credentialUrl && (
          <span className="font-mono text-[11px] text-muted-foreground">
            Certificate file coming soon
          </span>
        )}
      </div>
    </article>
  );
}
