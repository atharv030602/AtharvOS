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
  specialty: "Java Backend Developer",
  tagline: "Code. Build. Evolve.",
  title: "AtharvOS | Java Backend Developer",
  description:
    "Atharv Mitkari — Software Engineer specializing in Java backend development with Spring Boot, REST APIs and MySQL, actively exploring Agentic AI.",
  heroHeadline: "Building scalable backend systems today. Exploring intelligent AI systems for tomorrow.",
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
  version: "v1.0",
  lastUpdated: "July 2026",
  file: "/resume.pdf",
};

/** Rotating hero subtitles (fade + slide, ~3.5s each). */
export const heroRoles: string[] = [
  "Software Engineer",
  "Java Backend Developer",
  "Building with Spring Boot",
  "Exploring Agentic AI",
];