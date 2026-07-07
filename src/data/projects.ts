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
    slug: "garage-erp",
    name: "Garage ERP System",
    tagline: "A modular ERP platform for automobile service garages",
    status: "Building",
    featured: true,
    year: "2024 — Present",
    summaryLine:
      "A React ERP that manages customers, vehicles, job cards, inventory, billing, insurance and service records — architected for a future Spring Boot backend.",
    tags: ["React.js", "JavaScript", "CSS", "ERP", "Dashboards"],
    links: {},
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
      architecture: ["Modular feature modules", "Component-based UI", "Separation of data & presentation"],
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
      { table: "job_card", fields: ["id", "vehicle_id (FK)", "status", "opened_at", "closed_at", "notes"] },
      { table: "part", fields: ["id", "name", "sku", "unit_price", "stock_qty"] },
      { table: "job_part", fields: ["id", "job_card_id (FK)", "part_id (FK)", "qty", "line_total"] },
      { table: "invoice", fields: ["id", "job_card_id (FK)", "labour_total", "parts_total", "grand_total", "paid"] },
      { table: "insurance", fields: ["id", "vehicle_id (FK)", "policy_no", "provider", "expiry_date"] },
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
      { table: "article", fields: ["id", "author_id (FK)", "title", "body", "category", "created_at"] },
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
