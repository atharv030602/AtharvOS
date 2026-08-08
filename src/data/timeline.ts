export interface TimelineEntry {
  period: string;
  title: string;
  org?: string;
  description: string;
  kind: "education" | "experience" | "milestone";
}

/** The story, in order — sourced from resume. */
export const timeline: TimelineEntry[] = [
  {
    period: "2017 — 2018",
    title: "SSC — Secondary School Certificate",
    org: "Saraswati Vidyalaya, Nagpur",
    description: "Scored 85.40% — where my interest in computers began.",
    kind: "education",
  },
  {
    period: "2019 — 2020",
    title: "HSC — Higher Secondary Certificate",
    org: "Kids Mentor Global",
    description: "Scored 60.15%.",
    kind: "education",
  },
  {
    period: "2020 — 2023",
    title: "BCA — Bachelor of Computer Applications",
    org: "City Premier College, Nagpur",
    description:
      "Built programming foundations: OOP, databases and web basics (CGPA 7.30).",
    kind: "education",
  },
  {
    period: "May 2024",
    title: "Cybersecurity Analyst Virtual Experience",
    org: "Tata (Forage)",
    description:
      "Simulated threat detection, incident response and risk assessment; recommended mitigation strategies.",
    kind: "experience",
  },
  {
    period: "2024 — Present",
    title: "Garage ERP System",
    org: "Personal Project",
    description:
      "Building a modular React ERP for automobile garages, architected for a Spring Boot backend.",
    kind: "milestone",
  },
  {
    period: "2024 — 2026",
    title: "MCA — Master of Computer Applications",
    org: "Ramdeobaba University, Nagpur",
    description:
      "Deepening backend engineering, DSA and software design while shipping projects (CGPA 7.33).",
    kind: "education",
  },
  {
    period: "Dec 2025 — Jun 2026",
    title: "Web Development Intern",
    org: "Solnet.co.in",
    description:
      "Maintained and updated live client websites — UI enhancements, content updates and bug fixes — and helped with testing and deployment.",
    kind: "experience",
  },
  {
    period: "2026",
    title: "ResumeFit AI — shipped and deployed",
    org: "Personal Project",
    description:
      "Built a resume-to-job-description fit analyzer; after three AI providers hit quota, billing and network walls in a row, rebuilt the matching engine as a free, local, deterministic system and shipped it live on Render + Streamlit Community Cloud.",
    kind: "milestone",
  },
  {
    period: "Now",
    title: "Exploring Agentic AI + seeking Software Engineering roles",
    org: "Self-directed",
    description:
      "Studying Spring Boot, Google ADK and LangChain while staying rooted in Java backend engineering. Open to software and backend roles.",
    kind: "milestone",
  },
];
