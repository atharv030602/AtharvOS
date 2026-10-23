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
    name: "Career-Assistant",
    description: "LangGraph multi-agent career planner with human-in-the-loop checkpoints.",
    language: "Python",
    tags: ["LangGraph", "FastAPI", "Streamlit"],
    url: "https://github.com/atharv030602/Career-Assistant",
    pinned: true,
  },
  {
    name: "Resume-Analyzer",
    description: "ResumeFit AI 2.0 — ATS scoring, tool-calling agent and RAG chat over a resume.",
    language: "Python",
    tags: ["FastAPI", "LangChain", "RAG"],
    url: "https://github.com/atharv030602/Resume-Analyzer",
    pinned: true,
  },
  {
    name: "sunny-game-hub",
    description: "Booking and management platform for a game cafe — React + Spring Boot.",
    language: "TypeScript",
    tags: ["React", "Spring Boot", "MySQL"],
    url: "https://github.com/atharv030602/sunny-game-hub",
    pinned: true,
  },
  {
    name: "garage-erp",
    description: "ERP for automobile service garages — customers, job cards, inventory, billing.",
    language: "JavaScript",
    tags: ["React", "Vite", "Dashboards"],
    url: "https://github.com/atharv030602/garage-erp",
    pinned: true,
  },
];

export const recentActivity: ActivityItem[] = [
  { action: "Pushed fixes to", repo: "Career-Assistant", when: "this week" },
  { action: "Redeployed", repo: "Resume-Analyzer", when: "this week" },
  { action: "Pushed commits to", repo: "sunny-game-hub", when: "recently" },
  { action: "Pushed commits to", repo: "garage-erp", when: "recently" },
];

/** 7x approx contribution intensity grid (0–4), rendered as CSS squares. */
export const contributionGrid: number[][] = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 26 }, (_, col) => {
    const seed = (row * 7 + col * 3) % 11;
    return seed > 8 ? 4 : seed > 6 ? 3 : seed > 4 ? 2 : seed > 2 ? 1 : 0;
  }),
);
