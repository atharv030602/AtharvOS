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
    slug: "resumefit-ai",
    name: "ResumeFit AI",
    tagline:
      "A resume-to-job-description fit analyzer with a fully local, zero-cost matching engine",
    status: "Completed",
    featured: true,
    year: "2026",
    summaryLine:
      "A FastAPI + Streamlit app that scores how well a resume matches a job description using a curated 170+ skill keyword-matching engine — no paid AI API, deployed free on Render and Streamlit Community Cloud.",
    tags: ["FastAPI", "Streamlit", "Python", "Keyword Matching", "REST API"],
    links: {
      github: "https://github.com/atharv030602/Resume-Analyzer",
      demo: "https://resume-analyzer-nk4wmappwmh2hdz3prkoh4d.streamlit.app/",
    },
    overview:
      "ResumeFit AI analyzes how well a resume matches a specific job description and returns an instant fit score, matched/missing skills, targeted suggestions, and a downloadable optimized resume. It started as an agentic, Claude-API-powered pipeline, but after running into real-world constraints — a free-tier quota of zero, a billing wall, and a network that couldn't reach a third provider — I rebuilt the matching engine as a fully local, deterministic system: a curated dictionary of 170+ tech and soft skills matched via regex against both documents, with a fallback pass that catches tool/brand names the dictionary misses. Zero API cost, zero external dependency, instant results.",
    whyBuilt:
      "Originally built as the capstone of a self-directed 'ignition plan' into agentic AI. After trying to keep it running on a student budget, I hit the practical reality of AI-API-backed side projects: one provider's free tier had zero quota, another needed prepaid billing, and a third was unreachable from my network. Rather than gate a portfolio project behind someone else's billing dashboard or uptime, I rebuilt the core matching logic to be fully self-contained.",
    targetUsers:
      "Job seekers who want to check and improve how well their resume matches a specific job description before applying.",
    problemStatement:
      "Generic resume advice doesn't account for a specific job description — candidates need a way to see exactly where their resume falls short against a given JD and what to fix, without depending on a paid AI service that could run out of quota or go down.",
    outcome:
      "A live, fully working full-stack app: a FastAPI backend running a local keyword-matching engine, a Streamlit frontend with an instrument-panel-themed fit gauge, deployed free on Render and Streamlit Community Cloud — no AI API key required to run or deploy it.",
    techStack: {
      languages: ["Python"],
      frameworks: ["FastAPI", "Streamlit"],
      database: ["MySQL (optional, for result persistence)"],
      architecture: ["Local keyword-matching engine (regex-based)", "REST API + Streamlit UI"],
      authentication: [],
      deployment: ["Render (backend)", "Streamlit Community Cloud (frontend)"],
      tools: ["Git", "GitHub", "pypdf"],
    },
    architecture: [
      "FastAPI backend exposes /api/analyze/agentic and /api/analyze/upload, both routed through a local matching engine — no external API calls.",
      "A curated dictionary of 170+ tech and soft skills is scanned against both resume and job description via word-boundary regex, with multi-word terms (e.g. 'Spring Boot') handled via flexible whitespace matching.",
      "A fallback pass extracts capitalized/acronym tokens from the JD that aren't in the dictionary, to catch tools and brands the curated list misses.",
      "Fit score = matched keywords ÷ total JD keywords; missing skills drive specific, per-skill suggestions and a downloadable 'optimized resume' with a keyword alignment summary.",
      "Streamlit frontend renders the score as an instrument-panel-themed gauge with matched/missing skill chips.",
    ],
    moduleDiagram: [
      { label: "Skill Dictionary", detail: "170+ curated tech/soft skills with alias matching" },
      {
        label: "Local Matcher",
        detail: "Regex-based scan of resume + JD, fallback keyword extraction",
      },
      { label: "Scoring Engine", detail: "Matched/missing skills, fit score, suggestions" },
      { label: "Resume Optimizer", detail: "Generates a downloadable keyword-aligned resume" },
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
│   │   ├── routers/analysis.py     # /api/analyze, /api/analyze/agentic, /api/analyze/upload
│   │   ├── services/
│   │   │   ├── local_matcher.py    # Matching engine — score, suggestions, optimized resume
│   │   │   ├── skills_data.py      # Curated skill dictionary
│   │   │   └── pdf_service.py      # PDF text extraction
│   │   ├── models.py / schemas.py
│   │   └── main.py
│   └── requirements.txt
└── frontend/
    ├── app.py                      # Streamlit UI
    └── requirements.txt`,
    screenshots: [],
    features: [
      "Instant resume-to-JD fit scoring — no AI API, no waiting, no cost",
      "170+ skill keyword dictionary with alias/multi-word matching (e.g. 'Spring Boot', 'REST API')",
      "Fallback extraction for tools/brands outside the curated dictionary",
      "Matched/missing skill breakdown with targeted, per-skill suggestions",
      "Downloadable 'optimized resume' with a keyword alignment summary",
      "PDF resume upload support",
      "Deployed free on Render + Streamlit Community Cloud",
    ],
    challenges: [
      "Chased three different AI providers before hitting quota, billing, and network walls on each — decided to cut the dependency entirely rather than keep debugging third-party infrastructure.",
      "A subtle regex bug (re.escape() also escapes spaces) silently broke every multi-word skill match ('Spring Boot', 'REST API') — caught it by testing a known-overlapping resume/JD pair and seeing an impossible 0% score.",
      "Balancing a curated skill dictionary against a fallback heuristic so the tool stays useful for job descriptions outside pure tech roles.",
    ],
    lessonsLearned: [
      "A deterministic, rule-based system can be a genuinely better engineering choice than an LLM call — faster, free, and doesn't depend on someone else's uptime or billing.",
      "Always test regex-based matching against a case where you already know the expected answer — silent failures (0 matches when there should be several) are easy to miss otherwise.",
      "Deployment-time environment differences (Streamlit Cloud's secrets vs a local .env) are worth designing for from the start.",
    ],
    whatIdImprove: [
      "Expand the skill dictionary and fallback heuristics to cover non-tech roles better.",
      "Add lightweight semantic matching (e.g. synonym expansion) without reintroducing an API dependency.",
      "Add MySQL-backed history so users can revisit past analyses.",
    ],
    tradeoffs: [
      "Chose deterministic keyword matching over LLM-based semantic analysis — less nuanced, but free, instant, and has no external dependency or failure mode.",
      "Skipped database persistence in the deployed version to keep hosting free and setup trivial.",
    ],
    futureRoadmap: [
      "Optional LLM-powered mode as an opt-in upgrade path",
      "Resume history and comparison across multiple JDs",
      "Browser extension for one-click JD scraping",
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
    slug: "gfg-clone",
    name: "GeeksforGeeks Clone",
    tagline: "A full-stack educational platform with authentication and article management",
    status: "Completed",
    year: "2023",
    summaryLine:
      "A responsive full-stack learning portal inspired by GeeksforGeeks, built with Java, MySQL and MVC — with user authentication and article management.",
    tags: ["Java", "MySQL", "JavaScript", "MVC"],
    links: {},
    overview:
      "A full-stack educational platform inspired by GeeksforGeeks. It supports browsing and reading technical articles, user authentication and article management, backed by a MySQL database and structured with MVC principles for maintainability.",
    whyBuilt:
      "To build a genuine full-stack application end-to-end — connecting a Java backend to a MySQL database, handling authentication, and applying MVC architecture on a product I use every day.",
    targetUsers: "Students and developers browsing and managing technical tutorials and articles.",
    problemStatement:
      "Practise building a complete full-stack app: authentication, persistent content, and a maintainable server-side architecture rather than a static front end.",
    outcome:
      "A responsive platform with user authentication, article management and MySQL-backed content, organized with MVC layers for maintainability and scalability.",
    techStack: {
      languages: ["Java", "JavaScript", "HTML", "CSS", "SQL"],
      frameworks: ["Servlets", "JSP", "JDBC"],
      database: ["MySQL"],
      architecture: ["MVC (Model–View–Controller)"],
      authentication: ["Session-based user authentication"],
      deployment: ["Apache Tomcat"],
      tools: ["Git", "GitHub", "VS Code"],
    },
    architecture: [
      "MVC structure: Servlets act as controllers, JSP renders views, and model classes encapsulate data and business logic.",
      "JDBC data-access layer handles CRUD against MySQL for users and articles.",
      "Session-based authentication protects article management actions.",
    ],
    moduleDiagram: [
      { label: "Authentication", detail: "Sign up, login, sessions" },
      { label: "Articles", detail: "Create, list and read articles" },
      { label: "Content DB", detail: "MySQL persistence via JDBC" },
      { label: "Views", detail: "JSP-rendered responsive pages" },
    ],
    databaseDesign: [
      { table: "user", fields: ["id", "name", "email", "password_hash", "created_at"] },
      {
        table: "article",
        fields: ["id", "author_id (FK)", "title", "body", "category", "created_at"],
      },
      { table: "category", fields: ["id", "name"] },
    ],
    erDiagram: "user 1—* article *—1 category.",
    folderStructure: `gfg-clone/
├── src/main/java/
│   ├── controller/    # Servlets
│   ├── model/         # Entities + business logic
│   └── dao/           # JDBC data access
├── src/main/webapp/
│   ├── WEB-INF/       # JSP views
│   └── assets/        # CSS / JS
└── pom.xml`,
    screenshots: [],
    features: [
      "User registration and login with session authentication",
      "Article creation, listing and reading",
      "MySQL-backed content persistence via JDBC",
      "Responsive, category-based navigation",
      "MVC architecture for maintainability and scalability",
    ],
    challenges: [
      "Wiring a clean JDBC data-access layer without an ORM.",
      "Keeping controller, model and view responsibilities cleanly separated under MVC.",
      "Managing authentication state safely with sessions.",
    ],
    lessonsLearned: [
      "MVC keeps a growing server-side app understandable and testable.",
      "Understanding raw JDBC makes ORMs like Hibernate far easier to reason about later.",
      "Authentication and validation deserve careful thought even in a learning project.",
    ],
    whatIdImprove: [
      "Migrate persistence to Spring Boot + Hibernate/JPA.",
      "Hash passwords with a stronger, salted algorithm and add input validation.",
      "Add full-text search over articles.",
    ],
    tradeoffs: [
      "Chose Servlets/JSP over a framework to learn the fundamentals of Java web development.",
      "Used raw JDBC instead of an ORM to understand what an ORM abstracts away.",
    ],
    futureRoadmap: ["Spring Boot rewrite", "Search and tags", "Comments and bookmarks"],
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
