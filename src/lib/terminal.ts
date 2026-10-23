import { siteConfig, resumeMeta } from "@/config/site";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { sortCertifications, formatCertDate } from "@/lib/certifications";

export interface TerminalResult {
  lines: string[];
  /** Optional external navigation triggered by the command. */
  open?: string;
  navigate?: string;
  clear?: boolean;
}

export const terminalCommands = [
  "help",
  "whoami",
  "projects",
  "skills",
  "certs",
  "resume",
  "contact",
  "github",
  "linkedin",
  "clear",
] as const;

export function runCommand(raw: string): TerminalResult {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return { lines: [] };
    case "help":
      return {
        lines: [
          "Available commands:",
          "  help       Show this list",
          "  whoami     About Atharv",
          "  projects   List projects",
          "  skills     Core technologies",
          "  certs      List certifications",
          "  resume     Open resume",
          "  contact    Go to contact page",
          "  github     Open GitHub profile",
          "  linkedin   Open LinkedIn profile",
          "  clear      Clear the screen",
        ],
      };
    case "whoami":
      return {
        lines: [
          `${siteConfig.owner} — ${siteConfig.role}`,
          `${siteConfig.specialty}, exploring Agentic AI.`,
          siteConfig.heroHeadline,
        ],
      };
    case "projects":
      return { lines: projects.map((p) => `  ${p.slug.padEnd(20)} ${p.name} — ${p.status}`) };
    case "skills":
      return {
        lines: skillGroups.flatMap((g) => [
          `${g.title}:`,
          ...g.categories.map((c) => `  ${c.label}: ${c.items.join(", ")}`),
        ]),
      };
    case "certs":
    case "certifications":
      return {
        lines: sortCertifications(certifications, "newest").map(
          (c) => `  ${formatCertDate(c.issueDate).padEnd(10)} ${c.title} — ${c.issuer}`,
        ),
      };
    case "resume":
      return { lines: ["Opening resume..."], navigate: "/resume" };
    case "download resume":
      return { lines: ["Downloading resume..."], open: resumeMeta.file };
    case "contact":
      return { lines: ["Navigating to contact..."], navigate: "/contact" };
    case "github":
      return { lines: ["Opening GitHub..."], open: siteConfig.social.github };
    case "linkedin":
      return { lines: ["Opening LinkedIn..."], open: siteConfig.social.linkedin };
    case "clear":
      return { lines: [], clear: true };
    default:
      return { lines: [`command not found: ${cmd}. Type 'help'.`] };
  }
}
