export interface SkillGroup {
  title: string;
  description: string;
  categories: { label: string; items: string[] }[];
}

/**
 * Honest grouping. No "Expert / Advanced / Experienced" labels.
 * Core = used in real projects. Learning / Exploring = in progress.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Core Technologies",
    description: "Tools I use to build real projects today.",
    categories: [
      { label: "Languages", items: ["Java", "Python", "SQL", "JavaScript", "HTML", "CSS"] },
      { label: "Backend", items: ["Spring Boot", "FastAPI", "Hibernate", "JDBC", "JSP", "Servlets", "REST APIs"] },
      { label: "Frontend", items: ["React.js", "Streamlit"] },
      { label: "Database", items: ["MySQL"] },
      { label: "Tools", items: ["Git", "GitHub", "Maven", "VS Code"] },
      { label: "Concepts", items: ["OOP", "Collections Framework", "Exception Handling", "MVC Architecture", "REST APIs", "DSA"] },
    ],
  },
  {
    title: "Currently Learning",
    description: "Actively studying and practicing.",
    categories: [
      { label: "Certification", items: ["Oracle Java"] },
      { label: "AI", items: ["Google ADK", "LangChain", "Prompt Engineering"] },
    ],
  },
  {
    title: "Exploring",
    description: "Reading, experimenting, forming an opinion.",
    categories: [
      { label: "Cloud & DevOps", items: ["Docker", "Oracle Cloud"] },
      { label: "Agentic AI", items: ["Model Context Protocol (MCP)", "Multi-Agent Systems", "LLM APIs"] },
    ],
  },
];
