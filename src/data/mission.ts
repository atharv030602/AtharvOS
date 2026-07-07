import type { Status } from "./status";

export interface MissionItem {
  title: string;
  status: Status;
  note: string;
}

/** Current Mission dashboard — status badges, not percentage bars. */
export const mission: MissionItem[] = [
  { title: "Garage ERP Backend", status: "Building", note: "Layered Spring Boot APIs + MySQL" },
  { title: "Spring Boot Mastery", status: "Building", note: "REST, JPA, transactions, security" },
  { title: "Oracle Java Certification", status: "Learning", note: "Core Java, OOP, collections" },
  { title: "Data Structures & Algorithms", status: "Learning", note: "Problem solving in Java" },
  { title: "Google ADK", status: "Learning", note: "Agent Development Kit fundamentals" },
  { title: "LangChain", status: "Learning", note: "LLM orchestration basics" },
  { title: "Model Context Protocol (MCP)", status: "Exploring", note: "Tool/context standard for agents" },
  { title: "Multi-Agent Systems", status: "Exploring", note: "Coordination patterns" },
  { title: "Docker", status: "Exploring", note: "Containerizing the backend" },
  { title: "Oracle Cloud", status: "Exploring", note: "Deployment target" },
  { title: "Java Foundations", status: "Completed", note: "OOP, core APIs, JDBC" },
  { title: "SQL & MySQL", status: "Completed", note: "Schema design, joins, transactions" },
];