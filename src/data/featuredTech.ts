export interface FeaturedTech {
  name: string;
  note: string;
}

/** Primary stack only — everything else lives in Skills. */
export const featuredTech: FeaturedTech[] = [
  { name: "Java", note: "Primary language" },
  { name: "Spring Boot", note: "Backend framework" },
  { name: "MySQL", note: "Relational database" },
  { name: "React", note: "Frontend" },
  { name: "Git", note: "Version control" },
  { name: "Python", note: "Scripting & AI" },
];