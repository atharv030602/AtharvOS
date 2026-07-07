import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Certification, CertificationCategory } from "@/data/certifications";
import { certifications } from "@/data/certifications";
import {
  CERT_CATEGORIES,
  CERT_SORT_OPTIONS,
  filterCertifications,
  sortCertifications,
  type CertSort,
} from "@/lib/certifications";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CertificationCard } from "./CertificationCard";
import { PdfViewerModal } from "./PdfViewerModal";

export function CertificationsExplorer() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CertificationCategory[]>([]);
  const [sort, setSort] = useState<CertSort>("newest");
  const [active, setActive] = useState<Certification | null>(null);

  const available = useMemo(
    () => CERT_CATEGORIES.filter((c) => certifications.some((cert) => cert.category === c)),
    [],
  );

  const results = useMemo(() => {
    const filtered = filterCertifications(certifications, { categories: selected, query });
    return sortCertifications(filtered, sort);
  }, [query, selected, sort]);

  const toggleCategory = (cat: CertificationCategory) =>
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );

  const clearFilters = () => {
    setSelected([]);
    setQuery("");
  };

  const hasFilters = selected.length > 0 || query.trim() !== "";

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, issuer, skill or category…"
              aria-label="Search certifications"
              className="w-full rounded-lg border border-border bg-surface/60 py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="cert-sort" className="sr-only">
              Sort certifications
            </label>
            <Select value={sort} onValueChange={(v) => setSort(v as CertSort)}>
              <SelectTrigger id="cert-sort" className="w-[170px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                {CERT_SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
          {available.map((cat) => {
            const on = selected.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={on}
                onClick={() => toggleCategory(cat)}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  on
                    ? "border-brand/50 bg-brand/15 text-brand"
                    : "border-border bg-surface/40 text-muted-foreground hover:text-foreground",
                )}
              >
                {cat}
              </button>
            );
          })}
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X className="size-3" aria-hidden="true" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      <p className="mt-6 font-mono text-xs text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? "certification" : "certifications"}
      </p>

      {/* Grid */}
      {results.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((cert) => (
            <li key={cert.id} className="h-full">
              <CertificationCard cert={cert} onView={setActive} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          No certifications match your filters.
        </div>
      )}

      <PdfViewerModal
        open={active !== null}
        onOpenChange={(o) => !o && setActive(null)}
        title={active?.title ?? ""}
        subtitle={active?.issuer}
        file={active?.certificatePdf}
      />
    </div>
  );
}
