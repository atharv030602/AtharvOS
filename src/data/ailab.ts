import type { Status } from "./status";

export interface NotebookEntry {
  title: string;
  status: Status;
  summary: string;
  tags: string[];
}

export interface NotebookSection {
  id: string;
  title: string;
  intro: string;
  entries: NotebookEntry[];
}

/**
 * AI Lab = an engineering notebook, not an AI showcase.
 * Entries are honest experiments and learning notes.
 */
export const aiLab: NotebookSection[] = [
  {
    id: "research-notes",
    title: "Research Notes",
    intro: "Concepts I'm studying as I move from backend engineering toward agentic systems.",
    entries: [
      {
        title: "What is Agentic AI?",
        status: "Learning",
        summary:
          "Notes on how agents plan, use tools and loop — versus a single LLM call. Building intuition for when agents help.",
        tags: ["Agents", "LLM"],
      },
      {
        title: "Model Context Protocol (MCP)",
        status: "Exploring",
        summary:
          "Reading the spec on how MCP standardizes tools and context for agents. Understanding client/server roles.",
        tags: ["MCP", "Tooling"],
      },
    ],
  },
  {
    id: "experiments",
    title: "Experiments",
    intro: "Small, throwaway experiments to learn the tools — not production systems.",
    entries: [
      {
        title: "First Google ADK Agent",
        status: "Building",
        summary:
          "Wiring a minimal agent with the Google Agent Development Kit to understand the core loop and tool calls.",
        tags: ["Google ADK", "Python"],
      },
      {
        title: "LangChain Prompt Pipeline",
        status: "Learning",
        summary:
          "Chaining prompts and parsing structured output with LangChain to learn orchestration patterns.",
        tags: ["LangChain", "Prompts"],
      },
    ],
  },
  {
    id: "mini-projects",
    title: "Mini Projects",
    intro: "Slightly larger learning builds. Marked Coming Soon until they actually work.",
    entries: [
      {
        title: "AI Resume Analyzer",
        status: "Coming Soon",
        summary: "An LLM-assisted tool to give structured resume feedback against a job description.",
        tags: ["LLM APIs", "Python"],
      },
      {
        title: "PDF Chat",
        status: "Coming Soon",
        summary: "Question-answering over a PDF using embeddings and retrieval.",
        tags: ["RAG", "Embeddings"],
      },
      {
        title: "Code Reviewer",
        status: "Coming Soon",
        summary: "An experiment giving structured review comments on small code snippets.",
        tags: ["LLM", "Tooling"],
      },
    ],
  },
  {
    id: "learning-journal",
    title: "Learning Journal",
    intro: "Short, dated reflections on what clicked and what didn't.",
    entries: [
      {
        title: "Prompt engineering is real engineering",
        status: "Learning",
        summary:
          "Realized structured output needs clear schemas and examples — sloppy prompts give sloppy results.",
        tags: ["Prompts"],
      },
      {
        title: "Backend skills transfer to agents",
        status: "Learning",
        summary:
          "APIs, state and error handling from Spring Boot map directly onto building reliable agent tools.",
        tags: ["Reflection"],
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    intro: "Docs and references I'm learning from.",
    entries: [
      { title: "Google ADK Documentation", status: "Learning", summary: "Primary reference for agent building.", tags: ["Docs"] },
      { title: "LangChain Docs", status: "Learning", summary: "Orchestration patterns and integrations.", tags: ["Docs"] },
      { title: "MCP Specification", status: "Exploring", summary: "The protocol for tools and context.", tags: ["Spec"] },
    ],
  },
  {
    id: "future-ideas",
    title: "Future Ideas",
    intro: "Things I want to try once the fundamentals are solid.",
    entries: [
      { title: "Multi-agent task planner", status: "Planned", summary: "Coordinating multiple agents on a shared goal.", tags: ["Multi-Agent"] },
      { title: "Agent for Garage ERP", status: "Planned", summary: "An assistant that answers questions over garage data.", tags: ["MCP", "Java"] },
    ],
  },
];