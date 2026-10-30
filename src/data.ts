// All site content lives here. Edit this file to update the portfolio —
// no component changes needed.

export const profile = {
  name: "Atharv Mitkari",
  role: "Backend & GenAI Developer",
  pitch:
    "I build reliable backend APIs in Java and Python, and ship LLM apps with LangGraph and LangChain — tested, deployed and designed to keep working when the AI provider doesn't.",
  location: "Nagpur, India",
  availability: "Open to Backend, Software and GenAI engineering roles",
  email: "atharvmitkari90@gmail.com",
  github: "https://github.com/atharv030602",
  linkedin: "https://www.linkedin.com/in/atharvmitkari/",
  resume: "/Atharv%20Resume.pdf",
  portrait: "/portrait.webp",
};

export interface CaseStudy {
  problem: string;
  how: string[];
  challenges: string[];
  learned: string[];
}

export interface Project {
  id: string;
  name: string;
  kind: string;
  summary: string;
  highlights: string[];
  stack: string[];
  status: "Live" | "In progress";
  statusNote?: string;
  demo?: string;
  github?: string;
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    id: "career-assistant",
    name: "Multi-Agent Career Assistant",
    kind: "GenAI · Multi-agent",
    summary:
      "Five LangGraph agents turn a resume and a target role into a plan — resume review, skill gaps, a learning roadmap and an interview kit — pausing for your approval at each checkpoint.",
    highlights: [
      "LangGraph state machine with 2 human-in-the-loop checkpoints",
      "Understands real job titles like “Java Developer” or “SDE-1”",
      "52 tests, an evaluation harness and GitHub Actions CI",
    ],
    stack: ["Python", "LangGraph", "FastAPI", "Streamlit", "OpenRouter"],
    status: "Live",
    demo: "https://career-assistant-aramcbluxmynoo3vtvrkvj.streamlit.app/",
    github: "https://github.com/atharv030602/Career-Assistant",
    caseStudy: {
      problem:
        "Generic career advice ignores the target role and the actual resume, and a single LLM prompt gives fluent but unverifiable answers. I wanted a pipeline where every step is inspectable, testable and approved by the user before the next one runs.",
      how: [
        "Flow: intake → resume review → skill gap → (job match if fit is low) → checkpoint → learning roadmap → checkpoint → interview prep → report.",
        "Agents share one typed state; LangGraph's checkpointer stores each session so the graph can pause and resume through the API.",
        "Every agent runs deterministic logic first; the LLM only enriches the result, so a provider outage never breaks a run.",
        "An evaluation harness scores each run on skill-gap precision/recall, roadmap coverage and interview coverage.",
      ],
      challenges: [
        "“Backend Developer” matched no role in the catalog, so the fit score silently dropped to 0. Fixed with title normalisation and an alias table, plus regression tests for 14 real titles.",
        "CI/CD showed as missing on a resume that said “GitHub Actions CI pipeline”. Added wording synonyms and implied skills (RAG → embeddings).",
        "The interview agent asked “walk me through a project with X” for skills the candidate didn't have. Rebuilt it to ask about strengths and teach the gaps.",
        "Free hosting restarts wiped in-memory sessions and users saw a raw 404. The UI now detects it and restarts with their input kept.",
      ],
      learned: [
        "Running a realistic resume end to end found bugs unit tests missed.",
        "Deterministic logic as the backbone makes an agent system cheap, testable and resilient.",
      ],
    },
  },
  {
    id: "resumefit",
    name: "ResumeFit AI 2.0",
    kind: "GenAI · RAG",
    summary:
      "Scores a resume against a job description — keyword and semantic fit, an ATS breakdown and AI suggestions — with a RAG chat that answers questions about your resume, with citations.",
    highlights: [
      "LangChain tool-calling agent with 4 tools",
      "RAG chat with conversation memory and citations",
      "Works with zero API keys — every AI path has a fallback",
    ],
    stack: ["Python", "FastAPI", "LangChain", "Streamlit", "OpenRouter"],
    status: "Live",
    demo: "https://resume-analyzer-kbkdlrcig9ditbofwvqzbp.streamlit.app/",
    github: "https://github.com/atharv030602/Resume-Analyzer",
    caseStudy: {
      problem:
        "Resume advice rarely looks at the specific job description, and AI-only tools fail completely when the provider is down or out of quota. The goal: useful offline, smarter online.",
      how: [
        "One module owns the LLM provider, so Gemini, OpenAI or OpenRouter can be swapped by config.",
        "A tool-calling agent uses keyword extraction, skill gap, semantic match and ATS score tools — and calls them directly when no LLM is available.",
        "The ATS score combines keyword coverage, semantic similarity, formatting and impact language, with pass/fail checks.",
        "The chat splits the resume and JD into chunks, stores them in a vector store and answers with citations and per-session memory.",
      ],
      challenges: [
        "Version 1 hit three provider walls in a row (no free quota, a billing wall, a blocked network). That made “no single provider dependency” a design rule for 2.0.",
        "A regex bug silently broke every multi-word skill like “Spring Boot”; caught by testing a pair with a known answer.",
        "The production deploy failed because the container used a hardcoded port instead of the one Render assigns.",
      ],
      learned: [
        "Design for the provider being down: a fallback turns an outage into a slightly less smart answer, not an error.",
        "Free hosting has real limits — sleep, memory, ephemeral disk — so plan the deploy around them.",
      ],
    },
  },
  {
    id: "sunny",
    name: "Sunny Game Cafe",
    kind: "Full-stack · Booking",
    summary:
      "A booking and management platform for a gaming cafe: live station availability, slot booking and an admin dashboard for staff.",
    highlights: [
      "Spring Boot 3 API with JWT security, JPA and Flyway migrations",
      "Real-time updates over WebSockets",
      "React + TypeScript front end",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "React", "TypeScript"],
    status: "In progress",
    statusNote: "Front end is live; the booking API is not deployed yet.",
    demo: "https://sunny-game-hub.vercel.app/",
    github: "https://github.com/atharv030602/sunny-game-hub",
    caseStudy: {
      problem:
        "Small gaming cafes take bookings over phone and WhatsApp, which leads to double-booked stations and no record of usage. The cafe needed online booking and a simple dashboard for staff.",
      how: [
        "Layered Spring Boot backend (controller → service → repository) with modules for booking, availability, pricing, stations and auth.",
        "MySQL schema managed with Flyway migrations; JWT-based authentication with Spring Security.",
        "WebSocket events push station status changes to open dashboards.",
        "React + TypeScript front end with booking flow and admin views; OpenAPI docs for the API.",
      ],
      challenges: [
        "Preventing double bookings when two people pick the same slot at the same time.",
        "Keeping the front end usable with an offline content fallback while the API is not yet deployed.",
      ],
      learned: [
        "Modelling time slots and availability is the hard part of a booking system, not the UI.",
      ],
    },
  },
  {
    id: "garage-erp",
    name: "Garage ERP",
    kind: "Front end · Business app",
    summary:
      "An ERP for automobile service garages — customers, vehicles, job cards, inventory, billing, insurance and service history in one place.",
    highlights: [
      "9 modules with dashboards and revenue charts",
      "Invoice generation and payment tracking",
      "Built to plug into a Spring Boot + MySQL backend",
    ],
    stack: ["React", "JavaScript", "Vite", "CSS"],
    status: "Live",
    statusNote: "Front-end prototype; data is saved in your browser.",
    demo: "https://garage-erp-topaz.vercel.app/",
    github: "https://github.com/atharv030602/garage-erp",
    caseStudy: {
      problem:
        "Small garages track customers, vehicles and repairs in notebooks and spreadsheets, so service history and payments get lost.",
      how: [
        "Feature modules for customers, vehicles, services, inventory, billing, licences and insurance.",
        "Data and presentation are kept separate so a REST backend can replace browser storage without reworking the UI.",
        "Dashboard cards and charts summarise revenue, pending services and low-stock parts.",
      ],
      challenges: [
        "Keeping 9 modules consistent — shared form and table components instead of copy-paste.",
        "Cleaning up 19 lint errors and warnings before treating it as production-quality code.",
      ],
      learned: ["Designing the data model first makes adding a backend later much easier."],
    },
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Java", "Python", "SQL", "JavaScript", "TypeScript"] },
  {
    group: "Backend",
    items: ["Spring Boot", "Hibernate / JPA", "FastAPI", "REST APIs", "Microservices"],
  },
  {
    group: "GenAI",
    items: ["LangGraph", "LangChain", "RAG", "Tool calling", "Prompt engineering", "LLM evaluation"],
  },
  { group: "Data", items: ["MySQL", "PostgreSQL", "Vector stores", "Power BI"] },
  { group: "Frontend", items: ["React", "Streamlit", "HTML / CSS"] },
  {
    group: "Engineering",
    items: ["Git & GitHub", "Docker", "GitHub Actions CI", "pytest", "Postman", "Render / Vercel"],
  },
];

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  detail: string;
}

export const experience: TimelineItem[] = [
  {
    period: "Dec 2025 — Jun 2026",
    title: "Web Development Intern",
    org: "Solnet.co.in",
    detail:
      "Maintained live client websites — UI updates, feature changes and bug fixes — and supported testing and deployment.",
  },
  {
    period: "2024",
    title: "Cybersecurity Analyst — Job Simulation",
    org: "Tata (Forage)",
    detail: "Threat detection, incident response and risk assessment exercises.",
  },
];

export const education: TimelineItem[] = [
  {
    period: "2024 — 2026",
    title: "MCA — Master of Computer Applications",
    org: "Ramdeobaba University, Nagpur",
    detail: "Specialisation in AI/ML. Research paper on NLP-based complaint classification.",
  },
  {
    period: "2020 — 2023",
    title: "BCA — Bachelor of Computer Applications",
    org: "City Premier College, Nagpur",
    detail: "Programming foundations: OOP, databases and web development.",
  },
];

export const certifications: { title: string; issuer: string; file?: string; url?: string }[] = [
  {
    title: "HackerRank Orchestrate — built and deployed an AI agent",
    issuer: "HackerRank · Oct 2026 · Final rank #1767 of 4,094",
    file: "/certificates/hackerrank-orchestrate-oct-2026.png",
  },
  {
    title: "Google Project Management",
    issuer: "Google · Coursera",
    url: "https://coursera.org/verify/professional-cert/KXL5L8AQ4PBS",
    file: "/certificates/google-project-management.pdf",
  },
  {
    title: "Web Development Internship",
    issuer: "Solnet",
    file: "/certificates/solnet-web-dev-internship.pdf",
  },
  { title: "AI Tools Skill Up", issuer: "GeeksforGeeks", file: "/certificates/gfg-ai-tools.pdf" },
];
