export interface Repo {
  name: string;
  description: string;
  language: string;
  tags: string[];
  url: string;
  pinned?: boolean;
}

export interface ActivityItem {
  action: string;
  repo: string;
  when: string;
}

/**
 * GitHub data is driven from here (no live API keys) for speed and reliability.
 * Swap to the GitHub API later if desired — the UI stays the same.
 */
export const pinnedRepos: Repo[] = [
  {
    name: "garage-erp",
    description: "Full-stack ERP for automobile service garages — Spring Boot + MySQL.",
    language: "Java",
    tags: ["Spring Boot", "MySQL", "REST"],
    url: "https://github.com/atharvmitkari/garage-erp",
    pinned: true,
  },
  {
    name: "gfg-clone",
    description: "Responsive clone of a technical learning portal.",
    language: "JavaScript",
    tags: ["HTML", "CSS", "JS"],
    url: "https://github.com/atharvmitkari/gfg-clone",
    pinned: true,
  },
  {
    name: "todo-app",
    description: "Task manager with persistent state and filtering.",
    language: "JavaScript",
    tags: ["Vanilla JS", "localStorage"],
    url: "https://github.com/atharvmitkari/todo-app",
    pinned: true,
  },
  {
    name: "adk-experiments",
    description: "Learning experiments with the Google Agent Development Kit.",
    language: "Python",
    tags: ["Google ADK", "LLM"],
    url: "https://github.com/atharvmitkari",
    pinned: true,
  },
];

export const recentActivity: ActivityItem[] = [
  { action: "Pushed commits to", repo: "garage-erp", when: "this week" },
  { action: "Opened an issue in", repo: "garage-erp", when: "this week" },
  { action: "Created", repo: "adk-experiments", when: "recently" },
  { action: "Updated README in", repo: "gfg-clone", when: "recently" },
];

/** 7x approx contribution intensity grid (0–4), rendered as CSS squares. */
export const contributionGrid: number[][] = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 26 }, (_, col) => {
    const seed = (row * 7 + col * 3) % 11;
    return seed > 8 ? 4 : seed > 6 ? 3 : seed > 4 ? 2 : seed > 2 ? 1 : 0;
  }),
);