import type { Status } from "./status";

export interface RoadmapItem {
  title: string;
  status: Status;
  detail: string;
}

export interface LearningResource {
  title: string;
  type: "Course" | "Book" | "Docs";
  source: string;
}

export const roadmap: RoadmapItem[] = [
  {
    title: "Core Java & OOP",
    status: "Completed",
    detail: "Language fundamentals, collections, streams",
  },
  { title: "SQL & MySQL", status: "Completed", detail: "Schema design, joins, transactions" },
  {
    title: "Spring Boot & REST",
    status: "Building",
    detail: "Controllers, services, JPA, security",
  },
  {
    title: "Data Structures & Algorithms",
    status: "Learning",
    detail: "Problem solving for interviews",
  },
  { title: "Oracle Java Certification", status: "Learning", detail: "Exam preparation" },
  { title: "Agentic AI — Google ADK", status: "Learning", detail: "Agent fundamentals" },
  { title: "LangChain", status: "Learning", detail: "LLM orchestration" },
  { title: "MCP & Multi-Agent Systems", status: "Exploring", detail: "Emerging agent standards" },
  { title: "Docker & Oracle Cloud", status: "Exploring", detail: "Deployment & DevOps" },
];

export const learningResources: LearningResource[] = [
  { title: "Oracle Java Documentation", type: "Docs", source: "Oracle" },
  { title: "Spring Boot Reference", type: "Docs", source: "Spring" },
  { title: "Effective Java", type: "Book", source: "Joshua Bloch" },
  { title: "DSA with Java", type: "Course", source: "Self-paced" },
  { title: "LangChain Documentation", type: "Docs", source: "LangChain" },
  { title: "Google ADK Guides", type: "Docs", source: "Google" },
];
