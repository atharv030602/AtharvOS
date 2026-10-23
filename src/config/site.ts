/**
 * Central site configuration.
 *
 * Swap real links, resume, and portrait here — no component edits required.
 * Values marked PLACEHOLDER should be updated with Atharv's real details.
 */
export interface SocialLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "AtharvOS",
  owner: "Atharv Mitkari",
  role: "Software Engineer",
  specialty: "Backend & GenAI Developer",
  tagline: "Code. Build. Evolve.",
  title: "AtharvOS | Backend & GenAI Developer",
  description:
    "Atharv Mitkari — Software Engineer building Java/Spring Boot and Python/FastAPI backends, and shipping LangGraph and LangChain apps.",
  heroHeadline:
    "Building scalable backend systems today. Exploring intelligent AI systems for tomorrow.",
  location: "Nagpur, Maharashtra, India",
  email: "atharvmitkari90@gmail.com",
  // Real profile links
  social: {
    github: "https://github.com/atharv030602",
    linkedin: "https://www.linkedin.com/in/atharvmitkari/",
  },
  // Drop your files into /public and keep these paths
  resumeUrl: "/resume.pdf",
  portraitUrl: "/portrait.png", // transparent cutout on the dark theme
} as const;

/**
 * Resume metadata — single source of truth for the Resume page and every
 * "Resume" button across the site.
 *
 * Future updates require ONLY:
 *   1. Replace public/resume.pdf with the new file.
 *   2. Bump `version` / `lastUpdated` below.
 */
export interface ResumeMetadata {
  version: string;
  lastUpdated: string;
  /** Public path — file lives in /public and is directly reachable at this URL. */
  file: string;
}

export const resumeMeta: ResumeMetadata = {
  version: "v1.1",
  lastUpdated: "August 2026",
  file: "/resume.pdf",
};

/** Rotating hero subtitles (fade + slide, ~3.5s each). */
export const heroRoles: string[] = [
  "Software Engineer",
  "Java Backend Developer",
  "Building with Spring Boot",
  "Shipping LangGraph multi-agent apps",
];
