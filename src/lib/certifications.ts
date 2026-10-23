import type { Certification, CertificationCategory } from "@/data/certifications";

/** All filterable categories, in display order. */
export const CERT_CATEGORIES: CertificationCategory[] = [
  "Java",
  "Backend",
  "Cloud",
  "AI",
  "Cybersecurity",
  "Database",
  "DevOps",
  "Frontend",
  "Other",
];

export type CertSort = "newest" | "oldest" | "issuer" | "category" | "alphabetical";

export const CERT_SORT_OPTIONS: { value: CertSort; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "issuer", label: "Issuer" },
  { value: "category", label: "Category" },
  { value: "alphabetical", label: "Alphabetical" },
];

/** Parse an "YYYY", "YYYY-MM" or "YYYY-MM-DD" string into a timestamp. */
export function certTimestamp(date: string): number {
  const [y, m = "1", d = "1"] = date.split("-");
  return new Date(Number(y), Number(m) - 1, Number(d)).getTime();
}

/** Human-friendly issue date, e.g. "Feb 2025". */
export function formatCertDate(date: string): string {
  const [y, m] = date.split("-");
  if (!m) return y;
  const label = new Date(Number(y), Number(m) - 1, 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
  return label;
}

export function sortCertifications(list: Certification[], sort: CertSort): Certification[] {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => certTimestamp(b.issueDate) - certTimestamp(a.issueDate));
    case "oldest":
      return copy.sort((a, b) => certTimestamp(a.issueDate) - certTimestamp(b.issueDate));
    case "issuer":
      return copy.sort((a, b) => a.issuer.localeCompare(b.issuer));
    case "category":
      return copy.sort((a, b) => a.category.localeCompare(b.category));
    case "alphabetical":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy;
  }
}

export function filterCertifications(
  list: Certification[],
  options: { categories: CertificationCategory[]; query: string },
): Certification[] {
  const q = options.query.trim().toLowerCase();
  return list.filter((c) => {
    const matchesCategory =
      options.categories.length === 0 || options.categories.includes(c.category);
    if (!matchesCategory) return false;
    if (!q) return true;
    const haystack = [c.title, c.issuer, c.category, ...c.skills].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}

/** Latest featured certifications, newest first. */
export function getFeaturedCertifications(list: Certification[], limit?: number): Certification[] {
  const featured = sortCertifications(
    list.filter((c) => c.featured),
    "newest",
  );
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

/** Initials fallback when no issuer logo image is provided. */
export function issuerInitials(issuer: string): string {
  return issuer
    .replace(/[()]/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
