export type RadarRing = "Adopt" | "Trial" | "Assess" | "Hold";

export interface RadarEntry {
  name: string;
  ring: RadarRing;
}

export const radarRings: { ring: RadarRing; blurb: string }[] = [
  { ring: "Adopt", blurb: "Confident, using in real work" },
  { ring: "Trial", blurb: "Actively learning on projects" },
  { ring: "Assess", blurb: "Researching, forming a view" },
  { ring: "Hold", blurb: "Aware of, not prioritizing now" },
];

/** Honest snapshot of my current technical direction. */
export const techRadar: RadarEntry[] = [
  { name: "Java", ring: "Adopt" },
  { name: "Spring Boot", ring: "Adopt" },
  { name: "MySQL", ring: "Adopt" },
  { name: "Git", ring: "Adopt" },
  { name: "REST APIs", ring: "Adopt" },
  { name: "Python", ring: "Trial" },
  { name: "Agentic AI", ring: "Trial" },
  { name: "Google ADK", ring: "Trial" },
  { name: "LangChain", ring: "Trial" },
  { name: "Docker", ring: "Assess" },
  { name: "Model Context Protocol", ring: "Assess" },
  { name: "Multi-Agent Systems", ring: "Assess" },
  { name: "Oracle Cloud", ring: "Assess" },
  { name: "Kubernetes", ring: "Hold" },
  { name: "GraphQL", ring: "Hold" },
];
