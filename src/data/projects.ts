import type { Status } from "./status";

export interface TechStackPanel {
  languages: string[];
  frameworks: string[];
  database: string[];
  architecture: string[];
  authentication: string[];
  deployment: string[];
  tools: string[];
}

export interface DiagramNode {
  label: string;
  detail?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: Status;
  featured?: boolean;
  year: string;
  summaryLine: string;
  tags: string[];
  links: {
    github?: string;
    demo?: string;
  };
  overview: string;
  whyBuilt: string;
  targetUsers: string;
  problemStatement: string;
  outcome: string;
  techStack: TechStackPanel;
  architecture: string[];
  moduleDiagram: DiagramNode[];
  databaseDesign: { table: string; fields: string[] }[];
  erDiagram?: string;
  folderStructure: string;
  screenshots: { src: string; caption: string }[];
  features: string[];
  challenges: string[];
  lessonsLearned: string[];
  whatIdImprove: string[];
  tradeoffs: string[];
  futureRoadmap: string[];
}

export const projects: Project[] = [
  {
    slug: "career-assistant",
    name: "Multi-Agent Career Assistant",
    tagline:
      "A LangGraph app where 5 AI agents turn a resume into a plan — with you approving each step",
    status: "Completed",
    featured: true,
    year: "2026",
    summaryLine:
      "Five LangGraph agents review a resume, find skill gaps for a target role, build a learning roadmap and an interview kit — pausing at human-in-the-loop checkpoints. FastAPI + Streamlit, deployed live.",
    tags: ["LangGraph", "Multi-Agent", "Human-in-the-Loop", "FastAPI", "Streamlit", "Python"],
    links: {
      github: "https://github.com/atharv030602/Career-Assistant",
      demo: "https://career-assistant-aramcbluxmynoo3vtvrkvj.streamlit.app/",
    },
    overview:
      "A multi-agent career planner built on LangGraph. You paste a resume and a target role; five specialised agents work over a typed shared state — Resume Review, Skill Gap, Job Match, Learning Roadmap and Interview Prep. The graph pauses twice so you stay in control: once to approve the skill gaps and set your weekly hours, and once to pick interview focus topics. Every agent has deterministic logic, and an LLM (served through OpenRouter) enriches the output when a key is configured — so the app always works, with or without AI.",
    whyBuilt:
      "To go beyond single-prompt LLM demos and learn the parts of agentic engineering that matter in real products: explicit state, branching control flow, human approval steps, resumable sessions, and measuring whether agents actually do their job.",
    targetUsers:
      "Students and early-career engineers who want a concrete, role-specific plan — what to fix on the resume, what to learn, and what to prepare for interviews.",
    problemStatement:
      "Generic career advice ignores the target role and the candidate's actual resume. An LLM alone gives fluent but unverifiable advice. The goal was a structured pipeline where each step is inspectable, testable, and approved by the user before the next one runs.",
    outcome:
      "A live LangGraph application with 5 agents, 2 human-in-the-loop checkpoints and a downloadable report — deployed on Render (FastAPI backend) and Streamlit Community Cloud, backed by 52 automated tests, an evaluation harness and a GitHub Actions CI pipeline.",
    techStack: {
      languages: ["Python"],
      frameworks: ["LangGraph", "LangChain Core", "FastAPI", "Streamlit", "Pydantic"],
      database: ["LangGraph checkpointer (in-memory; SQLite optional)"],
      architecture: [
        "LangGraph state machine with conditional routing",
        "Human-in-the-loop via interrupt / resume",
        "Deterministic agents + optional LLM enrichment",
      ],
      authentication: [],
      deployment: ["Render (backend)", "Streamlit Community Cloud (frontend)", "Docker (local)"],
      tools: ["OpenRouter (LLM)", "pytest", "Ruff", "GitHub Actions", "LangSmith (optional)"],
    },
    architecture: [
      "intake → resume_review → skill_gap → (job_match only when fit < 55) → [checkpoint: approve gaps + pace] → learning_roadmap → [checkpoint: interview focus] → interview → synthesize.",
      "Agents share one typed state (Pydantic models); LangGraph's checkpointer stores each session by thread id so the graph can pause and resume via the API.",
      "FastAPI exposes start / status / resume / report endpoints; the Streamlit UI renders each checkpoint as a form and sends the user's feedback back to resume the graph.",
      "Each agent runs deterministic tools first (skill matcher, effort estimator, question bank, STAR scaffolder); the LLM only enriches results, so a provider outage never breaks a run.",
      "An evaluation harness scores every run on node coverage, skill-gap precision/recall, roadmap coverage and interview coverage.",
    ],
    moduleDiagram: [
      { label: "Resume Review", detail: "Strengths, red flags, stronger bullets" },
      { label: "Skill Gap", detail: "Role-aware matching with synonyms, weighted fit score" },
      { label: "Job Match", detail: "Suggests better-fit roles when fit is low" },
      { label: "Learning Roadmap", detail: "Phased plan from the gaps you approved, at your pace" },
      { label: "Interview Prep", detail: "Questions on your strengths and gaps + STAR scaffolds" },
    ],
    databaseDesign: [],
    folderStructure: `career-assistant/
├── backend/
│   ├── app/
│   │   ├── graph/
│   │   │   ├── build.py          # LangGraph wiring, routing, interrupts
│   │   │   ├── state.py          # Typed shared state
│   │   │   └── agents/           # resume_review, skill_gap, job_match, roadmap, interview
│   │   ├── services/             # role catalog, skill matching, sessions
│   │   ├── routers/              # /api/sessions, /api/health
│   │   └── main.py
│   ├── eval/                     # evaluation harness + dataset
│   └── tests/                    # pytest suite
├── frontend/app.py               # Streamlit UI with checkpoint forms
└── .github/workflows/ci.yml      # lint + tests on every push`,
    screenshots: [],
    features: [
      "5 specialised agents orchestrated as a LangGraph state machine",
      "2 human-in-the-loop checkpoints — approve skill gaps, set weekly hours, choose interview focus",
      "Understands real job titles ('Java Developer', 'SDE-1', 'ML Engineer') and maps them to role skill profiles",
      "Interview kit asks about your strengths and teaches your gaps — not generic template questions",
      "Works with no API key; an LLM via OpenRouter enriches the output when configured",
      "Downloadable markdown report of the full plan",
      "52 automated tests, an evaluation harness and GitHub Actions CI",
    ],
    challenges: [
      "Common titles like 'Backend Developer' matched no catalog role, so the fit score silently dropped to 0 — fixed with title normalisation and an alias table, and added regression tests for 14 real titles.",
      "The skill matcher flagged CI/CD as missing on a resume that said 'GitHub Actions CI pipeline', and Embeddings as missing next to RAG and FAISS — fixed with wording synonyms and implied skills (RAG → embeddings).",
      "The interview agent asked 'walk me through a project where you used X' for skills the candidate didn't have. Rebuilt it to ask experience questions on strengths and concept + learning questions on gaps.",
      "Sessions live in memory, so a free-tier server restart wiped them and users saw a raw 404 mid-flow — the UI now detects an expired session and restarts with the user's input kept.",
      "The LLM flagged past dates as 'in the future' because it doesn't know today's date — the prompt now includes it.",
    ],
    lessonsLearned: [
      "Testing agents with a realistic resume end to end finds bugs that unit tests miss — every fix above came from reading real output.",
      "Keeping deterministic logic as the backbone and using the LLM to enrich makes an agent system cheap, testable and resilient to provider outages.",
      "Human-in-the-loop needs durable state; in-memory checkpoints are fine for a demo but need a persistent store for real users.",
    ],
    whatIdImprove: [
      "Persist sessions in a database (Postgres/SQLite checkpointer) so they survive restarts.",
      "Accept a real job description as input, not only a role title.",
      "Add LLM-as-judge scoring to the evaluation harness for the free-text outputs.",
    ],
    tradeoffs: [
      "Chose a curated role catalog over LLM-extracted requirements — less flexible, but predictable, testable and free.",
      "In-memory checkpointer on free hosting: zero setup and cost, at the price of sessions expiring when the server sleeps.",
    ],
    futureRoadmap: [
      "Job-description input with automatic requirement extraction",
      "Persistent sessions and user history",
      "Resume PDF upload",
    ],
  },
  {
    slug: "resumefit-ai",
    name: "ResumeFit AI 2.0",
    tagline:
      "Resume-to-job fit analysis with ATS scoring, an AI agent and a RAG chat over your resume",
    status: "Completed",
    featured: false,
    year: "2026",
    summaryLine:
      "A FastAPI + LangChain service that scores a resume against a job description — keyword + semantic fit, an ATS breakdown, AI suggestions and a RAG chat with memory — and still works with no API key. Deployed on Render + Streamlit.",
    tags: ["FastAPI", "LangChain", "RAG", "Tool-calling Agent", "Streamlit", "Python"],
    links: {
      github: "https://github.com/atharv030602/Resume-Analyzer",
      demo: "https://resume-analyzer-kbkdlrcig9ditbofwvqzbp.streamlit.app/",
    },
    overview:
      "Paste or upload a resume (PDF/DOCX) and a job description to get a fit score, matched and missing skills, an ATS score breakdown (keyword coverage, semantic similarity, formatting, impact language), AI improvement suggestions and an optimized resume. A second tab is a RAG chat assistant with conversation memory that answers questions about your resume and the JD with citations. Version 1 was a purely local keyword engine; version 2 adds the AI layer on top — with every AI path falling back to the deterministic engine, so the service always answers.",
    whyBuilt:
      "Version 1 started as an LLM pipeline, but three providers failed in a row (zero free quota, a billing wall, a blocked network). I shipped a deterministic engine instead, then rebuilt the AI layer in version 2 with graceful degradation as a hard requirement — so the app never depends on one provider's uptime or billing.",
    targetUsers:
      "Job seekers who want to see exactly how their resume matches a specific job description and what to fix before applying.",
    problemStatement:
      "Generic resume advice ignores the specific JD, and AI-only tools fail completely when the provider is down or out of quota. The goal was a resume analyzer that is useful offline and smarter online.",
    outcome:
      "A live FastAPI backend on Render and a Streamlit frontend on Streamlit Community Cloud, running an LLM through OpenRouter's free tier with automatic fallback — backed by 23 automated tests and GitHub Actions CI.",
    techStack: {
      languages: ["Python"],
      frameworks: ["FastAPI", "LangChain", "Streamlit", "Pydantic", "SQLAlchemy"],
      database: [
        "ChromaDB (local) / in-memory vector store (free hosting)",
        "MySQL (optional history)",
      ],
      architecture: [
        "Tool-calling agent with deterministic fallback",
        "RAG with conversation memory and citations",
        "Provider-agnostic LLM layer",
      ],
      authentication: [],
      deployment: ["Render (backend)", "Streamlit Community Cloud (frontend)", "Docker (local)"],
      tools: ["OpenRouter (LLM)", "pypdf", "python-docx", "pytest", "Ruff", "GitHub Actions"],
    },
    architecture: [
      "One module (core/llm.py) owns the LLM provider, so Gemini, OpenAI or any OpenAI-compatible gateway like OpenRouter can be swapped by config.",
      "A LangChain tool-calling agent uses 4 tools — JD keyword extraction, skill gap, semantic match and ATS score — and falls back to calling them directly when no LLM is available.",
      "Semantic similarity uses provider embeddings when available and an offline character-n-gram hashing embedder otherwise.",
      "The RAG chat splits the resume + JD into chunks, stores them in a vector store (ChromaDB locally, in-memory on free hosting) and answers with citations and per-session memory.",
      "The original v1 keyword engine (170+ skills, regex matching) is kept as its own endpoint and as the fallback.",
    ],
    moduleDiagram: [
      { label: "Keyword Engine", detail: "170+ skill dictionary, regex matching, fit score" },
      { label: "ATS Scorer", detail: "Keyword, semantic, formatting and impact checks" },
      { label: "Analysis Agent", detail: "LangChain tool-calling agent with fallback" },
      { label: "RAG Chat", detail: "Vector store + memory + citations" },
      { label: "LLM Layer", detail: "Provider-agnostic; OpenRouter in production" },
    ],
    databaseDesign: [
      {
        table: "analysis",
        fields: [
          "id",
          "resume_text",
          "job_description",
          "fit_score",
          "matched_skills",
          "missing_skills",
          "suggestions",
          "created_at",
        ],
      },
    ],
    folderStructure: `resumefit-ai/
├── backend/
│   ├── app/
│   │   ├── core/llm.py              # The only module that talks to an LLM provider
│   │   ├── routers/                 # /api/analyze (v1), /api/v2/analyze, /api/v2/chat
│   │   └── services/
│   │       ├── local_matcher.py     # v1 keyword engine (fallback)
│   │       ├── ats_service.py       # ATS score breakdown
│   │       ├── embeddings_service.py
│   │       ├── rag_service.py / vectorstore.py / memory_service.py
│   │       └── agents/              # tool-calling agent + tools
│   └── tests/                       # pytest suite
├── frontend/app.py                  # Streamlit — Fit Analysis + Resume Chat
└── .github/workflows/ci.yml`,
    screenshots: [],
    features: [
      "Fit score with matched and missing skills",
      "ATS breakdown: keyword coverage, semantic similarity, formatting and impact language, with pass/fail checks",
      "AI suggestions from a LangChain tool-calling agent",
      "RAG chat over your resume + JD with memory and citations",
      "PDF and DOCX resume upload",
      "Runs with zero API keys — every AI path falls back to deterministic logic",
      "23 automated tests and GitHub Actions CI",
    ],
    challenges: [
      "Three LLM providers failed in a row in v1 (no free quota, billing wall, blocked network) — led to the design rule that no feature may depend on a single provider.",
      "A regex bug (re.escape also escapes spaces) silently broke every multi-word skill like 'Spring Boot' — caught by testing a resume/JD pair with a known answer.",
      "The production deploy failed because the container listened on a hardcoded port instead of the one Render assigns — fixed by reading $PORT.",
      "Fitting an AI stack into a 512 MB free instance — used an in-memory vector store and lazy provider imports.",
    ],
    lessonsLearned: [
      "Design for the provider being down: a deterministic fallback turns an outage into a slightly less smart answer instead of an error.",
      "Always test matching logic against a case where you already know the right answer.",
      "Free hosting has real limits (sleep, memory, ephemeral disk); design the deploy around them from the start.",
    ],
    whatIdImprove: [
      "Persistent vector store and chat history in production.",
      "Evaluation of suggestion and chat quality (LLM-as-judge).",
      "Better coverage of non-tech roles in the skill dictionary.",
    ],
    tradeoffs: [
      "In-memory vectors on free hosting instead of ChromaDB — fits the 512 MB limit, but chat context resets when the server sleeps.",
      "Free OpenRouter model instead of a paid one — zero cost, at the price of rate limits and variable quality.",
    ],
    futureRoadmap: [
      "Compare one resume against several JDs",
      "Saved analysis history",
      "Browser extension to pull the JD from a job page",
    ],
  },
  {
    slug: "sunny-game-cafe",
    name: "Sunny Game Cafe",
    tagline:
      "A full-stack booking & management platform for a game cafe — development completed, testing and deployment in progress",
    status: "Building",
    featured: false,
    year: "2025 — Present",
    summaryLine:
      "A Spring Boot + React platform that lets customers book gaming stations and browse a game library — currently in development phase, not fully deployed, with testing and deployment in process.",
    tags: ["Spring Boot", "React.js", "MySQL", "REST APIs", "Booking System"],
    links: {
      github: "https://github.com/atharv030602/sunny-game-hub",
      demo: "https://sunny-game-hub.vercel.app/",
    },
    overview:
      "Sunny Game Cafe is a full-stack platform for a modern gaming cafe. It handles station and time-slot booking, a browsable game library, and an admin dashboard for staff to manage bookings, stations and reports. The project is currently in development phase — the core build is complete and end-to-end testing is in progress, while deployment is also being prepared.",
    whyBuilt:
      "Game cafes run on tight schedules: stations sit idle when booking is manual and customers have no easy way to reserve a slot or see what consoles are available. I wanted to build a focused production-style booking system that solves these core problems while practising a real Spring Boot + React stack with a relational database.",
    targetUsers:
      "Cafe customers who want to reserve gaming stations; cafe staff and admins who manage bookings, stations and reports.",
    problemStatement:
      "Manual booking leads to double-booked stations, walk-in queues and no reliable customer history — making it hard to run a game cafe smoothly.",
    outcome:
      "A working full-stack booking and management system. Development is completed; testing is in process to validate booking flows and admin workflows; deployment is in process and the app is not yet fully live.",
    techStack: {
      languages: ["Java", "JavaScript", "SQL"],
      frameworks: ["Spring Boot", "React.js", "Spring Data JPA"],
      database: ["MySQL"],
      architecture: ["Layered backend (Controller / Service / Repository)", "REST API + React SPA"],
      authentication: [],
      deployment: ["In progress: cloud VPS / containerized deployment"],
      tools: ["Git", "GitHub", "VS Code", "Postman"],
    },
    architecture: [
      "Spring Boot backend exposes REST APIs for bookings, users, stations and admin reports.",
      "React front end consumes the REST layer and keeps state in context hooks, with reusable booking and dashboard components.",
      "MySQL database stores users, stations, time slots and bookings.",
    ],
    moduleDiagram: [
      { label: "Station Booking", detail: "Time-slot reservation, availability checks" },
      { label: "Game Library", detail: "Browse titles, consoles and availability" },
      { label: "Admin Dashboard", detail: "Bookings, stations, reports" },
    ],
    databaseDesign: [
      { table: "user", fields: ["id", "name", "email", "role", "created_at"] },
      { table: "station", fields: ["id", "name", "console_type", "is_active"] },
      {
        table: "time_slot",
        fields: ["id", "station_id (FK)", "slot_date", "start_time", "end_time", "is_booked"],
      },
      {
        table: "booking",
        fields: ["id", "user_id (FK)", "slot_id (FK)", "status", "total_amount", "created_at"],
      },
    ],
    erDiagram: "user 1—* booking; station 1—* time_slot 1—1 booking.",
    folderStructure: `sunny-game-cafe/
├── backend/
│   ├── src/main/java/com/sunnygamecafe/
│   │   ├── controller/    # REST controllers
│   │   ├── service/       # Business logic
│   │   ├── repository/    # Spring Data JPA
│   │   ├── model/         # Entity classes
│   │   └── SunnyGameCafeApplication.java
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI
│   │   ├── pages/         # Booking, dashboard
│   │   ├── services/      # API clients
│   │   └── App.jsx
│   └── package.json
└── database/
    └── schema.sql`,
    screenshots: [],
    features: [
      "Real-time station availability and time-slot booking",
      "Game library browser with console filters",
      "Admin dashboard for bookings, stations and reports",
      "Responsive design for desktop and mobile browsing",
    ],
    challenges: [
      "Preventing double-booking of the same station and time slot under concurrent requests.",
      "Designing a clean booking flow that keeps the station calendar accurate and easy to read.",
      "Keeping the admin dashboard performant as bookings and station data grow.",
    ],
    lessonsLearned: [
      "Database-level constraints plus optimistic locking are the safest way to protect limited inventory like time slots.",
      "A clear REST contract between Spring Boot and React makes testing and future mobile apps easier.",
      "Building the admin dashboard early forces the backend to expose the right aggregates from day one.",
    ],
    whatIdImprove: [
      "Complete end-to-end testing and fix any edge cases before public deployment.",
      "Add live deployment with CI/CD and production monitoring.",
      "Introduce automated tests for booking flows.",
    ],
    tradeoffs: [
      "Built a monolithic Spring Boot backend first to validate the complete booking domain before considering microservices.",
      "Prioritized functional booking flows over polished public deployment until testing is finished.",
    ],
    futureRoadmap: [
      "Finish testing and deploy to production",
      "Introduce SMS/email booking reminders",
      "Customer mobile app for on-the-go reservations",
      "Docker-based deployment and monitoring",
    ],
  },
  {
    slug: "garage-erp",
    name: "Garage ERP System",
    tagline: "A modular ERP platform for automobile service garages",
    status: "Building",
    year: "2024 — Present",
    summaryLine:
      "A React ERP that manages customers, vehicles, job cards, inventory, billing, insurance and service records — architected for a future Spring Boot backend.",
    tags: ["React.js", "JavaScript", "CSS", "ERP", "Dashboards"],
    links: {
      github: "https://github.com/atharv030602/garage-erp",
      demo: "https://garage-erp-topaz.vercel.app/",
    },
    overview:
      "Garage ERP is a management platform for automobile service garages. It brings customers, vehicles, job cards, inventory, billing, insurance, licenses and service records into one system, replacing the scattered notebooks and spreadsheets most small garages rely on. The application is built as a modular React front end with a deliberately clean architecture so a Spring Boot + MySQL backend can be integrated without reworking the UI.",
    whyBuilt:
      "Local garages lose revenue and customer trust when service history, parts inventory and billing live in disconnected places. I wanted to solve a real operational problem end-to-end and, at the same time, practise designing a modular, scalable front-end architecture that a Java backend could later plug into.",
    targetUsers:
      "Garage owners, service advisors and mechanics at independent automobile service centers who need one place to track jobs, inventory, invoices and customer history.",
    problemStatement:
      "Manual job tracking causes lost job cards, inaccurate inventory counts, billing errors and no reliable service history — making customer follow-up and performance measurement almost impossible.",
    outcome:
      "A working, modular ERP front end where a service advisor can register a customer and vehicle, open a job card, track parts and inventory, generate invoices, record payments, and search full service history — with dashboards surfacing revenue analytics and notifications.",
    techStack: {
      languages: ["JavaScript", "HTML", "CSS"],
      frameworks: ["React.js", "React Router"],
      database: ["Planned: MySQL (backend integration)"],
      architecture: [
        "Modular feature modules",
        "Component-based UI",
        "Separation of data & presentation",
      ],
      authentication: ["Planned: role-based access (Owner / Advisor / Mechanic)"],
      deployment: ["Static hosting (Vite build)"],
      tools: ["Git", "GitHub", "VS Code"],
    },
    architecture: [
      "Modular front end where each domain — customers, vehicles, job cards, inventory, billing — is an isolated feature module with its own components and state.",
      "Data access is abstracted behind a service layer so the current client-side data source can be swapped for REST calls to a Spring Boot backend with minimal UI changes.",
      "Reusable dashboard, table and form components keep the interface consistent across every module.",
      "State and business rules (invoice totals, inventory changes) are kept out of presentation components to ease the future backend integration.",
    ],
    moduleDiagram: [
      { label: "Customers", detail: "Registration, lookup, history" },
      { label: "Vehicles", detail: "Vehicle records linked to customers" },
      { label: "Job Cards", detail: "Create, track status, service details" },
      { label: "Inventory", detail: "Parts stock and consumption tracking" },
      { label: "Billing & Payments", detail: "Invoice generation, payment workflows" },
      { label: "Insurance & Licenses", detail: "Policy and document tracking" },
      { label: "Service Records", detail: "Full per-vehicle service history" },
      { label: "Dashboard", detail: "Revenue analytics, notifications, search" },
    ],
    databaseDesign: [
      { table: "customer", fields: ["id", "name", "phone", "email", "address"] },
      { table: "vehicle", fields: ["id", "customer_id (FK)", "reg_no", "make", "model", "year"] },
      {
        table: "job_card",
        fields: ["id", "vehicle_id (FK)", "status", "opened_at", "closed_at", "notes"],
      },
      { table: "part", fields: ["id", "name", "sku", "unit_price", "stock_qty"] },
      {
        table: "job_part",
        fields: ["id", "job_card_id (FK)", "part_id (FK)", "qty", "line_total"],
      },
      {
        table: "invoice",
        fields: ["id", "job_card_id (FK)", "labour_total", "parts_total", "grand_total", "paid"],
      },
      {
        table: "insurance",
        fields: ["id", "vehicle_id (FK)", "policy_no", "provider", "expiry_date"],
      },
    ],
    erDiagram:
      "customer 1—* vehicle 1—* job_card 1—* job_part *—1 part; job_card 1—1 invoice; vehicle 1—* insurance. (Planned schema for backend integration.)",
    folderStructure: `garage-erp/
├── src/
│   ├── modules/
│   │   ├── customers/     # Customer + vehicle management
│   │   ├── jobcards/      # Job card lifecycle
│   │   ├── inventory/     # Parts & stock
│   │   ├── billing/       # Invoices & payments
│   │   └── dashboard/     # Analytics & notifications
│   ├── components/        # Shared UI (tables, forms, cards)
│   ├── services/          # Data layer (swap-in REST client)
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json`,
    screenshots: [],
    features: [
      "Customer and vehicle registration with searchable service history",
      "Job card creation and status tracking for every service",
      "Inventory tracking with parts consumption per job",
      "Invoice generation and payment workflows",
      "Insurance and license record tracking per vehicle",
      "Responsive dashboards with revenue analytics, notifications and global search",
    ],
    challenges: [
      "Designing module boundaries so each domain stays independent yet shares consistent UI.",
      "Keeping invoice, inventory and payment logic out of presentation components so a backend can own it later.",
      "Modeling relationships (customers → vehicles → job cards → parts) cleanly for a future relational database.",
    ],
    lessonsLearned: [
      "A clear separation between data access and UI makes future backend integration far less painful.",
      "Modular feature folders scale better than grouping files by type as an app grows.",
      "Designing the data model early prevents rework once real persistence is added.",
    ],
    whatIdImprove: [
      "Integrate the planned Spring Boot + MySQL backend with REST APIs.",
      "Add role-based authentication for owners, advisors and mechanics.",
      "Introduce automated tests around billing and inventory logic.",
    ],
    tradeoffs: [
      "Built the front end first with a client-side data layer to validate the workflows before committing to a backend.",
      "Prioritized breadth of modules over deep persistence to prove the end-to-end experience.",
    ],
    futureRoadmap: [
      "Spring Boot + MySQL backend integration",
      "Role-based authentication & authorization",
      "SMS/email service reminders for customers",
      "Deployment with Docker",
    ],
  },
  {
    slug: "todo-app",
    name: "To-Do List Application",
    tagline: "A command-line task manager in core Java with persistent storage",
    status: "Completed",
    year: "2023",
    summaryLine:
      "A Java CLI task manager with add, update, delete and status tracking — using the Collections Framework and file handling for persistence.",
    tags: ["Java", "Collections", "File Handling", "CLI"],
    links: {},
    overview:
      "A command-line task manager written in core Java. It supports adding, updating, deleting and tracking the status of tasks, using the Java Collections Framework in memory and file handling to persist tasks between runs.",
    whyBuilt:
      "A foundational project to strengthen core Java: the Collections Framework, file I/O, exception handling and clean program structure without any external libraries.",
    targetUsers: "Anyone who wants a simple, dependency-free way to track tasks from the terminal.",
    problemStatement:
      "Practise the full create-read-update-delete lifecycle and persistence using only core Java features.",
    outcome:
      "A working CLI where tasks are managed in memory with Collections and saved to a file, so they survive across sessions.",
    techStack: {
      languages: ["Java"],
      frameworks: ["Core Java (no external libraries)"],
      database: ["File-based storage (Java File I/O)"],
      architecture: ["Console app with in-memory Collections + file persistence"],
      authentication: ["Not applicable"],
      deployment: ["Runnable JAR"],
      tools: ["Git", "GitHub", "VS Code"],
    },
    architecture: [
      "Tasks are held in a List<Task> in memory using the Collections Framework.",
      "File handling reads tasks on startup and writes them back on every change for persistence.",
      "Command loop parses user input and routes to add / update / delete / status operations.",
    ],
    moduleDiagram: [
      { label: "Command Loop", detail: "Parse and route user input" },
      { label: "Task Manager", detail: "Add / update / delete / status" },
      { label: "Storage", detail: "Read/write tasks to file" },
    ],
    databaseDesign: [{ table: "tasks (file)", fields: ["id", "title", "status", "createdAt"] }],
    folderStructure: `todo-app/
├── src/
│   ├── Task.java
│   ├── TaskManager.java
│   └── Main.java
└── tasks.txt`,
    screenshots: [],
    features: [
      "Add, update and delete tasks",
      "Track task status (pending / done)",
      "Persistent storage using file handling",
      "In-memory management with the Collections Framework",
    ],
    challenges: [
      "Serializing and parsing tasks reliably to and from a file.",
      "Handling invalid input and file errors gracefully with exception handling.",
    ],
    lessonsLearned: [
      "The Collections Framework and file I/O together cover a surprising amount of real functionality.",
      "Structured exception handling matters even in small command-line tools.",
    ],
    whatIdImprove: [
      "Add due dates, priorities and search.",
      "Persist to a lightweight database instead of a flat file.",
    ],
    tradeoffs: [
      "Chose file storage over a database to keep the project dependency-free and focused on core Java.",
    ],
    futureRoadmap: ["Due dates & reminders", "Priorities & tags", "Optional database backend"],
  },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
