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
    id: "java-spring-boot-case-study",
    title: "Java Spring Boot Case Study - Appointment Management System",
    issuer: "EDUCBA",
    issueDate: "2026-04",
    credentialId: "H84RU6XMAA2Y",
    category: "Java",
    level: "Intermediate",
    skills: ["Spring Boot", "Java", "REST APIs"],
    logo: "",
    // certificatePdf: "/certificates/java-spring-boot-case-study.pdf", // ← uncomment once the PDF is added
    featured: true,
    verified: true,
  },
  {
    id: "deloitte-cyber-job-simulation",
    title: "Deloitte Cyber Job Simulation",
    issuer: "Deloitte Australia (Forage)",
    issueDate: "2026-04",
    credentialId: "H1YgFeEtFc74proauJM",
    category: "Cybersecurity",
    level: "Beginner",
    skills: ["Threat Intelligence", "Cybersecurity Fundamentals"],
    logo: "",
    // certificatePdf: "/certificates/deloitte-cyber-job-simulation.pdf", // ← uncomment once the PDF is added
    featured: false,
    verified: true,
  },
  {
    id: "ibm-generative-ai-software-developers",
    title: "Generative AI for Software Developers",
    issuer: "IBM (Coursera)",
    issueDate: "2025-11",
    credentialId: "HASQ9K11T0RZ",
    category: "AI",
    level: "Intermediate",
    skills: ["Generative AI", "LLMs", "Software Development"],
    logo: "",
    // certificatePdf: "/certificates/ibm-generative-ai-software-developers.pdf", // ← uncomment once the PDF is added
    featured: true,
    verified: true,
  },
  {
    id: "tata-cybersecurity",
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata (Forage)",
    issueDate: "2025-08",
    expiryDate: "2035-11",
    credentialId: "8CAQ9GPYVQ3PsK6EZ",
    category: "Cybersecurity",
    level: "Beginner",
    skills: ["Threat Detection", "Incident Response", "Risk Assessment"],
    logo: "",
    // certificatePdf: "/certificates/tata-cybersecurity.pdf", // ← uncomment once the PDF is added
    featured: true,
    verified: true,
  },
  {
    id: "google-project-management",
    title: "Google Project Management",
    issuer: "United Latino Students Association",
    issueDate: "2025-05",
    category: "Other",
    level: "Beginner",
    skills: ["Project Planning", "Agile", "Stakeholder Communication"],
    logo: "",
    // certificatePdf: "/certificates/google-project-management.pdf", // ← uncomment once the PDF is added
    featured: false,
    verified: true,
  },
  {
    id: "ux-foundations",
    title: "Foundations of User Experience (UX) Design",
    issuer: "United Latino Students Association",
    issueDate: "2025-02",
    category: "Other",
    level: "Beginner",
    skills: ["UX Design", "User Research"],
    logo: "",
    // certificatePdf: "/certificates/ux-foundations.pdf", // ← uncomment once the PDF is added
    featured: false,
    verified: true,
  },
  {
    id: "ux-start-process",
    title: "Start the UX Design Process: Empathize, Define, and Ideate",
    issuer: "United Latino Students Association",
    issueDate: "2025-02",
    category: "Other",
    level: "Beginner",
    skills: ["UX Design", "Empathize", "Ideation"],
    logo: "",
    // certificatePdf: "/certificates/ux-start-process.pdf", // ← uncomment once the PDF is added
    featured: false,
    verified: true,
  },
];
