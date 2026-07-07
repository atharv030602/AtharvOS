/**
 * ==========================================================================
 *  DATA-DRIVEN CERTIFICATIONS MODULE
 * ==========================================================================
 *
 *  Adding a new certificate requires ONLY two steps — no component changes:
 *
 *    1. Drop the PDF into  public/certificates/your-cert.pdf
 *    2. Add one object to the `certifications` array below and point
 *       `certificatePdf` at  "/certificates/your-cert.pdf"
 *
 *  Leave `certificatePdf` undefined while the PDF is pending — the
 *  View / Download buttons stay hidden so there are never broken links.
 *
 *  The same shape scales to Achievements, Hackathons, Workshops, Badges,
 *  Awards, etc. — reuse `CertificationCard` with structured data.
 * ==========================================================================
 */

export type CertificationCategory =
  | "Java"
  | "Backend"
  | "Cloud"
  | "AI"
  | "Cybersecurity"
  | "Database"
  | "DevOps"
  | "Frontend"
  | "Other";

export type CertificationLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  /** ISO date, e.g. "2023-11" or "2023-11-15". Drives sorting + timeline. */
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  category: CertificationCategory;
  level?: CertificationLevel;
  skills: string[];
  /** Issuer logo path in /public. Empty string → initials fallback. */
  logo: string;
  thumbnail?: string;
  /** Path in /public/certificates. Undefined until the PDF is added. */
  certificatePdf?: string;
  featured: boolean;
  verified: boolean;
}

export const certifications: Certification[] = [
  {
    id: "gfg-ai-tools",
    title: "AI Tools Certification",
    issuer: "GeeksforGeeks",
    issueDate: "2024",
    category: "AI",
    level: "Beginner",
    skills: ["AI Tools", "Prompt Engineering", "Productivity"],
    logo: "",
    // certificatePdf: "/certificates/gfg-ai-tools.pdf", // ← uncomment once the PDF is added
    featured: true,
    verified: true,
  },
  {
    id: "tata-cybersecurity",
    title: "Cybersecurity Analyst Virtual Experience Program",
    issuer: "Tata (Forage)",
    issueDate: "2024-05",
    category: "Cybersecurity",
    level: "Beginner",
    skills: ["Threat Detection", "Incident Response", "Risk Assessment"],
    logo: "",
    // certificatePdf: "/certificates/tata-cybersecurity.pdf", // ← uncomment once the PDF is added
    featured: true,
    verified: true,
  },
];